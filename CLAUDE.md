# CLAUDE.md — Konrad Home Build

## O projektu

Prezentační web s integrovaným katalogem nemovitostí pro firmu **KONRAD HOME BUILD, s.r.o.** (www.konradhomebuild.cz). Firma jsou špičkoví specialisté v oblasti stavebnictví se dřevem — dřevostavby, střechy a vazníky. Působí na jižní Moravě (Moravský Krumlov a okolí 50 km, primárně Suchohrdly u Miroslavi). Zakladatel: **Lubomír Konrad**.

## Reálné firemní údaje (z aktuálního webu konradhomebuild.cz)

- **Firma**: KONRAD HOME BUILD, s.r.o.
- **Adresa**: Suchohrdly u Miroslavi 194, 671 72 Suchohrdly u Miroslavi
- **IČ**: 18013015, **DIČ**: CZ18013015
- **Telefon**: +420 724 257 621
- **Email**: konradbuild@email.cz
- **Působnost**: Moravský Krumlov a okolí 50 km
- **Služby**: Dřevostavby, Střechy, Vazníky (firma není jen developer, ale i stavební firma!)
- **Citát zakladatele**: „S Konrad Home Build získáte nejen krásný domov, ale i bezpečnou střechu nad hlavou. S našimi zkušenostmi a odborností jde všechno hladce."

## Reference zákazníků (z aktuálního webu — POUŽÍT na novém webu!)

1. **Petr Opálka**: „Dělali jsme si dřevostavbu na klíč s Lubošem Konrádem a nemohli být šťastnější. Jejich skvělý tým nám naslouchal, pochopil naše přání a s velkým nadšením nám postavil náš vysněný dům."
2. **Oldřich Hrb**: „Jsme nadšeni spoluprací při kompletní rekonstrukci našeho domu. Předvedli odbornost, profesionalitu a důraz na kvalitu v každém detailu projektu."
3. **Kamila Kolesová**: „Spolupráce s Lubošem Konrad byla úžasná. Postavili nám dřevostavbu, střechu a vazníky s použitím skvělých materiálů. Profesionální přístup a kvalitní práce nás nadchly."

## Klíčové USP (z aktuálního webu)

- **Profesionalita** — profesionálové v oboru stavby rodinných domů a střech
- **Individuální péče** — flexibilní přístup ke každému projektu
- **Kvalitní materiály** — šetrnost k životnímu prostředí, ověřené materiály
- **Splnitelné termíny** — důraz na dodržování termínů

## Tech stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS 4**
- **React 19**, lucide-react ikony, react-hook-form
- **Supabase** — databáze (PostgreSQL), autentizace, storage pro obrázky
- **TipTap** — WYSIWYG editor v admin panelu
- Deploy na Vercel

## Spuštění

```bash
npm install
npm run dev      # localhost:3000
npm run build    # produkční build
```

### Setup skripty

```bash
npx tsx scripts/seed.ts              # Migrace dat z JSON do Supabase DB
npx tsx scripts/setup-storage.ts     # Vytvoření storage bucketů (vyžaduje SUPABASE_SERVICE_ROLE_KEY)
node scripts/setup-policies.mjs      # Vytvoření RLS politik pro storage (vyžaduje pg + DIRECT_URL)
```

## Struktura projektu

```
src/
├── app/                              # Stránky (Next.js App Router)
│   ├── page.tsx                      # Homepage
│   ├── layout.tsx                    # Root layout (Header + Footer + CookieConsent)
│   ├── globals.css                   # Globální styly + Google Fonts import
│   ├── sitemap.ts                    # Auto-generovaná sitemap.xml
│   ├── robots.ts                     # robots.txt
│   ├── projekty/page.tsx             # Katalog nemovitostí (výpis)
│   ├── projekty/[slug]/page.tsx      # Detail nemovitosti
│   ├── drevostavby/page.tsx          # Dřevostavby na klíč (služba)
│   ├── o-nas/page.tsx                # O nás (příběh, tým, hodnoty)
│   ├── aktuality/page.tsx            # Blog výpis
│   ├── aktuality/[slug]/page.tsx     # Blog detail
│   ├── kontakt/page.tsx              # Kontakt + formulář
│   └── zasady-ochrany-osobnich-udaju/page.tsx  # GDPR stránka
├── components/
│   ├── Header.tsx          # Sticky header + mobilní menu
│   ├── Footer.tsx          # Patička (3 sloupce, kontakty, odkazy)
│   ├── HomePage.tsx        # Všechny sekce homepage (Hero, USP, projekty, proces, CTA)
│   ├── ProjektyList.tsx    # Výpis nemovitostí s client-side filtrováním
│   ├── ContactForm.tsx     # Formulář s honeypot, rate limit, math CAPTCHA
│   ├── CookieConsent.tsx   # GDPR cookie lišta
│   ├── StatusBadge.tsx     # Barevný štítek stavu (Volné/Rezervace/Prodáno)
│   ├── PriceFormat.tsx     # Formátování ceny (8500000 → 8 500 000 Kč)
│   └── JsonLd.tsx          # SEO strukturovaná data (Organization, Property, Breadcrumb, Article)
├── app/admin/              # ADMIN PANEL (chráněný autentizací)
│   ├── login/page.tsx      # Přihlašovací stránka
│   ├── page.tsx            # Dashboard
│   ├── projekty/           # CRUD projektů
│   ├── blog/               # CRUD článků
│   └── components/
│       ├── PropertyForm.tsx   # Formulář projektu (sticky top bar s Uložit)
│       ├── BlogPostForm.tsx   # Formulář článku (sticky top bar s Uložit)
│       ├── ImageUploader.tsx  # Upload fotek (drag&drop + výběr z knihovny)
│       ├── ImagePicker.tsx    # Modální výběr z nahraných obrázků
│       └── RichTextEditor.tsx # WYSIWYG editor (TipTap)
├── data/                   # EDITOVATELNÁ DATA (fallback, primárně v Supabase DB)
│   ├── projekty.json       # Seznam nemovitostí (6 domů)
│   ├── blogPosts.json      # Články blogu (3 články)
│   └── siteConfig.json     # Kontakty firmy, IČO, DIČ, sociální sítě
└── lib/
    ├── utils.ts            # formatPrice(), formatDate()
    ├── auditLog.ts         # Logování akcí v admin panelu
    └── supabase/
        ├── client.ts       # Browser client (createBrowserClient)
        └── server.ts       # Server client (createServerClient)
```

## Supabase

### Proměnné prostředí (`.env.local`)
- `NEXT_PUBLIC_SUPABASE_URL` — URL Supabase projektu
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — Publishable key (veřejný, pro browser client)
- `SUPABASE_SERVICE_ROLE_KEY` — Service role key (tajný, pro admin skripty)
- `DATABASE_URL` — PostgreSQL connection string (pooling, pro app)
- `DIRECT_URL` — PostgreSQL connection string (direct, pro migrace)

### Storage buckety
- **`projekty-images`** — Fotky projektů a půdorysy (public bucket)
- **`blog-images`** — Náhledové obrázky článků (public bucket)
- Složková struktura: `{slug}/{timestamp}-{random}.{ext}`
- Max velikost souboru: 10 MB
- Povolené formáty: JPG, PNG, WebP, GIF

### RLS politiky na `storage.objects`
- `storage_public_read` — SELECT pro všechny (veřejné čtení fotek)
- `storage_auth_insert` — INSERT pro authenticated (upload)
- `storage_auth_update` — UPDATE pro authenticated
- `storage_auth_delete` — DELETE pro authenticated

### Admin autentizace
- Middleware (`src/middleware.ts`) chrání `/admin/*` routes
- Nepřihlášení uživatelé jsou přesměrováni na `/admin/login`
- Supabase Auth přes SSR cookies

## Datový model nemovitostí (`projekty.json`)

Každý dům má:
- `id`, `slug`, `nazev`, `lokalita`
- `cena` (číslo v Kč, auto-formátováno na webu)
- `dispozice` (např. "4+kk"), `uzitnaPlocha` (m²), `pozemek` (m²)
- `energetickaTrida` ("A" / "A+")
- `stav`: `"Volné"` | `"Rezervace"` | `"Prodáno"` — zelený/oranžový/červený badge
- `popis`, `vybava` (pole stringů), `fotogalerie` (pole cest k obrázkům)
- `pudorys`, `hlavniFoto`
- `maklerka` { jmeno, telefon, email }

## Design systém

**DŮLEŽITÉ**: Schválený vizuální směr je **světlý luxusní / prémiový styl**. Referenční soubor: `nahled-webu.html` v kořenu složky (parent directory). Komponenty v src/ zatím používají starší styl a MUSÍ být přepsány podle tohoto náhledu.

### Schválená paleta (světlý luxus):
- **Pozadí**: #FFFFFF (bílá), #F7F5F0 (teplá krém), #F0EDE6 (tmavší krém)
- **Akcentová zlatá/bronz**: #8B7340 (primární), #B89B5E (světlejší)
- **Text**: #1A1A1A (nadpisy), #3D3D3D (tělo), #8A8A8A (utlumený)
- **Bordery**: rgba(139, 115, 64, 0.15) (jemné zlaté)
- **Footer**: #1A1A1A (tmavý pro kontrast)

### Typografie:
- **Nadpisy**: Playfair Display (serif, elegantní) — velké dramatické velikosti
- **Tělo textu**: DM Sans (čistý, moderní)
- **Labely/tagy**: uppercase, letter-spacing: 0.2em

### Principy:
- Mobile-first, plně responzivní
- Hodně bílého prostoru (padding 100-120px)
- Zlaté dekorativní linky jako oddělovače
- Fade-in animace při scrollování (IntersectionObserver)
- Karty: bílé s jemným stínem, hover efekt se zlatým rámečkem
- **Jazyk**: Veškerý obsah výhradně v češtině

### Co chybí na aktuálním webu a přidat na nový:
- Sekce s referencemi zákazníků (data v siteConfig.json → pole "reference")
- Sekce s partnery/dodavateli
- Stránka „Služby" vedle „Dřevostavby" — firma dělá i střechy a vazníky, ne jen dřevostavby

## SEO

- Každá stránka má vlastní `metadata` export (title, description, OG tagy)
- `sitemap.ts` generuje mapu všech statických i dynamických stránek
- `robots.ts` povoluje crawlery, blokuje /api/
- JSON-LD strukturovaná data: Organization (homepage), RealEstateListing (detail domu), BreadcrumbList, Article (blog)
- `metadataBase` nastavená na `https://www.konradhomebuild.cz`

## Bezpečnost

- **HTTP hlavičky** v `next.config.ts`: HSTS, X-Frame-Options, X-XSS-Protection, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **Kontaktní formulář**: honeypot pole (past na boty), rate limiting (max 3 odeslání/session), matematický CAPTCHA
- **Cookie consent**: GDPR lišta s volbou "Přijmout vše" / "Pouze nezbytné", ukládá do cookie
- **GDPR stránka**: Kompletní Zásady ochrany osobních údajů (11 sekcí)
- **Obrázky**: next/image optimalizace, formáty WebP/AVIF

## Co je potřeba dodělat

### PRIORITA 1 — Design (komponenty neodpovídají schválenému stylu)
- [ ] Přepsat VŠECHNY komponenty (Header, Footer, HomePage, ProjektyList, ContactForm, a všechny stránky) podle vizuálního stylu v `nahled-webu.html`
- [ ] Změnit fonty z Montserrat/Poppins na Playfair Display/DM Sans
- [ ] Přepsat barevnou paletu z earthy na světlý luxus (viz Design systém výše)

### PRIORITA 2 — Doplnit obsah z aktuálního webu
- [ ] Přidat sekci REFERENCE ZÁKAZNÍKŮ na homepage (3 recenze — data v siteConfig.json)
- [ ] Přidat sekci PARTNEŘI na homepage (aktuální web ji má)
- [ ] Doplnit službu STŘECHY a VAZNÍKY — firma nedělá jen dřevostavby! Buď rozšířit stránku „Dřevostavby" nebo přidat stránku „Služby"
- [ ] Použít reálný citát Lubomíra Konrada místo vymyšleného
- [ ] Aktualizovat kontaktní formulář — přidat pole Příjmení, Adresa, Předmět (jako na aktuálním webu)
- [ ] Opravit oblast působnosti: „Moravský Krumlov a okolí 50 km" (ne Znojmo)

### PRIORITA 3 — Technické
- [ ] Nahrát skutečné fotky domů do `public/images/projekty/` (nyní placeholder gradienty)
- [ ] Nahrát logo do `public/images/` (na aktuálním webu je ikona domečku + text)
- [ ] Napojit kontaktní formulář na backend (API route / emailová služba jako Resend/SendGrid)
- [ ] Nastavit Google Analytics 4
- [ ] Nastavit Google Search Console
- [ ] Nasadit na Vercel + připojit doménu konradhomebuild.cz
- [ ] Případně přidat interaktivní mapu (Mapy.cz API nebo Google Maps)

## Konvence

- Používej `"use client"` jen tam, kde je to nutné (useState, useEffect, onClick)
- Serverové komponenty pro stránky, kde je to možné
- Data primárně z Supabase DB, JSON soubory jako fallback/seed
- Veškeré texty v češtině, ceny v Kč
- Nové stránky přidávej do `sitemap.ts`
- Commit messages v češtině

## Cílová skupina

1. **Rodiny a páry** hledající hotový moderní dům k nastěhování (jižní Morava)
2. **Stavebníci** s vlastním pozemkem hledající dodavatele dřevostavby na klíč

## Původní brief (zadání)

### Hlavní cíle webu
- Prodej nemovitostí: přehledný katalog s vizualizací stavu (Volné, Rezervace, Prodáno)
- Lead generation: maximálně zjednodušit odeslání poptávky / sjednání prohlídky
- Prezentace dřevostaveb: rychlost, úspora, ekologie
- Budování důvěry: osobní brand majitele, transparentnost, kvalitní materiály (PAVATEX)

### Požadavky na CMS/správu
Klient spravuje web přes admin panel (`/admin`):
- Přidávání/editace nemovitostí přes formulář s WYSIWYG editorem ✅
- Změna statusu domu na jedno kliknutí (Volné → Rezervace → Zamluveno → Prodáno) ✅
- Automatické formátování cen (z 13500000 na 13 500 000 Kč) ✅
- Blogový modul pro psaní aktualit ✅
- Upload fotek drag&drop + výběr z knihovny nahraných obrázků ✅
- Sticky panel s tlačítkem Uložit (viditelný při scrollování) ✅
- SEO: editovatelné meta titulky a popisky u všech stránek

### Vizuální styl
- Čistý, moderní, důvěryhodný
- Zemité a přírodní tóny (dřevo, ekologie) + bílá, šedá, antracitová
- Mobile First: primárně optimalizováno pro mobilní zařízení
- Sticky header s CTA "Poptat dům"

### Stránky webu
1. Homepage: Hero + CTA, výhody dřevostaveb, USP, top domy, představení zakladatele
2. Developerské projekty: výpis + filtr + detaily s parametry, galerií, půdorysem, kontaktem
3. Dřevostavby na klíč: proces krok za krokem, technologie (difuzní systémy, čerpadla, rekuperace)
4. O nás: příběh firmy, tým, hodnoty
5. Aktuality/Blog: novinky, reporty, tipy
6. Kontakt: formulář, kontakty, mapa

### Podklady
Google Drive: https://drive.google.com/drive/folders/1BqlX8TR-GCLqol1dOHGfqQbsh9duNiWu?usp=sharing
Obsahuje složky: logo, banner, fotky staveb (květen 2023, září 2024), hotové fotky dvojdomku a jednodomku, stavby Suchohrdly, videa.
