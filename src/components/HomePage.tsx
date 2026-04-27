"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";

const GOOGLE_REVIEW_URL =
  "https://www.google.com/search?kgmid=/g/11l6f9zljh&q=Konrad+Home+Build";

const partneri = [
  { nazev: "Solodoor", logo: "/images/partneri/solodoor.png", url: "https://www.solodoor.cz", square: true },
  { nazev: "PTÁČEK", logo: "/images/partneri/ptacek.png", url: "https://www.ptacek.cz", square: true },
  { nazev: "PRO-DOMA", logo: "/images/partneri/pro-doma.png", url: "https://www.pro-doma.cz", square: false },
  { nazev: "Supellex", logo: "/images/partneri/supellex.png", url: "https://www.supellex.cz", square: false },
];

function GoogleStars({ className = "" }: { className?: string }) {
  return (
    <a
      href={GOOGLE_REVIEW_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 hover:opacity-80 transition-opacity ${className}`}
    >
      <span className="text-[#F4B400] text-lg">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
      <span className="font-semibold">5,0</span>
      <span className="opacity-70">na Google</span>
    </a>
  );
}

interface HomePageProps {
  projekty: any[];
  siteConfig: any;
  usp: any[];
  reference: any[];
}

export default function HomePage({ projekty, siteConfig, usp, reference }: HomePageProps) {
  const featuredProperties = projekty.filter(
    (p: any) => p.stav === "Volné" || p.stav === "Rezervace"
  );

  return (
    <div>
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#1a1a1a]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-center px-8 max-w-[900px] mx-auto animate-[fadeInUp_1s_ease-out] hero-text">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="w-10 h-px bg-[#B89B5E]" />
            <span className="text-[0.75rem] tracking-[0.25em] uppercase text-[#B89B5E]">
              Moderní dřevostavby na klíč
            </span>
            <span className="w-10 h-px bg-[#B89B5E]" />
          </div>

          <h1 className="font-serif font-bold text-white mb-6 leading-[1.1] tracking-tight text-[clamp(3rem,8vw,6rem)]">
            Stavíme domy pro vaši budoucnost
          </h1>

          <p className="text-white mb-12 leading-relaxed max-w-[600px] mx-auto text-[clamp(1rem,1.8vw,1.15rem)]">
            Špičkoví specialisté v oblasti dřevostaveb. Každý projekt je jedinečný a navržen s péčí o detaily.
          </p>

          <div className="flex gap-6 justify-center flex-wrap mb-10">
            <Link
              href="/projekty"
              className="bg-[#B89B5E] text-[#1A1A1A] px-10 py-4 font-semibold text-[0.85rem] tracking-[0.1em] uppercase transition-all duration-400 hover:bg-[#D4AE6A] hover:-translate-y-0.5"
            >
              Prohlédnout Portfolio
            </Link>
            <Link
              href="/kontakt"
              className="bg-transparent text-[#B89B5E] px-10 py-4 border border-[#B89B5E] font-semibold text-[0.85rem] tracking-[0.1em] uppercase transition-all duration-400 hover:bg-[#B89B5E] hover:text-[#1A1A1A]"
            >
              Nezávazná konzultace
            </Link>
          </div>

          {/* Google rating badge */}
          <GoogleStars className="text-white text-[0.85rem]" />
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#B89B5E] hero-text text-[0.8rem] tracking-[0.1em] uppercase animate-pulse text-center">
          Rolujte dolů
          <div className="w-5 h-5 mt-2 mx-auto border-l border-b border-[#B89B5E] -rotate-45 animate-bounce" />
        </div>
      </section>

      {/* ==================== SOCIAL PROOF NUMBERS ==================== */}
      <section className="bg-[#1A1A1A] py-16 px-8">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10 text-center text-white">
          <div>
            <div className="font-serif text-[3.5rem] font-bold text-[#B89B5E] leading-none mb-2">22</div>
            <p className="text-white/70 text-[0.85rem]">let zkušeností v oboru</p>
          </div>
          <div>
            <div className="font-serif text-[3.5rem] font-bold text-[#B89B5E] leading-none mb-2">25+</div>
            <p className="text-white/70 text-[0.85rem]">dokončených rodinných domů</p>
          </div>
          <div>
            <div className="font-serif text-[3.5rem] font-bold text-[#B89B5E] leading-none mb-2">25+</div>
            <p className="text-white/70 text-[0.85rem]">spokojených rodin</p>
          </div>
          <div>
            <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">
              <div className="font-serif text-[3.5rem] font-bold text-[#F4B400] leading-none mb-2">5,0 &#9733;</div>
              <p className="text-white/70 text-[0.85rem]">hodnocení na Google</p>
            </a>
          </div>
        </div>
      </section>

      {/* ==================== USP SECTION ==================== */}
      <section className="bg-[#F7F5F0] py-32 px-8">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#8B7340] mb-8 text-center">
            Naše Přednosti
          </p>
          <h2 className="font-serif font-bold text-[#1A1A1A] mb-16 text-center text-[clamp(2rem,5vw,3.5rem)]">
            Proč právě Konrad Home Build?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {usp.map((u: any, index: number) => (
              <div
                key={u.titulek}
                className="bg-white border-t-2 border-[#8B7340] shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-10 mb-8 lg:mb-0 relative overflow-hidden group transition-all duration-500"
              >
                <div className="absolute inset-0 bg-[rgba(139,115,64,0.04)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="font-serif text-[3.5rem] font-bold text-[#8B7340] mb-4 leading-none">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-serif text-[1.3rem] font-bold text-[#1A1A1A] mb-4">
                    {u.titulek}
                  </h3>
                  <p className="text-[#3D3D3D] text-[0.95rem] leading-relaxed">
                    {u.popis}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED PROPERTIES ==================== */}
      <section className="bg-white py-32 px-8">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#8B7340] mb-8 text-center">
            Aktuální Nabídka
          </p>
          <h2 className="font-serif font-bold text-[#1A1A1A] mb-16 text-center text-[clamp(2rem,5vw,3.5rem)]">
            Naše Projekty
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            {featuredProperties.slice(0, 3).map((property) => (
              <Link
                key={property.id}
                href={`/projekty/${property.slug}`}
                className="group bg-white border border-transparent shadow-[0_4px_12px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-500 hover:border-[#8B7340] hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
              >
                <div className="w-full h-[400px] bg-[#F7F5F0] relative overflow-hidden">
                  <img
                    src={property.hlavni_foto}
                    alt={property.nazev}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span
                    className={`absolute top-6 left-6 px-5 py-2 font-semibold text-[0.75rem] tracking-[0.1em] uppercase bg-white/95 border ${
                      property.stav === "Volné"
                        ? "border-[#6BA73D] text-[#6BA73D]"
                        : property.stav === "Rezervace"
                        ? "border-[#C9A96E] text-[#C9A96E]"
                        : property.stav === "Zamluveno"
                        ? "border-[#D97706] text-[#D97706]"
                        : "border-[#999] text-[#999] line-through opacity-60"
                    }`}
                  >
                    {property.stav}
                  </span>
                </div>

                <div className="p-8">
                  <h3 className="font-serif text-[1.5rem] font-bold text-[#1A1A1A] mb-2">
                    {property.nazev}
                  </h3>
                  <p className="text-[#8A8A8A] text-[0.9rem] tracking-[0.05em] mb-6">
                    {property.lokalita}
                  </p>
                  <div className="font-serif text-[2rem] font-bold text-[#8B7340] mb-6">
                    {formatPrice(property.cena)}
                  </div>

                  <div className="flex gap-8 pt-6 border-t border-[rgba(139,115,64,0.15)]">
                    <div className="flex-1 text-center">
                      <div className="font-serif text-[1.3rem] font-bold text-[#1A1A1A]">
                        {property.uzitna_plocha} m²
                      </div>
                      <div className="text-[0.75rem] text-[#8A8A8A] uppercase tracking-[0.1em] mt-2">
                        Plocha
                      </div>
                    </div>
                    <div className="flex-1 text-center">
                      <div className="font-serif text-[1.3rem] font-bold text-[#1A1A1A]">
                        {property.dispozice}
                      </div>
                      <div className="text-[0.75rem] text-[#8A8A8A] uppercase tracking-[0.1em] mt-2">
                        Dispozice
                      </div>
                    </div>
                    <div className="flex-1 text-center">
                      <div className="font-serif text-[1.3rem] font-bold text-[#1A1A1A]">
                        {property.pozemek} m²
                      </div>
                      <div className="text-[0.75rem] text-[#8A8A8A] uppercase tracking-[0.1em] mt-2">
                        Pozemek
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/projekty"
              className="inline-block bg-transparent text-[#8B7340] px-10 py-4 border border-[#8B7340] font-semibold text-[0.85rem] tracking-[0.1em] uppercase transition-all duration-400 hover:bg-[#8B7340] hover:text-white"
            >
              Zobrazit všechny projekty
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== PROCESS SECTION ==================== */}
      <section className="bg-[#F7F5F0] py-32 px-8">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#8B7340] mb-8 text-center">
            Náš Postup
          </p>
          <h2 className="font-serif font-bold text-[#1A1A1A] mb-16 text-center text-[clamp(2rem,5vw,3.5rem)]">
            Cesta k Vašemu Domu
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { num: "01", title: "Konzultace", text: "Nasloucháme Vašim přáním a představám. Probereme rozpočet, styl a funkčnost." },
              { num: "02", title: "Návrh", text: "Naši odborníci vytvoří jedinečný projekt přesně podle Vašich potřeb a představ." },
              { num: "03", title: "Příprava", text: "Zajistíme všechny doklady, povolení a příslušné certifikace." },
              { num: "04", title: "Realizace", text: "Stavba pod dohledem zkušených odborníků s využitím kvalitních materiálů a moderních technologií." },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="font-serif text-[5rem] font-bold text-[#8B7340] mb-4 leading-none">
                  {step.num}
                </div>
                <h3 className="font-serif text-[1.3rem] font-bold text-[#1A1A1A] mb-4">
                  {step.title}
                </h3>
                <p className="text-[#3D3D3D] text-[0.95rem] leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== REFERENCE SECTION ==================== */}
      <section className="bg-white py-32 px-8">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#8B7340] mb-8 text-center">
            Reference
          </p>
          <h2 className="font-serif font-bold text-[#1A1A1A] mb-6 text-center text-[clamp(2rem,5vw,3.5rem)]">
            Co říkají naši klienti
          </h2>
          <p className="text-center mb-16">
            <GoogleStars className="text-[#3D3D3D] text-[0.9rem]" />
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {reference.map((ref: any) => (
              <div
                key={ref.jmeno}
                className="bg-[#F7F5F0] p-10 border-t-2 border-[#8B7340] relative flex flex-col"
              >
                <div className="font-serif text-[3rem] text-[#8B7340] leading-none mb-4">
                  &ldquo;
                </div>
                <p className="text-[#3D3D3D] text-[0.95rem] leading-relaxed mb-6 italic flex-1">
                  {ref.text}
                </p>
                <p className="text-[#1A1A1A] font-semibold text-[0.9rem] tracking-[0.05em]">
                  {ref.jmeno}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FOUNDER SECTION ==================== */}
      <section className="bg-white py-32 px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Photo */}
            <div className="flex justify-center">
              <div className="w-full max-w-[480px] overflow-hidden">
                <img
                  src="/images/team/lubomir-konrad-1200w.jpg"
                  alt="Lubomír Konrad"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#8B7340] mb-6">
                Zakladatel
              </p>
              <h2 className="font-serif font-bold text-[#1A1A1A] mb-2 text-[clamp(1.8rem,4vw,2.5rem)]">
                Jmenuji se Lubomír Konrad
              </h2>
              <p className="text-[#8A8A8A] text-[0.9rem] tracking-[0.05em] mb-8">
                Zakladatel &middot; Odborník v oboru stavitelství
              </p>
              <p className="text-[#3D3D3D] text-[1.05rem] leading-relaxed mb-6">
                Odborník v oboru stavitelství s dlouholetými zkušenostmi. Detailní přístup ke každému projektu je zárukou kvality a spokojenosti našich zákazníků.
              </p>
              <p className="text-[#3D3D3D] text-[1.05rem] leading-relaxed">
                Společnost Konrad Home Build se zaměřuje na stavbu kvalitních rodinných domů v technologii dřevěného skeletu. Náš tým má bohaté zkušenosti a je připraven poskytnout komplexní služby od projektu po předání hotového domu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== QUOTE SECTION ==================== */}
      <section className="bg-[#F0EDE6] py-24 px-8 text-center">
        <div className="max-w-[900px] mx-auto">
          <div className="text-[2rem] text-[#8B7340] mb-8">&ldquo;</div>
          <p className="font-serif font-normal italic text-[#1A1A1A] mb-8 leading-relaxed text-[clamp(1.5rem,4vw,2.5rem)]">
            {siteConfig.zakladatel_citat}
          </p>
          <p className="text-[#3D3D3D] text-[0.9rem] tracking-[0.15em] uppercase">
            {siteConfig.zakladatel_jmeno}, {siteConfig.zakladatel_pozice?.toLowerCase()}
          </p>
        </div>
      </section>

      {/* ==================== PARTNERS SECTION ==================== */}
      <section className="bg-[#F7F5F0] py-20 px-8">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#8B7340] mb-8 text-center">
            Spolehliví dodavatelé
          </p>
          <h2 className="font-serif font-bold text-[#1A1A1A] mb-6 text-center text-[clamp(1.5rem,4vw,2.5rem)]">
            Naši partneři
          </h2>
          <p className="text-[#3D3D3D] text-[0.95rem] text-center mb-16 max-w-[600px] mx-auto">
            Při stavbě Vašeho domu pracujeme výhradně s ověřenými dodavateli kvalitních materiálů.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center">
            {partneri.map((partner) => (
              <a
                key={partner.nazev}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-[80px] p-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              >
                <img
                  src={partner.logo}
                  alt={partner.nazev}
                  className={`w-auto h-auto object-contain ${
                    partner.square ? "max-h-[150px] max-w-[210px]" : "max-h-[50px] max-w-[180px]"
                  }`}
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="bg-gradient-to-br from-[#8B7340] to-[#6B5A2E] py-24 px-8 text-center">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-serif font-bold text-white mb-6 text-[clamp(1.8rem,4vw,2.8rem)]">
            Máte zájem o vlastní dřevostavbu?
          </h2>
          <p className="text-white/90 text-[1.1rem] mb-4 leading-relaxed">
            Vyplňte formulář nebo nám zavolejte. Domluvíme si nezávaznou konzultaci zdarma a vše probereme.
          </p>
          <p className="text-white/60 text-[0.9rem] mb-10">
            Žádné závazky. Žádné poplatky. Prostě se dozvíte, co je možné.
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-white text-[#8B7340] px-12 py-5 font-semibold text-[0.9rem] tracking-[0.1em] uppercase transition-all duration-400 hover:bg-[#F0EDE6] hover:-translate-y-0.5"
          >
            Nezávazná poptávka zdarma
          </Link>
        </div>
      </section>
    </div>
  );
}
