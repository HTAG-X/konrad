import type { Metadata } from "next";
import Link from "next/link";
import { Check, Snowflake, Sun, Leaf, HeartPulse, Wind, Flame } from "lucide-react";
import { FAQ } from "@/components/FAQ";

const faqItems = [
  { otazka: "Jaká je životnost dřevostavby?", odpoved: "Správně postavená dřevostavba má životnost srovnatelnou se zděným domem, tedy 80+ let. V Evropě stojí dřevostavby i 200 let." },
  { otazka: "Dostanu na dřevostavbu hypotéku?", odpoved: "Ano, banky dnes běžně hypotéky na dřevostavby poskytují. Rádi vám poradíme, které banky mají s dřevostavbami zkušenosti." },
  { otazka: "Jak dlouho trvá stavba domu?", odpoved: "Od podpisu smlouvy do předání klíčů obvykle 6–9 měsíců. Samotná montáž dřevěné konstrukce trvá 4–6 měsíců." },
  { otazka: "Jaká je energetická třída vašich domů?", odpoved: "Standardně stavíme v energetické třídě B (velmi úsporná). Můžeme jít až na pasivní standard." },
  { otazka: "Mohu čerpat dotaci Nová zelená úsporám?", odpoved: "Ano, naše domy splňují podmínky NZÚ. Pomůžeme vám s přípravou podkladů pro žádost." },
  { otazka: "Jaká je požární odolnost?", odpoved: "Moderní dřevostavby splňují veškeré požární normy. Dřevěná konstrukce uzavřená sádrokartonem má stejnou požární odolnost jako zděná stěna." },
  { otazka: "Jak je to se zvukovou izolací?", odpoved: "Při správném provedení dosahují naše stěny a stropy parametrů srovnatelných se zděnými konstrukcemi, běžně 50–55 dB." },
  { otazka: "Jaká je záruka?", odpoved: "Standardní stavební záruka 5 let, na konstrukci delší. Přesné podmínky uvádíme ve smlouvě o dílo." },
  { otazka: "Kolik dřevostavba stojí?", odpoved: "Každý projekt je jedinečný a cena závisí na dispozici, vybavení a lokalitě. Nejlepší je domluvit si nezávaznou konzultaci zdarma." },
  { otazka: "Ve kterých lokalitách stavíte?", odpoved: "Jižní Morava, Moravský Krumlov a okolí 50 km. Po dohodě i dál." },
];

const standardy = [
  { title: "Obvodové stěny", text: "Fasádní systém Weber Therm Clima pro difuzně otevřené konstrukce. Dřevovláknitá deska Pavatex Isolair tl. 100 mm, hranoly z konstrukčního sušeného řeziva 60/160 mm, tepelná izolace Isover tl. 160 mm, OSB Egger 4 TOP tl. 18 mm, předstěna s izolací Pavaflex tl. 40 mm, rigistabilová deska 12,5 mm." },
  { title: "Základy", text: "Základové pasy šířka 400 mm, výška 600 mm, beton C20/25. Základová deska tl. 150 mm s vyztužením kari sítí. Tepelná izolace soklu Perimetr SD tl. 100 mm. Kompletní kanalizace, přípojky elektro a vody." },
  { title: "Konstrukce krovu", text: "Dřevěná tesařská konstrukce s přesahem střechy okapové strany 500 mm před tepelnou izolaci fasády. Prefabrikované vazníky pro maximální přesnost a rychlost montáže." },
  { title: "Okna a dveře", text: "Kvalitní okna a vchodové dveře s výbornou tepelnou a zvukovou izolací. Interiérové dveře Solodoor." },
  { title: "Topení a teplá voda", text: "Tepelné čerpadlo vzduch-voda s podlahovým vytápěním. Možnost krbových kamen v obývacím pokoji." },
  { title: "Vzduchotechnika", text: "Systém rekuperace vzduchu zajišťuje čerstvý vzduch bez tepelných ztrát a snižuje náklady na vytápění." },
  { title: "Elektroinstalace", text: "Kompletní elektroinstalace včetně rozvaděče, zásuvek a osvětlení. Připraveno pro chytrý dům." },
];

export const metadata: Metadata = {
  title: "Dřevostavby na klíč | Konrad Home Build",
  description: "Moderní dřevostavby na klíč na jižní Moravě. Ekologické, energeticky úsporné a kvalitní domy z přírodních materiálů. Od konzultace po předání klíčů.",
  keywords: "dřevostavby, stavba na klíč, ekologické domy, Jižní Morava, dřevěný dům, PAVATEX",
  openGraph: {
    title: "Dřevostavby na klíč | Konrad Home Build",
    description: "Moderní dřevostavby na klíč na jižní Moravě. Ekologické a kvalitní domy z přírodních materiálů.",
    type: "website",
    images: [{ url: "https://www.konradhomebuild.cz/images/drevostavby/00-hero-dvojdomek.jpg", alt: "Dřevostavba Konrad Home Build" }],
  },
  alternates: { canonical: "/drevostavby" },
};

function FAQJsonLd({ items }: { items: { otazka: string; odpoved: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({ "@type": "Question", name: item.otazka, acceptedAnswer: { "@type": "Answer", text: item.odpoved } })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function DrevostavbyPage() {
  return (
    <div>
      <FAQJsonLd items={faqItems} />

      {/* 1. HERO */}
      <section className="relative flex items-center justify-center overflow-hidden bg-[#1a1a1a] pt-40 pb-24 px-8">
        <img src="/images/drevostavby/00-hero-dvojdomek.jpg" alt="Dřevostavba Konrad Home Build" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center max-w-[900px] mx-auto hero-text">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="w-10 h-px bg-[#B89B5E]" />
            <span className="text-[0.75rem] tracking-[0.25em] uppercase text-[#B89B5E]">Moderní dřevostavby</span>
            <span className="w-10 h-px bg-[#B89B5E]" />
          </div>
          <h1 className="font-serif font-bold text-white mb-6 text-[clamp(2.5rem,6vw,4.5rem)]">Dřevostavby na klíč</h1>
          <p className="text-white mb-10 text-[1.1rem] leading-relaxed max-w-[650px] mx-auto">
            Tvoříme rodinné novostavby se zahradou. Moderní a prostorné domy navržené s maximálním důrazem na pohodlí, funkčnost a respekt k okolnímu prostředí.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Link href="/kontakt" className="bg-[#B89B5E] text-[#1A1A1A] px-10 py-4 font-semibold text-[0.85rem] tracking-[0.1em] uppercase transition-all duration-400 hover:bg-[#D4AE6A] hover:-translate-y-0.5">
              Nezávazná poptávka zdarma
            </Link>
            <a href="#proces" className="bg-transparent text-[#B89B5E] px-10 py-4 border border-[#B89B5E] font-semibold text-[0.85rem] tracking-[0.1em] uppercase transition-all duration-400 hover:bg-[#B89B5E] hover:text-[#1A1A1A]">
              Jak to funguje
            </a>
          </div>
        </div>
      </section>

      {/* 2. PROČ DŘEVOSTAVBA (intro + foto) */}
      <section className="bg-white py-32 px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#8B7340] mb-6">Proč dřevostavba</p>
              <h2 className="font-serif font-bold text-[#1A1A1A] mb-6 text-[clamp(1.8rem,4vw,2.5rem)]">Ekologické bydlení pro moderní rodiny</h2>
              <p className="text-[#3D3D3D] text-[1.05rem] leading-relaxed mb-6">
                Věříme, že naše budoucnost je spojená s ekologií. Proto stavíme domy ze dřeva, což je tradiční a ekologicky šetrný materiál. Tím se zaručuje výborná tepelná izolace a energetická efektivita, což přispívá k nižším nákladům na vytápění a chlazení.
              </p>
              <p className="text-[#3D3D3D] text-[1.05rem] leading-relaxed">
                S naší stavební firmou získáte dům na klíč. Nemusíte se starat o složité stavební procesy. Stačí záloha a podepsání smlouvy, a my se postaráme o zbytek. Vaším jediným úkolem bude se těšit na nový domov.
              </p>
            </div>
            <div className="overflow-hidden">
              <img src="/images/drevostavby/05-exterier-priezdy.jpg" alt="Exteriér dřevostavby" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. VÝHODY (4 karty) */}
      <section className="bg-[#F7F5F0] py-32 px-8">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#8B7340] mb-8 text-center">Co získáte</p>
          <h2 className="font-serif font-bold text-[#1A1A1A] mb-16 text-center text-[clamp(2rem,5vw,3.5rem)]">Výhody dřevostavby</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {[
              { num: "01", title: "Rychlost výstavby", sub: "4-6 měsíců", text: "Díky prefabrikované technologii je doba výstavby výrazně kratší než u tradičních staveb." },
              { num: "02", title: "Energetická úspornost", sub: "Třída B a lepší", text: "Výborná energetická třída zajišťuje minimální náklady na vytápění a chlazení." },
              { num: "03", title: "Ekologické materiály", sub: "95% dřevní hmota", text: "Používáme dřevovláknité desky PAVATEX a přírodní materiály bez škodlivých látek." },
              { num: "04", title: "Nižší provozní náklady", sub: "Až 70% úspora", text: "Tepelné čerpadlo, rekuperace a podlahové vytápění minimalizují provozní náklady." },
            ].map((item) => (
              <div key={item.num} className="bg-white border-t-2 border-[#8B7340] shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-10 mb-8 lg:mb-0 group transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-[rgba(139,115,64,0.04)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="font-serif text-[3.5rem] font-bold text-[#8B7340] mb-4 leading-none">{item.num}</div>
                  <h3 className="font-serif text-[1.3rem] font-bold text-[#1A1A1A] mb-1">{item.title}</h3>
                  <p className="text-[#B89B5E] font-semibold text-sm mb-4">{item.sub}</p>
                  <p className="text-[#3D3D3D] text-[0.95rem] leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VIZUALIZACE */}
      <section className="bg-white py-32 px-8">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#8B7340] mb-8 text-center">Jak to bude vypadat</p>
          <h2 className="font-serif font-bold text-[#1A1A1A] mb-16 text-center text-[clamp(2rem,5vw,3.5rem)]">Vizualizace projektů</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { src: "/images/drevostavby/04-rozmisteni-6-domu.jpg", alt: "Přehled projektu 6 domů", wide: true },
              { src: "/images/drevostavby/05-exterier-priezdy.jpg", alt: "Exteriér, pohled zepředu", wide: false },
              { src: "/images/drevostavby/02-interier-obyvak-kuchyn.jpg", alt: "Interiér, obývák s krbem a kuchyň", wide: false },
              { src: "/images/drevostavby/03-interier-obyvak.jpg", alt: "Interiér, obývák", wide: true },
            ].map((img, i) => (
              <div key={i} className={`overflow-hidden bg-[#F7F5F0] ${img.wide ? "md:col-span-2" : ""}`}>
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. REALIZACE (reálné fotky) */}
      <section className="bg-[#F7F5F0] py-32 px-8">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#8B7340] mb-8 text-center">Hotové domy</p>
          <h2 className="font-serif font-bold text-[#1A1A1A] mb-16 text-center text-[clamp(2rem,5vw,3.5rem)]">Fotografie hotového dvojdomku</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="overflow-hidden">
              <img src="/images/drevostavby/00-exterier-vecer.jpg" alt="Hotový dvojdomek, exteriér večer" className="w-full h-[350px] object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="overflow-hidden">
              <img src="/images/drevostavby/01-interier-kuchyn-obyvak.jpg" alt="Interiér, kuchyň a obývák" className="w-full h-[350px] object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="overflow-hidden">
              <img src="/images/drevostavby/01-exterier-zahrada.jpg" alt="Exteriér se zahradou" className="w-full h-[350px] object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. PAVATEX (materiál s ilustrací a 6 body) */}
      <section className="bg-white py-32 px-8">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#8B7340] mb-8 text-center">Z čeho stavíme</p>
          <h2 className="font-serif font-bold text-[#1A1A1A] mb-8 text-center text-[clamp(2rem,5vw,3.5rem)]">Dřevovláknité desky PAVATEX</h2>
          <p className="text-[#3D3D3D] text-center text-[0.95rem] leading-relaxed max-w-[900px] mx-auto mb-16">
            Dřevovláknité desky jsou díky svým vlastnostem výborným řešením pro zajištění tepelné stability a zvukové ochrany. Souvrství s použitím dřevovláknitých desek je ze stavebně-fyzikálního hlediska vysoce kvalitní a zaručuje minimalizaci spotřeby energií. Výrobky jsou čistým ekologickým materiálem, 95 % tvoří dřevní hmota.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="space-y-10">
              <div className="flex items-start gap-4 lg:flex-row-reverse lg:text-right">
                <div className="flex-shrink-0 w-12 h-12 bg-[#F7F5F0] rounded-full flex items-center justify-center">
                  <Snowflake size={22} className="text-[#8B7340]" />
                </div>
                <div className="flex-1">
                  <div className="font-serif text-[2rem] font-bold text-[#8B7340] leading-none mb-1">1</div>
                  <h3 className="font-semibold text-[#1A1A1A] mb-1">ZIMA</h3>
                  <p className="text-[#3D3D3D] text-[0.9rem] leading-relaxed">Díky nízké tepelné vodivosti a značné objemové hmotnosti chrání před chladem</p>
                </div>
              </div>
              <div className="flex items-start gap-4 lg:flex-row-reverse lg:text-right">
                <div className="flex-shrink-0 w-12 h-12 bg-[#F7F5F0] rounded-full flex items-center justify-center">
                  <Sun size={22} className="text-[#8B7340]" />
                </div>
                <div className="flex-1">
                  <div className="font-serif text-[2rem] font-bold text-[#8B7340] leading-none mb-1">2</div>
                  <h3 className="font-semibold text-[#1A1A1A] mb-1">LÉTO</h3>
                  <p className="text-[#3D3D3D] text-[0.9rem] leading-relaxed">Díky značné objemové hmotnosti a nízké tepelné vodivosti chrání před horkem</p>
                </div>
              </div>
              <div className="flex items-start gap-4 lg:flex-row-reverse lg:text-right">
                <div className="flex-shrink-0 w-12 h-12 bg-[#F7F5F0] rounded-full flex items-center justify-center">
                  <Leaf size={22} className="text-[#8B7340]" />
                </div>
                <div className="flex-1">
                  <div className="font-serif text-[2rem] font-bold text-[#8B7340] leading-none mb-1">3</div>
                  <h3 className="font-semibold text-[#1A1A1A] mb-1">EKOLOGICKÝ MATERIÁL</h3>
                  <p className="text-[#3D3D3D] text-[0.9rem] leading-relaxed">Díky technologii výroby a obnovitelným přírodním surovinám</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <img src="/images/drevostavby/standardy-ilustrace.png" alt="Řez domem, vrstvy konstrukce PAVATEX" className="max-h-[500px] w-auto" />
            </div>

            <div className="space-y-10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#F7F5F0] rounded-full flex items-center justify-center">
                  <HeartPulse size={22} className="text-[#8B7340]" />
                </div>
                <div className="flex-1">
                  <div className="font-serif text-[2rem] font-bold text-[#8B7340] leading-none mb-1">4</div>
                  <h3 className="font-semibold text-[#1A1A1A] mb-1">ZDRAVÉ BYDLENÍ</h3>
                  <p className="text-[#3D3D3D] text-[0.9rem] leading-relaxed">Díky přírodnímu materiálu a jeho fyzikálním schopnostem vytváří zdravé prostředí v interiéru</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#F7F5F0] rounded-full flex items-center justify-center">
                  <Wind size={22} className="text-[#8B7340]" />
                </div>
                <div className="flex-1">
                  <div className="font-serif text-[2rem] font-bold text-[#8B7340] leading-none mb-1">5</div>
                  <h3 className="font-semibold text-[#1A1A1A] mb-1">PROPUSTNÝ PRO PÁRU</h3>
                  <p className="text-[#3D3D3D] text-[0.9rem] leading-relaxed">Díky vláknité struktuře a tím nízkému faktoru difúzního odporu umožňuje proces difúze</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#F7F5F0] rounded-full flex items-center justify-center">
                  <Flame size={22} className="text-[#8B7340]" />
                </div>
                <div className="flex-1">
                  <div className="font-serif text-[2rem] font-bold text-[#8B7340] leading-none mb-1">6</div>
                  <h3 className="font-semibold text-[#1A1A1A] mb-1">POŽÁRNÍ ODOLNOST</h3>
                  <p className="text-[#3D3D3D] text-[0.9rem] leading-relaxed">Díky mimořádné měrné tepelné kapacitě a objemové hmotnosti dlouho chrání objekt před plameny</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. STANDARDY (technické specifikace + foto vazníků) */}
      <section className="bg-[#F7F5F0] py-32 px-8">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#8B7340] mb-8 text-center">Specifikace</p>
          <h2 className="font-serif font-bold text-[#1A1A1A] mb-16 text-center text-[clamp(2rem,5vw,3.5rem)]">Standardy domů</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="overflow-hidden">
              <img src="/images/drevostavby/01-vazniky-krov.jpg" alt="Dřevěná konstrukce krovu, vazníky" className="w-full h-auto" />
            </div>
            <div>
              <FAQ items={standardy.map((s) => ({ otazka: s.title, odpoved: s.text }))} />
            </div>
          </div>
        </div>
      </section>

      {/* 8. PROCES SPOLUPRÁCE */}
      <section id="proces" className="bg-white py-32 px-8">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#8B7340] mb-8 text-center">Spolupráce</p>
          <h2 className="font-serif font-bold text-[#1A1A1A] mb-16 text-center text-[clamp(2rem,5vw,3.5rem)]">Jak probíhá spolupráce</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { num: "01", title: "Úvodní konzultace zdarma", text: "Seznámíme se s Vašimi požadavky, možnostmi a představami o Vašem budoucím domě." },
              { num: "02", title: "Studie a projekt", text: "Vypracujeme detailní projekt přesně podle Vašich přání a potřeb." },
              { num: "03", title: "Stavební povolení", text: "Zajistíme všechna potřebná stavební povolení a kolaudační řízení." },
              { num: "04", title: "Výroba a příprava", text: "Prefabrikované prvky se připravují v naší dílně. Pozemek se připravuje na stavbu." },
              { num: "05", title: "Montáž a dokončení", text: "Montáž skeletu, osazení prvků, instalace technologií a finální vybavení domu." },
              { num: "06", title: "Předání a záruka", text: "Předáme Vám hotový dům. Poskytujeme záruku a podporu po předání." },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="font-serif text-[4rem] font-bold text-[#8B7340] mb-4 leading-none">{step.num}</div>
                <h3 className="font-serif text-[1.2rem] font-bold text-[#1A1A1A] mb-3">{step.title}</h3>
                <p className="text-[#3D3D3D] text-[0.95rem] leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-20 bg-[#F7F5F0] p-10 border-t-2 border-[#8B7340]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              <div>
                <p className="text-[#8A8A8A] text-[0.85rem] mb-2">Od konzultace po předání</p>
                <p className="font-serif font-bold text-[2rem] text-[#8B7340]">6-9 měsíců</p>
              </div>
              <div>
                <p className="text-[#8A8A8A] text-[0.85rem] mb-2">Vlastní stavba</p>
                <p className="font-serif font-bold text-[2rem] text-[#8B7340]">4-6 měsíců</p>
              </div>
              <div>
                <p className="text-[#8A8A8A] text-[0.85rem] mb-2">Záruka na práce</p>
                <p className="font-serif font-bold text-[2rem] text-[#8B7340]">5 let</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SROVNÁNÍ */}
      <section className="bg-[#F7F5F0] py-32 px-8">
        <div className="max-w-[1000px] mx-auto">
          <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#8B7340] mb-8 text-center">Porovnání</p>
          <h2 className="font-serif font-bold text-[#1A1A1A] mb-16 text-center text-[clamp(2rem,5vw,3.5rem)]">Dřevostavba vs. zděný dům</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1A1A1A] text-white">
                  <th className="px-6 py-4 text-left font-semibold text-[0.85rem] tracking-[0.05em]">Kritérium</th>
                  <th className="px-6 py-4 text-center font-semibold text-[0.85rem] tracking-[0.05em] text-[#B89B5E]">Dřevostavba</th>
                  <th className="px-6 py-4 text-center font-semibold text-[0.85rem] tracking-[0.05em]">Zděný dům</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Doba výstavby", "4-6 měsíců", "12-18 měsíců"],
                  ["Energetická třída", "B a lepší", "B / C"],
                  ["Náklady na vytápění/rok", "cca 800-1 200 Kč", "cca 3 000-5 000 Kč"],
                  ["Cena za m²", "cca 20-25 tis. Kč", "cca 22-28 tis. Kč"],
                  ["Ekologická stopa", "Velmi nízká", "Vyšší"],
                  ["Životnost", "100+ let", "100+ let"],
                ].map(([label, drevo, zdeny], i) => (
                  <tr key={label} className={`border-b border-[rgba(139,115,64,0.15)] ${i % 2 === 1 ? "bg-white" : ""}`}>
                    <td className="px-6 py-4 font-semibold text-[#1A1A1A]">{label}</td>
                    <td className="px-6 py-4 text-center text-[#6BA73D] font-semibold">{drevo}</td>
                    <td className="px-6 py-4 text-center text-[#8A8A8A]">{zdeny}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-[#8A8A8A] text-sm mt-8">Údaje jsou orientační a mohou se lišit podle konkrétního projektu.</p>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="bg-white py-32 px-8">
        <div className="max-w-[900px] mx-auto">
          <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#8B7340] mb-8 text-center">Máte otázky?</p>
          <h2 className="font-serif font-bold text-[#1A1A1A] mb-16 text-center text-[clamp(2rem,5vw,3.5rem)]">Často kladené otázky</h2>
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* 11. CTA */}
      <section className="bg-gradient-to-br from-[#8B7340] to-[#6B5A2E] py-24 px-8 text-center">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-serif font-bold text-white mb-6 text-[clamp(1.8rem,4vw,2.8rem)]">Chcete si postavit vlastní dřevostavbu?</h2>
          <p className="text-white/90 text-[1.1rem] mb-4 leading-relaxed">Vyplňte formulář nebo nám zavolejte. Konzultace je nezávazná a zdarma.</p>
          <p className="text-white/60 text-[0.9rem] mb-10">Žádné závazky. Společně probereme Vaše možnosti a navrhneme řešení.</p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Link href="/kontakt" className="inline-block bg-white text-[#8B7340] px-12 py-5 font-semibold text-[0.9rem] tracking-[0.1em] uppercase transition-all duration-400 hover:bg-[#F0EDE6] hover:-translate-y-0.5">
              Nezávazná poptávka zdarma
            </Link>
            <Link href="/projekty" className="inline-block bg-transparent text-white px-12 py-5 border border-white/50 font-semibold text-[0.9rem] tracking-[0.1em] uppercase transition-all duration-400 hover:bg-white/10">
              Podívat se na projekty
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
