import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { FAQ } from "@/components/FAQ";

const faqItems = [
  { otazka: "Jaká je životnost dřevostavby?", odpoved: "Správně postavená dřevostavba má životnost srovnatelnou se zděným domem, tedy 80+ let. V Evropě stojí dřevostavby i 200 let." },
  { otazka: "Dostanu na dřevostavbu hypotéku?", odpoved: "Ano, banky dnes běžně hypotéky na dřevostavby poskytují. Rádi vám poradíme, které banky mají s dřevostavbami zkušenosti." },
  { otazka: "Jak dlouho trvá stavba domu?", odpoved: "Od podpisu smlouvy do předání klíčů obvykle 8–12 měsíců. Samotná montáž dřevěné konstrukce trvá jen několik týdnů." },
  { otazka: "Jaká je energetická třída vašich domů?", odpoved: "Standardně stavíme v energetické třídě B (velmi úsporná). Můžeme jít až na pasivní standard." },
  { otazka: "Mohu čerpat dotaci Nová zelená úsporám?", odpoved: "Ano, naše domy splňují podmínky NZÚ. Pomůžeme vám s přípravou podkladů pro žádost." },
  { otazka: "Jaká je požární odolnost?", odpoved: "Moderní dřevostavby splňují veškeré požární normy. Dřevěná konstrukce uzavřená sádrokartonem má stejnou požární odolnost jako zděná stěna." },
  { otazka: "Jak je to se zvukovou izolací?", odpoved: "Při správném provedení dosahují naše stěny a stropy parametrů srovnatelných se zděnými konstrukcemi, běžně 50–55 dB." },
  { otazka: "Jaká je záruka?", odpoved: "Standardní stavební záruka 5 let, na konstrukci delší. Přesné podmínky uvádíme ve smlouvě o dílo." },
  { otazka: "Kolik dřevostavba stojí?", odpoved: "Každý projekt je jedinečný a cena závisí na dispozici, vybavení a lokalitě. Nejlepší je domluvit si nezávaznou konzultaci zdarma." },
  { otazka: "Ve kterých lokalitách stavíte?", odpoved: "Jižní Morava, Moravský Krumlov a okolí do 50 km. Po dohodě i dál." },
];

export const metadata: Metadata = {
  title: "Dřevostavby na klíč | Konrad Home Build",
  description:
    "Moderní dřevostavby na klíč na jižní Moravě. Ekologické, energeticky úsporné a kvalitní domy z přírodních materiálů. Od konzultace po předání klíčů.",
  keywords: "dřevostavby, stavba na klíč, ekologické domy, Jižní Morava, dřevěný dům",
  openGraph: {
    title: "Dřevostavby na klíč | Konrad Home Build",
    description: "Moderní dřevostavby na klíč na jižní Moravě. Ekologické a kvalitní domy z přírodních materiálů.",
    type: "website",
  },
};

export default function DrevostavbyPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex items-center justify-center overflow-hidden bg-[#1a1a1a] pt-40 pb-24 px-8">
        <img
          src="/images/realizace/konradhomebuiled_dvojdomek-1920px@oldrichhrb-1.jpg"
          alt="Dřevostavba Konrad Home Build"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center max-w-[900px] mx-auto hero-text">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="w-10 h-px bg-[#B89B5E]" />
            <span className="text-[0.75rem] tracking-[0.25em] uppercase text-[#B89B5E]">
              Naše služby
            </span>
            <span className="w-10 h-px bg-[#B89B5E]" />
          </div>
          <h1 className="font-serif font-bold text-white mb-6 text-[clamp(2.5rem,6vw,4.5rem)]">
            Dřevostavby na klíč
          </h1>
          <p className="text-white/85 text-[1.1rem] leading-relaxed max-w-[600px] mx-auto mb-10">
            Moderní, ekologické dřevostavby s nejnižšími provozními náklady. Od konzultace přes stavbu až po předání Vašeho vysněného domova.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Link
              href="/kontakt"
              className="bg-[#B89B5E] text-[#1A1A1A] px-10 py-4 font-semibold text-[0.85rem] tracking-[0.1em] uppercase transition-all duration-400 hover:bg-[#D4AE6A] hover:-translate-y-0.5"
            >
              Nezávazná konzultace
            </Link>
            <a
              href="#proces"
              className="bg-transparent text-[#B89B5E] px-10 py-4 border border-[#B89B5E] font-semibold text-[0.85rem] tracking-[0.1em] uppercase transition-all duration-400 hover:bg-[#B89B5E] hover:text-[#1A1A1A]"
            >
              Jak to funguje
            </a>
          </div>
        </div>
      </section>

      {/* Why Wood Frame */}
      <section className="bg-[#F7F5F0] py-32 px-8">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#8B7340] mb-8 text-center">
            Proč dřevostavba
          </p>
          <h2 className="font-serif font-bold text-[#1A1A1A] mb-8 text-center text-[clamp(2rem,5vw,3.5rem)]">
            Výhody moderní dřevostavby
          </h2>
          <p className="text-[#3D3D3D] text-center text-[1.05rem] leading-relaxed max-w-[800px] mx-auto mb-16">
            Dřevostavby představují moderní, udržitelný a ekonomický přístup k výstavbě rodinných domů. Kombinují tradiční kvalitu s nejnovějšími technologiemi.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {[
              { num: "01", title: "Rychlost výstavby", sub: "4-6 měsíců", text: "Díky prefabrikované technologii je doba výstavby výrazně kratší než u tradičních staveb." },
              { num: "02", title: "Energetická úspornost", sub: "Třída A / A+", text: "Stavby s energetickou třídou A a A+ zajišťují minimální náklady na vytápění a chlazení." },
              { num: "03", title: "Ekologické materiály", sub: "100% přírodní", text: "Používáme kvalitní přírodní materiály bez škodlivých látek. Trvale udržitelná stavba." },
              { num: "04", title: "Nižší provozní náklady", sub: "Až 70% úspora", text: "Nižší náklady na energie a údržbu v porovnání s tradičními stavbami." },
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

      {/* Technology & Materials */}
      <section className="bg-white py-32 px-8">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#8B7340] mb-8 text-center">
            Technologie
          </p>
          <h2 className="font-serif font-bold text-[#1A1A1A] mb-16 text-center text-[clamp(2rem,5vw,3.5rem)]">
            Naše technologie a materiály
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              {[
                { title: "Difuzně otevřená konstrukce", text: "Větrané konstrukce s vysokou tepelnou izolací a přirozenou regulací vlhkosti. Zajišťuje zdravé vnitřní klima." },
                { title: "Tepelná čerpadla", text: "Moderní tepelná čerpadla efektivně zajišťují vytápění i chlazení domu s minimální spotřebou elektřiny." },
                { title: "Rekuperace vzduchu", text: "Systém nuceného větrání s rekuperací tepla zajišťuje čerstvý vzduch bez tepelných ztrát." },
                { title: "Podlahové vytápění", text: "Komfortní podlahové vytápění s nízkou teplotou, ideální kombinace s tepelnými čerpadly." },
              ].map((tech) => (
                <div key={tech.title} className="flex gap-5">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#8B7340] flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-serif text-[1.1rem] font-bold text-[#1A1A1A] mb-2">{tech.title}</h3>
                    <p className="text-[#3D3D3D] text-[0.95rem] leading-relaxed">{tech.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Info Box */}
            <div className="bg-gradient-to-br from-[#8B7340] to-[#6B5A2E] p-10 text-white">
              <h3 className="font-serif font-bold text-2xl mb-8">Výhody našeho přístupu</h3>
              <ul className="space-y-5">
                {[
                  "Zdravý vnitřní klimat s přirozenou regulací vlhkosti",
                  "Minimální tepelné mosty a bezchybná tepelná izolace",
                  "Nižší teplota vytápění díky kvalitní izolaci a těsnosti domu",
                  "Individuální řešení a možnost přizpůsobení budoucím potřebám",
                  "Certifikace a záruky na všechny komponenty a práce",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#B89B5E]" />
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="proces" className="bg-[#F7F5F0] py-32 px-8">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#8B7340] mb-8 text-center">
            Spolupráce
          </p>
          <h2 className="font-serif font-bold text-[#1A1A1A] mb-16 text-center text-[clamp(2rem,5vw,3.5rem)]">
            Jak probíhá spolupráce
          </h2>

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

          {/* Timeline stats */}
          <div className="mt-20 bg-white p-10 border-t-2 border-[#8B7340]">
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

      {/* Comparison Table */}
      <section className="bg-white py-32 px-8">
        <div className="max-w-[1000px] mx-auto">
          <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#8B7340] mb-8 text-center">
            Porovnání
          </p>
          <h2 className="font-serif font-bold text-[#1A1A1A] mb-16 text-center text-[clamp(2rem,5vw,3.5rem)]">
            Dřevostavba vs. zděný dům
          </h2>

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
                  ["Energetická třída", "A / A+", "B / C"],
                  ["Náklady na vytápění/rok", "cca 800-1 200 Kč", "cca 3 000-5 000 Kč"],
                  ["Cena za m²", "cca 20-25 tis. Kč", "cca 22-28 tis. Kč"],
                  ["Ekologická stopa", "Velmi nízká", "Vyšší"],
                  ["Životnost", "100+ let", "100+ let"],
                ].map(([label, drevo, zdeny], i) => (
                  <tr key={label} className={`border-b border-[rgba(139,115,64,0.15)] ${i % 2 === 1 ? "bg-[#F7F5F0]" : ""}`}>
                    <td className="px-6 py-4 font-semibold text-[#1A1A1A]">{label}</td>
                    <td className="px-6 py-4 text-center text-[#6BA73D] font-semibold">{drevo}</td>
                    <td className="px-6 py-4 text-center text-[#8A8A8A]">{zdeny}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-[#8A8A8A] text-sm mt-8">
            Údaje jsou orientační a mohou se lišit podle konkrétního projektu, lokality a používaných materiálů.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F5F0] py-32 px-8">
        <div className="max-w-[900px] mx-auto">
          <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#8B7340] mb-8 text-center">
            Máte otázky?
          </p>
          <h2 className="font-serif font-bold text-[#1A1A1A] mb-16 text-center text-[clamp(2rem,5vw,3.5rem)]">
            Často kladené otázky
          </h2>
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#8B7340] to-[#6B5A2E] py-24 px-8 text-center">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-serif font-bold text-white mb-6 text-[clamp(1.8rem,4vw,2.8rem)]">
            Chcete si postavit vlastní dřevostavbu?
          </h2>
          <p className="text-white/90 text-[1.1rem] mb-4 leading-relaxed">
            Vyplňte formulář nebo nám zavolejte. Konzultace je nezávazná a zdarma.
          </p>
          <p className="text-white/60 text-[0.9rem] mb-10">
            Žádné závazky. Společně probereme Vaše možnosti a navrhneme řešení.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Link
              href="/kontakt"
              className="inline-block bg-white text-[#8B7340] px-12 py-5 font-semibold text-[0.9rem] tracking-[0.1em] uppercase transition-all duration-400 hover:bg-[#F0EDE6] hover:-translate-y-0.5"
            >
              Nezávazná poptávka zdarma
            </Link>
            <Link
              href="/projekty"
              className="inline-block bg-transparent text-white px-12 py-5 border border-white/50 font-semibold text-[0.9rem] tracking-[0.1em] uppercase transition-all duration-400 hover:bg-white/10"
            >
              Podívat se na projekty
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
