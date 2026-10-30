-- Cloudflare D1 schema for unstableinnovation.com email capture
-- Run once against the bound D1 database (see CLOUDFLARE_SETUP.md).

CREATE TABLE IF NOT EXISTS subscribers (
  id                 INTEGER PRIMARY KEY AUTOINCREMENT,
  email              TEXT NOT NULL,
  first_name         TEXT,
  roles              TEXT,                        -- comma-separated (Learner, Entrepreneur, ...)
  language           TEXT NOT NULL DEFAULT 'en',  -- 'en' or 'es'
  source             TEXT,                        -- e.g. 'unstableinnovation.com/get' or 'skip-form'
  linkedin_followed  INTEGER NOT NULL DEFAULT 0,  -- 0/1
  newsletter_consent INTEGER NOT NULL DEFAULT 0,  -- 0/1
  ip                 TEXT,
  user_agent         TEXT,
  created_at         TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_created_at ON subscribers(created_at);
CREATE INDEX IF NOT EXISTS idx_subscribers_language ON subscribers(language);

-- Added Oct 2026. Both are also created automatically by /api/subscribe.
-- ALTER TABLE subscribers ADD COLUMN last_name TEXT;
-- One row per click on "Download the book" (first name required, the rest optional).
CREATE TABLE IF NOT EXISTS book_requests (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name  TEXT,
  email      TEXT,
  roles      TEXT,
  language   TEXT NOT NULL DEFAULT 'en',
  source     TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
