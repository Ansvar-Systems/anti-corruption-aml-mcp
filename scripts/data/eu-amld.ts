// EU Anti-Money Laundering Directives (4AMLD, 5AMLD, 6AMLD) and AML Regulation (AMLR)
import type Database from 'better-sqlite3';

export function seedEuAmld(db: Database.Database): void {
  console.log('  Seeding EU AML Directives...');

  const insertSource = db.prepare(
    `INSERT INTO sources (title, short_title, source_type, organization, adoption_date, status, url, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );
  const insertProv = db.prepare(
    `INSERT INTO provisions (source_id, provision_ref, title, content, chapter, part, keywords)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );

  // 4AMLD
  const amld4 = insertSource.run(
    'Directive (EU) 2015/849 on the prevention of the use of the financial system for the purposes of money laundering or terrorist financing (4th Anti-Money Laundering Directive)',
    '4AMLD', 'directive', 'European Union',
    '2015-05-20', 'amended',
    'https://eur-lex.europa.eu/eli/dir/2015/849/oj',
    'Fourth Anti-Money Laundering Directive. Transposition deadline: 26 June 2017. Amended by 5AMLD (Directive 2018/843). Being replaced by the 2024 AML package.'
  ).lastInsertRowid;

  const amld4Provs: Array<[string, string, string, string, string, string]> = [
    ['4AMLD-Art2', 'Scope — obliged entities',
      'This Directive applies to: (1) credit institutions; (2) financial institutions; (3) auditors, external accountants and tax advisors; (4) notaries and other independent legal professionals when participating in financial or real estate transactions or assisting in the planning or execution of transactions involving buying and selling of real property, managing of client money, securities or other assets, opening or management of bank accounts, organisation of contributions necessary for the creation, operation or management of companies, or creation, operation or management of trusts, companies, foundations or similar structures; (5) trust or company service providers; (6) estate agents; (7) persons trading in goods where payments are made in cash of EUR 10,000 or more; (8) gambling service providers.',
      'I. General Provisions', 'Scope', 'obliged entities,scope,financial institutions,DNFBPs,gatekeepers'],
    ['4AMLD-Art8', 'Risk assessment by obliged entities',
      'Obliged entities shall take appropriate steps to identify and assess the risks of money laundering and terrorist financing, taking into account risk factors including those relating to their customers, countries or geographic areas, products, services, transactions, or delivery channels. Those risk assessments shall be documented, kept up-to-date, and made available to the relevant competent authorities and self-regulatory bodies.',
      'II. Customer Due Diligence', 'Risk Assessment', 'risk assessment,risk-based approach,obliged entities,documentation'],
    ['4AMLD-Art13', 'Customer due diligence measures',
      'Customer due diligence measures shall comprise: (a) identifying the customer and verifying the customer\'s identity; (b) identifying the beneficial owner and taking reasonable measures to verify that person\'s identity; (c) assessing and, as appropriate, obtaining information on the purpose and intended nature of the business relationship; (d) conducting ongoing monitoring of the business relationship including scrutiny of transactions.',
      'II. Customer Due Diligence', 'CDD', 'CDD,customer identification,beneficial ownership,ongoing monitoring,KYC'],
    ['4AMLD-Art18', 'Enhanced due diligence',
      'In the cases referred to in Articles 19 to 24 (relating to cross-border correspondent relationships, PEPs, and high-risk third countries), obliged entities shall apply enhanced customer due diligence measures to adequately manage and mitigate those risks.',
      'II. Customer Due Diligence', 'EDD', 'enhanced due diligence,EDD,higher risk,correspondent banking,PEPs'],
    ['4AMLD-Art20', 'Politically exposed persons',
      'Obliged entities shall apply specific enhanced CDD measures to PEPs: (a) have appropriate risk management systems including risk-based procedures to determine whether the customer or beneficial owner is a PEP; (b) apply measures to establish the source of wealth and source of funds; (c) obtain senior management approval for establishing or continuing business relationships; (d) conduct enhanced ongoing monitoring.',
      'II. Customer Due Diligence', 'PEPs', 'PEPs,politically exposed persons,source of wealth,source of funds,senior management'],
    ['4AMLD-Art30', 'Beneficial ownership information — legal entities',
      'Member States shall ensure that corporate and other legal entities incorporated within their territory are required to obtain and hold adequate, accurate, and current information on their beneficial ownership, including the details of the beneficial interests held. Member States shall ensure that the information held pursuant to this Article is held in a central register in each Member State.',
      'IV. Transparency', 'Beneficial Ownership', 'beneficial ownership register,central register,legal entities,transparency,UBO'],
    ['4AMLD-Art33', 'Reporting — suspicious transaction reports',
      'Obliged entities and, where applicable, their directors and employees shall cooperate fully by promptly informing the FIU, on their own initiative, where the obliged entity knows, suspects, or has reasonable grounds to suspect that funds are the proceeds of criminal activity or are related to terrorist financing.',
      'III. Reporting', 'STR', 'suspicious transaction reporting,STR,FIU,reporting obligation'],
    ['4AMLD-Art40', 'Record retention',
      'Member States shall require obliged entities to retain copies of CDD documents and records and supporting evidence of transactions for a period of five years after the end of the business relationship with their customer or after the date of an occasional transaction.',
      'III. Reporting', 'Record Retention', 'record retention,five years,CDD records,transaction records'],
  ];

  for (const [ref, title, content, chapter, part, keywords] of amld4Provs) {
    insertProv.run(amld4, ref, title, content, chapter, part, keywords);
  }

  // 5AMLD
  const amld5 = insertSource.run(
    'Directive (EU) 2018/843 amending Directive 2015/849 (5th Anti-Money Laundering Directive)',
    '5AMLD', 'directive', 'European Union',
    '2018-05-30', 'amended',
    'https://eur-lex.europa.eu/eli/dir/2018/843/oj',
    'Fifth AML Directive amending 4AMLD. Transposition deadline: 10 January 2020. Extended scope to virtual currency exchanges and custodian wallet providers, enhanced transparency of beneficial ownership registers.'
  ).lastInsertRowid;

  const amld5Provs: Array<[string, string, string, string, string, string]> = [
    ['5AMLD-VirtualCurrencies', 'Extension to virtual currency exchange platforms and custodian wallet providers',
      'The scope of obliged entities is extended to include providers engaged in exchange services between virtual currencies and fiat currencies, and custodian wallet providers. Member States shall ensure that such providers are registered. Virtual currency exchange providers and custodian wallet providers shall be required to apply customer due diligence requirements.',
      'Amendments', 'Virtual Currencies', 'virtual currencies,cryptocurrency,exchange platforms,wallet providers,registration'],
    ['5AMLD-PublicRegisters', 'Public access to beneficial ownership registers',
      'Member States shall ensure that the information on beneficial ownership of corporate entities held in central registers is accessible to any member of the general public, at minimum the name, month and year of birth, country of residence, and nationality of the beneficial owner, as well as the nature and extent of the beneficial interest held.',
      'Amendments', 'Transparency', 'public registers,beneficial ownership,transparency,public access'],
    ['5AMLD-TrustRegisters', 'Beneficial ownership information on trusts',
      'Member States shall ensure that beneficial ownership information regarding trusts is held in a central register and that competent authorities, FIUs, obliged entities, and any person that can demonstrate a legitimate interest can access such information.',
      'Amendments', 'Trusts', 'trust registers,beneficial ownership,trusts,legitimate interest,FIU access'],
    ['5AMLD-HighRiskCountries', 'Enhanced due diligence for high-risk third countries',
      'Member States shall require obliged entities to apply enhanced due diligence measures in respect of business relationships or transactions involving high-risk third countries identified by the Commission. Such EDD measures shall include obtaining additional information on the customer and beneficial owner, the intended nature of the business relationship, the source of funds and source of wealth, and the reasons for the intended or performed transactions.',
      'Amendments', 'High Risk', 'high-risk countries,EDD,European Commission delegated act,third countries'],
    ['5AMLD-PrepaidCards', 'Prepaid cards — lower thresholds',
      'The threshold for prepaid cards below which obliged entities are not required to apply certain CDD measures is lowered from EUR 250 to EUR 150. Member States shall ensure that the derogation from CDD does not apply to the redemption in cash or cash withdrawal of the monetary value of the electronic money where the amount redeemed exceeds EUR 50.',
      'Amendments', 'Prepaid Cards', 'prepaid cards,thresholds,electronic money,CDD exemption'],
  ];

  for (const [ref, title, content, chapter, part, keywords] of amld5Provs) {
    insertProv.run(amld5, ref, title, content, chapter, part, keywords);
  }

  // 6AMLD
  const amld6 = insertSource.run(
    'Directive (EU) 2018/1673 on combating money laundering by criminal law (6th Anti-Money Laundering Directive)',
    '6AMLD', 'directive', 'European Union',
    '2018-10-23', 'in_force',
    'https://eur-lex.europa.eu/eli/dir/2018/1673/oj',
    'Sixth AML Directive harmonizing the definition of money laundering criminal offences across all Member States. Transposition deadline: 3 December 2020. Establishes 22 categories of predicate offences and extends criminal liability to legal persons.'
  ).lastInsertRowid;

  const amld6Provs: Array<[string, string, string, string, string, string]> = [
    ['6AMLD-Art2', 'Money laundering offences',
      'Member States shall ensure that the following conduct, when committed intentionally, constitutes a criminal offence: (a) the conversion or transfer of property, knowing that such property is derived from criminal activity, for the purpose of concealing or disguising the illicit origin or of assisting any person who is involved in the commission of such an activity to evade the legal consequences; (b) the concealment or disguise of the true nature, source, location, disposition, movement, rights with respect to, or ownership of, property, knowing that such property is derived from criminal activity; (c) the acquisition, possession, or use of property, knowing, at the time of receipt, that such property was derived from criminal activity.',
      'Criminal Offences', 'ML Offences', 'money laundering,criminal offence,conversion,transfer,concealment,acquisition'],
    ['6AMLD-Art3', 'Predicate offences',
      'Member States shall ensure that the following categories constitute predicate offences for ML: participation in an organised criminal group, terrorism, trafficking in human beings, sexual exploitation, illicit trafficking in narcotic drugs, illicit arms trafficking, corruption, fraud (including fraud affecting the EU budget), counterfeiting, environmental crime, murder/grievous bodily injury, kidnapping, robbery, smuggling, tax crimes relating to direct and indirect taxes, extortion, forgery, piracy, insider trading and market manipulation, cybercrime, and other offences punishable by a maximum of more than one year of imprisonment.',
      'Criminal Offences', 'Predicate Offences', 'predicate offences,22 categories,organised crime,terrorism,fraud,tax crimes,cybercrime'],
    ['6AMLD-Art5', 'Penalties for natural persons',
      'Member States shall ensure that the offences referred to in Articles 3 and 4 are punishable by a maximum term of imprisonment of at least 4 years. This is without prejudice to judges\' or courts\' powers to impose additional sanctions, such as fines, temporary or permanent exclusion from the exercise of commercial activities, or placement under judicial supervision.',
      'Penalties', 'Natural Persons', 'penalties,imprisonment,4 years minimum maximum,fines,sanctions'],
    ['6AMLD-Art6', 'Aggravating circumstances',
      'Member States shall ensure that the offence is punishable by effective, proportionate, and dissuasive criminal penalties which may entail a higher maximum term of imprisonment where: the offence was committed within the framework of a criminal organisation; or the offender is an obliged entity that committed the offence in breach of its professional obligations.',
      'Penalties', 'Aggravating', 'aggravating circumstances,criminal organisation,obliged entities,professional obligations'],
    ['6AMLD-Art7', 'Liability of legal persons',
      'Member States shall ensure that legal persons can be held liable for offences committed for their benefit by any person who has a leading position within the legal person, acting either individually or as part of an organ of the legal person. Member States shall also ensure that a legal person can be held liable where the lack of supervision or control by such a person has made possible the commission of an offence by a person under its authority.',
      'Penalties', 'Corporate Liability', 'corporate liability,legal persons,leading position,supervision failure'],
    ['6AMLD-Art10', 'Jurisdiction',
      'Member States shall establish jurisdiction over the offences where: the offence is committed in whole or in part within its territory; the offender is one of its nationals; or the offence is committed for the benefit of a legal person established in its territory. A Member State shall inform the Commission where it decides to extend its jurisdiction to offences committed outside its territory.',
      'Jurisdiction', 'Jurisdiction', 'jurisdiction,territoriality,nationality,universal jurisdiction,extraterritorial'],
  ];

  for (const [ref, title, content, chapter, part, keywords] of amld6Provs) {
    insertProv.run(amld6, ref, title, content, chapter, part, keywords);
  }

  // 2024 AML Regulation (AMLR)
  const amlr = insertSource.run(
    'Regulation (EU) 2024/1624 on the prevention of the use of the financial system for the purposes of money laundering or terrorist financing (AML Regulation)',
    'AMLR 2024', 'regulation', 'European Union',
    '2024-06-19', 'in_force',
    'https://eur-lex.europa.eu/eli/reg/2024/1624/oj',
    'Directly applicable AML Regulation replacing directive-based approach for most obliged entity requirements. Part of the 2024 EU AML package alongside the AMLA Regulation (EU) 2024/1620 establishing the Authority for Anti-Money Laundering. Application date: 10 July 2027.'
  ).lastInsertRowid;

  const amlrProvs: Array<[string, string, string, string, string, string]> = [
    ['AMLR-Art1', 'Subject matter',
      'This Regulation lays down rules concerning: (a) the measures to be applied by obliged entities to prevent money laundering and terrorist financing; (b) beneficial ownership transparency requirements for legal entities and legal arrangements; (c) measures to limit the use of large cash payments.',
      'I. General Provisions', 'Subject Matter', 'subject matter,scope,obliged entities,beneficial ownership,cash limits'],
    ['AMLR-Art3', 'Obliged entities',
      'This Regulation applies to the following obliged entities: credit institutions, financial institutions, auditors, external accountants, tax advisors, notaries, lawyers, trust or company service providers, estate agents, persons trading in precious metals/stones/goods in cash above EUR 10,000, crypto-asset service providers, crowdfunding service providers, mortgage and consumer credit intermediaries, and professional football clubs and agents where the transaction value exceeds EUR 10,000.',
      'I. General Provisions', 'Scope', 'obliged entities,CASPs,crypto-assets,football clubs,crowdfunding'],
    ['AMLR-Art16', 'Customer due diligence measures',
      'Obliged entities shall apply CDD measures when: establishing a business relationship; carrying out an occasional transaction of EUR 10,000 or more; there is a suspicion of ML/TF regardless of amount; or there are doubts about previously obtained identification data. CDD shall comprise: identifying and verifying the customer; identifying and verifying the beneficial owner; assessing and obtaining information on the purpose and intended nature of the relationship; and ongoing monitoring.',
      'III. Customer Due Diligence', 'CDD', 'CDD,identification,verification,beneficial owner,ongoing monitoring'],
    ['AMLR-Art30', 'Politically exposed persons',
      'Obliged entities shall have in place risk-based procedures to determine whether the customer or beneficial owner is a PEP. Where a PEP is identified, the obliged entity shall apply EDD measures: obtain senior management approval; establish the source of wealth and source of funds; and conduct enhanced ongoing monitoring. These measures shall apply for at least 12 months after the PEP ceases to hold a prominent public function.',
      'III. Customer Due Diligence', 'PEPs', 'PEPs,enhanced due diligence,source of wealth,12 months,senior management'],
    ['AMLR-Art43', 'Beneficial ownership information — legal entities',
      'Legal entities incorporated within the Union shall obtain and hold adequate, accurate, and up-to-date information on their beneficial ownership. Beneficial owners are natural persons who ultimately own or control the legal entity through direct or indirect ownership of a sufficient percentage of the shares or voting rights or ownership interest, including through bearer shareholdings, or through control via other means. A shareholding of 25% plus one share or an ownership interest of more than 25% in the customer held by a natural person shall be an indication of direct ownership.',
      'V. Transparency', 'Beneficial Ownership', 'beneficial ownership,25% threshold,legal entities,control,UBO register'],
    ['AMLR-Art58', 'Cash limit',
      'Persons trading in goods or providing services shall not accept or make payments in cash exceeding EUR 10,000 or the equivalent in foreign currency. Where there are indications that the value of a transaction exceeds EUR 10,000, the cash limit applies to the total value regardless of whether the payment is carried out in a single operation or in several linked operations.',
      'VII. Cash Payments', 'Cash Limit', 'cash limit,EUR 10000,cash payments,goods,services'],
    ['AMLR-Art50', 'Reporting obligations',
      'Obliged entities shall promptly report to the FIU where they know, suspect, or have reasonable grounds to suspect that funds or an activity are related to ML, its predicate offences, or TF, regardless of whether the amount is below any threshold. Reporting shall also apply to attempted transactions. The report shall include all available information on the person, the transaction, the account, and the circumstances giving rise to the suspicion.',
      'IV. Reporting', 'STR', 'reporting obligations,STR,SAR,FIU,suspicious activity,attempted transactions'],
  ];

  for (const [ref, title, content, chapter, part, keywords] of amlrProvs) {
    insertProv.run(amlr, ref, title, content, chapter, part, keywords);
  }

  console.log('    EU AMLDs: 4 sources, 25 provisions');
}
