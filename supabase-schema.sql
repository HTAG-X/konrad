-- ============================================================
-- Konrad Home Build — Supabase database schema
-- Spustit v Supabase Dashboard → SQL Editor
-- ============================================================

-- Helper: auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- PROJEKTY (nemovitosti)
-- ============================================================
CREATE TABLE projekty (
  id                BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug              TEXT UNIQUE NOT NULL,
  nazev             TEXT NOT NULL,
  lokalita          TEXT NOT NULL,
  cena              BIGINT,
  poznamka_cena     TEXT,
  dispozice         TEXT NOT NULL,
  uzitna_plocha     INTEGER,
  pozemek           INTEGER,
  energeticka_trida TEXT DEFAULT 'B',
  stav              TEXT NOT NULL DEFAULT 'Volné'
                    CHECK (stav IN ('Volné','Rezervace','Zamluveno','Prodáno')),
  typ_domu          TEXT,
  druh_objektu      TEXT,
  stav_domu         TEXT,
  realizace         TEXT,
  popis             TEXT,
  vybava            TEXT[] DEFAULT '{}',
  fotogalerie       TEXT[] DEFAULT '{}',
  pudorys           TEXT,
  hlavni_foto       TEXT,
  maklerka_jmeno    TEXT,
  maklerka_telefon  TEXT,
  maklerka_email    TEXT,
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER trg_projekty_updated BEFORE UPDATE ON projekty
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- BLOG POSTS
-- ============================================================
CREATE TABLE blog_posts (
  id                BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug              TEXT UNIQUE NOT NULL,
  titulek           TEXT NOT NULL,
  datum             DATE NOT NULL DEFAULT CURRENT_DATE,
  autor             TEXT NOT NULL,
  kratky_popis      TEXT,
  obsah             TEXT,
  nahledovy_obrazek TEXT,
  published         BOOLEAN DEFAULT false,
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER trg_blog_posts_updated BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- SITE CONFIG (single row)
-- ============================================================
CREATE TABLE site_config (
  id                  INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  nazev_firmy         TEXT NOT NULL,
  nazev_kratky        TEXT NOT NULL,
  popis               TEXT,
  telefon             TEXT,
  email               TEXT,
  adresa              TEXT,
  ico                 TEXT,
  dic                 TEXT,
  web                 TEXT,
  pusobnost           TEXT,
  facebook_url        TEXT,
  instagram_url       TEXT,
  zakladatel_jmeno    TEXT,
  zakladatel_pozice   TEXT,
  zakladatel_citat    TEXT,
  zakladatel_foto     TEXT,
  sluzby              TEXT[] DEFAULT '{}',
  partneri            BOOLEAN DEFAULT true,
  updated_at          TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER trg_site_config_updated BEFORE UPDATE ON site_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- USP (unique selling points)
-- ============================================================
CREATE TABLE usp (
  id       BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  titulek  TEXT NOT NULL,
  popis    TEXT NOT NULL,
  poradi   INTEGER NOT NULL DEFAULT 0
);

-- ============================================================
-- REFERENCE (customer testimonials)
-- ============================================================
CREATE TABLE reference (
  id     BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  jmeno  TEXT NOT NULL,
  text   TEXT NOT NULL,
  poradi INTEGER NOT NULL DEFAULT 0
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE projekty ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE usp ENABLE ROW LEVEL SECURITY;
ALTER TABLE reference ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Public read projekty" ON projekty FOR SELECT USING (true);
CREATE POLICY "Public read published blog" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Public read site_config" ON site_config FOR SELECT USING (true);
CREATE POLICY "Public read usp" ON usp FOR SELECT USING (true);
CREATE POLICY "Public read reference" ON reference FOR SELECT USING (true);

-- Authenticated CRUD
CREATE POLICY "Auth manage projekty" ON projekty FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth read all blog" ON blog_posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Auth insert blog" ON blog_posts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update blog" ON blog_posts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth delete blog" ON blog_posts FOR DELETE TO authenticated USING (true);
CREATE POLICY "Auth update site_config" ON site_config FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth manage usp" ON usp FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth manage reference" ON reference FOR ALL TO authenticated USING (true) WITH CHECK (true);
