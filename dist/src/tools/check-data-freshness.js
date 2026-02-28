export function checkDataFreshness(db) {
    const metadata = db.prepare('SELECT * FROM db_metadata').all();
    const metaMap = Object.fromEntries(metadata.map((m) => [m.key, m.value]));
    const buildDate = metaMap['build_date'] ?? 'unknown';
    const schemaVersion = metaMap['schema_version'] ?? 'unknown';
    const sources = db.prepare(`
    SELECT organization, COUNT(*) as count, MAX(adoption_date) as latest_date
    FROM sources
    GROUP BY organization
    ORDER BY organization
  `).all();
    let freshnessWarning = null;
    if (buildDate !== 'unknown') {
        const buildMs = new Date(buildDate).getTime();
        const nowMs = Date.now();
        const daysSinceBuild = Math.floor((nowMs - buildMs) / (1000 * 60 * 60 * 24));
        if (daysSinceBuild > 90) {
            freshnessWarning = `Database was built ${daysSinceBuild} days ago. FATF plenary meetings occur three times per year; grey/black list data may be outdated.`;
        }
    }
    return {
        build_date: buildDate,
        schema_version: schemaVersion,
        sources_by_organization: sources,
        freshness_warning: freshnessWarning,
        _meta: {
            disclaimer: 'AML/anti-corruption data is compiled from public FATF, UN, OECD, and EU sources. Country ratings may change between FATF plenary meetings. Not legal or compliance advice.',
            data_source: 'Ansvar Anti-Corruption & AML Database',
            freshness: buildDate,
        },
    };
}
