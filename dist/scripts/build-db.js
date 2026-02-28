import Database from 'better-sqlite3';
import { readFileSync, statSync, mkdirSync, existsSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { seedData } from './seed-data.js';
const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, '..', 'data', 'database.db');
const SCHEMA_PATH = join(__dirname, 'schema.sql');
const dataDir = dirname(DB_PATH);
if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
}
if (existsSync(DB_PATH)) {
    unlinkSync(DB_PATH);
}
console.log('Building Anti-Corruption & AML MCP database...\n');
const db = new Database(DB_PATH);
const schema = readFileSync(SCHEMA_PATH, 'utf-8');
db.exec(schema);
console.log('Schema created.');
seedData(db);
console.log('\nRebuilding FTS index...');
db.exec("INSERT INTO provisions_fts(provisions_fts) VALUES('rebuild')");
console.log('FTS index rebuilt.');
const srcCount = db.prepare('SELECT COUNT(*) as c FROM sources').get().c;
const provCount = db.prepare('SELECT COUNT(*) as c FROM provisions').get().c;
const ratingCount = db.prepare('SELECT COUNT(*) as c FROM fatf_country_ratings').get().c;
const evalCount = db.prepare('SELECT COUNT(*) as c FROM fatf_mutual_evaluations').get().c;
const wolfsbergCount = db.prepare('SELECT COUNT(*) as c FROM wolfsberg_standards').get().c;
const totalRecords = srcCount + provCount + ratingCount + evalCount + wolfsbergCount;
const insertMeta = db.prepare('INSERT OR REPLACE INTO db_metadata (key, value) VALUES (?, ?)');
insertMeta.run('tier', 'free');
insertMeta.run('schema_version', '1.0');
insertMeta.run('domain', 'anti_corruption_aml');
insertMeta.run('record_count', String(totalRecords));
insertMeta.run('build_date', new Date().toISOString().split('T')[0]);
db.pragma('journal_mode = DELETE');
db.exec('VACUUM');
db.close();
const dbSize = statSync(DB_PATH).size;
const dbSizeMB = (dbSize / 1024 / 1024).toFixed(1);
console.log('\n=== Build Complete ===');
console.log(`Sources:          ${srcCount}`);
console.log(`Provisions:       ${provCount}`);
console.log(`FATF Ratings:     ${ratingCount}`);
console.log(`Mutual Evals:     ${evalCount}`);
console.log(`Wolfsberg:        ${wolfsbergCount}`);
console.log(`Total Records:    ${totalRecords}`);
console.log(`Database Size:    ${dbSizeMB} MB`);
