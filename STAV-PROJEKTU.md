# Stav projektu Konrad Home Build

## Fáze dle zadání (brief)

### ✅ 1. Analýza a Wireframy — HOTOVO
- Struktura webu (sitemap) navržena — 7 stránek + GDPR
- Datový model nemovitostí definován (projekty.json)
- UX rozložení všech stránek

### 🔶 2. UI Design — PROBÍHÁ
- ✅ Světlý luxusní styl schválen (viz `nahled-webu.html` v kořenu složky)
- ✅ Barevná paleta: bílá/krém + bronzově-zlaté akcenty (#8B7340) + tmavý footer
- ✅ Typografie: Playfair Display (nadpisy) + DM Sans (tělo)
- ❌ **Přenést schválený design do Next.js komponent** — komponenty zatím používají starší nudný styl
- ❌ Nahrát skutečné fotky a logo (nyní placeholder gradienty)

### ✅ 3. Vývoj a napojení CMS — HOTOVO
- Next.js 16 projekt — 21 stránek, build prochází bez chyb
- Správa dat přes JSON soubory (`src/data/`) — klient edituje bez programování
- SEO: sitemap.xml, robots.txt, JSON-LD strukturovaná data, meta tagy na všech stránkách
- Bezpečnost: HTTP hlavičky, GDPR cookie consent, honeypot, rate limit, math CAPTCHA
- Automatické formátování cen (8500000 → 8 500 000 Kč)
- Barevné štítky stavů (Volné/Rezervace/Prodáno)

### ❌ 4. Plnění obsahem a zaškolení — ČEKÁ
- Nahrát fotky domů z Google Drive do `public/images/projekty/`
- Nahrát logo do `public/images/`
- Doplnit reálné texty a příběh zakladatele Lubomíra Konrada
- Ověřit/doplnit reálné ceny a parametry domů v `projekty.json`
- Napojit kontaktní formulář na emailovou službu (Resend nebo SendGrid)

### ❌ 5. Testování a spuštění — ČEKÁ
- QA testy na mobilu i desktopu
- Nastavit Google Analytics 4 (měření ID do cookie consent)
- Nastavit Google Search Console
- Deploy na Vercel + připojit doménu konradhomebuild.cz
- Finální kontrola rychlosti (Lighthouse)

---

## Co dělat teď v Claude Code

Priorita č. 1 je sjednotit design. Řekni Claude Code:

> Přepiš design všech komponent (Header, Footer, HomePage, ProjektyList, ContactForm, a všech stránek) podle vizuálního stylu v souboru `nahled-webu.html` — světlý luxusní styl s Playfair Display, bronzově-zlatými akcenty, krémovým pozadím a tmavým footerem.

Pak pokračuj s:
1. Nahráním fotek a loga
2. Doplněním reálného obsahu
3. Napojením formuláře na email
4. Deployem na Vercel

---

## Přehled hotovosti

| Fáze | Stav | Poznámka |
|------|------|----------|
| Analýza a wireframy | ✅ Hotovo | |
| UI Design | 🔶 Probíhá | Schválen směr, přenést do komponent |
| Vývoj a CMS | ✅ Hotovo | 21 stránek, build OK |
| Obsah a zaškolení | ❌ Čeká | Fotky, texty, formulář |
| Testování a launch | ❌ Čeká | GA4, Vercel, doména |

**Celkový odhad: ~55 % hotovo**
