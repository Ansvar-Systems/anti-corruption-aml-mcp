# Coverage — Anti-Corruption & AML MCP

> Last verified: 2026-02-28 | Database version: 0.1.0

## What's Included

| Source | Authority | Items | Last Refresh | Completeness | Refresh |
|--------|-----------|------:|-------------|-------------|---------|
| FATF 40 Recommendations (2012, updated 2023) | Financial Action Task Force (FATF) | 40 | 2026-02-28 | Full | On change |
| United Nations Convention against Corruption | UNODC | 33 | 2026-02-28 | Partial | On change |
| OECD Anti-Bribery Convention | OECD | 13 | 2026-02-28 | Full | On change |
| Fourth Anti-Money Laundering Directive (4AMLD) | European Union | 8 | 2026-02-28 | Partial | On change |
| Fifth Anti-Money Laundering Directive (5AMLD) | European Union | 5 | 2026-02-28 | Partial | On change |
| Sixth Anti-Money Laundering Directive (6AMLD) | European Union | 6 | 2026-02-28 | Partial | On change |
| EU AML Regulation 2024 (AMLR) | European Union | 7 | 2026-02-28 | Partial | On change |
| GRECO Evaluation Reports | Council of Europe | 11 | 2026-02-28 | Partial | Quarterly |
| Wolfsberg Group Standards | Wolfsberg Group | 8 | 2026-02-28 | Partial | On change |
| FATF Country Ratings (Grey/Black Lists) | FATF | 26 | 2026-02-28 | Full | Quarterly |
| FATF Mutual Evaluations | FATF | 10 | 2026-02-28 | Partial | On change |

**Total:** 12 tools, 11 sources, 175 items, ~256 KB database

## What's NOT Included

| Gap | Reason | Planned? |
|-----|--------|----------|
| UNCAC includes key provisions only, not all 71 articles | Full treaty text is lengthy; key provisions selected for compliance relevance | Yes (v0.2) |
| EU AML Directives include key articles only, not complete directive text | Complete directive text is covered by comprehensive-eu-law-mcp | No |
| Only 10 country mutual evaluations included | FATF has evaluated 200+ jurisdictions; expanding in future versions | Yes (v0.2) |
| Wolfsberg standards include key requirements, not full standard text | Full standards are lengthy; key requirements extracted | Yes (v0.2) |
| GRECO data covers evaluation round themes, not per-country reports | Per-country GRECO reports are numerous and frequently updated | Yes (v0.3) |

## Limitations

- Data is a **snapshot** — sources update independently, and there may be a delay between upstream changes and database refresh
- FATF mutual evaluations are partial — 10 countries only; FATF has evaluated 200+ jurisdictions
- UNCAC and OECD Convention coverage is selective — key provisions only, not full treaty text
- EU AML Directives are abbreviated — full texts available through comprehensive-eu-law-mcp for detailed legal research
- GRECO data is thematic — evaluation round frameworks only, not individual country reports
- Wolfsberg standards are summarized — key requirements extracted for reference; consult official sources for implementation details
- This is a **reference tool, not professional legal or compliance advice** — verify critical risk assessments against authoritative FATF or competent authority sources

## Data Freshness

| Source | Refresh Schedule | Last Refresh | Freshness Window |
|--------|-----------------|-------------|------------------|
| FATF Recommendations | On change | 2026-02-28 | — |
| UNCAC | On change | 2026-02-28 | — |
| OECD Anti-Bribery | On change | 2026-02-28 | — |
| EU AML Directives | On change | 2026-02-28 | — |
| EU AMLR | On change | 2026-02-28 | — |
| GRECO | Quarterly | 2026-02-28 | 90 days |
| Wolfsberg | On change | 2026-02-28 | — |
| FATF Country Ratings | Quarterly | 2026-02-28 | 90 days |
| FATF Mutual Evaluations | On change | 2026-02-28 | — |

To check freshness programmatically, call the `check_data_freshness` tool.

To trigger a manual refresh:
```
gh workflow run ingest.yml --repo Ansvar-Systems/anti-corruption-aml-mcp -f force=true
```
