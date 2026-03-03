import type Database from 'better-sqlite3';

interface CompareAmlRegimesInput {
  jurisdictions: string[];
}

export function compareAmlRegimes(db: Database.Database, input: CompareAmlRegimesInput) {
  const comparisons = input.jurisdictions.map((jurisdiction) => {
    const code = jurisdiction.toUpperCase();

    const rating = db.prepare(`
      SELECT * FROM fatf_country_ratings
      WHERE UPPER(country_code) = ? OR UPPER(country_name) LIKE ?
      ORDER BY listing_date DESC
      LIMIT 1
    `).get(code, `%${code}%`) as Record<string, unknown> | undefined;

    const evaluation = db.prepare(`
      SELECT * FROM fatf_mutual_evaluations
      WHERE UPPER(country_code) = ? OR UPPER(country_name) LIKE ?
      ORDER BY evaluation_date DESC
      LIMIT 1
    `).get(code, `%${code}%`) as Record<string, unknown> | undefined;

    return {
      jurisdiction,
      fatf_list_status: rating ? rating['list_status'] : 'not listed',
      mutual_evaluation: evaluation ? {
        evaluation_date: evaluation['evaluation_date'],
        assessor: evaluation['assessor'],
        overall_rating: evaluation['overall_rating'],
        effectiveness_ratings: evaluation['effectiveness_ratings'],
        technical_compliance: evaluation['technical_compliance'],
      } : null,
      deficiencies: rating ? rating['deficiencies'] : null,
    };
  });

  const metadata = db.prepare("SELECT value FROM db_metadata WHERE key = 'build_date'").get() as { value: string } | undefined;

  return {
    comparison: comparisons,
    jurisdiction_count: comparisons.length,
    _meta: {
      disclaimer: 'AML/anti-corruption data is compiled from public FATF, UN, OECD, and EU sources. Country ratings may change between FATF plenary meetings. Not legal or compliance advice.',
      data_source: 'Ansvar Anti-Corruption & AML Database',
      data_age: metadata?.value ?? 'unknown',
    },
  };
}
