# Konrad Home Build - Návod pro správu webu

## Jak spustit web lokálně

```bash
cd konrad-home-build
npm install
npm run dev
```
Web bude dostupný na `http://localhost:3000`

## Jak nasadit na produkci

Doporučený hosting: **Vercel** (zdarma pro osobní projekty)

1. Vytvořte účet na [vercel.com](https://vercel.com)
2. Nahrajte projekt na GitHub
3. V Lovcel klikněte "Import Project" a vyberte repozitář
4. Nastavte doménu `konradhomebuild.cz`

---

## Správa nemovitostí (JEDNODUCHÉ!)

### Kde jsou data?
Soubor: `src/data/projekty.json`

### Jak přidat nový dům?
Otevřete `src/data/projekty.json` a přidejte nový objekt do pole:

```json
{
  "id": 7,
  "slug": "nazev-bez-diakritiky",
  "nazev": "Rodinný dům Suchohrdly III",
  "lokalita": "Suchohrdly u Miroslavi",
  "cena": 9500000,
  "dispozice": "4+kk",
  "uzitnaPlocha": 125,
  "pozemek": 650,
  "energetickaTrida": "A",
  "stav": "Volné",
  "popis": "Popis domu...",
  "vybava": ["Tepelné čerpadlo", "Rekuperace", "Podlahové topení"],
  "fotogalerie": ["/images/projekty/dum7-1.jpg", "/images/projekty/dum7-2.jpg"],
  "pudorys": "/images/projekty/dum7-pudorys.jpg",
  "hlavniFoto": "/images/projekty/dum7-hlavni.jpg",
  "maklerka": {
    "jmeno": "Petra Nováková",
    "telefon": "+420 777 888 999",
    "email": "petra@konradhomebuild.cz"
  }
}
```

### Jak změnit stav domu?
V `projekty.json` najděte dům a změňte pole `"stav"` na jednu z hodnot:
- `"Volné"` - zelený štítek
- `"Rezervace"` - oranžový štítek  
- `"Prodáno"` - červený štítek

### Jak změnit cenu?
Zadejte cenu jako číslo BEZ mezer: `8500000` (web ji automaticky zobrazí jako "8 500 000 Kč")

---

## Správa fotek

1. Nahrajte fotky do složky `public/images/projekty/`
2. V `projekty.json` doplňte cestu: `"/images/projekty/nazev-fotky.jpg"`
3. Pro optimální rychlost: zmenšete fotky na max 1920px šířky a převeďte do WebP formátu

---

## Správa blogu

Soubor: `src/data/blogPosts.json`

Přidejte nový článek:
```json
{
  "id": 4,
  "slug": "nazev-clanku-bez-diakritiky",
  "titulek": "Název článku",
  "datum": "2026-05-01",
  "autor": "Lubomír Konrad",
  "nahledovyObrazek": "/images/blog/clanek4.jpg",
  "kratkyPopis": "Krátký popis pro náhled...",
  "obsah": "<p>Text článku v HTML. Můžete použít <strong>tučné písmo</strong> a <em>kurzívu</em>.</p><p>Druhý odstavec...</p>"
}
```

---

## Změna kontaktních údajů

Soubor: `src/data/siteConfig.json`

Zde můžete upravit: telefon, email, adresu, IČO, DIČ, sociální sítě.

---

## Struktura projektu

```
src/
├── app/                    # Stránky webu
│   ├── page.tsx           # Úvodní stránka
│   ├── projekty/          # Katalog nemovitostí
│   ├── drevostavby/       # Dřevostavby na klíč
│   ├── o-nas/             # O nás
│   ├── aktuality/         # Blog
│   └── kontakt/           # Kontaktní stránka
├── components/            # Sdílené komponenty
│   ├── Header.tsx         # Hlavička webu
│   ├── Footer.tsx         # Patička webu
│   ├── HomePage.tsx       # Homepage komponenta
│   ├── ContactForm.tsx    # Kontaktní formulář
│   ├── ProjektyList.tsx   # Výpis nemovitostí s filtrem
│   ├── StatusBadge.tsx    # Štítek stavu (Volné/Rezervace/Prodáno)
│   └── PriceFormat.tsx    # Formátování cen
├── data/                  # DATA PRO SPRÁVU (editujte zde!)
│   ├── projekty.json      # Seznam nemovitostí
│   ├── blogPosts.json     # Články blogu
│   └── siteConfig.json    # Kontakty a nastavení firmy
└── lib/
    └── utils.ts           # Pomocné funkce
```
