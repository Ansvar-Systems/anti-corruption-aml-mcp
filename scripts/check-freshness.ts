#!/usr/bin/env tsx
/**
 * Check data freshness against source update schedules.
 *
 * Writes .freshness-stale ('true'/'false') and .freshness-report for CI.
 */

import { writeFileSync } from 'fs';
import Database from 'better-sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '..', 'data', 'database.db');
const db = new Database(dbPath, { readonly: true });

const metadata = db.prepare('SELECT * FROM db_metadata').all() as Array<{ key: string; value: string }>;
const metaMap = Object.fromEntries(metadata.map((m) => [m.key, m.value]));

const buildDate = metaMap['build_date'] ?? 'unknown';
let isStale = false;
let report = `# Freshness Report\n\nBuild date: ${buildDate}\n`;

if (buildDate !== 'unknown') {
  const daysSinceBuild = Math.floor((Date.now() - new Date(buildDate).getTime()) / (1000 * 60 * 60 * 24));
  report += `Days since build: ${daysSinceBuild}\n`;
  if (daysSinceBuild > 90) {
    isStale = true;
    report += `\nWARNING: Database is ${daysSinceBuild} days old. FATF plenary meetings occur three times per year; data may be outdated.\n`;
  }
}

writeFileSync('.freshness-stale', isStale ? 'true' : 'false');
writeFileSync('.freshness-report', report);

console.log(`[freshness:check] Build date: ${buildDate}`);
console.log(`[freshness:check] Stale: ${isStale}`);

db.close();
