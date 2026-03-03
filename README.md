# Anti-Corruption & AML MCP

> Structured access to anti-corruption and anti-money laundering regulatory intelligence — FATF 40 Recommendations, UNCAC, OECD Anti-Bribery Convention, EU AML Directives, Wolfsberg Group standards, and GRECO evaluations.

[![npm](https://img.shields.io/npm/v/@ansvar/anti-corruption-aml-mcp)](https://www.npmjs.com/package/@ansvar/anti-corruption-aml-mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)
[![CI](https://github.com/Ansvar-Systems/anti-corruption-aml-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/Ansvar-Systems/anti-corruption-aml-mcp/actions/workflows/ci.yml)

## Quick Start

### Remote (Vercel)

Use the hosted endpoint — no installation needed:

**Claude Desktop** (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "anti-corruption-aml": {
      "url": "https://anti-corruption-aml-mcp.vercel.app/mcp"
    }
  }
}
```

**Cursor / VS Code** (`.cursor/mcp.json` or `.vscode/mcp.json`):
```json
{
  "servers": {
    "anti-corruption-aml": {
      "url": "https://anti-corruption-aml-mcp.vercel.app/mcp"
    }
  }
}
```

### Local (npm)

Run entirely on your machine:

```bash
npx @ansvar/anti-corruption-aml-mcp
```

**Claude Desktop** (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "anti-corruption-aml": {
      "command": "npx",
      "args": ["-y", "@ansvar/anti-corruption-aml-mcp"]
    }
  }
}
```

## What's Included

| Source | Authority | Items | Completeness |
|--------|-----------|------:|-------------|
| FATF 40 Recommendations | FATF | 40 | Full |
| UNCAC (2003) | UNODC | 33 | Partial (key provisions) |
| OECD Anti-Bribery Convention (1997) | OECD | 13 | Full |
| 4AMLD (EU 2015/849) | European Union | 8 | Partial (key articles) |
| 5AMLD (EU 2018/843) | European Union | 5 | Partial (key amendments) |
| 6AMLD (EU 2018/1673) | European Union | 6 | Partial (key articles) |
| AMLR 2024 (EU 2024/1624) | European Union | 7 | Partial (key articles) |
| GRECO Evaluations | Council of Europe | 11 | Partial |
| Wolfsberg Standards | Wolfsberg Group | 8 | Partial (key requirements) |
| FATF Country Ratings | FATF | 26 | Full (grey/black lists) |
| FATF Mutual Evaluations | FATF | 10 | Partial |

**Total:** 175 records across 8 sources + 26 country ratings + 10 mutual evaluations + 8 Wolfsberg standards, 256KB database

## What's NOT Included

- Full text of all 71 UNCAC articles (key provisions only)
- Complete EU AML Directive articles (key provisions — full text in `comprehensive-eu-law-mcp`)
- Per-country GRECO evaluation reports (round themes and key recommendations only)
- Full Wolfsberg standard documents (key requirements extracted)
- All 200+ FATF mutual evaluations (10 selected countries)

## Available Tools

| Tool | Category | Description |
|------|----------|-------------|
| `search_aml_requirements` | Search | FTS5 search across all AML/anti-corruption provisions |
| `get_fatf_recommendation` | Lookup | Get a specific FATF Recommendation by number (1-40) |
| `get_fatf_country_rating` | Lookup | Get FATF grey/black list status for a country |
| `get_fatf_mutual_evaluation` | Lookup | Get FATF mutual evaluation results for a country |
| `get_directive_article` | Lookup | Get articles from EU AML Directives or other sources |
| `get_wolfsberg_standard` | Lookup | Get Wolfsberg standards by title or category |
| `assess_aml_risk` | Analysis | Assess AML risk for a jurisdiction with sector filter |
| `map_aml_obligations` | Analysis | Map applicable AML frameworks for a jurisdiction/entity |
| `compare_aml_regimes` | Analysis | Compare FATF ratings across multiple jurisdictions |
| `list_sources` | Meta | List all sources with provision counts |
| `about` | Meta | Server identity and stats |
| `check_data_freshness` | Meta | Database build date and record counts |

See [TOOLS.md](TOOLS.md) for full documentation with parameters and examples.

## Data Sources & Freshness

All data is sourced from authoritative international bodies:

| Source | Refresh Schedule | Last Refresh |
|--------|-----------------|-------------|
| FATF Recommendations | On change | 2026-02-28 |
| UNCAC | On change | 2026-02-28 |
| OECD Anti-Bribery | On change | 2026-02-28 |
| EU AML Directives | On change | 2026-02-28 |
| Wolfsberg Standards | On change | 2026-02-28 |
| GRECO Evaluations | Quarterly | 2026-02-28 |
| FATF Country Ratings | Quarterly | 2026-02-28 |
| FATF Mutual Evaluations | On change | 2026-02-28 |

Check freshness programmatically with the `check_data_freshness` tool.

## Security

| Layer | Tool | Trigger |
|-------|------|---------|
| Static Analysis | CodeQL | Weekly + PR |
| Pattern Detection | Semgrep | PR |
| Dependency Scan | Trivy | Weekly |
| Secret Detection | Gitleaks | PR |
| Supply Chain | OSSF Scorecard | Weekly |
| Dependencies | Dependabot | Weekly |

## Disclaimer

**This is NOT legal or compliance advice.** This tool provides structured access to AML/anti-corruption regulatory data for informational and research purposes only. FATF country ratings change between plenary meetings. EU directives require national transposition. Always verify critical data against authoritative sources and consult qualified legal counsel. See [DISCLAIMER.md](DISCLAIMER.md).

## Ansvar MCP Network

This server is part of the **Ansvar MCP Network** — 150+ MCP servers providing structured access to global legislation, compliance frameworks, and cybersecurity standards.

| Category | Servers | Examples |
|----------|---------|---------|
| EU Regulations | 1 | 49 regulations, 2,693 articles |
| US Regulations | 1 | 15 federal + state laws |
| National Law | 108+ | All EU/EEA + 30 global jurisdictions |
| Security Frameworks | 1 | 261 frameworks, 1,451 controls |
| Domain Intelligence | 6+ | Financial regulation, cybersecurity law, health law |

Explore the full network at [ansvar.ai/mcp](https://ansvar.ai/mcp)

## Development

### Branch Strategy

```
feature-branch -> PR to dev -> verify on dev -> PR to main -> deploy
```

Never push directly to `main`. All changes land on `dev` first.

### Setup

```bash
git clone https://github.com/Ansvar-Systems/anti-corruption-aml-mcp.git
cd anti-corruption-aml-mcp
npm install
npm run build:db
npm run build
npm test
```

### Data Pipeline

```bash
npm run ingest          # Full live ingestion
npm run build:db        # Rebuild database from seed files
npm run freshness:check # Check source freshness
npm run coverage:verify # Verify coverage consistency
npm run test:contract   # Run golden contract tests
```

## License

[Apache License 2.0](LICENSE) — Code and tooling.

**Data licenses:** Regulatory data is sourced from official publications by FATF, UNODC, OECD, European Union, Council of Europe, and Wolfsberg Group. Verify redistribution terms with each authority before bulk replication. See [sources.yml](sources.yml) for details.
