// GRECO (Group of States against Corruption) — Council of Europe
import type Database from 'better-sqlite3';

export function seedGreco(db: Database.Database): void {
  console.log('  Seeding GRECO...');

  const insertSource = db.prepare(
    `INSERT INTO sources (title, short_title, source_type, organization, adoption_date, status, url, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );
  const insertProv = db.prepare(
    `INSERT INTO provisions (source_id, provision_ref, title, content, chapter, part, keywords)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );

  const srcId = insertSource.run(
    'Group of States against Corruption (GRECO) — Evaluation Rounds and Recommendations',
    'GRECO', 'standard', 'Council of Europe',
    '1999-05-01', 'in_force',
    'https://www.coe.int/en/web/greco',
    'GRECO monitors compliance with Council of Europe anti-corruption standards through mutual evaluation. Five evaluation rounds cover: Round 1 (independence of anti-corruption bodies), Round 2 (proceeds of corruption, public administration), Round 3 (incriminations, party funding), Round 4 (members of parliament, judges, prosecutors), Round 5 (top executive functions, law enforcement). 50 member states including all EU members.'
  ).lastInsertRowid;

  const provisions: Array<[string, string, string, string, string, string]> = [
    // Round 3 themes
    ['GRECO-R3-INCRIM', 'Round 3 — Incriminations',
      'GRECO Round 3 evaluates compliance with the Criminal Law Convention on Corruption (ETS 173) and its Additional Protocol (ETS 191). Key areas: bribery of domestic and foreign public officials (active and passive), trading in influence, bribery in the private sector, and laundering of proceeds from corruption offences. Recommendations typically address: broadening the scope of bribery offences to cover all categories of public officials, removing requirements for specific intent, ensuring adequate sanctions, and establishing effective liability of legal persons.',
      'Round 3', 'Incriminations', 'Criminal Law Convention,bribery,trading in influence,private sector,legal persons'],
    ['GRECO-R3-PARTY', 'Round 3 — Transparency of party funding',
      'GRECO Round 3 evaluates compliance with Recommendation Rec(2003)4 on common rules against corruption in the funding of political parties and electoral campaigns. Key areas: transparency of donations, spending limits, state funding, supervision, and sanctions. Common recommendations include: lowering thresholds for donor identification, prohibiting anonymous donations, introducing independent audit of party finances, establishing effective supervisory mechanisms with investigative powers, and ensuring proportionate sanctions.',
      'Round 3', 'Party Funding', 'political parties,campaign finance,donations,transparency,electoral campaigns,supervision'],

    // Round 4 themes
    ['GRECO-R4-PARL', 'Round 4 — Prevention of corruption: members of parliament',
      'GRECO Round 4 evaluates the prevention of corruption among parliamentarians. Key areas: codes of conduct, asset and interest declarations, conflict of interest management, lobbying regulation, and enforcement. Common recommendations include: adopting enforceable codes of conduct with guidance, establishing comprehensive asset and interest declaration systems accessible to the public, creating effective conflict of interest management mechanisms, regulating interactions with lobbyists, and introducing proportionate sanctions for violations.',
      'Round 4', 'Parliament', 'members of parliament,codes of conduct,asset declarations,conflict of interest,lobbying'],
    ['GRECO-R4-JUDGES', 'Round 4 — Prevention of corruption: judges',
      'GRECO Round 4 evaluates the prevention of corruption in the judiciary. Key areas: judicial independence, appointment and career of judges, case management and court administration, ethical principles, conflict of interest, asset declarations, and accountability. Common recommendations include: strengthening judicial council independence, ensuring transparent and merit-based appointment procedures, adopting and publicising codes of judicial ethics, establishing accessible complaints mechanisms, and requiring asset and interest declarations.',
      'Round 4', 'Judiciary', 'judges,judicial independence,appointment,ethics,asset declarations,accountability'],
    ['GRECO-R4-PROSECUTORS', 'Round 4 — Prevention of corruption: prosecutors',
      'GRECO Round 4 evaluates the prevention of corruption among prosecutors. Key areas: independence and accountability, recruitment and career, ethical standards, conflict of interest, reporting obligations, and oversight. Common recommendations include: ensuring sufficient independence of prosecution services from political influence, establishing transparent appointment procedures, adopting codes of ethics for prosecutors, introducing comprehensive asset declaration requirements, and strengthening disciplinary proceedings.',
      'Round 4', 'Prosecution', 'prosecutors,independence,recruitment,ethics,disciplinary,oversight'],

    // Round 5 themes
    ['GRECO-R5-EXEC', 'Round 5 — Prevention of corruption: top executive functions',
      'GRECO Round 5 evaluates the prevention of corruption and promotion of integrity among persons with top executive functions (PTEFs) including heads of state/government, ministers, and their political advisers. Key areas: transparency of the legislative process, conflicts of interest during and after leaving office, asset and interest declarations, lobbying contacts, integrity of PTEFs, and accountability and enforcement. Common recommendations include: adopting integrity standards for government members, publishing ministerial agendas and meetings with lobbyists, strengthening revolving door provisions, and ensuring independent oversight of ethics compliance.',
      'Round 5', 'Top Executive', 'top executive functions,ministers,advisers,revolving door,lobbying,integrity'],
    ['GRECO-R5-LAW', 'Round 5 — Prevention of corruption: law enforcement agencies',
      'GRECO Round 5 evaluates the prevention of corruption within law enforcement agencies (police and other bodies with law enforcement functions). Key areas: ethical framework, corruption risk management, vetting and recruitment, training, internal reporting channels, disciplinary proceedings, and oversight. Common recommendations include: conducting corruption risk assessments within law enforcement, establishing effective protected reporting (whistleblowing) channels, strengthening vetting procedures including periodic integrity checks, ensuring independent oversight of complaints, and addressing gifts, hospitality, and secondary employment.',
      'Round 5', 'Law Enforcement', 'law enforcement,police,integrity,vetting,whistleblowing,risk assessment,oversight'],

    // Cross-cutting GRECO standards
    ['GRECO-CLCC', 'Criminal Law Convention on Corruption (ETS 173)',
      'Council of Europe convention requiring States to criminalise active and passive bribery of domestic public officials, members of domestic and foreign parliamentary assemblies, foreign public officials, officials of international organisations, members of international parliamentary assemblies, judges and officials of international courts. Also requires criminalisation of trading in influence, laundering of proceeds, and account offences. States must establish jurisdiction over offences committed in their territory, by their nationals, or by public officials.',
      'Conventions', 'Criminal Law Convention', 'Criminal Law Convention,ETS 173,bribery,trading in influence,international officials'],
    ['GRECO-CIVIL', 'Civil Law Convention on Corruption (ETS 174)',
      'Council of Europe convention providing for effective remedies for persons who have suffered damage as a result of corruption, including the right to compensation for material damage, loss of profits, and non-pecuniary loss. Requires States to provide for liability of public officials and the State for acts of corruption, to protect employees who report corruption in good faith, and to provide for the validity of contracts as grounds for annulment where corruption is involved.',
      'Conventions', 'Civil Law Convention', 'Civil Law Convention,ETS 174,compensation,damages,whistleblower protection,contract annulment'],
    ['GRECO-REC2003', 'Recommendation Rec(2003)4 on common rules against corruption in the funding of political parties',
      'Council of Europe recommendation establishing common rules on transparency, supervision, and sanctions related to the funding of political parties and electoral campaigns. Key provisions: limits on donations from legal and natural persons, prohibition of donations from foreign sources and state-controlled entities, transparency of donations above a threshold, regular financial reporting by parties, independent audit, and effective sanctions for violations.',
      'Recommendations', 'Party Funding', 'Rec(2003)4,political party funding,donations,campaign finance,transparency,audit'],
    ['GRECO-20PRINCIPLES', 'Resolution (97) 24 — Twenty Guiding Principles for the Fight Against Corruption',
      'The Council of Europe\'s 20 guiding principles for combating corruption, adopted in 1997. These principles call for: effective measures to prevent corruption; awareness-raising; ensuring anti-corruption rules apply to elected representatives; ensuring independence of investigation and prosecution; limiting immunities from prosecution; specialised anti-corruption bodies; tax legislation and authorities that contribute to combating corruption; accounting standards; adequate protection for whistleblowers; rules on political party financing; freedom of the media; and international cooperation.',
      'Principles', 'Guiding Principles', '20 principles,prevention,investigation,prosecution,whistleblower,media freedom,party financing'],
  ];

  for (const [ref, title, content, chapter, part, keywords] of provisions) {
    insertProv.run(srcId, ref, title, content, chapter, part, keywords);
  }

  console.log('    GRECO: 1 source, 11 provisions');
}
