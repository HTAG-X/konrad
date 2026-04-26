# Konrad Home Build

Prezentační web s katalogem nemovitostí a administračním panelem pro firmu **KONRAD HOME BUILD, s.r.o.** Developer moderních dřevostaveb na klíč na jižní Moravě.

**Web:** [www.konradhomebuild.cz](https://www.konradhomebuild.cz)

## Tech stack

- **Next.js 16** (App Router, TypeScript, server-rendered s ISR)
- **Tailwind CSS 4**
- **React 19**
- **Supabase** (PostgreSQL databáze, autentizace, storage pro fotky)
- **TipTap** (WYSIWYG editor pro blog a popisy projektů)
- **Lucide React** (ikony)
- **React Hook Form** (kontaktní formulář)
- Deploy na **Vercel**

## Spuštění

```bash
npm install
cp .env.local.example .env.local   # doplnit Supabase credentials
npm run dev                         # localhost:3000
npm run build                       # produkční build
```

### Env proměnné (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
```

## Struktura projektu

```
src/
├── app/
│   ├── page.tsx                          # Homepage
│   ├── layout.tsx                        # Root layout (podmíněný Header/Footer)
│   ├── globals.css                       # Globální styly, CSS proměnné
│   ├── icon.png                          # Favicon
│   ├── sitemap.ts                        # Sitemap (z Supabase)
│   ├── robots.ts                         # robots.txt
│   ├── projekty/page.tsx                 # Katalog nemovitostí
│   ├── projekty/[slug]/page.tsx          # Detail nemovitosti
│   ├── drevostavby/page.tsx              # Dřevostavby na klíč + FAQ
│   ├── o-nas/page.tsx                    # O nás
│   ├── aktuality/page.tsx                # Blog výpis
│   ├── aktuality/[slug]/page.tsx         # Blog detail
│   ├── kontakt/page.tsx                  # Kontakt + formulář
│   ├── zasady-ochrany-osobnich-udaju/    # GDPR
│   ├── api/auth/callback/route.ts        # Supabase Auth callback
│   └── admin/                            # Administrační panel
│       ├── (auth)/login/page.tsx         # Přihlášení
│       ├── (dashboard)/layout.tsx        # Admin layout (sidebar + auth guard)
│       ├── (dashboard)/page.tsx          # Dashboard
│       ├── (dashboard)/projekty/         # CRUD projekty
│       ├── (dashboard)/blog/             # CRUD blog
│       ├── (dashboard)/reference/        # Správa referencí
│       ├── (dashboard)/nastaveni/        # Firemní nastavení
│       │   ├── page.tsx                  # Nastavení + USP
│       │   ├── kos/page.tsx              # Koš (obnovení smazaných)
│       │   └── log/page.tsx              # Audit log
│       └── components/                   # Admin komponenty
│           ├── AdminSidebar.tsx
│           ├── AdminHeader.tsx
│           ├── PropertyForm.tsx          # Formulář projektu
│           ├── BlogPostForm.tsx          # Formulář článku
│           ├── ImageUploader.tsx         # Drag & drop upload fotek
│           └── RichTextEditor.tsx        # WYSIWYG editor (TipTap)
│
├── components/                           # Veřejné komponenty
│   ├── Header.tsx                        # Sticky header
│   ├── Footer.tsx                        # Patička
│   ├── HomePage.tsx                      # Sekce homepage
│   ├── ProjektyList.tsx                  # Výpis s filtrováním
│   ├── ProjectGallery.tsx                # Fotogalerie s lightboxem
│   ├── PudorysPreview.tsx                # Půdorys v sidebaru
│   ├── Lightbox.tsx                      # Fullscreen prohlížeč fotek
│   ├── ContactForm.tsx                   # Kontaktní formulář
│   ├── ContactFormWrapper.tsx            # Předvyplnění z projektu
│   ├── FAQ.tsx                           # Accordion FAQ
│   ├── CookieConsent.tsx                 # GDPR cookie lišta
│   ├── StatusBadge.tsx                   # Stavové štítky
│   ├── PriceFormat.tsx                   # Formátování ceny
│   └── JsonLd.tsx                        # SEO strukturovaná data
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts                     # Browser Supabase klient
│   │   ├── server.ts                     # Server Supabase klient (cookies)
│   │   ├── static.ts                     # Klient pro build-time (bez cookies)
│   │   └── queries.ts                    # Data-fetching funkce
│   ├── auditLog.ts                       # Logování akcí (IP, user agent)
│   └── utils.ts                          # formatPrice()
│
├── middleware.ts                          # Auth guard /admin/*, session refresh
│
public/
├── images/
│   ├── logo/                             # Loga firmy
│   ├── projekty/                         # Fotky nemovitostí (141 fotek)
│   ├── partneri/                         # Loga partnerů (4)
│   ├── realizace/                        # Fotky hotových staveb
│   └── team/                             # Fotky týmu
└── videos/
    └── hero.mp4                          # Video pozadí homepage
```

## Databáze (Supabase)

### Tabulky

| Tabulka | Účel |
|---------|------|
| `projekty` | Nemovitosti (slug, nazev, cena, stav, fotogalerie, published, deleted) |
| `blog_posts` | Články blogu (slug, titulek, obsah HTML, published, deleted) |
| `site_config` | Firemní údaje, kontakt, zakladatel (single row, id=1) |
| `usp` | Přednosti firmy (titulek, popis, poradi) |
| `reference` | Reference zákazníků (jmeno, text, poradi) |
| `audit_log` | Log aktivit (kdo, co, kdy, IP, zařízení) |

### Sloupce projekty (snake_case)

`id, slug, nazev, lokalita, cena, poznamka_cena, dispozice, uzitna_plocha, pozemek, energeticka_trida, stav, typ_domu, druh_objektu, stav_domu, realizace, popis, vybava (TEXT[]), fotogalerie (TEXT[]), pudorys, hlavni_foto, maklerka_jmeno, maklerka_telefon, maklerka_email, published, deleted, created_at, updated_at`

### Stavy nemovitostí

| Stav | Barva | Popis |
|------|-------|-------|
| Volné | zelená `#6BA73D` | K prodeji |
| Rezervace | zlatá `#C9A96E` | Rezervováno |
| Zamluveno | oranžová `#D97706` | Zamluveno |
| Prodáno | šedá `#999` | Prodáno (přeškrtnuté) |

### RLS (Row Level Security)

- **Anonymní (web):** čtení published projektů, published blogů, site_config, usp, reference
- **Authenticated (admin):** plný CRUD na všechny tabulky

### Storage buckety

- `projekty-images` (public) — fotky nemovitostí, půdorysy
- `blog-images` (public) — náhledové obrázky článků

## Admin panel (/admin)

### Přihlášení

- Supabase Auth (email + heslo)
- Role v `user_metadata`: `{"role": "admin"}` nebo `{"role": "editor"}`
- Middleware chrání `/admin/*`, přesměruje na `/admin/login`

### Funkce

**Dashboard** — přehled: počet projektů (z toho volných), článků, referencí

**Projekty** (`/admin/projekty`)
- Výpis tabulkou s fotkou, cenou, stavem, draft badge
- Nový projekt / editace:
  - Slug se generuje automaticky z názvu
  - Published/Draft toggle (draft = sdílitelný URL ale není ve výpisu)
  - Změna stavu (Volné/Rezervace/Zamluveno/Prodáno)
  - Fotogalerie: drag & drop upload, řazení přetažením, výběr hlavní fotky, mazání
  - Půdorys: samostatný upload
  - Popis: WYSIWYG editor (TipTap)
  - Vybavení: položka po položce (přidat/odebrat)
  - Live formátování ceny (7300000 → 7 300 000 Kč)
  - Duplikace projektu (vytvoří kopii jako draft)
  - Náhled (otevře veřejnou stránku v novém tabu)
  - Smazání (soft delete — přesune do koše)

**Blog** (`/admin/blog`)
- Stejné funkce jako projekty: draft/published, WYSIWYG editor, upload náhledového obrázku, duplikace, náhled, soft delete

**Reference** (`/admin/reference`)
- Inline editace: jméno + text
- Přidání/odebrání referencí
- Uložení všech najednou

**Nastavení** (`/admin/nastaveni`)
- Firemní údaje: název, IČ, DIČ, adresa, telefon, email, web
- Sociální sítě: Facebook, Instagram
- Zakladatel: jméno, pozice, citát
- USP: inline editace, přidání/odebrání, řazení
- Správa systému:
  - **Koš** — obnovení smazaných projektů, článků, referencí
  - **Log aktivit** — kdo, co, kdy, IP adresa, zařízení/prohlížeč

### Audit log

Loguje se automaticky:
- Přihlášení do adminu
- Vytvoření / úprava / smazání projektu
- Duplikace projektu
- Vytvoření / úprava / smazání článku
- Obnovení z koše
- Trvalé smazání

Každý záznam obsahuje: uživatel (email), akce, tabulka, název záznamu, IP adresa, user agent (zařízení + prohlížeč).

## Veřejný web

### Homepage

Video hero → pás čísel (social proof) → USP → projekty → proces → reference → zakladatel s fotkou → citát → partneři → CTA

### Detail nemovitosti

Fotogalerie s lightboxem → parametry (cena, dispozice, plocha, pozemek, energetická třída) → popis (HTML z editoru) → vybavení → sidebar: půdorys (klikatelný), kontaktní osoba, CTA formulář

### Dřevostavby na klíč

Hero s fotkou → výhody → technologie → proces (6 kroků) → srovnávací tabulka → FAQ (10 otázek, accordion) → CTA

### SEO

- Meta tagy + Open Graph na všech stránkách
- JSON-LD: Organization, RealEstateListing, BreadcrumbList, Article
- Sitemap a robots.txt (generované ze Supabase)
- Google 5.0★ badge (6 míst na webu)
- ISR: veřejné stránky revalidate 60s, nastavení 300s, sitemap 3600s

### Bezpečnost

- HTTP hlavičky: HSTS, X-Frame-Options, X-XSS-Protection, CSP
- Kontaktní formulář: honeypot, matematický CAPTCHA, rate limiting
- GDPR: cookie consent, zásady ochrany osobních údajů
- Supabase RLS na všech tabulkách

## Design systém

### Barvy

| Barva | Hex | Použití |
|-------|-----|---------|
| Zlatá (primární) | `#8B7340` | Akcenty, bordery |
| Zlatá (světlá) | `#B89B5E` | CTA, hero |
| Bílá | `#FFFFFF` | Hlavní pozadí |
| Krém | `#F7F5F0` | Sekce, admin pozadí |
| Tmavá | `#1A1A1A` | Nadpisy, footer, admin sidebar |
| Tělo | `#3D3D3D` | Odstavce |
| Tlumená | `#8A8A8A` | Popisky |

### Typografie

- **Montserrat** (nadpisy, 400-800)
- **Poppins** (tělo textu, 400-600)

## Firemní údaje

| | |
|---|---|
| **Firma** | KONRAD HOME BUILD, s.r.o. |
| **Adresa** | Suchohrdly u Miroslavi 194, 671 72 |
| **IČ** | 18013015 |
| **DIČ** | CZ18013015 |
| **Tel** | +420 724 257 621 |
| **Email** | konradbuild@email.cz |
| **Působnost** | Moravský Krumlov a okolí 50 km |
| **Facebook** | [profil](https://www.facebook.com/profile.php?id=61553308766659) |
| **Instagram** | [@konrad_home_build](https://www.instagram.com/konrad_home_build/) |
| **Google** | [5.0★](https://www.google.com/search?kgmid=/g/11l6f9zljh&q=Konrad+Home+Build) |

## Plánované

- [ ] Napojení kontaktního formuláře na email (Resend/SendGrid)
- [ ] Google Analytics 4
- [ ] Stránka /realizace (galerie hotových staveb)
- [ ] Upload fotek do Supabase Storage (migrace z public/)
- [ ] Deploy na Vercel + doména konradhomebuild.cz
