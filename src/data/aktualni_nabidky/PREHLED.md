# Export nabídek z kkrealhome.cz

**Datum exportu:** 24. 4. 2026
**Celkem nabídek:** 6
**Celkem fotek:** 141
**Zdroj:** Eliška Křečková, KK REAL — kkrealhome.cz

## Struktura souborů

```
kkrealhome_export/
├── PREHLED.md          ← tento přehled
├── nabidky.json        ← strukturovaná data (pro import do webu)
├── nabidky.csv         ← stejná data v CSV pro Excel / CMS
├── nabidka-0020/
│   ├── popis.md        ← plný text popisu
│   └── fotky/          ← 27 fotek
├── nabidka-0021/
├── nabidka-0022/
├── nabidka-0023/
├── nabidka-0012/
└── nabidka-0013/
```

Všechna data, které jsou v `nabidky.json`, jsou rovněž v `nabidky.csv` (plochá struktura) — použijte podle toho, co vašemu webu lépe vyhovuje.

## Rychlý přehled

| ID | Lokalita | Dispozice | Cena | Užitná | Parcela | Fotek |
|----|----------|-----------|-------|--------|---------|-------|
| 0020 | Hostěradice (dvojdům 1, pravý) | 4+kk | 7 300 000 Kč | 104 m² | 327 m² | 27 |
| 0021 | Hostěradice (dvojdům 1, levý) | 4+kk | 7 100 000 Kč | 104 m² | 325 m² | 27 |
| 0022 | Hostěradice (dvojdům 2, pravý) | 4+kk | 7 300 000 Kč | 104 m² | 367 m² | 27 |
| 0023 | Hostěradice (dvojdům 2, levý) | 4+kk | 7 100 000 Kč | 104 m² | 369 m² | 27 |
| 0012 | Myslibořice (samostatně stojící) | 4+kk | 8 300 000 Kč | 128 m² | 640 m² | 17 |
| 0013 | Myslibořice (samostatně stojící) | 4+kk | 8 300 000 Kč | 128 m² | 560 m² | 16 |

**Ceny:** uvedené ceny jsou vč. DPH. Ke všem nabídkám se připočítává provize RK 200 000 Kč + DPH.

## Projekty

### Rodinné domy Hostěradice (nabídky 0020–0023)

Projekt 5 rodinných domů: 2 dvojdomy + 1 samostatně stojící. V exportu jsou 4 polořadové domy z obou dvojdomů.

- **Okres:** Znojmo (35 min do Brna, 22 min do Znojma)
- **Typ:** Dřevostavba, přízemní
- **Energetická třída:** B – Velmi úsporná
- **Technologie:** tepelné čerpadlo vzduch-voda, podlahové vytápění, rekuperace
- **Vytápění:** úsporné tepelné čerpadlo + krbová kamna (možnost)
- **Standard:** dřevovláknité desky, kuchyňská linka + spotřebiče, koupelna včetně zařízení
- **Start výstavby:** 1. 3. 2026
- **Realizace:** 2026

Obývací pokoj s kuchyňským koutem 44,51 m² z celkových 103,93 m² užitné plochy.

### Rodinné domy Myslibořice (nabídky 0012–0013)

Projekt 3 samostatně stojících rodinných domů – klidná obec s důrazem na dojezdový čas do elektrárny Dukovany.

- **Okres:** Třebíč
- **Typ:** Dřevostavba, přízemní (samostatně stojící)
- **Energetická třída:** B – Velmi úsporná
- **Technologie:** tepelné čerpadlo vzduch-voda, podlahové vytápění, rekuperace
- **Specifika:** šatna 8,4 m² navazující na ložnici, obývací pokoj s kuchyní 43 m²
- **Standard:** výběr mezi moderním a venkovským stylem kuchyně i koupelny

Obývací pokoj 43 m² z celkových 128 m² užitné plochy.

## Kontakt (zdroj)

- **Makléř:** Ing. Eliška Křečková
- **Telefon:** +420 777 774 633
- **Email:** kreckova@kkrealhome.cz

## Poznámky k importu na web

1. **Hlavní foto:** V každé nabídce je doporučené hlavní foto `r-02.jpg` (exteriér — používá se na zdrojovém webu jako hero image).
2. **Řazení fotek:** Smysluplné pořadí ukazuje `fotky` pole v JSON — nejdřív exteriéry `r-01` až `r-10`, pak interiéry `1.jpg`, `2.jpg` …, na konec půdorys `khb-…pudorys…jpg`.
3. **Půdorys:** každá nabídka obsahuje i obrázek půdorysu domu — v JSONu je vždy posledním prvkem pole `fotky`.
4. **Textové popisy:** Popisy se mezi nabídkami z Hostěradic liší pouze v jedné větě (pozice v dvojdomu). U Myslibořic jsou oba popisy prakticky identické. Pokud to vašemu webu vyhovuje, doporučuji mít jeden sdílený "projektový popis" + krátký specifický dodatek pro konkrétní dům.
5. **Skryté údaje:** Ulice a číslo domu jsou dle zdroje skryté — doplnit při přípravě smlouvy.
