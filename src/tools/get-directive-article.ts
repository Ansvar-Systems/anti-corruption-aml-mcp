import type Database from 'better-sqlite3';

interface GetDirectiveArticleInput {
  directive: string;
  article?: string;
}

export function getDirectiveArticle(db: Database.Database, input: GetDirectiveArticleInput) {
  const source = db.prepare(`
    SELECT * FROM sources
    WHERE short_title LIKE ? OR title LIKE ?
  `).get(`%${input.directive}%`, `%${input.directive}%`) as Record<string, unknown> | undefined;

  const metadata = db.prepare("SELECT value FROM db_metadata WHERE key = 'build_date'").get() as { value: string } | undefined;
  const _meta = {
    disclaimer: 'AML/anti-corruption data is compiled from public FATF, UN, OECD, and EU sources. Country ratings may change between FATF plenary meetings. Not legal or compliance advice.',
    data_source: 'Ansvar Anti-Corruption & AML Database',
    data_age: metadata?.value ?? 'unknown',
  };

  if (!source) {
    return { source: null, provisions: [], message: `Directive "${input.directive}" not found`, _meta };
  }

  let provisions;
  if (input.article) {
    provisions = db.prepare(`
      SELECT * FROM provisions
      WHERE source_id = ? AND provision_ref LIKE ?
      ORDER BY id
    `).all(source['id'], `%${input.article}%`);
  } else {
    provisions = db.prepare(`
      SELECT * FROM provisions
      WHERE source_id = ?
      ORDER BY id
    `).all(source['id']);
  }

  return {
    source,
    provisions,
    count: provisions.length,
    _meta,
  };
}
