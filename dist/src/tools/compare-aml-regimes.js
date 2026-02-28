export function compareAmlRegimes(db, input) {
    const comparisons = input.jurisdictions.map((jurisdiction) => {
        const code = jurisdiction.toUpperCase();
        const rating = db.prepare(`
      SELECT * FROM fatf_country_ratings
      WHERE UPPER(country_code) = ? OR UPPER(country_name) LIKE ?
      ORDER BY listing_date DESC
      LIMIT 1
    `).get(code, `%${code}%`);
        const evaluation = db.prepare(`
      SELECT * FROM fatf_mutual_evaluations
      WHERE UPPER(country_code) = ? OR UPPER(country_name) LIKE ?
      ORDER BY evaluation_date DESC
      LIMIT 1
    `).get(code, `%${code}%`);
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
    return {
        comparison: comparisons,
        jurisdiction_count: comparisons.length,
        _meta: {
            disclaimer: 'AML/anti-corruption data is compiled from public FATF, UN, OECD, and EU sources. Country ratings may change between FATF plenary meetings. Not legal or compliance advice.',
            data_source: 'Ansvar Anti-Corruption & AML Database',
        },
    };
}
