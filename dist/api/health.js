export default function handler(req, res) {
    const info = {
        status: 'ok',
        server: 'anti-corruption-aml-mcp',
        version: '0.1.0',
        git_sha: process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || 'unknown',
        uptime_seconds: Math.floor(process.uptime()),
        build_timestamp: process.env.VERCEL_DEPLOYMENT_CREATED_AT || 'unknown',
        data_freshness: {
            last_ingested: '2026-02-28',
            source_count: 14,
        },
        capabilities: [
            'fatf_recommendations', 'fatf_country_ratings', 'fatf_mutual_evaluations',
            'uncac', 'oecd_anti_bribery', 'eu_4amld', 'eu_5amld', 'eu_6amld',
            'wolfsberg_standards', 'greco_reports',
        ],
        tier: 'free',
    };
    if (req.url?.includes('/version')) {
        return res.status(200).json({
            ...info,
            node_version: process.version,
            transport: ['stdio', 'streamable-http'],
            mcp_sdk_version: '1.12.1',
            repo_url: 'https://github.com/Ansvar-Systems/anti-corruption-aml-mcp',
            report_issue_url: 'https://github.com/Ansvar-Systems/anti-corruption-aml-mcp/issues/new',
        });
    }
    return res.status(200).json(info);
}
