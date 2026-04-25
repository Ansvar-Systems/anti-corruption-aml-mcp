import { buildCitation } from '../citation.js';
export function searchAmlRequirements(db, input) {
    const limit = input.limit ?? 10;
    let sql = `
    SELECT p.*, s.title as source_title, s.short_title, s.source_type, s.organization
    FROM provisions_fts fts
    JOIN provisions p ON p.id = fts.rowid
    JOIN sources s ON s.id = p.source_id
    WHERE provisions_fts MATCH ?
  `;
    const params = [input.query];
    if (input.source_type) {
        sql += ` AND s.source_type = ?`;
        params.push(input.source_type);
    }
    sql += ` ORDER BY rank LIMIT ?`;
    params.push(limit);
    const results = db.prepare(sql).all(...params).map((r) => ({
        ...r,
        _citation: buildCitation(`${r.short_title || r.source_title} ${r.provision_ref || ''}`.trim(), `${r.provision_ref || ''} ${r.short_title || r.source_title}`.trim(), 'get_directive_article', { directive: r.short_title || r.source_title, article: r.provision_ref || '' }),
    }));
    return {
        query: input.query,
        count: results.length,
        results,
        _meta: {
            disclaimer: 'AML/anti-corruption data is compiled from public FATF, UN, OECD, and EU sources. Country ratings may change between FATF plenary meetings. Not legal or compliance advice.',
            data_source: 'Ansvar Anti-Corruption & AML Database',
        },
    };
}
