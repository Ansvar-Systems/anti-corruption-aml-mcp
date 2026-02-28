import type Database from 'better-sqlite3';

export function about(db: Database.Database) {
  const metadata = db.prepare('SELECT * FROM db_metadata').all() as Array<{ key: string; value: string }>;
  const metaMap = Object.fromEntries(metadata.map((m) => [m.key, m.value]));

  const provisionCount = (db.prepare('SELECT COUNT(*) as c FROM provisions').get() as { c: number }).c;
  const sourceCount = (db.prepare('SELECT COUNT(*) as c FROM sources').get() as { c: number }).c;
  const ratingCount = (db.prepare('SELECT COUNT(*) as c FROM fatf_country_ratings').get() as { c: number }).c;
  const evaluationCount = (db.prepare('SELECT COUNT(*) as c FROM fatf_mutual_evaluations').get() as { c: number }).c;
  const wolfsbergCount = (db.prepare('SELECT COUNT(*) as c FROM wolfsberg_standards').get() as { c: number }).c;

  return {
    server: 'anti-corruption-aml-mcp',
    version: '0.1.0',
    description: 'Anti-corruption and anti-money laundering regulatory intelligence. Covers FATF 40 Recommendations, UNCAC, OECD Anti-Bribery Convention, EU AML Directives (4AMLD/5AMLD/6AMLD), Wolfsberg Group standards, FATF mutual evaluations, and GRECO reports.',
    coverage: {
      sources: sourceCount,
      provisions: provisionCount,
      fatf_country_ratings: ratingCount,
      fatf_mutual_evaluations: evaluationCount,
      wolfsberg_standards: wolfsbergCount,
    },
    data_freshness: metaMap['build_date'] ?? 'unknown',
    tier: metaMap['tier'] ?? 'free',
    tools: 12,
    _meta: {
      disclaimer: 'AML/anti-corruption data is compiled from public FATF, UN, OECD, and EU sources. Country ratings may change between FATF plenary meetings. Not legal or compliance advice.',
      data_source: 'Ansvar Anti-Corruption & AML Database',
      freshness: metaMap['build_date'] ?? 'unknown',
    },
  };
}
