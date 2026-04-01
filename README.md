# Anti-Corruption and AML MCP

Anti-Corruption and AML MCP -- FATF, UNCAC, OECD Anti-Bribery, EU AML Directives, Wolfsberg Group, and GRECO regulatory intelligence via Model Context Protocol.

## Public Endpoint (Streamable HTTP)

Connect from any MCP client (Claude Desktop, ChatGPT, Cursor, VS Code, GitHub Copilot):

```
https://mcp.ansvar.eu/anti-corruption-aml/mcp
```

**Claude Code:**
```bash
claude mcp add anti-corruption-aml --transport http https://mcp.ansvar.eu/anti-corruption-aml/mcp
```

**Claude Desktop / Cursor** (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "anti-corruption-aml": {
      "type": "url",
      "url": "https://mcp.ansvar.eu/anti-corruption-aml/mcp"
    }
  }
}
```

No authentication required.

## What's Included

| Source | Items | Status |
|--------|-------|--------|
| FATF 40 Recommendations (2012, updated 2023) | 40 recommendations | Full text |
| UN Convention against Corruption (UNCAC, 2003) | 33 articles | Key provisions |
| OECD Anti-Bribery Convention (1997) | 13 articles | Full text |
| EU AML Directives (4AMLD, 5AMLD, 6AMLD, AMLR) | 26 provisions | Key articles across 4 instruments |
| Wolfsberg Group Standards | 8 standards | Correspondent banking, private banking, CBDDQ, trade finance |
| FATF Grey/Black List Country Ratings | 26 jurisdictions | Current listing status and deficiencies |
| FATF Mutual Evaluations | 10 countries | Effectiveness and technical compliance ratings |
| GRECO Evaluation Rounds (Council of Europe) | 11 provisions | Rounds 3-5 themes and recommendations |

## What's NOT Included

| Gap | Reason |
|-----|--------|
| Country-specific AML legislation | Use the relevant country law MCP (119 jurisdictions available) |
| FATF mutual evaluation full reports | Summaries and ratings only -- full reports are 200+ pages each |
| Sanctions lists (OFAC, EU, UN) | Use the sanctions-law MCP |
| Egmont Group intelligence reports | Restricted distribution -- not publicly available |
| National FIU annual reports | Not systematically published in machine-readable form |

## Available Tools

See [TOOLS.md](TOOLS.md) for full documentation.

| Tool | Description |
|------|-------------|
| `search_aml_requirements` | Full-text search across all AML/anti-corruption provisions |
| `get_fatf_recommendation` | Retrieve a specific FATF Recommendation by number (1-40) |
| `get_fatf_country_rating` | Get FATF grey/black list status for a country |
| `get_fatf_mutual_evaluation` | Get mutual evaluation results with effectiveness ratings |
| `get_directive_article` | Retrieve an article from an EU AML Directive or other source |
| `get_wolfsberg_standard` | Retrieve Wolfsberg Group standards by title or category |
| `assess_aml_risk` | Assess AML risk factors for a jurisdiction, optionally by sector |
| `map_aml_obligations` | Map AML obligations for a jurisdiction and entity type |
| `compare_aml_regimes` | Compare AML frameworks and FATF ratings across jurisdictions |
| `list_sources` | List all data sources with provision counts |
| `check_data_freshness` | Check database build date and staleness |
| `about` | Server metadata, coverage summary, and data disclaimer |

## Data Sources and Freshness

All data is sourced from authoritative publications (FATF, UNODC, OECD, EU Official Journal, Wolfsberg Group, Council of Europe/GRECO). Use the `check_data_freshness` tool to verify currency. See [COVERAGE.md](COVERAGE.md) for detailed coverage information.

## Disclaimer

This MCP provides reference data only -- not professional legal advice. Always verify critical findings against authoritative sources. See [DISCLAIMER.md](DISCLAIMER.md).

## Ansvar MCP Network

Part of the [Ansvar MCP Network](https://ansvar.eu/open-law) -- 276+ specialist MCP servers covering 119 countries, 61 EU regulations, 262 security frameworks, 116 sector regulators, and 50+ domain-specific databases.

All endpoints: [mcp-remote-access.md](https://github.com/Ansvar-Systems/Ansvar-Architecture-Documentation/blob/main/docs/mcp-remote-access.md)

## License

Apache-2.0. See [LICENSE](LICENSE).
