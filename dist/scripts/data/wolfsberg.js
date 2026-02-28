export function seedWolfsberg(db) {
    console.log('  Seeding Wolfsberg Group Standards...');
    const insertStd = db.prepare(`INSERT INTO wolfsberg_standards (title, version, publication_date, category, content, applicability, key_requirements)
     VALUES (?, ?, ?, ?, ?, ?, ?)`);
    const standards = [
        [
            'Wolfsberg Anti-Money Laundering Principles for Private Banking',
            '3.0', '2012-06-01', 'Private Banking',
            'Establishes principles for AML in private banking, covering customer acceptance, identification requirements, source of wealth/funds verification, ongoing monitoring, and control responsibilities. Private banking relationships require enhanced due diligence given the high-value nature of transactions and potential for misuse by PEPs and other high-risk clients. Banks should establish risk-based CDD procedures including customer risk classification, identification of ultimate beneficial owners, and documentation of source of wealth.',
            'Private banks, wealth management divisions',
            'Customer acceptance policies; Source of wealth verification; Beneficial ownership identification; Ongoing transaction monitoring; Suspicious activity reporting; Internal controls and compliance; Training programmes; Record retention'
        ],
        [
            'Wolfsberg Anti-Money Laundering Principles for Correspondent Banking',
            '2.0', '2014-10-01', 'Correspondent Banking',
            'Establishes principles for managing ML/TF risks in correspondent banking relationships. Banks providing correspondent banking services should undertake due diligence on respondent institutions proportionate to the assessed risk. Due diligence includes understanding the nature of the respondent bank\'s business, its customer base, the regulatory environment, and its AML/CTF controls. Banks should obtain senior management approval for new correspondent banking relationships and should periodically review existing relationships.',
            'Banks with correspondent banking relationships',
            'Respondent bank due diligence; Senior management approval; Risk-based approach; Nested correspondent banking controls; Payable-through account requirements; Transaction monitoring; Periodic review of relationships; Termination procedures'
        ],
        [
            'Wolfsberg Correspondent Banking Due Diligence Questionnaire (CBDDQ)',
            '2.0', '2023-01-01', 'Due Diligence Questionnaire',
            'The CBDDQ is a standardised due diligence questionnaire for correspondent banking. Version 2.0 is structured around seven themes: Entity and Ownership Information; AML/CTF and Sanctions Compliance Programme; Anti-Bribery and Corruption Compliance Programme; Tax Compliance Programme; Risk Assessment; Customer Due Diligence; and Transaction Monitoring, Screening and Reporting. The questionnaire enables respondent banks to demonstrate their compliance status and allows correspondent banks to assess risk consistently across their portfolios.',
            'All banks in correspondent banking relationships',
            'Seven standardised themes; Entity identification; Ownership structure; AML compliance programme details; Sanctions screening; PEP policies; Transaction monitoring capabilities; Regulatory examination results'
        ],
        [
            'Wolfsberg Guidance on Politically Exposed Persons',
            '1.0', '2017-08-01', 'PEPs',
            'Guidance on identifying and managing risks associated with PEPs. Defines categories of PEPs (heads of state, senior politicians, senior government/judicial/military officials, senior executives of state-owned enterprises, and important political party officials) and their family members and close associates. Recommends a risk-based approach to PEP identification using commercial databases, public sources, and internal information. Enhanced due diligence should be applied proportionate to the assessed risk level.',
            'All obliged entities serving PEPs',
            'PEP definition and categories; Family members and close associates; Risk-based identification; Source of wealth/funds; Senior management approval; Enhanced ongoing monitoring; Declassification criteria; Domestic vs foreign PEPs'
        ],
        [
            'Wolfsberg Statement on Beneficial Ownership',
            '1.0', '2020-02-01', 'Beneficial Ownership',
            'Guidance on identifying beneficial owners of legal entities and arrangements. Establishes that banks should identify the natural persons who ultimately own or control the customer, whether through direct or indirect ownership or through other means. When ownership cannot determine beneficial ownership (e.g., widely held entities, pooled investment vehicles), control should be assessed. Where no natural person is identified through ownership or control, banks should identify the natural person holding the position of senior managing official.',
            'All financial institutions',
            'Direct and indirect ownership assessment; Control-based identification; Senior managing official fallback; Complex ownership structures; Bearer shares; Trusts and foundations; Nominee arrangements; Ongoing monitoring of changes'
        ],
        [
            'Wolfsberg Guidance on Transaction Monitoring Screening and Suspicious Activity Detection',
            '1.0', '2023-11-01', 'Transaction Monitoring',
            'Guidance on effective systems for transaction monitoring, name screening, and detection of suspicious activity. Covers governance requirements, technology selection, model risk management, scenario development, alert handling, quality assurance, and reporting. Emphasises that transaction monitoring should be risk-based and tailored to the bank\'s products, services, customer types, and geographic risk profile. Addresses emerging topics including use of AI/ML in transaction monitoring, consortium approaches, and regulatory technology.',
            'Financial institutions',
            'Risk-based monitoring design; Scenario development and tuning; Alert management; Name screening (sanctions, PEPs, adverse media); Model validation; Below-the-line review; Quality assurance; Regulatory expectations; AI/ML considerations'
        ],
        [
            'Wolfsberg Statement on AML Screening, Searching and Filtering',
            '1.0', '2019-04-01', 'Sanctions Screening',
            'Guidance on sanctions screening, including screening of customers, transactions, and payments against sanctions lists, PEP lists, and other relevant databases. Covers screening at onboarding, during the relationship, and for individual transactions. Addresses fuzzy matching, alert disposition, and the importance of timely screening against updated sanctions lists. Banks should maintain screening systems that are calibrated to produce a manageable number of alerts while ensuring adequate coverage.',
            'Financial institutions',
            'Sanctions list screening; Real-time transaction screening; Customer screening at onboarding; Batch screening; Fuzzy matching calibration; Alert disposition; List management; Screening of SWIFT messages'
        ],
        [
            'Wolfsberg Guidance on Effective Sanctions Compliance',
            '1.0', '2023-09-01', 'Sanctions Compliance',
            'Comprehensive guidance on building and maintaining an effective sanctions compliance programme. Covers governance structure, risk assessment, screening technology, customer and transaction screening, alert management, and regulatory reporting. Addresses extraterritorial sanctions, sectoral sanctions, and the increasing complexity of sanctions regimes. Recommends that banks maintain dedicated sanctions compliance teams with appropriate expertise and technology.',
            'Financial institutions',
            'Governance structure; Board and senior management oversight; Risk assessment; Screening systems; Alert investigation; Escalation procedures; Regulatory reporting; Training; Quality assurance; Recordkeeping'
        ],
    ];
    for (const [title, version, pubDate, category, content, applicability, keyReqs] of standards) {
        insertStd.run(title, version, pubDate, category, content, applicability, keyReqs);
    }
    console.log('    Wolfsberg: 8 standards');
}
