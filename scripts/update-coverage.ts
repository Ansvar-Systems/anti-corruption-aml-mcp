#!/usr/bin/env tsx
/**
 * Update data/coverage.json with current database statistics.
 *
 * Stub — reads current DB counts and logs them.
 */

import Database from 'better-sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '..', 'data', 'database.db');
const db = new Database(dbPath, { readonly: true });

const sources = (db.prepare('SELECT COUNT(*) as c FROM sources').get() as { c: number }).c;
const provisions = (db.prepare('SELECT COUNT(*) as c FROM provisions').get() as { c: number }).c;
const ratings = (db.prepare('SELECT COUNT(*) as c FROM fatf_country_ratings').get() as { c: number }).c;
const evals = (db.prepare('SELECT COUNT(*) as c FROM fatf_mutual_evaluations').get() as { c: number }).c;
const wolfsberg = (db.prepare('SELECT COUNT(*) as c FROM wolfsberg_standards').get() as { c: number }).c;

console.log(`[coverage:update] Sources: ${sources}`);
console.log(`[coverage:update] Provisions: ${provisions}`);
console.log(`[coverage:update] FATF ratings: ${ratings}`);
console.log(`[coverage:update] Mutual evaluations: ${evals}`);
console.log(`[coverage:update] Wolfsberg standards: ${wolfsberg}`);
console.log(`[coverage:update] Total items: ${provisions + ratings + evals + wolfsberg}`);

db.close();
