export function seedOecdAntiBribery(db) {
    console.log('  Seeding OECD Anti-Bribery Convention...');
    const insertSource = db.prepare(`INSERT INTO sources (title, short_title, source_type, organization, adoption_date, status, url, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
    const insertProv = db.prepare(`INSERT INTO provisions (source_id, provision_ref, title, content, chapter, part, keywords)
     VALUES (?, ?, ?, ?, ?, ?, ?)`);
    const srcId = insertSource.run('Convention on Combating Bribery of Foreign Public Officials in International Business Transactions', 'OECD Anti-Bribery Convention', 'treaty', 'Organisation for Economic Co-operation and Development (OECD)', '1997-11-21', 'in_force', 'https://www.oecd.org/en/topics/anti-bribery-and-corruption.html', 'Adopted 21 November 1997, entered into force 15 February 1999. 46 States Parties (all 38 OECD members plus 8 non-members). Accompanied by the 2021 Anti-Bribery Recommendation which strengthened enforcement guidance.').lastInsertRowid;
    const articles = [
        ['OECD-AB-Art1', 'The offence of bribery of foreign public officials',
            'Each Party shall take such measures as may be necessary to establish that it is a criminal offence under its law for any person intentionally to offer, promise, or give any undue pecuniary or other advantage, whether directly or through intermediaries, to a foreign public official, for that official or for a third party, in order that the official act or refrain from acting in relation to the performance of official duties, in order to obtain or retain business or other improper advantage in the conduct of international business. Each Party shall take measures to establish that complicity in, including incitement, aiding, and abetting, or authorization of an act of bribery of a foreign public official shall be a criminal offence.',
            'Convention', 'Offence', 'foreign bribery,criminal offence,undue advantage,intermediaries,international business'],
        ['OECD-AB-Art2', 'Responsibility of legal persons',
            'Each Party shall take such measures as may be necessary, in accordance with its legal principles, to establish the liability of legal persons for the bribery of a foreign public official.',
            'Convention', 'Corporate Liability', 'corporate liability,legal persons,responsibility'],
        ['OECD-AB-Art3', 'Sanctions',
            'The bribery of a foreign public official shall be punishable by effective, proportionate, and dissuasive criminal penalties. The range of penalties shall be comparable to that applicable to the bribery of the Party\'s own public officials and shall, in the case of natural persons, include deprivation of liberty sufficient to enable effective mutual legal assistance and extradition. Each Party shall take such measures as may be necessary to provide that the bribe and the proceeds of the bribery or property the value of which corresponds thereto are subject to seizure and confiscation or that monetary sanctions of comparable effect are applicable.',
            'Convention', 'Sanctions', 'sanctions,penalties,deprivation of liberty,confiscation,seizure,monetary sanctions'],
        ['OECD-AB-Art4', 'Jurisdiction',
            'Each Party shall take measures to establish its jurisdiction over the bribery of a foreign public official when the offence is committed in whole or in part in its territory. Where more than one Party has jurisdiction over an alleged offence, the Parties involved shall, at the request of one of them, consult with a view to determining the most appropriate jurisdiction for prosecution.',
            'Convention', 'Jurisdiction', 'jurisdiction,territoriality,consultation,prosecution'],
        ['OECD-AB-Art5', 'Enforcement',
            'Investigation and prosecution of the bribery of a foreign public official shall be subject to the applicable rules and principles of each Party. They shall not be influenced by considerations of national economic interest, the potential effect upon relations with another State, or the identity of the natural or legal persons involved.',
            'Convention', 'Enforcement', 'enforcement,independence,prosecution,national economic interest'],
        ['OECD-AB-Art6', 'Statute of limitations',
            'Any statute of limitations applicable to the offence of bribery of a foreign public official shall allow an adequate period of time for the investigation and prosecution of this offence.',
            'Convention', 'Limitations', 'statute of limitations,time limits,investigation period'],
        ['OECD-AB-Art7', 'Money laundering',
            'Each Party which has made bribery of its own public official a predicate offence for the purpose of the application of its money laundering legislation shall do so on the same terms for the bribery of a foreign public official, without regard to the place where the bribery occurred.',
            'Convention', 'Money Laundering', 'money laundering,predicate offence,AML'],
        ['OECD-AB-Art8', 'Accounting',
            'Each Party shall take measures within the framework of its laws and regulations regarding the maintenance of books and records, financial statement disclosures, and accounting and auditing standards, to prohibit the following practices for the purpose of bribing foreign public officials or hiding such bribery: the establishment of off-the-books accounts, the making of off-the-books or inadequately identified transactions, the recording of non-existent expenditures, the entry of liabilities with incorrect identification of their object, and the use of false documents.',
            'Convention', 'Accounting', 'accounting,books and records,off-the-books,false documents,financial statements'],
        ['OECD-AB-Art9', 'Mutual legal assistance',
            'Each Party shall, to the fullest extent possible under its laws and relevant treaties and arrangements, provide prompt and effective legal assistance to another Party for the purpose of criminal investigations and proceedings brought by a Party concerning offences within the scope of this Convention, and for non-criminal proceedings within the scope of this Convention brought by a Party against a legal person.',
            'Convention', 'MLA', 'mutual legal assistance,cooperation,criminal investigations,non-criminal proceedings'],
        ['OECD-AB-Art10', 'Extradition',
            'Bribery of a foreign public official shall be deemed to be included as an extraditable offence under the laws of the Parties and the extradition treaties between them. If a Party which makes extradition conditional on the existence of an extradition treaty receives a request for extradition from another Party with which it has no extradition treaty, it may consider this Convention to be the legal basis for extradition in respect of the offence of bribery of a foreign public official.',
            'Convention', 'Extradition', 'extradition,treaty basis,extraditable offence'],
        ['OECD-AB-Art11', 'Responsible authorities',
            'The Parties shall notify the Secretary-General of the OECD of the authority or authorities responsible for making and receiving requests under Articles 9 and 10. Central authorities shall be designated for the purpose of international cooperation.',
            'Convention', 'Authorities', 'responsible authorities,central authority,notification'],
        ['OECD-AB-Art12', 'Monitoring and follow-up',
            'The Parties shall cooperate in carrying out a programme of systematic follow-up to monitor and promote the full implementation of this Convention. Unless otherwise decided by consensus of the Parties, this shall be done in the framework of the OECD Working Group on Bribery in International Business Transactions.',
            'Convention', 'Monitoring', 'monitoring,follow-up,implementation,Working Group on Bribery,peer review'],
        ['OECD-AB-Art13', 'Signature and accession',
            'Until its entry into force, this Convention shall be open for signature by OECD members and by non-members which have been invited to become full participants in its Working Group on Bribery. After entry into force, the Convention shall be open to accession by any non-signatory which is a member of the OECD or has become a full participant in the Working Group.',
            'Convention', 'Final Clauses', 'signature,accession,OECD members,Working Group on Bribery'],
    ];
    for (const [ref, title, content, chapter, part, keywords] of articles) {
        insertProv.run(srcId, ref, title, content, chapter, part, keywords);
    }
    console.log('    OECD Anti-Bribery: 1 source, 13 articles');
}
