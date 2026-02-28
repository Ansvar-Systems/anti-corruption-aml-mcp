import { seedFatfRecommendations } from './data/fatf-recommendations.js';
import { seedUncac } from './data/uncac.js';
import { seedOecdAntiBribery } from './data/oecd-anti-bribery.js';
import { seedEuAmld } from './data/eu-amld.js';
import { seedWolfsberg } from './data/wolfsberg.js';
import { seedFatfCountryLists } from './data/fatf-country-lists.js';
import { seedFatfMutualEvaluations } from './data/fatf-mutual-evaluations.js';
import { seedGreco } from './data/greco.js';
export function seedData(db) {
    console.log('\nSeeding data...');
    seedFatfRecommendations(db);
    seedUncac(db);
    seedOecdAntiBribery(db);
    seedEuAmld(db);
    seedWolfsberg(db);
    seedFatfCountryLists(db);
    seedFatfMutualEvaluations(db);
    seedGreco(db);
    console.log('\nSeed data complete.');
}
