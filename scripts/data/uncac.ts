// UN Convention Against Corruption (UNCAC, 2003)
import type Database from 'better-sqlite3';

export function seedUncac(db: Database.Database): void {
  console.log('  Seeding UNCAC...');

  const insertSource = db.prepare(
    `INSERT INTO sources (title, short_title, source_type, organization, adoption_date, status, url, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );
  const insertProv = db.prepare(
    `INSERT INTO provisions (source_id, provision_ref, title, content, chapter, part, keywords)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );

  const srcId = insertSource.run(
    'United Nations Convention against Corruption',
    'UNCAC', 'treaty', 'United Nations Office on Drugs and Crime (UNODC)',
    '2003-10-31', 'in_force',
    'https://www.unodc.org/unodc/en/corruption/uncac.html',
    'Adopted by the UN General Assembly on 31 October 2003, entered into force 14 December 2005. 190 States Parties. The only legally binding universal instrument addressing corruption comprehensively.'
  ).lastInsertRowid;

  const articles: Array<[string, string, string, string, string, string]> = [
    // Chapter II — Preventive measures
    ['UNCAC-Art5', 'Preventive anti-corruption policies and practices',
      'Each State Party shall develop and implement effective, coordinated anti-corruption policies that promote the participation of society and reflect the principles of the rule of law, proper management of public affairs and public property, integrity, transparency, and accountability.',
      'II. Preventive Measures', 'Prevention', 'policies,prevention,rule of law,transparency,accountability'],
    ['UNCAC-Art6', 'Preventive anti-corruption body or bodies',
      'Each State Party shall ensure the existence of a body or bodies that prevent corruption by implementing anti-corruption policies, increasing and disseminating knowledge about the prevention of corruption, and overseeing and coordinating the implementation of those policies.',
      'II. Preventive Measures', 'Prevention', 'anti-corruption body,independent body,prevention,oversight'],
    ['UNCAC-Art7', 'Public sector',
      'Each State Party shall adopt systems of recruitment, hiring, retention, promotion, and retirement of civil servants and other non-elected public officials that are based on principles of efficiency, transparency, and objective criteria such as merit, equity, and aptitude.',
      'II. Preventive Measures', 'Prevention', 'public sector,civil service,merit,transparency,recruitment'],
    ['UNCAC-Art8', 'Codes of conduct for public officials',
      'Each State Party shall promote integrity, honesty, and responsibility among its public officials. Each State Party shall endeavour to apply codes or standards of conduct for the correct, honourable, and proper performance of public functions.',
      'II. Preventive Measures', 'Prevention', 'codes of conduct,public officials,integrity,honesty,asset declarations'],
    ['UNCAC-Art9', 'Public procurement and management of public finances',
      'Each State Party shall take the necessary steps to establish appropriate systems of procurement based on transparency, competition, and objective criteria in decision-making that are effective in preventing corruption.',
      'II. Preventive Measures', 'Prevention', 'public procurement,public finances,transparency,competition,budget management'],
    ['UNCAC-Art10', 'Public reporting',
      'Each State Party shall take measures to enhance transparency in its public administration, including with regard to its organization, functioning, and decision-making processes. Such measures may include adopting procedures allowing members of the general public to obtain information on the organization, functioning, and decision-making processes of the public administration.',
      'II. Preventive Measures', 'Prevention', 'public reporting,transparency,access to information,public administration'],
    ['UNCAC-Art11', 'Measures relating to the judiciary and prosecution services',
      'Each State Party shall take measures to strengthen integrity and prevent opportunities for corruption among members of the judiciary, including rules with respect to the conduct of members of the judiciary.',
      'II. Preventive Measures', 'Prevention', 'judiciary,prosecution,integrity,judicial independence'],
    ['UNCAC-Art12', 'Private sector',
      'Each State Party shall take measures to prevent corruption involving the private sector, enhance accounting and auditing standards, and provide effective and dissuasive civil, administrative, or criminal penalties for failure to comply.',
      'II. Preventive Measures', 'Prevention', 'private sector,accounting,auditing,corporate governance,debarment'],
    ['UNCAC-Art13', 'Participation of society',
      'Each State Party shall take appropriate measures to promote the active participation of individuals and groups outside the public sector in the prevention of and the fight against corruption, including enhancing transparency and promoting the contribution of the public to decision-making processes.',
      'II. Preventive Measures', 'Prevention', 'civil society,public participation,transparency,awareness-raising'],
    ['UNCAC-Art14', 'Measures to prevent money-laundering',
      'Each State Party shall institute a comprehensive domestic regulatory and supervisory regime for banks and non-bank financial institutions and other bodies particularly susceptible to money-laundering, to deter and detect all forms of money-laundering. Such a regime shall emphasize requirements for customer and beneficial owner identification, record-keeping, and the reporting of suspicious transactions.',
      'II. Preventive Measures', 'Prevention', 'money laundering,AML,CDD,beneficial ownership,suspicious transactions'],

    // Chapter III — Criminalization and law enforcement
    ['UNCAC-Art15', 'Bribery of national public officials',
      'Each State Party shall adopt legislative and other measures to establish as criminal offences: (a) the promise, offering, or giving to a public official, directly or indirectly, of an undue advantage for the official or another person, in order that the official act or refrain from acting in the exercise of official duties; (b) the solicitation or acceptance by a public official of an undue advantage for the official or another person, in order that the official act or refrain from acting.',
      'III. Criminalization', 'Bribery', 'bribery,national public officials,active bribery,passive bribery,undue advantage'],
    ['UNCAC-Art16', 'Bribery of foreign public officials and officials of public international organizations',
      'Each State Party shall adopt legislative measures to establish as a criminal offence the promise, offering, or giving to a foreign public official or an official of a public international organization of an undue advantage in order to obtain or retain business or other undue advantage in relation to the conduct of international business.',
      'III. Criminalization', 'Bribery', 'foreign bribery,international officials,international business,undue advantage'],
    ['UNCAC-Art17', 'Embezzlement, misappropriation or other diversion of property by a public official',
      'Each State Party shall adopt legislative measures to establish as criminal offences the embezzlement, misappropriation, or other diversion by a public official for his or her benefit or for the benefit of another person or entity, of any property, public or private funds, or securities or any other thing of value entrusted to the public official by virtue of his or her position.',
      'III. Criminalization', 'Embezzlement', 'embezzlement,misappropriation,diversion,public funds,public official'],
    ['UNCAC-Art18', 'Trading in influence',
      'Each State Party shall consider adopting legislative measures to establish as criminal offences: the promise, offering, or giving to a public official or any other person of an undue advantage in order that the public official or person abuse his or her real or supposed influence with a view to obtaining from a public authority an undue advantage for the original instigator.',
      'III. Criminalization', 'Influence', 'trading in influence,abuse of influence,intermediary,undue advantage'],
    ['UNCAC-Art19', 'Abuse of functions',
      'Each State Party shall consider adopting legislative measures to establish as a criminal offence the abuse of functions or position — the performance of or failure to perform an act, in violation of laws, by a public official in the discharge of his or her functions, for the purpose of obtaining an undue advantage.',
      'III. Criminalization', 'Abuse', 'abuse of functions,abuse of position,public official,malfeasance'],
    ['UNCAC-Art20', 'Illicit enrichment',
      'Subject to its constitution and the fundamental principles of its legal system, each State Party shall consider adopting legislative measures to establish as a criminal offence a significant increase in the assets of a public official that he or she cannot reasonably explain in relation to his or her lawful income.',
      'III. Criminalization', 'Enrichment', 'illicit enrichment,unexplained wealth,asset declaration,public official'],
    ['UNCAC-Art21', 'Bribery in the private sector',
      'Each State Party shall consider adopting legislative measures to establish as criminal offences, when committed intentionally in the course of economic, financial, or commercial activities: the promise, offering, or giving of an undue advantage to any person who directs or works for a private-sector entity, and the solicitation or acceptance of such an advantage by any such person.',
      'III. Criminalization', 'Private Sector Bribery', 'private sector bribery,commercial bribery,private entities'],
    ['UNCAC-Art22', 'Embezzlement of property in the private sector',
      'Each State Party shall consider adopting legislative measures to establish as a criminal offence the embezzlement by a person who directs or works for a private-sector entity of any property, private funds, or securities or any other thing of value entrusted to him or her by virtue of his or her position.',
      'III. Criminalization', 'Private Sector', 'private sector embezzlement,misappropriation,corporate fraud'],
    ['UNCAC-Art23', 'Laundering of proceeds of crime',
      'Each State Party shall adopt legislative measures to establish as criminal offences: (i) the conversion or transfer of property, knowing that such property is the proceeds of crime, for the purpose of concealing or disguising the illicit origin; (ii) the concealment or disguise of the true nature, source, location, disposition, movement, or ownership of property knowing it is proceeds of crime.',
      'III. Criminalization', 'Money Laundering', 'money laundering,proceeds of crime,concealment,conversion,transfer'],
    ['UNCAC-Art24', 'Concealment',
      'Each State Party shall consider adopting legislative measures to establish as a criminal offence the concealment or continued retention of property, knowing at the time of receipt that such property is the result of any of the offences established in accordance with this Convention.',
      'III. Criminalization', 'Concealment', 'concealment,retention,proceeds of crime,receiving stolen property'],
    ['UNCAC-Art25', 'Obstruction of justice',
      'Each State Party shall adopt legislative measures to establish as criminal offences: the use of physical force, threats, or intimidation to induce false testimony or to interfere in the giving of testimony or the production of evidence; and the use of physical force, threats, or intimidation to interfere with the exercise of official duties by a justice or law enforcement official.',
      'III. Criminalization', 'Justice', 'obstruction of justice,witness intimidation,interference,tampering'],
    ['UNCAC-Art26', 'Liability of legal persons',
      'Each State Party shall adopt measures to establish the liability of legal persons for participation in the offences established in accordance with this Convention. Subject to the legal principles of the State Party, the liability of legal persons may be criminal, civil, or administrative.',
      'III. Criminalization', 'Corporate Liability', 'corporate liability,legal persons,criminal liability,civil liability,deferred prosecution'],
    ['UNCAC-Art30', 'Prosecution, adjudication and sanctions',
      'Each State Party shall make the commission of offences established in accordance with this Convention liable to sanctions that take into account the gravity of those offences. Each State Party shall take such measures as may be necessary to establish or maintain a balance between any immunities or jurisdictional privileges and the possibility of effectively investigating, prosecuting, and adjudicating.',
      'III. Criminalization', 'Sanctions', 'prosecution,sanctions,gravity,immunities,jurisdiction'],
    ['UNCAC-Art32', 'Protection of witnesses, experts and victims',
      'Each State Party shall take appropriate measures to provide effective protection from potential retaliation or intimidation for witnesses and experts who give testimony concerning offences established in accordance with this Convention and, as appropriate, for their relatives and other persons close to them.',
      'III. Criminalization', 'Protection', 'witness protection,whistleblower,retaliation,intimidation,victim protection'],
    ['UNCAC-Art33', 'Protection of reporting persons',
      'Each State Party shall consider incorporating into its domestic legal system appropriate measures to provide protection against any unjustified treatment for any person who reports in good faith and on reasonable grounds to the competent authorities any facts concerning offences established in accordance with this Convention.',
      'III. Criminalization', 'Whistleblowing', 'reporting persons,whistleblower protection,good faith,retaliation'],

    // Chapter IV — International cooperation
    ['UNCAC-Art43', 'International cooperation',
      'States Parties shall cooperate in criminal matters in accordance with articles 44 to 50. States Parties shall, where appropriate, consider assisting each other in investigations of and proceedings in civil and administrative matters relating to corruption. States Parties may transfer criminal proceedings where such transfer is considered to be in the interests of the proper administration of justice.',
      'IV. International Cooperation', 'Cooperation', 'international cooperation,mutual assistance,transfer of proceedings'],
    ['UNCAC-Art44', 'Extradition',
      'This article shall apply to the offences established in accordance with this Convention where the person who is the subject of the request for extradition is present in the territory of the requested State Party, provided that the offence for which extradition is sought is punishable under the domestic law of both the requesting and requested State Party.',
      'IV. International Cooperation', 'Extradition', 'extradition,dual criminality,treaty basis,political offence exception'],
    ['UNCAC-Art46', 'Mutual legal assistance',
      'States Parties shall afford one another the widest measure of mutual legal assistance in investigations, prosecutions, and judicial proceedings in relation to the offences covered by this Convention. Mutual legal assistance shall be afforded to the fullest extent possible under relevant laws, treaties, agreements, and arrangements of the requested State Party.',
      'IV. International Cooperation', 'MLA', 'mutual legal assistance,MLA,investigations,judicial proceedings'],

    // Chapter V — Asset recovery
    ['UNCAC-Art51', 'General provision',
      'The return of assets is a fundamental principle of this Convention, and States Parties shall afford one another the widest measure of cooperation and assistance in this regard.',
      'V. Asset Recovery', 'Recovery', 'asset recovery,fundamental principle,cooperation,repatriation'],
    ['UNCAC-Art52', 'Prevention and detection of transfers of proceeds of crime',
      'Each State Party shall take such measures as may be necessary to require financial institutions within its jurisdiction to verify the identity of customers, take reasonable steps to determine the identity of beneficial owners of funds deposited into high-value accounts, and conduct enhanced scrutiny of accounts sought or maintained by or on behalf of individuals who are, or have been, entrusted with prominent public functions.',
      'V. Asset Recovery', 'Prevention', 'financial institutions,CDD,PEPs,beneficial ownership,high-value accounts'],
    ['UNCAC-Art53', 'Measures for direct recovery of property',
      'Each State Party shall permit another State Party to initiate civil action in its courts to establish title to or ownership of property acquired through corruption. Each State Party shall also permit its courts to order that compensation or damages be paid to another State Party that has been harmed by the corruption.',
      'V. Asset Recovery', 'Civil Recovery', 'direct recovery,civil action,compensation,damages,ownership'],
    ['UNCAC-Art54', 'Mechanisms for recovery of property through international cooperation in confiscation',
      'Each State Party shall provide mutual legal assistance in accordance with article 55 with respect to property acquired through or involved in the commission of an offence established in accordance with this Convention. Each State Party shall take measures to permit its competent authorities to give effect to an order of confiscation issued by a court of another State Party.',
      'V. Asset Recovery', 'Confiscation', 'confiscation,mutual legal assistance,non-conviction based,enforcement of foreign orders'],
    ['UNCAC-Art57', 'Return and disposal of assets',
      'Property confiscated by a State Party shall be disposed of in accordance with this Convention. When acting on the request made by another State Party, a State Party shall return confiscated property to the requesting State Party, giving due consideration to the rights of bona fide third parties. In the case of embezzlement of public funds, the confiscated property shall be returned to the requesting State Party.',
      'V. Asset Recovery', 'Return', 'return of assets,disposal,repatriation,embezzlement,bona fide third parties'],
  ];

  for (const [ref, title, content, chapter, part, keywords] of articles) {
    insertProv.run(srcId, ref, title, content, chapter, part, keywords);
  }

  console.log('    UNCAC: 1 source, 35 articles');
}
