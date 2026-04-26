import { Metadata } from "next";
import Link from "next/link";
import { getSiteConfig } from "@/lib/supabase/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Zásady ochrany osobních údajů | Konrad Home Build",
  description:
    "Zásady ochrany osobních údajů a zpracování dat podle GDPR pro web Konrad Home Build.",
  robots: "noindex, nofollow",
};

export default async function PrivacyPolicyPage() {
  const siteConfig = await getSiteConfig();

  const sectionClass = "mb-16 scroll-mt-24";
  const headingClass = "font-serif text-2xl font-bold text-[#1A1A1A] mb-6";
  const cardClass = "bg-white p-8 border-t border-[rgba(139,115,64,0.15)]";
  const subheadingClass = "font-serif text-lg font-bold text-[#1A1A1A] mb-3";
  const textClass = "text-[#3D3D3D] leading-relaxed";
  const linkClass = "text-[#8B7340] hover:text-[#B89B5E] underline transition-colors";

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] pt-40 pb-20 px-8">
        <div className="max-w-[900px] mx-auto text-center hero-text">
          <h1 className="font-serif font-bold text-white mb-4 text-[clamp(2rem,5vw,3rem)]">
            Zásady ochrany osobních údajů
          </h1>
          <p className="text-white text-[1rem]">
            Informace o zpracování osobních údajů podle GDPR
          </p>
        </div>
      </section>

      <div className="max-w-[900px] mx-auto px-8 py-20">
        {/* Table of Contents */}
        <nav className="mb-16 bg-[#F7F5F0] p-8 border-t-2 border-[#8B7340]">
          <h2 className="font-serif text-xl font-bold text-[#1A1A1A] mb-4">Obsah</h2>
          <ul className="space-y-2 text-[#3D3D3D]">
            {[
              [1, "Úvodní ustanovení"],
              [2, "Jaké údaje zpracováváme"],
              [3, "Účel zpracování"],
              [4, "Právní základ zpracování"],
              [5, "Doba uchovávání údajů"],
              [6, "Cookies"],
              [7, "Vaše práva"],
              [8, "Předávání údajů třetím stranám"],
              [9, "Zabezpečení údajů"],
              [10, "Kontakt"],
              [11, "Platnost"],
            ].map(([num, label]) => (
              <li key={num}>
                <a href={`#section-${num}`} className={linkClass}>
                  {num}. {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* 1. Introduction */}
        <section id="section-1" className={sectionClass}>
          <h2 className={headingClass}>1. Úvodní ustanovení</h2>
          <div className={cardClass}>
            <p className={`${textClass} mb-6`}>
              Správcem vašich osobních údajů je společnost <strong>{siteConfig.nazev_firmy}</strong>,
              která je zodpovědná za jejich zpracování v souladu s požadavky GDPR.
            </p>
            <div className="bg-[#F7F5F0] p-6 mb-6 text-[#1A1A1A]">
              <p className="font-bold mb-2">{siteConfig.nazev_firmy}</p>
              <p className="mb-1">IČ: {siteConfig.ico}</p>
              <p className="mb-1">DIČ: {siteConfig.dic}</p>
              <p className="mb-1">Adresa: {siteConfig.adresa}</p>
              <p className="mb-1">Telefon: {siteConfig.telefon}</p>
              <p>Email: {siteConfig.email}</p>
            </div>
            <p className={textClass}>
              Máte právo na informace o tom, jak s vašimi osobními údaji nakládáme. Tento dokument
              vás seznamuje se zásadami ochrany osobních údajů na našem webu.
            </p>
          </div>
        </section>

        {/* 2. Data Collection */}
        <section id="section-2" className={sectionClass}>
          <h2 className={headingClass}>2. Jaké údaje zpracováváme</h2>
          <div className="space-y-4">
            <div className={cardClass}>
              <h3 className={subheadingClass}>Údaje z kontaktního formuláře</h3>
              <p className={`${textClass} mb-3`}>
                Když nás kontaktujete prostřednictvím kontaktního formuláře, zpracováváme:
              </p>
              <ul className="list-disc list-inside space-y-1 text-[#3D3D3D] ml-2">
                <li><strong>Jméno a příjmení</strong>: identifikace autora dotazu</li>
                <li><strong>E-mailová adresa</strong>: pro odpověď na váš dotaz</li>
                <li><strong>Telefonní číslo</strong>: pro ústní komunikaci</li>
                <li><strong>Obsah zprávy</strong>: váš dotaz nebo poptávka</li>
              </ul>
            </div>
            <div className={cardClass}>
              <h3 className={subheadingClass}>Cookies a analytická data</h3>
              <p className={`${textClass} mb-3`}>
                Prostřednictvím cookies a analytických nástrojů shromažďujeme anonymní údaje
                o chování návštěvníků webu:
              </p>
              <ul className="list-disc list-inside space-y-1 text-[#3D3D3D] ml-2">
                <li>Počet návštěv a jejich trvání</li>
                <li>Stránky, které jste navštívili</li>
                <li>Zařízení a operační systém</li>
                <li>Anonymizovaná data o lokalitě</li>
              </ul>
            </div>
            <div className={cardClass}>
              <h3 className={subheadingClass}>Logy webového serveru</h3>
              <p className={textClass}>
                Náš webový server automaticky sbírá technické informace o každém přístupu:
                IP adresa, typ prohlížeče, datum a čas přístupu, odkazující stránka.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Processing Purposes */}
        <section id="section-3" className={sectionClass}>
          <h2 className={headingClass}>3. Účel zpracování</h2>
          <div className="space-y-4">
            {[
              ["Odpověď na poptávky a dotazy", "Vaše údaje z kontaktního formuláře používáme výhradně k tomu, abychom mohli odpovědět na váš dotaz a poskytnout požadované informace o našich službách."],
              ["Zlepšování webových stránek", "Anonymní analytická data nám pomáhají pochopit, jak návštěvníci náš web používají, abychom jej mohli stále zlepšovat."],
              ["Plnění právních povinností", "Některé údaje zpracováváme na základě právních povinností vyplývajících z českého práva a práva EU."],
            ].map(([title, text]) => (
              <div key={title} className={cardClass}>
                <h3 className={subheadingClass}>{title}</h3>
                <p className={textClass}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Legal Basis */}
        <section id="section-4" className={sectionClass}>
          <h2 className={headingClass}>4. Právní základ zpracování</h2>
          <div className="space-y-4">
            {[
              ["Váš souhlas (čl. 6 odst. 1 písm. a) GDPR)", "Pro zpracování údajů z kontaktního formuláře a analytických cookies se spoléháme na váš výslovný souhlas. Můžete jej kdykoliv odvolat."],
              ["Oprávněný zájem správce (čl. 6 odst. 1 písm. f) GDPR)", "Zpracování webových logů serveru je nezbytné pro bezpečnost webu a diagnostiku problémů."],
              ["Plnění smlouvy (čl. 6 odst. 1 písm. b) GDPR)", "Pokud s námi uzavřete smlouvu o stavbě nebo poskytování služeb, budeme zpracovávat vaše osobní údaje nezbytné k jejímu plnění."],
            ].map(([title, text]) => (
              <div key={title} className={cardClass}>
                <h3 className={subheadingClass}>{title}</h3>
                <p className={textClass}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Retention Period */}
        <section id="section-5" className={sectionClass}>
          <h2 className={headingClass}>5. Doba uchovávání údajů</h2>
          <div className="space-y-4">
            {[
              ["Údaje z kontaktního formuláře", "Vaše údaje uchováváme po dobu 3 let od poslední komunikace."],
              ["Cookies", "Nezbytné cookies: po dobu vaší relace nebo dle vaší preference. Analytické cookies: po dobu 26 měsíců."],
              ["Webové logy", "Logy webového serveru uchováváme po dobu 30 dní."],
            ].map(([title, text]) => (
              <div key={title} className={cardClass}>
                <h3 className={subheadingClass}>{title}</h3>
                <p className={textClass}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Cookies */}
        <section id="section-6" className={sectionClass}>
          <h2 className={headingClass}>6. Cookies</h2>
          <div className="space-y-4">
            <div className={cardClass}>
              <p className={textClass}>
                Cookies jsou malé textové soubory ukládané v prohlížeči vašeho počítače.
                Používáme je k zajištění správného fungování webu, analýze návštěvnosti
                a ke zlepšování uživatelské zkušenosti.
              </p>
            </div>
            <div className={cardClass}>
              <h3 className={subheadingClass}>Nezbytné cookies</h3>
              <p className={textClass}>
                Tyto cookies jsou nezbytné pro správné fungování webu a nemohou být vypnuty.
                Jsou používány pro zapamatování preference ohledně cookies, zajištění bezpečnosti
                a technické fungování interaktivních prvků.
              </p>
            </div>
            <div className={cardClass}>
              <h3 className={subheadingClass}>Analytické cookies</h3>
              <p className={textClass}>
                Pomocí analytických nástrojů sledujeme anonymní informace o chování návštěvníků webu.
                Analytické cookies se instalují pouze s vaším souhlasem.
              </p>
            </div>
          </div>
        </section>

        {/* 7. Data Subject Rights */}
        <section id="section-7" className={sectionClass}>
          <h2 className={headingClass}>7. Vaše práva</h2>
          <p className={`${textClass} mb-6`}>
            Máte právo na ochranu svých osobních údajů. Chcete-li uplatnit kterékoliv
            z následujících práv, kontaktujte nás na adrese uvedené v sekci Kontakt.
          </p>
          <div className="space-y-4">
            {[
              ["Právo na přístup (čl. 15 GDPR)", "Máte právo na přístup k osobním údajům, které o vás zpracováváme."],
              ["Právo na opravu (čl. 16 GDPR)", "Máte právo na opravu nepřesných nebo neúplných údajů."],
              ["Právo na výmaz (čl. 17 GDPR)", "V určitých situacích máte právo požádat o smazání vašich osobních údajů."],
              ["Právo na omezení zpracování (čl. 18 GDPR)", "Máte právo požádat o omezení zpracování vašich údajů."],
              ["Právo na přenositelnost údajů (čl. 20 GDPR)", "Máte právo obdržet vaše osobní údaje ve strojově čitelném formátu."],
              ["Právo na odvolání souhlasu", "Pokud jste nám dali souhlas, máte právo jej kdykoliv odvolat."],
            ].map(([title, text]) => (
              <div key={title} className={cardClass}>
                <h3 className={subheadingClass}>{title}</h3>
                <p className={textClass}>{text}</p>
              </div>
            ))}
            <div className={cardClass}>
              <h3 className={subheadingClass}>Právo podat stížnost u dozorného úřadu</h3>
              <p className={`${textClass} mb-4`}>
                Pokud se domníváte, že vaše práva na ochranu dat byla porušena:
              </p>
              <div className="bg-[#F7F5F0] p-6 text-[#1A1A1A]">
                <p className="font-bold mb-1">Úřad pro ochranu osobních údajů (ÚOOÚ)</p>
                <p className="mb-1">Pplk. Sochora 27, 170 00 Praha 7</p>
                <p>Web: <a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer" className={linkClass}>www.uoou.cz</a></p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Third Parties */}
        <section id="section-8" className={sectionClass}>
          <h2 className={headingClass}>8. Předávání údajů třetím stranám</h2>
          <div className={cardClass}>
            <p className={textClass}>
              Vaše osobní údaje nepředáváme třetím stranám pro jejich samostatné účely.
              Používáme však externí služby (hosting, analytické nástroje), které mohou
              mít přístup k určitým údajům v souladu s GDPR.
            </p>
          </div>
        </section>

        {/* 9. Data Security */}
        <section id="section-9" className={sectionClass}>
          <h2 className={headingClass}>9. Zabezpečení údajů</h2>
          <div className={cardClass}>
            <p className={textClass}>
              Bereme ochranu vašich osobních údajů vážně. Náš web používá HTTPS (SSL/TLS),
              k údajům mají přístup pouze oprávněné osoby a používáme bezpečné systémy
              zálohování.
            </p>
          </div>
        </section>

        {/* 10. Contact */}
        <section id="section-10" className={sectionClass}>
          <h2 className={headingClass}>10. Kontakt</h2>
          <div className={cardClass}>
            <p className={`${textClass} mb-6`}>
              Máte-li jakékoliv dotazy týkající se ochrany vašich osobních údajů:
            </p>
            <div className="bg-[#F7F5F0] p-6 text-[#1A1A1A]">
              <p className="font-bold mb-2">{siteConfig.nazev_firmy}</p>
              <p className="mb-1">{siteConfig.adresa}</p>
              <p className="mb-1">
                Tel: <a href={`tel:${siteConfig.telefon}`} className={linkClass}>{siteConfig.telefon}</a>
              </p>
              <p>
                Email: <a href={`mailto:${siteConfig.email}`} className={linkClass}>{siteConfig.email}</a>
              </p>
            </div>
          </div>
        </section>

        {/* 11. Effectiveness */}
        <section id="section-11" className={sectionClass}>
          <h2 className={headingClass}>11. Platnost</h2>
          <div className="bg-[#F7F5F0] p-8 border-t-2 border-[#8B7340]">
            <p className={`${textClass} mb-3`}>
              Tyto Zásady ochrany osobních údajů jsou účinné od <strong>dubna 2026</strong>.
            </p>
            <p className={textClass}>
              Tyto zásady mohou být aktualizovány. V případě podstatných změn vás budeme
              informovat prostřednictvím našeho webu.
            </p>
          </div>
        </section>

        {/* Back */}
        <div className="pt-8 border-t border-[rgba(139,115,64,0.15)]">
          <Link href="/" className={`${linkClass} font-medium`}>
            &larr; Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    </div>
  );
}
