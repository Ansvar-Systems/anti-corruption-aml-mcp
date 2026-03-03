import type Database from 'better-sqlite3';

interface AssessAmlRiskInput {
  jurisdiction: string;
  sector?: string;
}

export function assessAmlRisk(db: Database.Database, input: AssessAmlRiskInput) {
  const query = input.jurisdiction.toUpperCase();

  // Get FATF country rating
  const rating = db.prepare(`
    SELECT * FROM fatf_country_ratings
    WHERE UPPER(country_code) = ? OR UPPER(country_name) LIKE ?
    ORDER BY listing_date DESC
    LIMIT 1
  `).get(query, `%${query}%`) as Record<string, unknown> | undefined;

  // Get mutual evaluation
  const evaluation = db.prepare(`
    SELECT * FROM fatf_mutual_evaluations
    WHERE UPPER(country_code) = ? OR UPPER(country_name) LIKE ?
    ORDER BY evaluation_date DESC
    LIMIT 1
  `).get(query, `%${query}%`) as Record<string, unknown> | undefined;

  // Get relevant FATF recommendations for the sector
  let sectorProvisions: unknown[] = [];
  if (input.sector) {
    sectorProvisions = db.prepare(`
      SELECT p.*, s.short_title
      FROM provisions_fts fts
      JOIN provisions p ON p.id = fts.rowid
      JOIN sources s ON s.id = p.source_id
      WHERE provisions_fts MATCH ? AND s.short_title = 'FATF 40 Recommendations'
      ORDER BY rank
      LIMIT 10
    `).all(input.sector);
  }

  // Determine risk level
  let riskLevel = 'standard';
  let riskFactors: string[] = [];

  if (rating) {
    const status = String(rating['list_status']);
    if (status === 'black') {
      riskLevel = 'prohibited';
      riskFactors.push('Country is on FATF black list (call for action)');
    } else if (status === 'grey') {
      riskLevel = 'high';
      riskFactors.push('Country is on FATF grey list (increased monitoring)');
    } else if (status === 'monitored') {
      riskLevel = 'elevated';
      riskFactors.push('Country is under FATF monitoring');
    }
  }

  if (evaluation) {
    const overallRating = String(evaluation['overall_rating'] ?? '');
    if (overallRating.includes('non-compliant') || overallRating.includes('low')) {
      if (riskLevel === 'standard') riskLevel = 'elevated';
      riskFactors.push(`Mutual evaluation overall rating: ${overallRating}`);
    }
  }

  if (!rating && !evaluation) {
    riskFactors.push('No FATF data available for this jurisdiction; independent risk assessment required');
  }

  const buildMeta = db.prepare("SELECT value FROM db_metadata WHERE key = 'build_date'").get() as { value: string } | undefined;

  return {
    jurisdiction: input.jurisdiction,
    sector: input.sector ?? null,
    risk_level: riskLevel,
    risk_factors: riskFactors,
    fatf_rating: rating ?? null,
    mutual_evaluation_summary: evaluation ? {
      evaluation_date: evaluation['evaluation_date'],
      overall_rating: evaluation['overall_rating'],
      assessor: evaluation['assessor'],
    } : null,
    applicable_recommendations: sectorProvisions,
    _meta: {
      disclaimer: 'AML/anti-corruption data is compiled from public FATF, UN, OECD, and EU sources. Country ratings may change between FATF plenary meetings. Not legal or compliance advice.',
      data_source: 'Ansvar Anti-Corruption & AML Database',
      data_age: buildMeta?.value ?? 'unknown',
    },
  };
}
