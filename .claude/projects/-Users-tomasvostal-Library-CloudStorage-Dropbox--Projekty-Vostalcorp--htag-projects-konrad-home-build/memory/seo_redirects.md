---
name: SEO and redirects
description: Přesměrování z Wix, OG images, reCAPTCHA, SEO setup
type: reference
---

**Původní web:** Wix na konradhomebuild.cz
**301 redirecty (next.config.ts):**
- /sluzby → /drevostavby
- /book-online → /kontakt
- /zasady-pouzivani-souboru-cookie → /zasady-ochrany-osobnich-udaju
- /product-page/* → /projekty
- Staré sitemapy → /sitemap.xml

**SEO:**
- OG images na všech stránkách (dynamické pro projekty/blog z DB)
- Twitter card: summary_large_image
- FAQ schema (JSON-LD) na /drevostavby
- PropertyJsonLd s reálným obrázkem
- Sitemap.xml a robots.txt z Supabase

**reCAPTCHA v3:**
- Site key: 6LejH8ssAAAAAAmM2HxrBcbKV8BUdTLEWviAZoCl
- API route: /api/recaptcha (server-side ověření)

**Google Business Profile:**
- 5.0★, odkaz: https://www.google.com/search?kgmid=/g/11l6f9zljh&q=Konrad+Home+Build
- Zobrazeno na 6 místech webu

**Blog obrázky:** ideálně 1200 x 630 px, JPG/WebP, do 200 KB
