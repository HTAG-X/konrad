# Zadání — doplnění webu Konrad Home Build

Stav k 24. 4. 2026. Web už má hotové: hero, USP (4 hodnoty), projekty, "Cesta k Vašemu domu", reference, citát zakladatele, CTA, footer. Níže je jen to, co **zbývá doplnit** nebo vylepšit.

---

## 1) NOVÁ SEKCE: Naši partneři

**Kam umístit:** mezi sekci "Co říkají naši klienti" (reference) a citátovou sekci "S Konrad Home Build získáte…". Vizuálně jako tichý pás, aby neodváděl pozornost od hlavního CTA.

**Nadpis sekce:** Naši partneři
**Podtitul (volitelný, malým písmem nad nadpisem jako "NAŠE PŘEDNOSTI" jinde):** SPOLEHLIVÍ DODAVATELÉ
**Krátký text pod nadpisem:** Při stavbě Vašeho domu pracujeme výhradně s ověřenými dodavateli kvalitních materiálů.

**Loga (4 ks, černobílá nebo původní barva, desaturace 60–80 % v klidu, 100 % při hoveru):**

| # | Název | Co dodává | Odkaz (volitelně) | Soubor |
|---|---|---|---|---|
| 1 | **Solodoor** | Interiérové dveře | https://www.solodoor.cz | `partneri/solodoor.png` |
| 2 | **PTÁČEK – velkoobchod** | Voda, topení, instalace | https://www.ptacek.cz | `partneri/ptacek.png` |
| 3 | **PRO-DOMA / GRIT** | Stavebniny | https://www.pro-doma.cz | `partneri/pro-doma.png` |
| 4 | **Supellex** | Okna a dveře | https://www.supellex.cz | `partneri/supellex.png` |

**Layout:**
- Desktop: 4 loga v řádce, stejná výška (např. 60–80 px), zarovnání středem, mezi logy vertikální oddělovače nebo jen mezera 48–64 px.
- Mobil: 2 × 2 grid, stejná výška.
- Pozadí: světle béžové (`#FAFAF5`) nebo bílé — ať to ladí s okolními sekcemi.
- Efekt: grayscale(100%) + opacity 70 %, při hoveru grayscale(0%) + opacity 100 %.

**Loga jsou uložena v:** `/Konrad web/partneri/` (4 soubory PNG)

---

## 2) FOOTER — doplnit slogan

Nad/pod logo Konrad Home Build ve footeru přidat tagline. Vybrat **jeden** z těchto návrhů (nebo použít více, pokud bude variant):

1. **Moderní dřevostavby na klíč. Od projektu po předání klíčů.** *(popisný, SEO-friendly)*
2. **Stavíme rodinné domy ze dřeva. S detailem, který je vidět.** *(emocionální)*
3. **Krásný domov. Férový termín. Osobní přístup.** *(tři hodnoty)*
4. **Jižní Morava. Dřevostavby. Řemeslo.** *(krátký, silný)*
5. **S námi jde všechno hladce.** *(navazuje na citát majitele)*

**Doporučení:** varianta **1** nebo **3** jako hlavní tagline pod logem, varianta **5** jako drobný text u podpisu.

---

## 3) NOVÁ SEKCE: Medailonek zakladatele (s fotkou) — NA HOMEPAGE

**Kam umístit:** na homepage **těsně před citátovou sekci** „S Konrad Home Build získáte nejen krásný domov…". Čtenář si nejdřív seznámí tvář a jméno — a následný citát pak vyzní jako přímá řeč konkrétního člověka, ne jako anonymní marketingový text. Mnohem silnější než schovat to jen na `/o-nas`.

**Layout:**
- Desktop: dvousloupec — **vlevo portrétní fotka** (cca 40 % šířky, kruhový nebo jemně zaoblený ořez), **vpravo text** (nadpis + podtitul + odstavec + podpis).
- Mobil: fotka nad textem, vycentrovaná.
- Pozadí: světle béžové (`#FAFAF5`) nebo jemný pattern, aby se sekce odlišila od okolních.

**Obsah:**

**Nadpis:** Jmenuji se Lubomír Konrad
**Podtitul (menší, jinou barvou):** Zakladatel · Odborník v oboru stavitelství
**Text:**
> Odborník v oboru stavitelství s dlouholetými zkušenostmi. Detailní přístup ke každému projektu je zárukou kvality a spokojenosti našich zákazníků.
>
> Společnost Konrad Home Build se zaměřuje na stavbu kvalitních rodinných domů v technologii dřevěného skeletu. Náš tým má bohaté zkušenosti a je připraven poskytnout komplexní služby od projektu po předání hotového domu.

**Pod textem (volitelně):** digitální/ručně psaný podpis „Lubomír Konrad" pro osobní dojem.

**Foto:** Přiložena v adresáři `fotky/`:
- `lubomir-konrad-original.jpg` (3000×1520 px) — plné rozlišení
- `lubomir-konrad-1200w.jpg` (1200×900 px) — pro web

Portrét je profesionální — bílé polo tričko na dřevěném pozadí, což tematicky perfektně sedí k dřevostavbám. Není třeba nové focení.

**Pozn.:** Stejnou sekci (rozšířenou o delší životopisný text a další fotky z realizací) pak použít i na podstránce `/o-nas`.

---

## 4) HERO — drobné úpravy textu (doporučení)

Aktuálně: *„Šp­čkoví specialisté v oblasti stavebnictví se dřevem. Každý projekt je jedinečný a navržen s péčí do detailu."*

**Návrh úprav (překlep + zúžit na domy):**
- Hlavní nadpis: **Dům Vašich snů** (zůstává)
- Podtitul: **Špičkoví specialisté v oblasti dřevostaveb.** Každý projekt je jedinečný a navržen s péčí do detailu.
- Eyebrow (malý text nahoře): MODERNÍ DŘEVOSTAVBY NA KLÍČ *(zůstává)*

Změny: opravit překlep „Šp­čkoví" → „Špičkoví" a „stavebnictví se dřevem" → „dřevostaveb" (aby to sedělo na zúžené zaměření jen na stavby domů).

---

## 5) KONTAKTNÍ a firemní údaje (kontrola — do footeru + /kontakt)

**KONRAD HOME BUILD, s.r.o.**
Suchohrdly u Miroslavi 194
671 72 Suchohrdly u Miroslavi

IČ: **18013015**
DIČ: **CZ18013015**

E-mail: **konradbuild@email.cz**
Telefon: **+420 724 257 621**

Kde působíme: **Moravský Krumlov a okolí 50 km** (jižní Morava)

---

## 6) CTA text pod kontaktem (pokud ještě není)

*„Vyplňte formulář, nebo nám zavolejte a domluvte si nezávaznou konzultaci."*

---

---

## 7) NOVÁ SEKCE: Čísla / social proof (pás s čísly)

**Kam umístit:** pod hero, **nad sekci "Proč si vybrat Konrad"**. Nebo jako úzký tmavý/béžový pás s velkými čísly.

**Layout:** 3–4 sloupce s velkými čísly (font-size ~56–72 px) a popiskem pod nimi.

**Navržené metriky (čísla doplníme):**

| Číslo | Popisek |
|---|---|
| **15+** | let zkušeností v oboru |
| **_XX_** | dokončených rodinných domů |
| **_XX_** | spokojených rodin |
| **5,0 ★** | hodnocení na Google *(prokliknutelné)* |

**Pozn.:** Čísla u druhé a třetí metriky doplní Lubomír. Hvězdičky vždy jako proklik na Google Business Profile, **počet recenzí neuvádět** (dokud jich nebudou desítky — u 7 recenzí by to pocitově oslabovalo hodnotu, u 50+ už bude posilovat).

**Vizuální tip:** ke každému číslu jemná ikona v korporátní zlaté/zelené barvě (kladívko, dům, úsměv, hvězda). Pozadí sekce kontrastní k okolí (tmavě zelený nebo antracit s bílým textem).

---

## 8) STRÁNKA "Realizace" — galerie dokončených projektů

**Kde:** na podstránce `/realizace` (nebo přejmenovat stávající `/projekty` na dvě — `Nabídka domů` a `Realizace`).

**Struktura každé realizace:**
- Titulní fotka (hlavní exteriérový záběr)
- Galerie 5–10 fotek (exteriér, interiér, konstrukce, detail)
- Lokalita (obec, okres)
- Rok dokončení
- Dispozice a užitná plocha
- Krátký popis projektu (2–3 věty)
- Pokud je klient ochotný → jeho citát + jméno

**Layout:**
- Grid 3× na desktopu, 2× na tabletu, 1× na mobilu
- Lightbox pro zvětšení fotek
- Filtr podle roku / dispozice / lokality (volitelně, pokud bude víc než ~8 realizací)

**Social proof v sekci:** nad grid přidat pás **"5,0 ★ na Google · 7 recenzí · [link na recenze]"**.

---

## 9) STRÁNKA "Dřevostavby" — FAQ sekce

**Kde:** na podstránce `/drevostavby` pod hlavním popisem technologie, nad finálním CTA.

**Nadpis sekce:** Často kladené otázky
**Podtitul:** Odpovídáme na to, co nás nejčastěji zajímá naše klienty.

**Návrh otázek (accordion — rozbalovací):**

1. **Jaká je životnost dřevostavby?**
Správně postavená dřevostavba má životnost srovnatelnou se zděným domem — 80+ let. V Evropě stojí dřevostavby i 200 let.

2. **Dostanu na dřevostavbu hypotéku?**
Ano, banky dnes běžně hypotéky na dřevostavby poskytují. Rádi vám poradíme, které banky mají s dřevostavbami zkušenosti.

3. **Jak dlouho trvá stavba domu?**
Od podpisu smlouvy do předání klíčů obvykle 8–12 měsíců. Samotná montáž dřevěné konstrukce trvá jen několik týdnů.

4. **Jaká je energetická třída vašich domů?**
Standardně stavíme v energetické třídě A. Můžeme jít až na pasivní standard (A+).

5. **Mohu čerpat dotaci Nová zelená úsporám?**
Ano, naše domy splňují podmínky NZÚ. Pomůžeme vám s přípravou podkladů pro žádost.

6. **Jaká je požární odolnost?**
Moderní dřevostavby splňují veškeré požární normy. Dřevěná konstrukce uzavřená sádrokartonem má stejnou požární odolnost jako zděná stěna.

7. **Jak je to se zvukovou izolací?**
Při správném provedení dosahují naše stěny a stropy parametrů srovnatelných se zděnými konstrukcemi — běžně 50–55 dB.

8. **Jaká je záruka?**
Standardní stavební záruka 5 let, na konstrukci delší. Přesné podmínky uvádíme ve smlouvě o dílo.

9. **Kolik dřevostavba stojí?**
Orientační cena holodomu začíná kolem **X Kč/m²**, dům na klíč od **Y Kč/m²**. Každý projekt je ale jedinečný — nejlepší je zdarma konzultace.

10. **Ve kterých lokalitách stavíte?**
Jižní Morava — Moravský Krumlov a okolí do 50 km. Po dohodě i dál.

**Pozn.:** Konkrétní čísla v otázkách 3, 4, 9 doplní Lubomír.

---

## 10) Google hodnocení 5,0 ★ — použít opakovaně (bez počtu recenzí)

Google Business Profile má **5,0 ★**. Zobrazit na více místech jako silný social proof. **Počet recenzí neuvádět** — s 7 recenzemi by to pocitově oslabovalo; jakmile naroste přes ~30–50, lze začít uvádět.

**Kde použít:**

1. **Hero sekce homepage** — malý badge pod CTA tlačítky:
   *"★★★★★ 5,0 na Google"*
   (odkaz na Google Business Profile)

2. **Pás s čísly (bod 7)** — jedna ze 4 metrik

3. **Sekce "Co říkají naši klienti"** — nad nebo pod grid s citáty, řádek ve stylu:
   *"Našim klientům stavíme 5,0★ domy → přečíst recenze na Google"*

4. **Stránka "Realizace"** — pás nad gridem (bod 8)

5. **Stránka "Kontakt"** — vedle kontaktního formuláře jako důvěryhodnostní prvek

6. **Footer** — malý prvek "★★★★★ 5,0 na Google" vedle kontaktu

**Vizuální provedení:**
- Zlaté hvězdičky (barva korporátní zlatá `#8B6914` nebo klasická `#F4B400`)
- Text v rozumné velikosti, ne aby křičel
- **Vždy prokliknutelné** na Google Business Profile (odkaz níže)
- Ideálně automatický pull z Google Places API pro live-aktualizaci hodnoty (až bude smysluplné)

**Odkaz na Google profil (na který vše prolinkovat):**
https://www.google.com/search?kgmid=/g/11l6f9zljh&q=Konrad+Home+Build

---

## Souhrn změn k implementaci

**Musí být:**
- [ ] Přidat sekci **Naši partneři** (4 loga) mezi reference a citát.
- [ ] Do footeru doplnit tagline (varianta 1 nebo 3).
- [ ] Opravit překlep „Šp­čkoví" v hero a zúžit na „dřevostavby".
- [ ] Přidat **medailonek Lubomíra s fotkou** na homepage těsně před citát.
- [ ] Ověřit, že kontaktní údaje ve footeru a na `/kontakt` souhlasí.

**Silné doplnění (má vysoký dopad):**
- [ ] Pás **čísel / social proof** pod hero (15+ let, XX domů, XX rodin, 5,0 ★).
- [ ] Na `/realizace` rozjet **galerii dokončených projektů**.
- [ ] Na `/drevostavby` přidat **FAQ sekci** (10 otázek).
- [ ] Zapojit **Google hodnocení 5,0 ★** (bez počtu recenzí, prokliknutelné na Google) na 5–6 místech napříč webem.

**Přiložené soubory:**
- `obsah-z-puvodniho-webu.md` — kompletní texty a citáty pro referenci
- `partneri/solodoor.png`, `ptacek.png`, `pro-doma.png`, `supellex.png` — loga partnerů
