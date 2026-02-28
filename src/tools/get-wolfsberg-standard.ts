import type Database from 'better-sqlite3';

interface GetWolfsbergStandardInput {
  title?: string;
  category?: string;
}

export function getWolfsbergStandard(db: Database.Database, input: GetWolfsbergStandardInput) {
  if (input.title) {
    const standard = db.prepare(`
      SELECT * FROM wolfsberg_standards
      WHERE title LIKE ?
    `).all(`%${input.title}%`);

    return {
      standards: standard,
      count: standard.length,
      _meta: {
        disclaimer: 'AML/anti-corruption data is compiled from public FATF, UN, OECD, and EU sources. Country ratings may change between FATF plenary meetings. Not legal or compliance advice.',
        data_source: 'Ansvar Anti-Corruption & AML Database',
      },
    };
  }

  if (input.category) {
    const standards = db.prepare(`
      SELECT * FROM wolfsberg_standards
      WHERE category LIKE ?
      ORDER BY publication_date DESC
    `).all(`%${input.category}%`);

    return {
      standards,
      count: standards.length,
      _meta: {
        disclaimer: 'AML/anti-corruption data is compiled from public FATF, UN, OECD, and EU sources. Country ratings may change between FATF plenary meetings. Not legal or compliance advice.',
        data_source: 'Ansvar Anti-Corruption & AML Database',
      },
    };
  }

  // Return all
  const all = db.prepare('SELECT * FROM wolfsberg_standards ORDER BY publication_date DESC').all();
  return {
    standards: all,
    count: all.length,
    _meta: {
      disclaimer: 'AML/anti-corruption data is compiled from public FATF, UN, OECD, and EU sources. Country ratings may change between FATF plenary meetings. Not legal or compliance advice.',
      data_source: 'Ansvar Anti-Corruption & AML Database',
    },
  };
}
