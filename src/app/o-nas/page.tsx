import type { Metadata } from "next";
import Link from "next/link";
import { getSiteConfig, getUsp, getReference } from "@/lib/supabase/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "O nás | Konrad Home Build",
  description:
    "Poznejte příběh KONRAD HOME BUILD, s.r.o. Špičkoví specialisté na moderní dřevostavby na klíč na jižní Moravě.",
  openGraph: {
    title: "O nás | Konrad Home Build",
    description:
      "Špičkoví specialisté v oblasti stavebnictví se dřevem na jižní Moravě.",
    type: "website",
  },
};

export default async function ONasPage() {
  const [siteConfig, usp, reference] = await Promise.all([
    getSiteConfig(),
    getUsp(),
    getReference(),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] pt-40 pb-24 px-8 text-center">
        <div className="max-w-[900px] mx-auto hero-text">
          <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#B89B5E] mb-6">
            Náš příběh
          </p>
          <h1 className="font-serif font-bold text-white mb-6 text-[clamp(2.5rem,6vw,4rem)]">
            O nás
          </h1>
          <p className="text-white text-[1.1rem] leading-relaxed max-w-[600px] mx-auto">
            {siteConfig.popis}
          </p>
        </div>
      </section>

      {/* Founder Story */}
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

            {/* Story */}
            <div>
              <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#8B7340] mb-6">
                Zakladatel
              </p>
              <h2 className="font-serif font-bold text-[#1A1A1A] mb-6 text-[clamp(1.8rem,4vw,2.5rem)]">
                {siteConfig.zakladatel_jmeno}
              </h2>
              <p className="text-[#3D3D3D] text-[1.05rem] leading-relaxed mb-8">
                {siteConfig.zakladatel_pozice}. S firmou {siteConfig.nazev_kratky} pomáhá rodinám na jižní Moravě realizovat sen o vlastním domě. Každý projekt je pro něj osobní. Staví domy, jako by je stavěl pro svou rodinu.
              </p>

              <blockquote className="border-l-2 border-[#8B7340] pl-6 py-2">
                <p className="font-serif italic text-[#1A1A1A] text-[1.3rem] leading-relaxed mb-3">
                  &ldquo;{siteConfig.zakladatel_citat}&rdquo;
                </p>
                <p className="text-[#8A8A8A] text-[0.85rem] tracking-[0.1em] uppercase">
                  {siteConfig.zakladatel_jmeno}
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Values / USP */}
      <section className="bg-[#F7F5F0] py-32 px-8">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#8B7340] mb-8 text-center">
            Co nás definuje
          </p>
          <h2 className="font-serif font-bold text-[#1A1A1A] mb-16 text-center text-[clamp(2rem,5vw,3.5rem)]">
            Naše hodnoty
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {usp.map((value: any, index: number) => (
              <div key={value.titulek} className="bg-white border-t-2 border-[#8B7340] shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-10 mb-8 lg:mb-0 group transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-[rgba(139,115,64,0.04)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="font-serif text-[3.5rem] font-bold text-[#8B7340] mb-4 leading-none">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-serif text-[1.3rem] font-bold text-[#1A1A1A] mb-4">{value.titulek}</h3>
                  <p className="text-[#3D3D3D] text-[0.95rem] leading-relaxed">{value.popis}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-32 px-8">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#8B7340] mb-8">
            Co nabízíme
          </p>
          <h2 className="font-serif font-bold text-[#1A1A1A] mb-16 text-[clamp(2rem,5vw,3.5rem)]">
            Naše služby
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Dřevostavby na klíč",
                text: "Kompletní realizace rodinných domů v technologii dřevěného skeletu. Od projektu po předání klíčů.",
              },
              {
                title: "Návrh a projekt",
                text: "Individuální návrh domu přesně podle Vašich potřeb a představ. Zajistíme veškerou projektovou dokumentaci.",
              },
              {
                title: "Poradenství",
                text: "Pomůžeme Vám s výběrem pozemku, financováním i technickým řešením. Jsme tu pro Vás od prvního kroku.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-[#F7F5F0] p-10 border-t-2 border-[#8B7340] text-center group transition-all duration-500 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
              >
                <h3 className="font-serif text-[1.5rem] font-bold text-[#1A1A1A] mb-4">
                  {service.title}
                </h3>
                <p className="text-[#3D3D3D] text-[0.95rem] leading-relaxed">
                  {service.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* References */}
      <section className="bg-[#F0EDE6] py-32 px-8">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#8B7340] mb-8 text-center">
            Reference
          </p>
          <h2 className="font-serif font-bold text-[#1A1A1A] mb-16 text-center text-[clamp(2rem,5vw,3.5rem)]">
            Co říkají naši klienti
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {reference.map((ref: any) => (
              <div key={ref.jmeno} className="bg-white p-10 border-t-2 border-[#8B7340] flex flex-col">
                <div className="font-serif text-[3rem] text-[#8B7340] leading-none mb-4">&ldquo;</div>
                <p className="text-[#3D3D3D] text-[0.95rem] leading-relaxed mb-6 italic flex-1">{ref.text}</p>
                <p className="text-[#1A1A1A] font-semibold text-[0.9rem]">{ref.jmeno}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#8B7340] to-[#6B5A2E] py-24 px-8 text-center">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-serif font-bold text-white mb-6 text-[clamp(1.8rem,4vw,2.8rem)]">
            Pojďme spolu postavit Váš vysněný dům
          </h2>
          <p className="text-white/90 text-[1.1rem] mb-4 leading-relaxed">
            Jsme zde pro Vás. Napište nám nebo zavolejte a domluvíme si nezávaznou konzultaci zdarma.
          </p>
          <p className="text-white/60 text-[0.9rem] mb-10">
            Nic Vás to nestojí. Jen se dozvíte, jaké máte možnosti.
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
