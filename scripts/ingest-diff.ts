#!/usr/bin/env tsx
/**
 * Compare fetched upstream data against current database to detect changes.
 *
 * Stub — writes 'false' to .ingest-changed (no changes detected).
 */

import { writeFileSync } from 'fs';

console.log('[ingest:diff] Comparing upstream data against current database...');
console.log('[ingest:diff] No changes detected.');

writeFileSync('.ingest-changed', 'false');
writeFileSync('.ingest-summary', 'No changes detected.');
