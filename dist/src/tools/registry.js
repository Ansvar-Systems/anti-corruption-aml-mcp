import { searchAmlRequirements } from './search-aml-requirements.js';
import { getFatfRecommendation } from './get-fatf-recommendation.js';
import { getFatfCountryRating } from './get-fatf-country-rating.js';
import { getFatfMutualEvaluation } from './get-fatf-mutual-evaluation.js';
import { getDirectiveArticle } from './get-directive-article.js';
import { listSources } from './list-sources.js';
import { about } from './about.js';
import { checkDataFreshness } from './check-data-freshness.js';
import { assessAmlRisk } from './assess-aml-risk.js';
import { mapAmlObligations } from './map-aml-obligations.js';
import { getWolfsbergStandard } from './get-wolfsberg-standard.js';
import { compareAmlRegimes } from './compare-aml-regimes.js';
export const TOOL_DEFINITIONS = [
    {
        name: 'search_aml_requirements',
        description: 'Full-text search across all AML/anti-corruption provisions (FATF, UNCAC, OECD, EU AMLDs, Wolfsberg, GRECO)',
        inputSchema: {
            type: 'object',
            properties: {
                query: { type: 'string', description: 'Search query (e.g., "beneficial ownership", "customer due diligence")' },
                source_type: { type: 'string', enum: ['treaty', 'recommendation', 'directive', 'regulation', 'standard'], description: 'Filter by source type' },
                limit: { type: 'number', description: 'Max results (default 10)' },
            },
            required: ['query'],
        },
    },
    {
        name: 'get_fatf_recommendation',
        description: 'Retrieve a specific FATF Recommendation by number (1-40)',
        inputSchema: {
            type: 'object',
            properties: {
                number: { type: 'number', description: 'FATF Recommendation number (1-40)' },
            },
            required: ['number'],
        },
    },
    {
        name: 'get_fatf_country_rating',
        description: 'Get FATF grey/black list status for a country',
        inputSchema: {
            type: 'object',
            properties: {
                country: { type: 'string', description: 'Country name or ISO 3166-1 alpha-2 code' },
            },
            required: ['country'],
        },
    },
    {
        name: 'get_fatf_mutual_evaluation',
        description: 'Get FATF mutual evaluation results for a country, including effectiveness and technical compliance ratings',
        inputSchema: {
            type: 'object',
            properties: {
                country: { type: 'string', description: 'Country name or ISO 3166-1 alpha-2 code' },
            },
            required: ['country'],
        },
    },
    {
        name: 'get_directive_article',
        description: 'Retrieve a specific article from an EU AML Directive or other source document',
        inputSchema: {
            type: 'object',
            properties: {
                directive: { type: 'string', description: 'Directive identifier (e.g., "4AMLD", "5AMLD", "6AMLD", "UNCAC", "OECD Anti-Bribery")' },
                article: { type: 'string', description: 'Optional article number (e.g., "Art. 13", "Article 5")' },
            },
            required: ['directive'],
        },
    },
    {
        name: 'list_sources',
        description: 'List all available data sources with provision counts',
        inputSchema: {
            type: 'object',
            properties: {},
        },
    },
    {
        name: 'about',
        description: 'Server metadata, coverage summary, and data disclaimer',
        inputSchema: {
            type: 'object',
            properties: {},
        },
    },
    {
        name: 'check_data_freshness',
        description: 'Check when the database was last built and whether data may be stale',
        inputSchema: {
            type: 'object',
            properties: {},
        },
    },
    {
        name: 'assess_aml_risk',
        description: 'Assess AML risk factors for a jurisdiction, optionally filtered by sector',
        inputSchema: {
            type: 'object',
            properties: {
                jurisdiction: { type: 'string', description: 'Country name or ISO code' },
                sector: { type: 'string', description: 'Optional sector filter (e.g., "banking", "real estate", "crypto", "DNFBP")' },
            },
            required: ['jurisdiction'],
        },
    },
    {
        name: 'map_aml_obligations',
        description: 'Map AML/anti-corruption obligations applicable to a jurisdiction and entity type',
        inputSchema: {
            type: 'object',
            properties: {
                jurisdiction: { type: 'string', description: 'ISO 3166-1 alpha-2 country code' },
                entity_type: { type: 'string', description: 'Entity type (e.g., "bank", "DNFBP", "crypto exchange", "law firm", "real estate agent")' },
            },
            required: ['jurisdiction'],
        },
    },
    {
        name: 'get_wolfsberg_standard',
        description: 'Retrieve Wolfsberg Group standards by title or category',
        inputSchema: {
            type: 'object',
            properties: {
                title: { type: 'string', description: 'Standard title keyword (e.g., "correspondent banking", "private banking")' },
                category: { type: 'string', description: 'Category filter (e.g., "aml", "sanctions", "trade_finance", "payments")' },
            },
        },
    },
    {
        name: 'compare_aml_regimes',
        description: 'Compare AML frameworks and FATF ratings between multiple jurisdictions',
        inputSchema: {
            type: 'object',
            properties: {
                jurisdictions: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'List of country names or ISO codes to compare (e.g., ["US", "GB", "DE"])',
                },
            },
            required: ['jurisdictions'],
        },
    },
];
export function handleToolCall(db, name, args) {
    switch (name) {
        case 'search_aml_requirements':
            return searchAmlRequirements(db, args);
        case 'get_fatf_recommendation':
            return getFatfRecommendation(db, args);
        case 'get_fatf_country_rating':
            return getFatfCountryRating(db, args);
        case 'get_fatf_mutual_evaluation':
            return getFatfMutualEvaluation(db, args);
        case 'get_directive_article':
            return getDirectiveArticle(db, args);
        case 'list_sources':
            return listSources(db);
        case 'about':
            return about(db);
        case 'check_data_freshness':
            return checkDataFreshness(db);
        case 'assess_aml_risk':
            return assessAmlRisk(db, args);
        case 'map_aml_obligations':
            return mapAmlObligations(db, args);
        case 'get_wolfsberg_standard':
            return getWolfsbergStandard(db, args);
        case 'compare_aml_regimes':
            return compareAmlRegimes(db, args);
        default:
            throw new Error(`Unknown tool: ${name}`);
    }
}
