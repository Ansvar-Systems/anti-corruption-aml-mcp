import type Database from 'better-sqlite3';
import { buildCitation } from '../citation.js';

interface GetFatfCountryRatingInput {
  country: string;
}

export function getFatfCountryRating(db: Database.Database, input: GetFatfCountryRatingInput) {
  const query = input.country.toUpperCase();

  // Try by country code first, then by name
  let rating = db.prepare(`
    SELECT * FROM fatf_country_ratings
    WHERE UPPER(country_code) = ?
    ORDER BY listing_date DESC
    LIMIT 1
  `).get(query);

  if (!rating) {
    rating = db.prepare(`
      SELECT * FROM fatf_country_ratings
      WHERE UPPER(country_name) LIKE ?
      ORDER BY listing_date DESC
      LIMIT 1
    `).get(`%${query}%`);
  }

  if (!rating) {
    return { rating: null, message: `No FATF rating found for "${input.country}". The country may not be on any FATF list.` };
  }

  return {
    rating,
    _citation: buildCitation(
      `FATF ${(rating as any).country_name || input.country}`,
      `FATF country rating: ${(rating as any).country_name || input.country}`,
      'get_fatf_country_rating',
      { country: input.country },
      'https://www.fatf-gafi.org/countries/',
    ),
    _meta: {
      disclaimer: 'AML/anti-corruption data is compiled from public FATF, UN, OECD, and EU sources. Country ratings may change between FATF plenary meetings. Not legal or compliance advice.',
      data_source: 'Ansvar Anti-Corruption & AML Database',
    },
  };
}
