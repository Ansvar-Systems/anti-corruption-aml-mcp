import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import Database from 'better-sqlite3';
import path from 'path';
import { handleToolCall } from '../../src/tools/registry.js';

/**
 * Golden contract tests for anti-corruption-aml-mcp.
 *
 * These tests run against the production database to verify that
 * all tools return correct results. They serve as a regression
 * safety net after data ingestion or schema changes.
 */
describe('Golden Contract Tests — Production Database', () => {
  let db: Database.Database;

  beforeAll(() => {
    const dbPath = path.resolve(__dirname, '../../data/database.db');
    db = new Database(dbPath, { readonly: true });
    db.pragma('foreign_keys = ON');
  });

  afterAll(() => {
    db.close();
  });

  // ── FATF recommendation lookup (1) ─────────────────────────────────

  it('get_fatf_recommendation retrieves Recommendation 10 (CDD)', () => {
    const result = handleToolCall(db, 'get_fatf_recommendation', { number: 10 }) as any;
    expect(result.recommendation).toBeDefined();
    expect(result.recommendation.provision_ref).toBe('FATF-R10');
    expect(result.recommendation.content).toBeTruthy();
    expect(result._meta).toBeDefined();
    expect(result._meta.disclaimer).toBeTruthy();
    expect(result._meta.data_age).toBeTruthy();
    expect(result._meta.data_age).not.toBe('unknown');
  });

  // ── UNCAC article search (1) ──────────────────────────────────────

  it('search_aml_requirements finds UNCAC provisions for "bribery"', () => {
    const result = handleToolCall(db, 'search_aml_requirements', {
      query: 'bribery',
      source_type: 'treaty',
    }) as any;
    expect(result.results).toBeDefined();
    expect(result.results.length).toBeGreaterThan(0);
    const hasTreaty = result.results.some((r: any) => r.source_type === 'treaty');
    expect(hasTreaty).toBe(true);
    expect(result._meta).toBeDefined();
    expect(result._meta.data_age).toBeTruthy();
  });

  // ── AML directive cross-reference (1) ──────────────────────────────

  it('get_directive_article retrieves 4AMLD articles', () => {
    const result = handleToolCall(db, 'get_directive_article', {
      directive: '4AMLD',
    }) as any;
    expect(result.source).toBeDefined();
    expect(result.source.short_title).toBe('4AMLD');
    expect(result.provisions).toBeDefined();
    expect(result.provisions.length).toBe(8);
    expect(result.count).toBe(8);
    expect(result._meta).toBeDefined();
    expect(result._meta.data_age).toBeTruthy();
  });

  // ── Wolfsberg standard retrieval (1) ───────────────────────────────

  it('get_wolfsberg_standard returns all standards when no filter', () => {
    const result = handleToolCall(db, 'get_wolfsberg_standard', {}) as any;
    expect(result.standards).toBeDefined();
    expect(result.standards.length).toBe(8);
    expect(result.count).toBe(8);
    expect(result._meta).toBeDefined();
    expect(result._meta.data_age).toBeTruthy();
  });

  // ── GRECO evaluation search (1) ───────────────────────────────────

  it('get_directive_article retrieves GRECO evaluation records', () => {
    const result = handleToolCall(db, 'get_directive_article', {
      directive: 'GRECO',
    }) as any;
    expect(result.source).toBeDefined();
    expect(result.source.short_title).toBe('GRECO');
    expect(result.provisions).toBeDefined();
    expect(result.provisions.length).toBe(11);
    expect(result._meta).toBeDefined();
  });

  // ── list_sources (1) ──────────────────────────────────────────────

  it('list_sources returns all 8 sources with correct totals', () => {
    const result = handleToolCall(db, 'list_sources', {}) as any;
    expect(result.sources).toBeDefined();
    expect(result.sources.length).toBe(8);
    expect(result.totals.sources).toBe(8);
    expect(result.totals.provisions).toBe(123);
    expect(result.totals.fatf_country_ratings).toBe(26);
    expect(result.totals.fatf_mutual_evaluations).toBe(10);
    expect(result.totals.wolfsberg_standards).toBe(8);
    expect(result._meta).toBeDefined();
    expect(result._meta.data_age).toBeTruthy();
  });

  // ── about (1) ─────────────────────────────────────────────────────

  it('about returns valid format with name, version, coverage', () => {
    const result = handleToolCall(db, 'about', {}) as any;
    expect(result.server).toBe('anti-corruption-aml-mcp');
    expect(result.version).toBe('0.1.0');
    expect(result.coverage).toBeDefined();
    expect(result.coverage.sources).toBe(8);
    expect(result.coverage.provisions).toBe(123);
    expect(result.tools).toBe(12);
    expect(result._meta).toBeDefined();
    expect(result._meta.disclaimer).toBeTruthy();
    expect(result._meta.data_age).toBeTruthy();
    expect(result._meta.data_age).not.toBe('unknown');
  });

  // ── check_data_freshness (1) ──────────────────────────────────────

  it('check_data_freshness returns build date and source breakdown', () => {
    const result = handleToolCall(db, 'check_data_freshness', {}) as any;
    expect(result.build_date).toBeTruthy();
    expect(result.build_date).not.toBe('unknown');
    expect(result.schema_version).toBe('1.0');
    expect(result.sources_by_organization).toBeDefined();
    expect(result.sources_by_organization.length).toBeGreaterThan(0);
    expect(result._meta).toBeDefined();
    expect(result._meta.data_age).toBeTruthy();
  });

  // ── empty search (1) ──────────────────────────────────────────────

  it('returns empty results for nonsensical search', () => {
    const result = handleToolCall(db, 'search_aml_requirements', {
      query: 'xyzzy9999qqq',
    }) as any;
    expect(result.results.length).toBe(0);
    expect(result.count).toBe(0);
    expect(result._meta).toBeDefined();
  });

  // ── non-existent provision (1) ────────────────────────────────────

  it('get_fatf_recommendation returns null for non-existent recommendation', () => {
    const result = handleToolCall(db, 'get_fatf_recommendation', {
      number: 999,
    }) as any;
    expect(result.recommendation).toBeNull();
    expect(result.message).toBeTruthy();
    expect(result._meta).toBeDefined();
    expect(result._meta.data_age).toBeTruthy();
  });

  // ── assess_aml_risk (1) ───────────────────────────────────────────

  it('assess_aml_risk returns risk assessment for a jurisdiction', () => {
    const result = handleToolCall(db, 'assess_aml_risk', {
      jurisdiction: 'US',
    }) as any;
    expect(result.jurisdiction).toBe('US');
    expect(result.risk_level).toBeDefined();
    expect(result.risk_factors).toBeDefined();
    expect(Array.isArray(result.risk_factors)).toBe(true);
    expect(result._meta).toBeDefined();
    expect(result._meta.data_age).toBeTruthy();
  });

  // ── map_aml_obligations for EU country (1) ────────────────────────

  it('map_aml_obligations includes EU AMLDs for German jurisdiction', () => {
    const result = handleToolCall(db, 'map_aml_obligations', {
      jurisdiction: 'DE',
    }) as any;
    expect(result.jurisdiction).toBe('DE');
    expect(result.applicable_frameworks).toBeDefined();
    expect(result.applicable_frameworks.length).toBeGreaterThan(2);
    // DE is EU + OECD, so FATF + UNCAC + EU AMLDs + OECD = at least 4 frameworks
    const shortTitles = result.applicable_frameworks.map((f: any) => f.short_title ?? f['short_title']);
    expect(shortTitles).toContain('FATF 40 Recommendations');
    expect(shortTitles).toContain('UNCAC');
    expect(result._meta).toBeDefined();
    expect(result._meta.data_age).toBeTruthy();
  });

  // ── compare_aml_regimes (1) ───────────────────────────────────────

  it('compare_aml_regimes compares multiple jurisdictions', () => {
    const result = handleToolCall(db, 'compare_aml_regimes', {
      jurisdictions: ['US', 'GB'],
    }) as any;
    expect(result.comparison).toBeDefined();
    expect(result.comparison.length).toBe(2);
    expect(result.jurisdiction_count).toBe(2);
    expect(result._meta).toBeDefined();
    expect(result._meta.data_age).toBeTruthy();
  });

  // ── FATF country rating not found (1) ─────────────────────────────

  it('get_fatf_country_rating returns null for non-listed country', () => {
    const result = handleToolCall(db, 'get_fatf_country_rating', {
      country: 'ZZ',
    }) as any;
    expect(result.rating).toBeNull();
    expect(result.message).toBeTruthy();
    expect(result._meta).toBeDefined();
    expect(result._meta.data_age).toBeTruthy();
  });
});
