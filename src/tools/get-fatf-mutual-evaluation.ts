import type Database from 'better-sqlite3';

interface GetFatfMutualEvaluationInput {
  country: string;
}

export function getFatfMutualEvaluation(db: Database.Database, input: GetFatfMutualEvaluationInput) {
  const query = input.country.toUpperCase();

  let evaluation = db.prepare(`
    SELECT * FROM fatf_mutual_evaluations
    WHERE UPPER(country_code) = ?
    ORDER BY evaluation_date DESC
    LIMIT 1
  `).get(query);

  if (!evaluation) {
    evaluation = db.prepare(`
      SELECT * FROM fatf_mutual_evaluations
      WHERE UPPER(country_name) LIKE ?
      ORDER BY evaluation_date DESC
      LIMIT 1
    `).get(`%${query}%`);
  }

  if (!evaluation) {
    return { evaluation: null, message: `No mutual evaluation found for "${input.country}".` };
  }

  return {
    evaluation,
    _meta: {
      disclaimer: 'AML/anti-corruption data is compiled from public FATF, UN, OECD, and EU sources. Country ratings may change between FATF plenary meetings. Not legal or compliance advice.',
      data_source: 'Ansvar Anti-Corruption & AML Database',
    },
  };
}
