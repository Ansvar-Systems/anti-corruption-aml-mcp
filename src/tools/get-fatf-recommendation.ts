import type Database from 'better-sqlite3';

interface GetFatfRecommendationInput {
  number: number;
}

export function getFatfRecommendation(db: Database.Database, input: GetFatfRecommendationInput) {
  const source = db.prepare(`
    SELECT id FROM sources WHERE short_title = 'FATF 40 Recommendations'
  `).get() as { id: number } | undefined;

  if (!source) {
    return { recommendation: null, message: 'FATF Recommendations source not found' };
  }

  const ref = `R${input.number}`;
  const provision = db.prepare(`
    SELECT * FROM provisions
    WHERE source_id = ? AND provision_ref = ?
  `).get(source.id, ref);

  if (!provision) {
    return { recommendation: null, message: `Recommendation ${input.number} not found` };
  }

  return {
    recommendation: provision,
    _meta: {
      disclaimer: 'AML/anti-corruption data is compiled from public FATF, UN, OECD, and EU sources. Country ratings may change between FATF plenary meetings. Not legal or compliance advice.',
      data_source: 'Ansvar Anti-Corruption & AML Database',
    },
  };
}
