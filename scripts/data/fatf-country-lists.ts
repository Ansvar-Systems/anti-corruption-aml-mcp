// FATF Grey List and Black List (as of February 2025)
import type Database from 'better-sqlite3';

export function seedFatfCountryLists(db: Database.Database): void {
  console.log('  Seeding FATF country lists...');

  const insertRating = db.prepare(
    `INSERT INTO fatf_country_ratings (country_code, country_name, list_status, listing_date, delisting_date, deficiencies, action_plan, last_reviewed)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );

  // Black list (Call for Action / High-Risk Jurisdictions)
  const blackList: Array<[string, string, string, string, string]> = [
    ['KP', 'Democratic People\'s Republic of Korea', '2011-02-01', 'Failure to address significant deficiencies in its AML/CFT regime. FATF calls on all jurisdictions to apply countermeasures and enhanced due diligence.', '2025-02-01'],
    ['IR', 'Iran', '2009-02-01', 'Failure to address strategic deficiencies and lack of meaningful progress despite action plan. Not criminalised TF in line with TF Convention, has not addressed cross-border cash courier risks.', '2025-02-01'],
    ['MM', 'Myanmar', '2022-10-01', 'Significant strategic deficiencies in its AML/CFT regime. Political instability has further hampered progress. FATF calls on jurisdictions to apply enhanced due diligence proportionate to the risks.', '2025-02-01'],
  ];

  for (const [code, name, listDate, deficiencies, lastReviewed] of blackList) {
    insertRating.run(code, name, 'black', listDate, null, deficiencies, 'FATF calls on all jurisdictions to apply countermeasures.', lastReviewed);
  }

  // Grey list (Jurisdictions under Increased Monitoring — as of October 2024 plenary)
  const greyList: Array<[string, string, string, string, string]> = [
    ['DZ', 'Algeria', '2023-10-01', 'Strategic deficiencies in AML/CFT regime. Needs to improve risk-based supervision, beneficial ownership transparency, and international cooperation.', '2024-10-01'],
    ['AO', 'Angola', '2023-10-01', 'Needs to demonstrate effective implementation of sanctions related to TF and PF, improve beneficial ownership transparency, and enhance AML/CFT supervision.', '2024-10-01'],
    ['BG', 'Bulgaria', '2023-10-01', 'Needs to improve investigation and prosecution of ML and TF, supervision of DNFBPs, and transparency of beneficial ownership.', '2024-10-01'],
    ['BF', 'Burkina Faso', '2021-02-01', 'Needs to enhance effectiveness of STR analysis, improve TF investigations, and implement targeted financial sanctions for TF.', '2024-10-01'],
    ['CM', 'Cameroon', '2023-02-01', 'Needs to enhance risk-based AML/CFT supervision, implement TFS for TF and PF, and improve use of financial intelligence.', '2024-10-01'],
    ['CI', 'Cote d\'Ivoire', '2024-02-01', 'Needs to improve risk-based supervision, enhance effectiveness of STR reporting, and improve international cooperation.', '2024-10-01'],
    ['HR', 'Croatia', '2023-06-01', 'Needs to enhance risk-based supervision of the real estate sector and DNFBPs, improve investigation of ML, and ensure adequate resources for FIU.', '2024-10-01'],
    ['CD', 'Democratic Republic of the Congo', '2022-10-01', 'Needs to implement risk-based AML/CFT supervision, demonstrate effective implementation of TFS, and improve STR reporting.', '2024-10-01'],
    ['HT', 'Haiti', '2021-06-01', 'Needs to address fundamental AML/CFT deficiencies including lack of national risk assessment, inadequate CDD requirements, and insufficient suspicious transaction reporting.', '2024-10-01'],
    ['KE', 'Kenya', '2024-02-01', 'Needs to demonstrate effective investigation and prosecution of TF, enhance risk-based supervision, and improve beneficial ownership transparency.', '2024-10-01'],
    ['LB', 'Lebanon', '2024-06-01', 'Needs to improve risk-based supervision, enhance STR quality and analysis, and demonstrate effective confiscation of proceeds of crime.', '2024-10-01'],
    ['ML', 'Mali', '2022-10-01', 'Needs to enhance national AML/CFT coordination, implement risk-based supervision, and improve effectiveness of financial intelligence.', '2024-10-01'],
    ['MC', 'Monaco', '2023-06-01', 'Needs to enhance risk-based supervision of DNFBPs, improve ML investigation capabilities, and demonstrate effective confiscation outcomes.', '2024-10-01'],
    ['MZ', 'Mozambique', '2024-06-01', 'Needs to improve AML/CFT supervision, enhance effectiveness of STR analysis, and implement targeted financial sanctions.', '2024-10-01'],
    ['NA', 'Namibia', '2022-02-01', 'Needs to improve risk-based supervision, enhance effectiveness of STR system, and demonstrate effective confiscation of proceeds of crime.', '2024-10-01'],
    ['NG', 'Nigeria', '2023-02-01', 'Needs to demonstrate sustained improvement in TF investigation and prosecution, improve beneficial ownership transparency, and enhance risk-based supervision.', '2024-10-01'],
    ['ZA', 'South Africa', '2023-02-01', 'Needs to demonstrate effective investigation and prosecution of ML and TF, enhance risk-based supervision, and improve beneficial ownership transparency of legal persons.', '2024-10-01'],
    ['SS', 'South Sudan', '2021-06-01', 'Needs to establish basic AML/CFT framework including national risk assessment, FIU operationalization, and supervisory framework.', '2024-10-01'],
    ['SY', 'Syria', '2010-02-01', 'Long-standing strategic deficiencies. Needs to adequately criminalise ML and TF, establish and implement adequate CDD, and establish effective FIU.', '2024-10-01'],
    ['TZ', 'Tanzania', '2022-02-01', 'Needs to demonstrate effective use of financial intelligence, improve TF investigation, and enhance risk-based AML/CFT supervision.', '2024-10-01'],
    ['VE', 'Venezuela', '2024-06-01', 'Needs to improve risk-based AML/CFT supervision, enhance STR reporting and analysis, and demonstrate effective ML investigation and prosecution.', '2024-10-01'],
    ['VN', 'Vietnam', '2023-06-01', 'Needs to demonstrate effective TF risk assessment, implement targeted financial sanctions, and improve effectiveness of AML/CFT supervision.', '2024-10-01'],
    ['YE', 'Yemen', '2010-02-01', 'Long-standing strategic deficiencies. Ongoing conflict has prevented meaningful progress. Needs to implement basic AML/CFT framework.', '2024-10-01'],
  ];

  for (const [code, name, listDate, deficiencies, lastReviewed] of greyList) {
    insertRating.run(code, name, 'grey', listDate, null, deficiencies, 'Jurisdiction has committed to resolve identified strategic deficiencies within agreed timeframes.', lastReviewed);
  }

  console.log('    FATF Lists: 3 black list + 23 grey list = 26 entries');
}
