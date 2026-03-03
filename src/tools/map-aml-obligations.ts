import type Database from 'better-sqlite3';

interface MapAmlObligationsInput {
  jurisdiction: string;
  entity_type?: string;
}

export function mapAmlObligations(db: Database.Database, input: MapAmlObligationsInput) {
  const jurisdiction = input.jurisdiction.toUpperCase();

  // Determine which source frameworks apply
  const applicableSources: unknown[] = [];

  // FATF always applies (global standard)
  const fatfSource = db.prepare(`
    SELECT s.*, COUNT(p.id) as provision_count
    FROM sources s
    LEFT JOIN provisions p ON p.source_id = s.id
    WHERE s.short_title = 'FATF 40 Recommendations'
    GROUP BY s.id
  `).get();
  if (fatfSource) applicableSources.push(fatfSource);

  // UNCAC applies to all UN member states
  const uncacSource = db.prepare(`
    SELECT s.*, COUNT(p.id) as provision_count
    FROM sources s
    LEFT JOIN provisions p ON p.source_id = s.id
    WHERE s.short_title = 'UNCAC'
    GROUP BY s.id
  `).get();
  if (uncacSource) applicableSources.push(uncacSource);

  // EU AMLDs apply to EU/EEA member states
  const euCountries = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO'];
  if (euCountries.includes(jurisdiction)) {
    const euSources = db.prepare(`
      SELECT s.*, COUNT(p.id) as provision_count
      FROM sources s
      LEFT JOIN provisions p ON p.source_id = s.id
      WHERE s.organization = 'EU' AND s.source_type = 'directive'
      GROUP BY s.id
    `).all();
    applicableSources.push(...euSources);
  }

  // OECD Anti-Bribery for OECD members
  const oecdCountries = ['AU', 'AT', 'BE', 'CA', 'CL', 'CO', 'CR', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IS', 'IE', 'IL', 'IT', 'JP', 'KR', 'LV', 'LT', 'LU', 'MX', 'NL', 'NZ', 'NO', 'PL', 'PT', 'SK', 'SI', 'ES', 'SE', 'CH', 'TR', 'GB', 'US'];
  if (oecdCountries.includes(jurisdiction)) {
    const oecdSource = db.prepare(`
      SELECT s.*, COUNT(p.id) as provision_count
      FROM sources s
      LEFT JOIN provisions p ON p.source_id = s.id
      WHERE s.short_title = 'OECD Anti-Bribery Convention'
      GROUP BY s.id
    `).get();
    if (oecdSource) applicableSources.push(oecdSource);
  }

  // Get entity-type-specific provisions if requested
  let entityObligations: unknown[] = [];
  if (input.entity_type) {
    entityObligations = db.prepare(`
      SELECT p.*, s.short_title
      FROM provisions_fts fts
      JOIN provisions p ON p.id = fts.rowid
      JOIN sources s ON s.id = p.source_id
      WHERE provisions_fts MATCH ?
      ORDER BY rank
      LIMIT 15
    `).all(input.entity_type);
  }

  const buildMeta = db.prepare("SELECT value FROM db_metadata WHERE key = 'build_date'").get() as { value: string } | undefined;

  return {
    jurisdiction: input.jurisdiction,
    entity_type: input.entity_type ?? null,
    applicable_frameworks: applicableSources,
    entity_obligations: entityObligations,
    _meta: {
      disclaimer: 'AML/anti-corruption data is compiled from public FATF, UN, OECD, and EU sources. Country ratings may change between FATF plenary meetings. Not legal or compliance advice.',
      data_source: 'Ansvar Anti-Corruption & AML Database',
      data_age: buildMeta?.value ?? 'unknown',
    },
  };
}
