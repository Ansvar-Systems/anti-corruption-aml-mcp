# Tools — Anti-Corruption & AML MCP

12 tools for searching, analyzing, and retrieving anti-corruption and AML regulatory intelligence.

---

## 1. search_aml_requirements

Full-text search across all AML/anti-corruption provisions (FATF, UNCAC, OECD, EU AMLDs, Wolfsberg, GRECO).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | string | Yes | Search query (e.g., "beneficial ownership", "customer due diligence") |
| `source_type` | string | No | Filter by source type: `treaty`, `recommendation`, `directive`, `regulation`, `standard` |
| `limit` | number | No | Max results (default 10) |

**Returns:** Matching provisions with source context, document metadata, and relevance ranking.

**Example:**
```json
{
  "query": "beneficial ownership",
  "count": 8,
  "results": [
    {
      "id": 45,
      "source_id": 1,
      "provision_ref": "R24",
      "title": "Transparency and beneficial ownership of legal persons",
      "content": "Countries should take measures to...",
      "source_title": "FATF Recommendations...",
      "short_title": "FATF 40 Recommendations",
      "source_type": "recommendation",
      "organization": "FATF"
    }
  ],
  "_meta": { "disclaimer": "...", "data_source": "...", "data_age": "..." }
}
```

---

## 2. get_fatf_recommendation

Retrieve a specific FATF Recommendation by number (1-40).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `number` | number | Yes | FATF Recommendation number (1-40) |

**Returns:** Full recommendation text with provision reference and metadata.

**Example:**
```json
{
  "recommendation": {
    "id": 10,
    "source_id": 1,
    "provision_ref": "R10",
    "title": "Customer due diligence",
    "content": "Financial institutions should be prohibited from keeping anonymous accounts..."
  },
  "_meta": { "disclaimer": "...", "data_source": "...", "data_age": "..." }
}
```

---

## 3. get_fatf_country_rating

Get FATF grey/black list status for a country.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `country` | string | Yes | Country name or ISO 3166-1 alpha-2 code |

**Returns:** Country rating with list status (`grey`, `black`, `monitored`, `cleared`), listing date, deficiencies, and action plan. Returns null if the country is not on any FATF list.

**Example:**
```json
{
  "rating": {
    "id": 1,
    "country_code": "MM",
    "country_name": "Myanmar",
    "list_status": "black",
    "listing_date": "2022-10-21",
    "deficiencies": "Significant strategic deficiencies...",
    "action_plan": "..."
  },
  "_meta": { "disclaimer": "...", "data_source": "...", "data_age": "..." }
}
```

---

## 4. get_fatf_mutual_evaluation

Get FATF mutual evaluation results for a country, including effectiveness and technical compliance ratings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `country` | string | Yes | Country name or ISO 3166-1 alpha-2 code |

**Returns:** Evaluation results with overall rating, effectiveness ratings, technical compliance, key findings, and assessor. Returns null if no evaluation found.

**Example:**
```json
{
  "evaluation": {
    "country_code": "US",
    "country_name": "United States",
    "evaluation_date": "2016-12-01",
    "assessor": "FATF",
    "overall_rating": "Compliant / Largely Compliant",
    "effectiveness_ratings": "...",
    "technical_compliance": "...",
    "key_findings": "..."
  },
  "_meta": { "disclaimer": "...", "data_source": "...", "data_age": "..." }
}
```

---

## 5. get_directive_article

Retrieve a specific article from an EU AML Directive or other source document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `directive` | string | Yes | Directive identifier (e.g., "4AMLD", "5AMLD", "6AMLD", "UNCAC", "OECD Anti-Bribery") |
| `article` | string | No | Article number (e.g., "Art. 13", "Article 5"). Omit to get all articles. |

**Returns:** Source metadata and matching provisions. Returns all provisions for the source if no article is specified.

**Example:**
```json
{
  "source": {
    "id": 4,
    "title": "Directive (EU) 2015/849...",
    "short_title": "4AMLD",
    "source_type": "directive",
    "organization": "European Union"
  },
  "provisions": [
    {
      "id": 62,
      "provision_ref": "Art. 13",
      "title": "Customer due diligence measures",
      "content": "..."
    }
  ],
  "count": 1,
  "_meta": { "disclaimer": "...", "data_source": "...", "data_age": "..." }
}
```

---

## 6. get_wolfsberg_standard

Retrieve Wolfsberg Group standards by title or category.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `title` | string | No | Standard title keyword (e.g., "correspondent banking", "private banking") |
| `category` | string | No | Category filter (e.g., "aml", "sanctions", "trade_finance", "payments") |

**Returns:** Matching Wolfsberg standards with title, version, publication date, category, content, and key requirements. Returns all standards if no filters are provided.

**Example:**
```json
{
  "standards": [
    {
      "id": 1,
      "title": "Wolfsberg Correspondent Banking Principles",
      "version": "2014",
      "publication_date": "2014-06-01",
      "category": "aml",
      "content": "...",
      "key_requirements": "..."
    }
  ],
  "count": 1,
  "_meta": { "disclaimer": "...", "data_source": "...", "data_age": "..." }
}
```

---

## 7. assess_aml_risk

Assess AML risk factors for a jurisdiction, optionally filtered by sector.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `jurisdiction` | string | Yes | Country name or ISO code |
| `sector` | string | No | Sector filter (e.g., "banking", "real estate", "crypto", "DNFBP") |

**Returns:** Risk level (`standard`, `elevated`, `high`, `prohibited`), risk factors, FATF rating, mutual evaluation summary, and sector-specific FATF recommendations.

**Example:**
```json
{
  "jurisdiction": "MM",
  "sector": "banking",
  "risk_level": "prohibited",
  "risk_factors": [
    "Country is on FATF black list (call for action)"
  ],
  "fatf_rating": { "list_status": "black", "..." : "..." },
  "mutual_evaluation_summary": null,
  "applicable_recommendations": [],
  "_meta": { "disclaimer": "...", "data_source": "...", "data_age": "..." }
}
```

---

## 8. map_aml_obligations

Map AML/anti-corruption obligations applicable to a jurisdiction and entity type.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `jurisdiction` | string | Yes | ISO 3166-1 alpha-2 country code |
| `entity_type` | string | No | Entity type (e.g., "bank", "DNFBP", "crypto exchange", "law firm", "real estate agent") |

**Returns:** List of applicable frameworks (FATF always, UNCAC for UN members, EU AMLDs for EU/EEA, OECD for OECD members) and entity-specific obligations from FTS search.

**Example:**
```json
{
  "jurisdiction": "DE",
  "entity_type": "bank",
  "applicable_frameworks": [
    { "short_title": "FATF 40 Recommendations", "provision_count": 40 },
    { "short_title": "UNCAC", "provision_count": 33 },
    { "short_title": "4AMLD", "provision_count": 8 },
    { "short_title": "OECD Anti-Bribery Convention", "provision_count": 13 }
  ],
  "entity_obligations": [],
  "_meta": { "disclaimer": "...", "data_source": "...", "data_age": "..." }
}
```

---

## 9. compare_aml_regimes

Compare AML frameworks and FATF ratings between multiple jurisdictions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `jurisdictions` | string[] | Yes | List of country names or ISO codes (e.g., ["US", "GB", "DE"]) |

**Returns:** Side-by-side comparison of FATF list status, mutual evaluation results, effectiveness ratings, and deficiencies for each jurisdiction.

**Example:**
```json
{
  "comparison": [
    {
      "jurisdiction": "US",
      "fatf_list_status": "not listed",
      "mutual_evaluation": {
        "evaluation_date": "2016-12-01",
        "overall_rating": "Compliant / Largely Compliant"
      },
      "deficiencies": null
    },
    {
      "jurisdiction": "MM",
      "fatf_list_status": "black",
      "mutual_evaluation": null,
      "deficiencies": "Significant strategic deficiencies..."
    }
  ],
  "jurisdiction_count": 2,
  "_meta": { "disclaimer": "...", "data_source": "...", "data_age": "..." }
}
```

---

## 10. list_sources

List all available data sources with provision counts and metadata.

**Returns:** All sources with provision counts, plus totals for provisions, FATF country ratings, mutual evaluations, and Wolfsberg standards. Includes database metadata.

**Example:**
```json
{
  "sources": [
    {
      "id": 1,
      "title": "FATF Recommendations...",
      "short_title": "FATF 40 Recommendations",
      "source_type": "recommendation",
      "organization": "FATF",
      "provision_count": 40
    }
  ],
  "totals": {
    "sources": 8,
    "provisions": 123,
    "fatf_country_ratings": 26,
    "fatf_mutual_evaluations": 10,
    "wolfsberg_standards": 8
  },
  "metadata": [...],
  "_meta": { "disclaimer": "...", "data_source": "...", "data_age": "..." }
}
```

---

## 11. about

Server metadata, coverage summary, and data disclaimer.

**Returns:** Server name, version, description, coverage counts, data freshness, tier, and tool count.

**Example:**
```json
{
  "server": "anti-corruption-aml-mcp",
  "version": "0.1.0",
  "description": "Anti-corruption and anti-money laundering regulatory intelligence...",
  "coverage": {
    "sources": 8,
    "provisions": 123,
    "fatf_country_ratings": 26,
    "fatf_mutual_evaluations": 10,
    "wolfsberg_standards": 8
  },
  "data_freshness": "2026-02-28",
  "tier": "free",
  "tools": 12,
  "_meta": { "disclaimer": "...", "data_source": "...", "data_age": "..." }
}
```

---

## 12. check_data_freshness

Check when the database was last built and whether data may be stale.

**Returns:** Build date, schema version, source breakdown by organization, and a freshness warning if the database is more than 90 days old (FATF plenary meetings occur three times per year).

**Example:**
```json
{
  "build_date": "2026-02-28",
  "schema_version": "1.0",
  "sources_by_organization": [
    { "organization": "Council of Europe", "count": 1, "latest_date": "1999-05-01" },
    { "organization": "European Union", "count": 4, "latest_date": "2024-06-19" },
    { "organization": "FATF", "count": 1, "latest_date": "2012-02-16" }
  ],
  "freshness_warning": null,
  "_meta": { "disclaimer": "...", "data_source": "...", "data_age": "..." }
}
```
