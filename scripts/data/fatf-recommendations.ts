// FATF 40 Recommendations (2012, updated 2023)
import type Database from 'better-sqlite3';

export function seedFatfRecommendations(db: Database.Database): void {
  console.log('  Seeding FATF 40 Recommendations...');

  const insertSource = db.prepare(
    `INSERT INTO sources (title, short_title, source_type, organization, adoption_date, status, url, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );
  const insertProv = db.prepare(
    `INSERT INTO provisions (source_id, provision_ref, title, content, chapter, part, keywords)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );

  const srcId = insertSource.run(
    'FATF Recommendations — International Standards on Combating Money Laundering and the Financing of Terrorism & Proliferation',
    'FATF 40 Recommendations',
    'recommendation',
    'FATF',
    '2012-02-16',
    'in_force',
    'https://www.fatf-gafi.org/en/recommendations.html',
    'Originally adopted February 2012, regularly updated. The 40 Recommendations set out a comprehensive framework of measures that countries should implement to combat money laundering, terrorist financing, and proliferation financing. Last substantive revision in 2023 incorporated virtual assets and beneficial ownership transparency requirements.'
  ).lastInsertRowid;

  const recs: Array<[string, string, string, string, string, string]> = [
    // AML/CFT Policies and Coordination (R1-R2)
    ['FATF-R1', 'Assessing risks and applying a risk-based approach',
      'Countries should identify, assess, and understand the money laundering and terrorist financing risks they face, and should take action, including designating an authority or mechanism to coordinate actions to assess risks, and apply resources aimed at ensuring the risks are mitigated effectively. Based on that assessment, countries should apply a risk-based approach (RBA) to ensure that measures to prevent or mitigate ML/TF are commensurate with the risks identified. Where countries identify higher risks, they should ensure that their AML/CFT regime adequately addresses such risks. Where countries identify lower risks, they may decide to allow simplified measures for some of the FATF Recommendations under certain conditions. Countries should require financial institutions and designated non-financial businesses and professions (DNFBPs) to identify, assess, and take effective action to mitigate their ML/TF risks.',
      'A. AML/CFT Policies and Coordination', 'Policies', 'risk assessment,risk-based approach,RBA,ML,TF,mitigation'],

    ['FATF-R2', 'National cooperation and coordination',
      'Countries should have national AML/CFT/CPF policies, informed by the risks identified, which should be regularly reviewed, and should designate an authority or have a coordination or other mechanism that is responsible for such policies. Countries should ensure that policy-makers, the financial intelligence unit (FIU), law enforcement authorities, supervisors, and other relevant competent authorities, at the policymaking and operational levels, have effective mechanisms in place which enable them to cooperate and, where appropriate, coordinate and exchange information domestically with each other concerning the development and implementation of policies and activities to combat money laundering, terrorist financing, and the financing of proliferation of weapons of mass destruction.',
      'A. AML/CFT Policies and Coordination', 'Policies', 'national cooperation,coordination,FIU,policy,competent authorities'],

    // Money Laundering and Confiscation (R3-R4)
    ['FATF-R3', 'Money laundering offence',
      'Countries should criminalise money laundering on the basis of the Vienna Convention and the Palermo Convention. Countries should apply the crime of money laundering to all serious offences, with a view to including the widest range of predicate offences. Predicate offences may be described by reference to all offences or to a threshold linked either to a category of serious offences or to the penalty of imprisonment applicable to the predicate offence (threshold approach), or to a list of predicate offences, or a combination of these approaches. Where countries apply a threshold approach, predicate offences should at a minimum comprise all offences that fall within the category of serious offences under their national law, or should include offences punishable by a maximum penalty of more than one year imprisonment.',
      'B. Money Laundering and Confiscation', 'ML Offences', 'money laundering,criminalisation,predicate offences,Vienna Convention,Palermo Convention'],

    ['FATF-R4', 'Confiscation and provisional measures',
      'Countries should adopt measures similar to those in the Vienna Convention, the Palermo Convention, and the Terrorist Financing Convention, including legislative measures, to enable their competent authorities to freeze or seize and confiscate without prejudicing the rights of bona fide third parties: (a) property laundered; (b) proceeds from, or instrumentalities used in, or intended for use in ML or predicate offences; (c) property that is the proceeds of, or used in, or intended or allocated for use in, the financing of terrorism, terrorist acts, or terrorist organisations; (d) property of corresponding value. Such measures should include the authority to: identify, trace, and evaluate property subject to confiscation; carry out provisional measures to prevent dealing, transfer, or disposal; take steps to prevent or void actions that prejudice the ability to freeze, seize, or confiscate; and take appropriate investigative measures.',
      'B. Money Laundering and Confiscation', 'ML Offences', 'confiscation,seizure,freezing,provisional measures,proceeds of crime'],

    // Terrorist Financing and Financing of Proliferation (R5-R8)
    ['FATF-R5', 'Terrorist financing offence',
      'Countries should criminalise terrorist financing on the basis of the Terrorist Financing Convention, and should criminalise not only the financing of terrorist acts but also the financing of terrorist organisations and individual terrorists even in the absence of a link to a specific terrorist act or acts. Countries should ensure that such offences are designated as money laundering predicate offences.',
      'C. Terrorist Financing and Financing of Proliferation', 'TF Offences', 'terrorist financing,criminalisation,Terrorist Financing Convention'],

    ['FATF-R6', 'Targeted financial sanctions related to terrorism and terrorist financing',
      'Countries should implement targeted financial sanctions regimes to comply with United Nations Security Council resolutions relating to the prevention and suppression of terrorism and terrorist financing. The resolutions require countries to freeze without delay the funds or other assets of, and ensure that no funds or other assets are made available, directly or indirectly, to or for the benefit of, any person or entity either designated by, or under the authority of, the UN Security Council under Chapter VII of the Charter of the United Nations, including in accordance with UNSCR 1267 and its successors, and UNSCR 1373.',
      'C. Terrorist Financing and Financing of Proliferation', 'TF Offences', 'targeted financial sanctions,terrorism,UNSCR 1267,UNSCR 1373,freezing'],

    ['FATF-R7', 'Targeted financial sanctions related to proliferation',
      'Countries should implement targeted financial sanctions to comply with United Nations Security Council resolutions relating to the prevention, suppression, and disruption of proliferation of weapons of mass destruction and its financing. These resolutions require countries to freeze without delay the funds or other assets of, and to ensure that no funds and other assets are made available, directly or indirectly, to or for the benefit of, any person or entity designated by, or under the authority of, the United Nations Security Council under Chapter VII of the Charter of the United Nations.',
      'C. Terrorist Financing and Financing of Proliferation', 'PF Offences', 'proliferation financing,weapons of mass destruction,targeted financial sanctions,UNSCR'],

    ['FATF-R8', 'Non-profit organisations',
      'Countries should review the adequacy of laws and regulations that relate to non-profit organisations (NPOs) which the country has identified as being vulnerable to terrorist financing abuse. Countries should apply focused, proportionate, and risk-based measures to such NPOs to protect them from terrorist financing abuse, consistent with the risk-based approach. These measures should not unduly disrupt or discourage legitimate charitable activities. Countries should implement a risk-based approach to supervising or monitoring NPOs at risk of terrorist financing abuse. Countries should be able to obtain timely information on the activities, size, and other relevant features of their NPO sector.',
      'C. Terrorist Financing and Financing of Proliferation', 'TF Offences', 'non-profit organisations,NPOs,terrorist financing,charities'],

    // Preventive Measures (R9-R23)
    ['FATF-R9', 'Financial institution secrecy laws',
      'Countries should ensure that financial institution secrecy laws do not inhibit implementation of the FATF Recommendations. Financial institution secrecy laws should not prevent competent authorities, including supervisors, from having access to information they need to properly perform their AML/CFT functions. Competent authorities should be able to share information with their domestic counterparts and relevant foreign competent authorities where this is needed for AML/CFT purposes.',
      'D. Preventive Measures', 'Secrecy', 'bank secrecy,financial secrecy,information sharing,supervisory access'],

    ['FATF-R10', 'Customer due diligence',
      'Financial institutions should be prohibited from keeping anonymous accounts or accounts in obviously fictitious names. Financial institutions should be required to undertake customer due diligence (CDD) measures when: (i) establishing business relationships; (ii) carrying out occasional transactions above the applicable designated threshold (USD/EUR 15,000) including wire transfers; (iii) there is a suspicion of money laundering or terrorist financing; or (iv) the financial institution has doubts about the veracity or adequacy of previously obtained customer identification data. The principle that financial institutions should conduct CDD should be set out in law. CDD measures comprise: (a) identifying the customer and verifying identity using reliable, independent source documents, data, or information; (b) identifying the beneficial owner and taking reasonable measures to verify identity; (c) understanding and obtaining information on the purpose and intended nature of the business relationship; (d) conducting ongoing due diligence on the business relationship.',
      'D. Preventive Measures', 'CDD', 'customer due diligence,CDD,identification,verification,beneficial owner,KYC'],

    ['FATF-R11', 'Record keeping',
      'Financial institutions should be required to maintain, for at least five years, all necessary records on transactions, both domestic and international, to enable them to comply swiftly with information requests from the competent authorities. Such records must be sufficient to permit reconstruction of individual transactions so as to provide, if necessary, evidence for prosecution of criminal activity. Financial institutions should be required to keep all records obtained through CDD measures, account files, and business correspondence, including the results of any analysis undertaken, for at least five years after the business relationship is ended, or after the date of the occasional transaction.',
      'D. Preventive Measures', 'CDD', 'record keeping,five years,transaction records,CDD records'],

    ['FATF-R12', 'Politically exposed persons',
      'Financial institutions should be required, in relation to foreign politically exposed persons (PEPs), in addition to performing normal CDD measures, to: (a) have appropriate risk-management systems to determine whether the customer or the beneficial owner is a PEP; (b) obtain senior management approval for establishing (or continuing) such business relationships; (c) take reasonable measures to establish the source of wealth and source of funds; and (d) conduct enhanced ongoing monitoring of the business relationship. Financial institutions should be required to take reasonable measures to determine whether a customer or beneficial owner is a domestic PEP, or a person who is or has been entrusted with a prominent function by an international organisation. In cases of a higher-risk business relationship, institutions should apply enhanced due diligence.',
      'D. Preventive Measures', 'PEPs', 'politically exposed persons,PEPs,enhanced due diligence,source of wealth,senior management approval'],

    ['FATF-R13', 'Correspondent banking',
      'Financial institutions should be required, in relation to cross-border correspondent banking and other similar relationships, in addition to performing normal CDD measures, to: (a) gather sufficient information about a respondent institution to understand fully the nature of its business; (b) determine from publicly available information the reputation of the institution and the quality of supervision; (c) assess the respondent institution\'s AML/CFT controls; (d) obtain approval from senior management before establishing new correspondent relationships; (e) clearly understand the respective responsibilities of each institution; (f) with respect to payable-through accounts, be satisfied that the respondent bank has verified the identity of and performed ongoing due diligence on the customers having direct access to accounts of the correspondent.',
      'D. Preventive Measures', 'Correspondent Banking', 'correspondent banking,cross-border,respondent institution,payable-through accounts'],

    ['FATF-R14', 'Money or value transfer services',
      'Countries should take measures to ensure that natural or legal persons that provide money or value transfer services (MVTS) are licensed or registered, and subject to effective systems for monitoring and ensuring compliance with the relevant measures called for in the FATF Recommendations. Countries should take action to identify natural or legal persons that carry out MVTS without a licence or registration, and to apply appropriate sanctions. Any natural or legal person working as an agent should also be licensed or registered by a competent authority, or the MVTS provider should maintain a current list of its agents accessible by competent authorities.',
      'D. Preventive Measures', 'MVTS', 'money transfer,value transfer,MVTS,licensing,registration,agents'],

    ['FATF-R15', 'New technologies',
      'Countries and financial institutions should identify and assess the money laundering or terrorist financing risks that may arise in relation to (a) the development of new products and new business practices, including new delivery mechanisms, and (b) the use of new or developing technologies for both new and pre-existing products. In the case of financial institutions, such a risk assessment should take place prior to the launch of the new products, business practices, or the use of new or developing technologies. For managing and mitigating the risks, countries should apply the risk-based approach. Countries should ensure that financial institutions and DNFBPs that provide or participate in virtual asset activities are regulated for AML/CFT purposes, licensed or registered, and subject to effective systems for monitoring or ensuring compliance.',
      'D. Preventive Measures', 'Technology', 'new technologies,virtual assets,VASPs,fintech,risk assessment'],

    ['FATF-R16', 'Wire transfers',
      'Countries should ensure that financial institutions include required and accurate originator information, and required beneficiary information, on wire transfers and related messages, and that the information remains with the wire transfer or related message throughout the payment chain. Countries should ensure that financial institutions monitor wire transfers for the purpose of detecting those that lack required originator and/or beneficiary information, and take appropriate measures. For cross-border wire transfers above USD/EUR 1,000, the ordering financial institution should obtain and maintain the originator\'s name, account number, address (or national identity number, customer identification number, or date and place of birth), and the beneficiary\'s name and account number.',
      'D. Preventive Measures', 'Wire Transfers', 'wire transfers,originator information,beneficiary information,payment chain,travel rule'],

    ['FATF-R17', 'Reliance on third parties',
      'Countries may permit financial institutions to rely on third parties to perform elements (a)-(c) of the CDD measures set out in Recommendation 10 or to introduce business, provided that the criteria are met: (a) a financial institution relying on a third party should immediately obtain the necessary information concerning CDD elements; (b) the institution should take adequate steps to satisfy itself that copies of identification data and other relevant documentation relating to CDD requirements will be made available from the third party upon request without delay; (c) the institution should satisfy itself that the third party is regulated, supervised, or monitored and has measures in place for compliance with CDD and record-keeping requirements.',
      'D. Preventive Measures', 'Third Parties', 'reliance on third parties,CDD delegation,outsourcing,introduced business'],

    ['FATF-R18', 'Internal controls and foreign branches and subsidiaries',
      'Financial institutions should be required to implement programmes against ML/TF and the financing of proliferation, which include: (a) the development of internal policies, procedures, and controls, including appropriate compliance management arrangements, and adequate screening procedures to ensure high standards when hiring employees; (b) an ongoing employee training programme; and (c) an independent audit function to test the system. Financial groups should implement group-wide programmes against ML/TF/PF, which should be applicable and appropriate to all branches and majority-owned subsidiaries. Where the minimum AML/CFT requirements of the host country are less strict than those of the home country, financial institutions should apply the home country requirements to the extent permitted.',
      'D. Preventive Measures', 'Internal Controls', 'internal controls,compliance programme,training,audit,group-wide'],

    ['FATF-R19', 'Higher-risk countries',
      'Financial institutions should be required to apply enhanced due diligence measures to business relationships and transactions with natural and legal persons, and financial institutions, from countries for which this is called for by the FATF. The type of enhanced due diligence measures applied should be effective and proportionate to the risks. Countries should be able to apply appropriate countermeasures when called upon to do so by the FATF. Countries should also be able to apply countermeasures independently of any call by the FATF to do so. Such countermeasures should be effective and proportionate to the risks.',
      'D. Preventive Measures', 'Higher Risk', 'higher-risk countries,enhanced due diligence,countermeasures,FATF call for action'],

    ['FATF-R20', 'Reporting of suspicious transactions',
      'If a financial institution suspects or has reasonable grounds to suspect that funds are the proceeds of a criminal activity, or are related to terrorist financing, it should be required, by law, to report promptly its suspicions to the financial intelligence unit (FIU). The reporting obligation applies regardless of the amount of the transaction and whether or not the transaction was attempted. Suspicious transaction reports (STRs) should be filed in good faith and the person or institution filing should be protected from criminal and civil liability for breach of any restriction on disclosure of information imposed by contract or by any legislative, regulatory, or administrative provision.',
      'D. Preventive Measures', 'STR', 'suspicious transaction reporting,STR,SAR,FIU,reporting obligation'],

    ['FATF-R21', 'Tipping-off and confidentiality',
      'Financial institutions and their directors, officers, and employees should be: (a) protected by law from criminal and civil liability for breach of any restriction on disclosure of information imposed by contract or by any legislative, regulatory, or administrative provision, if they report their suspicions in good faith to the FIU, even if they did not know precisely what the underlying criminal activity was, and regardless of whether illegal activity actually occurred; and (b) prohibited by law from disclosing (tipping-off) the fact that an STR or related information is being filed with the FIU.',
      'D. Preventive Measures', 'STR', 'tipping-off,confidentiality,safe harbour,protection from liability'],

    ['FATF-R22', 'DNFBPs: customer due diligence',
      'The CDD and record-keeping requirements set out in Recommendations 10, 11, 12, 15, and 17 apply to designated non-financial businesses and professions (DNFBPs) in the following situations: (a) casinos when customers engage in transactions equal to or above USD/EUR 3,000; (b) real estate agents when they are involved in transactions for buying or selling of real estate; (c) dealers in precious metals and stones when they engage in cash transactions equal to or above USD/EUR 15,000; (d) lawyers, notaries, accountants, and other independent legal professionals when they prepare for or carry out transactions involving buying and selling of real estate, managing client money, creating or managing legal persons or arrangements, and buying and selling of business entities; (e) trust and company service providers when they prepare for or carry out specified transactions.',
      'D. Preventive Measures', 'DNFBPs', 'DNFBPs,casinos,real estate agents,lawyers,accountants,trust service providers'],

    ['FATF-R23', 'DNFBPs: other measures',
      'The requirements set out in Recommendations 18 to 21 apply to all designated non-financial businesses and professions, subject to the following qualifications: (a) Lawyers, notaries, other independent legal professionals, and accountants should be required to report suspicious transactions when they engage in a financial transaction on behalf of a client in the activities described in Recommendation 22. Countries are strongly encouraged to extend the reporting requirement to the rest of the professional activities of accountants. (b) Dealers in precious metals and dealers in precious stones should report suspicious transactions when engaged in any cash transaction equal to or above USD/EUR 15,000. (c) Trust and company service providers should be required to report suspicious transactions.',
      'D. Preventive Measures', 'DNFBPs', 'DNFBPs,reporting obligations,lawyers,accountants,precious metals,trust providers'],

    // Transparency and Beneficial Ownership (R24-R25)
    ['FATF-R24', 'Transparency and beneficial ownership of legal persons',
      'Countries should take measures to prevent the misuse of legal persons for money laundering or terrorist financing. Countries should ensure that there is adequate, accurate, and up-to-date information on the beneficial ownership and control of legal persons that can be obtained or accessed in a timely fashion by competent authorities, including information on: the legal owner(s) and any person exercising control through ownership interest; the natural person(s) who exercise control of the legal person through other means; and where no natural person is identified, the relevant natural person who holds the position of senior managing official. Countries should use one or more of the following mechanisms: (a) a registry of beneficial ownership held by the company; (b) a central registry; (c) an existing information mechanism. Countries should assess the ML/TF risks associated with all types of legal persons created in the country.',
      'E. Transparency and Beneficial Ownership', 'Legal Persons', 'beneficial ownership,transparency,legal persons,company registry,UBO'],

    ['FATF-R25', 'Transparency and beneficial ownership of legal arrangements',
      'Countries should take measures to prevent the misuse of legal arrangements for money laundering or terrorist financing. Countries should ensure that there is adequate, accurate, and up-to-date information on express trusts, including information on the settlor, trustee(s), protector (if any), beneficiaries or class of beneficiaries, and any other natural person exercising ultimate effective control over the trust. Countries should require trustees of any express trust governed under their law to hold adequate, accurate, and current beneficial ownership information regarding the trust. Countries should require trustees to disclose their status to financial institutions and DNFBPs when forming a business relationship or carrying out an occasional transaction above the threshold.',
      'E. Transparency and Beneficial Ownership', 'Legal Arrangements', 'beneficial ownership,trusts,legal arrangements,settlor,trustee,protector'],

    // Powers and Responsibilities of Competent Authorities (R26-R35)
    ['FATF-R26', 'Regulation and supervision of financial institutions',
      'Countries should ensure that financial institutions are subject to adequate regulation and supervision and are effectively implementing the FATF Recommendations. Competent authorities or financial supervisors should take the necessary legal or regulatory measures to prevent criminals or their associates from holding, or being the beneficial owner of, a significant or controlling interest, or holding a management function in a financial institution. Countries should ensure that there is a range of effective, proportionate, and dissuasive sanctions available. For the banking sector, the Core Principles for Effective Banking Supervision issued by the Basel Committee on Banking Supervision should apply.',
      'F. Powers and Responsibilities of Competent Authorities', 'Supervision', 'regulation,supervision,fit and proper,sanctions,financial institutions'],

    ['FATF-R27', 'Powers of supervisors',
      'Supervisors should have adequate powers to supervise or monitor, and ensure compliance by, financial institutions with requirements to combat ML/TF, including the authority to: conduct inspections; compel production of any information from financial institutions that is relevant to monitoring compliance; and impose adequate administrative sanctions for failure to comply with the requirements. Supervisors should have the power to impose a range of disciplinary and financial sanctions, including the power to withdraw, restrict, or suspend the financial institution\'s licence.',
      'F. Powers and Responsibilities of Competent Authorities', 'Supervision', 'supervisory powers,inspections,sanctions,licence withdrawal,compliance monitoring'],

    ['FATF-R28', 'Regulation and supervision of DNFBPs',
      'Designated non-financial businesses and professions should be subject to regulatory and supervisory measures. Casinos should be subject to a comprehensive regulatory and supervisory regime that ensures they effectively implement the FATF Recommendations. Countries should ensure that DNFBPs are subject to effective systems for monitoring and ensuring compliance with AML/CFT requirements. This should be performed on a risk-sensitive basis by a supervisor or an appropriate self-regulatory body (SRB), provided that such a body can ensure that its members comply with their obligations to combat money laundering and terrorist financing.',
      'F. Powers and Responsibilities of Competent Authorities', 'Supervision', 'DNFBPs,casinos,self-regulatory bodies,supervisory regime'],

    ['FATF-R29', 'Financial intelligence units',
      'Countries should establish a financial intelligence unit (FIU) that serves as a national centre for the receipt and analysis of: (a) suspicious transaction reports; and (b) other information relevant to money laundering, associated predicate offences, and terrorist financing, and for the dissemination of the results of that analysis. The FIU should be able to obtain and use additional information from reporting entities as needed to properly perform its functions. The FIU should have access, directly or indirectly, on a timely basis, to the financial, administrative, and law enforcement information that it requires to properly undertake its functions, including the analysis of suspicious transaction reports.',
      'F. Powers and Responsibilities of Competent Authorities', 'FIU', 'financial intelligence unit,FIU,analysis,dissemination,STR'],

    ['FATF-R30', 'Responsibilities of law enforcement and investigative authorities',
      'Countries should ensure that designated law enforcement authorities have responsibility for ML/TF investigations. Countries should designate a competent authority to identify, trace, and initiate actions to freeze and seize property that is, or may become, subject to confiscation, or is suspected of being proceeds of crime. Countries should ensure that law enforcement authorities have the ability to use a wide range of investigative techniques, including undercover operations, intercepting communications, accessing computer systems, and controlled delivery, for the investigation of ML, associated predicate offences, and TF.',
      'F. Powers and Responsibilities of Competent Authorities', 'Law Enforcement', 'law enforcement,investigation,undercover operations,confiscation,investigative techniques'],

    ['FATF-R31', 'Powers of law enforcement and investigative authorities',
      'When conducting investigations of money laundering and underlying predicate offences, and terrorist financing, competent authorities should be able to obtain access to all necessary documents and information for use in those investigations, and in prosecutions and related actions. This should include powers to use compulsory measures for the production of records held by financial institutions, DNFBPs, and other natural or legal persons; the search of persons and premises; the taking of witness statements; and the seizure and obtaining of evidence.',
      'F. Powers and Responsibilities of Competent Authorities', 'Law Enforcement', 'compulsory powers,search,seizure,evidence,production orders'],

    ['FATF-R32', 'Cash couriers',
      'Countries should have measures in place to detect the physical cross-border transportation of currency and bearer negotiable instruments, including through a declaration system and/or a disclosure system. Countries should ensure that their competent authorities have the legal authority to stop or restrain currency or bearer negotiable instruments that are suspected to be related to TF, ML, or predicate offences, or that are falsely declared or disclosed. Countries should ensure that effective, proportionate, and dissuasive sanctions are available to deal with persons who make false declaration(s) or disclosure(s).',
      'F. Powers and Responsibilities of Competent Authorities', 'Cash Couriers', 'cash couriers,cross-border transportation,declaration,disclosure,bearer instruments'],

    ['FATF-R33', 'Statistics',
      'Countries should maintain comprehensive statistics on matters relevant to the effectiveness and efficiency of their AML/CFT systems. This should include statistics on STRs received and disseminated; on ML/TF investigations, prosecutions, and convictions; on property frozen, seized, and confiscated; and on mutual legal assistance or other international requests for cooperation. Countries should regularly review the quality and utility of the statistics they maintain.',
      'F. Powers and Responsibilities of Competent Authorities', 'Statistics', 'statistics,effectiveness,STR,prosecutions,convictions,confiscation'],

    ['FATF-R34', 'Guidance and feedback',
      'Competent authorities, supervisors, and SRBs should establish guidelines, and provide feedback, which will assist financial institutions and DNFBPs in applying national measures to combat ML/TF, and in particular, in detecting and reporting suspicious transactions. Such guidance and feedback should include information on current ML/TF techniques, methods, and trends; clarifications on what is expected of them with respect to suspicious transaction reporting; and typologies.',
      'F. Powers and Responsibilities of Competent Authorities', 'Guidance', 'guidance,feedback,typologies,suspicious transactions,best practices'],

    ['FATF-R35', 'Sanctions',
      'Countries should ensure that there is a range of effective, proportionate, and dissuasive sanctions, whether criminal, civil, or administrative, available to deal with natural or legal persons that fail to comply with AML/CFT requirements. Sanctions should be applicable not only to financial institutions and DNFBPs, but also to their directors and senior management.',
      'F. Powers and Responsibilities of Competent Authorities', 'Sanctions', 'sanctions,penalties,enforcement,directors,senior management'],

    // International Cooperation (R36-R40)
    ['FATF-R36', 'International instruments',
      'Countries should take immediate steps to become party to and implement fully the Vienna Convention (1988), the Palermo Convention (2000), the United Nations Convention against Corruption (2003), and the Terrorist Financing Convention (1999). Where applicable, countries are encouraged to ratify and implement other relevant international conventions, such as the Council of Europe Convention on Laundering, Search, Seizure and Confiscation of the Proceeds from Crime and on the Financing of Terrorism (2005), the Inter-American Convention against Terrorism (2002), and the Council of Europe Convention on Laundering, Search, Seizure and Confiscation of the Proceeds from Crime (1990).',
      'G. International Cooperation', 'Treaties', 'international instruments,Vienna Convention,Palermo Convention,UNCAC,ratification'],

    ['FATF-R37', 'Mutual legal assistance',
      'Countries should rapidly, constructively, and effectively provide the widest possible range of mutual legal assistance in relation to ML/TF, and associated predicate offences. Countries should have an adequate legal basis for providing assistance and, where appropriate, should have in place treaties, arrangements, or other mechanisms to enhance cooperation. Countries should not prohibit or place unreasonable or unduly restrictive conditions on the provision of MLA. In particular, countries should not refuse to execute a request for MLA on the sole ground that the offence is also considered to involve fiscal matters, or on grounds of secrecy or confidentiality requirements on financial institutions or DNFBPs.',
      'G. International Cooperation', 'MLA', 'mutual legal assistance,MLA,cooperation,dual criminality,fiscal matters'],

    ['FATF-R38', 'Mutual legal assistance: freezing and confiscation',
      'Countries should ensure that they have the authority to take expeditious action in response to requests by foreign countries to identify, freeze, seize, and confiscate: property laundered; proceeds from or instrumentalities used in or intended for use in ML or predicate offences; property of corresponding value; or property used in or intended for the financing of terrorism. This authority should include being able to respond to requests made on the basis of non-conviction based confiscation proceedings and related provisional measures. Countries should also have effective mechanisms for managing and, when necessary, disposing of, property that is frozen, seized, or confiscated.',
      'G. International Cooperation', 'Confiscation', 'mutual legal assistance,freezing,confiscation,asset recovery,non-conviction based'],

    ['FATF-R39', 'Extradition',
      'Countries should constructively and effectively execute extradition requests in relation to ML and TF without undue delay. Countries should also take all possible measures to ensure that they do not provide safe havens for individuals charged with the financing of terrorism, terrorist acts, or terrorist organisations. Countries should have clear and efficient processes for the timely execution of extradition requests including prioritisation as appropriate. Where countries do not extradite their own nationals, they should, at the request of the country seeking extradition, submit the case without undue delay to their competent authorities for the purpose of prosecution of the offences set out in the request.',
      'G. International Cooperation', 'Extradition', 'extradition,safe havens,prosecution,own nationals,dual criminality'],

    ['FATF-R40', 'Other forms of international cooperation',
      'Countries should ensure that their competent authorities can rapidly, constructively, and effectively provide the widest range of international cooperation in relation to ML, associated predicate offences, and TF. Countries should permit their competent authorities to exchange information indirectly with foreign counterparts through channels such as the Egmont Group. Competent authorities should have clear and efficient gateways, mechanisms, or channels for transmitting and executing requests for information and other types of assistance. Countries should use their FIU, or other appropriate competent authority, as a channel for transmitting and executing requests for information and other types of international cooperation. Countries should not refuse requests for cooperation on the sole ground that the request involves fiscal matters.',
      'G. International Cooperation', 'Cooperation', 'international cooperation,Egmont Group,information exchange,FIU,gateways'],
  ];

  for (const [ref, title, content, chapter, part, keywords] of recs) {
    insertProv.run(srcId, ref, title, content, chapter, part, keywords);
  }

  console.log('    FATF: 1 source, 40 recommendations');
}
