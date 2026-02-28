// FATF Mutual Evaluation Results for Key Jurisdictions
import type Database from 'better-sqlite3';

export function seedFatfMutualEvaluations(db: Database.Database): void {
  console.log('  Seeding FATF mutual evaluations...');

  const insertEval = db.prepare(
    `INSERT INTO fatf_mutual_evaluations (country_code, country_name, evaluation_date, assessor, overall_rating, effectiveness_ratings, technical_compliance, key_findings, report_url)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );

  const evaluations: Array<[string, string, string, string, string, string, string, string, string]> = [
    ['US', 'United States', '2016-12-01', 'FATF',
      'Compliant or largely compliant on 36 of 40 Recommendations',
      'IO.1: Substantial; IO.2: Substantial; IO.3: Moderate; IO.4: Substantial; IO.5: Moderate; IO.6: Substantial; IO.7: Substantial; IO.8: Moderate; IO.9: Moderate; IO.10: Substantial; IO.11: Substantial',
      'LC: R.1, R.3-R.11, R.13-R.16, R.18-R.21, R.24-R.40; PC: R.2, R.12, R.17; NC: R.22, R.23',
      'Strong law enforcement and FIU capabilities. Key gaps: beneficial ownership transparency for legal entities, lack of comprehensive CDD requirements for certain DNFBPs (investment advisers, lawyers), and inconsistent state-level supervision. Federal system creates complexity in implementation.',
      'https://www.fatf-gafi.org/en/publications/Mutualevaluations/Mer-united-states-2016.html'],
    ['GB', 'United Kingdom', '2018-12-01', 'FATF',
      'Compliant or largely compliant on 38 of 40 Recommendations',
      'IO.1: Substantial; IO.2: Substantial; IO.3: Substantial; IO.4: Substantial; IO.5: Moderate; IO.6: High; IO.7: Substantial; IO.8: Moderate; IO.9: Substantial; IO.10: Substantial; IO.11: Substantial',
      'C: R.1, R.3-R.8, R.10-R.11, R.13-R.16, R.18-R.21, R.24-R.40; LC: R.2, R.9, R.12, R.17, R.22-R.23',
      'The UK has a well-developed and effective AML/CFT system. Strong investigative capabilities and a highly effective FIU (NCA/UKFIU). Significant ML proceeds (estimated at hundreds of billions). Key areas for improvement: supervision of accountancy and legal sectors, beneficial ownership verification, transparency of overseas territories and Crown Dependencies.',
      'https://www.fatf-gafi.org/en/publications/Mutualevaluations/Mer-united-kingdom-2018.html'],
    ['DE', 'Germany', '2022-08-01', 'FATF',
      'Compliant or largely compliant on 37 of 40 Recommendations',
      'IO.1: Moderate; IO.2: Moderate; IO.3: Substantial; IO.4: Moderate; IO.5: Moderate; IO.6: Moderate; IO.7: Substantial; IO.8: Low; IO.9: Moderate; IO.10: Moderate; IO.11: Substantial',
      'C: R.1, R.3-R.8, R.10-R.11, R.13, R.15-R.16, R.19-R.21, R.24-R.30, R.32-R.40; LC: R.2, R.9, R.12, R.14, R.17-R.18, R.22-R.23, R.31; PC: R.33',
      'Germany faces significant ML/TF risks given its large economy and financial sector. Key weaknesses: low number of ML convictions relative to risk profile, delayed implementation of Transparency Register, supervision of DNFBPs was fragmented, and FIU (FIU Germany) was severely under-resourced. Positive developments since evaluation include FIU reform and strengthened beneficial ownership register.',
      'https://www.fatf-gafi.org/en/publications/Mutualevaluations/Mer-germany-2022.html'],
    ['FR', 'France', '2022-05-01', 'FATF',
      'Compliant or largely compliant on 39 of 40 Recommendations',
      'IO.1: Substantial; IO.2: Substantial; IO.3: Substantial; IO.4: Substantial; IO.5: Substantial; IO.6: High; IO.7: Substantial; IO.8: Moderate; IO.9: Substantial; IO.10: Substantial; IO.11: High',
      'C: R.1, R.3-R.14, R.16-R.21, R.23-R.40; LC: R.2, R.15, R.22',
      'France has a mature and effective AML/CFT system with strong results across most areas. High effectiveness in confiscation and international cooperation. Tracfin (FIU) is highly effective. Key areas for improvement: supervision of certain DNFBPs (accountants, real estate agents), further enhancement of beneficial ownership verification, and virtual asset service provider supervision.',
      'https://www.fatf-gafi.org/en/publications/Mutualevaluations/Mer-france-2022.html'],
    ['JP', 'Japan', '2021-08-01', 'FATF',
      'Compliant or largely compliant on 30 of 40 Recommendations',
      'IO.1: Moderate; IO.2: Moderate; IO.3: Moderate; IO.4: Moderate; IO.5: Moderate; IO.6: Moderate; IO.7: Moderate; IO.8: Low; IO.9: Moderate; IO.10: Moderate; IO.11: Moderate',
      'C: R.3-R.5, R.7, R.9-R.11, R.14, R.16, R.18-R.21, R.30, R.36-R.39; LC: R.1-R.2, R.6, R.8, R.13, R.15, R.17, R.25-R.29, R.31-R.32, R.34-R.35, R.40; PC: R.12, R.22-R.24, R.33',
      'Japan faces significant ML/TF risks. Key weaknesses: insufficient understanding of risk by some obliged entities, inadequate CDD implementation especially for PEPs and beneficial ownership, limited supervision of DNFBPs, and low number of ML prosecutions. Japan committed to an action plan with 79 priority actions.',
      'https://www.fatf-gafi.org/en/publications/Mutualevaluations/Mer-japan-2021.html'],
    ['CN', 'China', '2019-04-01', 'FATF',
      'Compliant or largely compliant on 29 of 40 Recommendations',
      'IO.1: Moderate; IO.2: Moderate; IO.3: Moderate; IO.4: Moderate; IO.5: Low; IO.6: Moderate; IO.7: Moderate; IO.8: Low; IO.9: Moderate; IO.10: Moderate; IO.11: Moderate',
      'C: R.3, R.5, R.7, R.9-R.11, R.16, R.19-R.21, R.30, R.36-R.39; LC: R.1-R.2, R.4, R.6, R.8, R.13-R.15, R.17-R.18, R.25-R.29, R.31, R.40; PC: R.12, R.22-R.24, R.32-R.35',
      'China\'s financial sector is among the world\'s largest. Key challenges: inadequate supervision of financial institutions and DNFBPs, limited application of targeted financial sanctions for TF and PF, incomplete beneficial ownership transparency framework, and inconsistent implementation of preventive measures outside the banking sector.',
      'https://www.fatf-gafi.org/en/publications/Mutualevaluations/Mer-china-2019.html'],
    ['AU', 'Australia', '2015-04-01', 'FATF',
      'Compliant or largely compliant on 35 of 40 Recommendations',
      'IO.1: Substantial; IO.2: Substantial; IO.3: Substantial; IO.4: Substantial; IO.5: Moderate; IO.6: Substantial; IO.7: Substantial; IO.8: Low; IO.9: Moderate; IO.10: Substantial; IO.11: Substantial',
      'C: R.1, R.3-R.8, R.10-R.11, R.13-R.16, R.18-R.21, R.24-R.31, R.33-R.40; LC: R.2, R.9, R.12, R.17; PC: R.22-R.23, R.32',
      'Australia has a strong AML/CFT framework with effective law enforcement and FIU (AUSTRAC). Key gaps: DNFBPs (lawyers, accountants, real estate agents, dealers in precious stones/metals) are not covered by AML/CFT obligations (Tranche 2 reforms still pending as of 2024). Beneficial ownership transparency has improved but more work needed on trusts.',
      'https://www.fatf-gafi.org/en/publications/Mutualevaluations/Mer-australia-2015.html'],
    ['CA', 'Canada', '2016-09-01', 'FATF',
      'Compliant or largely compliant on 32 of 40 Recommendations',
      'IO.1: Moderate; IO.2: Substantial; IO.3: Moderate; IO.4: Substantial; IO.5: Moderate; IO.6: Substantial; IO.7: Moderate; IO.8: Moderate; IO.9: Moderate; IO.10: Substantial; IO.11: Substantial',
      'C: R.3-R.8, R.10-R.11, R.14-R.16, R.18-R.21, R.24-R.31, R.36-R.40; LC: R.1-R.2, R.9, R.12-R.13, R.17; PC: R.22-R.23, R.32-R.35',
      'Canada faces significant ML/TF risks given its proximity to the US and large financial sector. Key challenges: low ML conviction rate relative to risk, limited DNFBP coverage and supervision, provincial fragmentation of real estate and legal profession oversight, and historically weak beneficial ownership transparency (addressed by 2023 registry reforms).',
      'https://www.fatf-gafi.org/en/publications/Mutualevaluations/Mer-canada-2016.html'],
    ['IN', 'India', '2024-09-01', 'FATF',
      'Compliant or largely compliant on 37 of 40 Recommendations',
      'IO.1: Substantial; IO.2: Moderate; IO.3: Substantial; IO.4: Substantial; IO.5: Moderate; IO.6: Substantial; IO.7: Substantial; IO.8: Moderate; IO.9: Moderate; IO.10: Substantial; IO.11: Substantial',
      'C: R.1, R.3-R.8, R.10-R.11, R.13-R.16, R.18-R.21, R.24-R.31, R.33-R.40; LC: R.2, R.9, R.12, R.17, R.22-R.23, R.32',
      'India has made significant progress in building an effective AML/CFT regime. Strong FIU and law enforcement coordination. Key areas for improvement: enhancing supervision of DNFBPs, improving ML conviction rates especially in high-value cases, and strengthening supervision of the growing fintech sector. Placed in regular follow-up.',
      'https://www.fatf-gafi.org/en/publications/Mutualevaluations/Mer-india-2024.html'],
    ['SG', 'Singapore', '2016-09-01', 'FATF',
      'Compliant or largely compliant on 38 of 40 Recommendations',
      'IO.1: Substantial; IO.2: Substantial; IO.3: Substantial; IO.4: Substantial; IO.5: Substantial; IO.6: High; IO.7: Substantial; IO.8: Moderate; IO.9: Substantial; IO.10: Substantial; IO.11: Substantial',
      'C: R.1, R.3-R.16, R.18-R.21, R.24-R.31, R.33-R.40; LC: R.2, R.17, R.22-R.23, R.32',
      'Singapore has a strong and comprehensive AML/CFT framework. Excellent international cooperation and confiscation outcomes. Effective supervision by MAS. Key areas for improvement: ensuring DNFBPs fully understand and implement their obligations, enhancing supervision of company service providers, and addressing risks from cross-border illicit flows given Singapore\'s role as a financial hub.',
      'https://www.fatf-gafi.org/en/publications/Mutualevaluations/Mer-singapore-2016.html'],
  ];

  for (const [code, name, evalDate, assessor, overall, effectiveness, compliance, findings, url] of evaluations) {
    insertEval.run(code, name, evalDate, assessor, overall, effectiveness, compliance, findings, url);
  }

  console.log('    FATF Mutual Evaluations: 10 country evaluations');
}
