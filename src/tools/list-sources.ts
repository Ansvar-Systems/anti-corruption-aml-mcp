import type Database from 'better-sqlite3';

export function listSources(db: Database.Database) {
  const sources = db.prepare(`
    SELECT s.*, COUNT(p.id) as provision_count
    FROM sources s
    LEFT JOIN provisions p ON p.source_id = s.id
    GROUP BY s.id
    ORDER BY s.organization, s.title
  `).all();

  const provisionCount = (db.prepare('SELECT COUNT(*) as c FROM provisions').get() as { c: number }).c;
  const ratingCount = (db.prepare('SELECT COUNT(*) as c FROM fatf_country_ratings').get() as { c: number }).c;
  const evaluationCount = (db.prepare('SELECT COUNT(*) as c FROM fatf_mutual_evaluations').get() as { c: number }).c;
  const wolfsbergCount = (db.prepare('SELECT COUNT(*) as c FROM wolfsberg_standards').get() as { c: number }).c;

  const metadata = db.prepare('SELECT * FROM db_metadata').all();

  return {
    sources,
    totals: {
      sources: sources.length,
      provisions: provisionCount,
      fatf_country_ratings: ratingCount,
      fatf_mutual_evaluations: evaluationCount,
      wolfsberg_standards: wolfsbergCount,
    },
    metadata,
    _meta: {
      disclaimer: 'AML/anti-corruption data is compiled from public FATF, UN, OECD, and EU sources. Country ratings may change between FATF plenary meetings. Not legal or compliance advice.',
      data_source: 'Ansvar Anti-Corruption & AML Database',
    },
  };
}
