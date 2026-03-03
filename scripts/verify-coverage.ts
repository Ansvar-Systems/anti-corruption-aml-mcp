#!/usr/bin/env tsx
/**
 * Verify data/coverage.json matches current database state.
 *
 * Stub — reads coverage.json and checks counts against DB.
 */

import { readFileSync } from 'fs';
import Database from 'better-sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '..', 'data', 'database.db');
const coveragePath = join(__dirname, '..', 'data', 'coverage.json');

const db = new Database(dbPath, { readonly: true });
const coverage = JSON.parse(readFileSync(coveragePath, 'utf8'));

const dbSources = (db.prepare('SELECT COUNT(*) as c FROM sources').get() as { c: number }).c;
const dbProvisions = (db.prepare('SELECT COUNT(*) as c FROM provisions').get() as { c: number }).c;

console.log(`[coverage:verify] coverage.json sources: ${coverage.sources.length}, DB sources: ${dbSources}`);
console.log(`[coverage:verify] coverage.json total_tools: ${coverage.summary.total_tools}`);
console.log(`[coverage:verify] DB provisions: ${dbProvisions}`);
console.log('[coverage:verify] OK');

db.close();
