-- Anti-Corruption & AML MCP Database Schema
-- Version 1.0

-- Sources: treaties, recommendations, directives, regulations, standards
CREATE TABLE sources (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  short_title TEXT,
  source_type TEXT NOT NULL CHECK(source_type IN ('treaty', 'recommendation', 'directive', 'regulation', 'standard')),
  organization TEXT NOT NULL,
  adoption_date TEXT,
  status TEXT DEFAULT 'in_force',
  url TEXT,
  notes TEXT
);

-- Individual provisions within sources
CREATE TABLE provisions (
  id INTEGER PRIMARY KEY,
  source_id INTEGER NOT NULL REFERENCES sources(id),
  provision_ref TEXT NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  chapter TEXT,
  part TEXT,
  keywords TEXT
);

-- FATF grey/black list country ratings
CREATE TABLE fatf_country_ratings (
  id INTEGER PRIMARY KEY,
  country_code TEXT NOT NULL,
  country_name TEXT NOT NULL,
  list_status TEXT NOT NULL CHECK(list_status IN ('grey', 'black', 'monitored', 'cleared')),
  listing_date TEXT,
  delisting_date TEXT,
  deficiencies TEXT,
  action_plan TEXT,
  last_reviewed TEXT
);

-- FATF mutual evaluation results
CREATE TABLE fatf_mutual_evaluations (
  id INTEGER PRIMARY KEY,
  country_code TEXT NOT NULL,
  country_name TEXT NOT NULL,
  evaluation_date TEXT,
  assessor TEXT,
  overall_rating TEXT,
  effectiveness_ratings TEXT,
  technical_compliance TEXT,
  key_findings TEXT,
  report_url TEXT
);

-- Wolfsberg Group standards
CREATE TABLE wolfsberg_standards (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  version TEXT,
  publication_date TEXT,
  category TEXT,
  content TEXT NOT NULL,
  applicability TEXT,
  key_requirements TEXT
);

-- Metadata
CREATE TABLE db_metadata (
  key TEXT PRIMARY KEY,
  value TEXT
);

-- Full-text search on provisions
CREATE VIRTUAL TABLE provisions_fts USING fts5(
  provision_ref, title, content,
  content='provisions',
  content_rowid='id',
  tokenize='unicode61'
);

-- Indexes
CREATE INDEX idx_sources_type ON sources(source_type);
CREATE INDEX idx_sources_org ON sources(organization);
CREATE INDEX idx_provisions_source ON provisions(source_id);
CREATE INDEX idx_provisions_ref ON provisions(provision_ref);
CREATE INDEX idx_provisions_chapter ON provisions(chapter);
CREATE INDEX idx_fatf_ratings_country ON fatf_country_ratings(country_code);
CREATE INDEX idx_fatf_ratings_status ON fatf_country_ratings(list_status);
CREATE INDEX idx_fatf_evals_country ON fatf_mutual_evaluations(country_code);
CREATE INDEX idx_wolfsberg_category ON wolfsberg_standards(category);
