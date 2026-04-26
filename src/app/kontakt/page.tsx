import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { ContactFormWrapper } from "@/components/ContactFormWrapper";
import { getSiteConfig } from "@/lib/supabase/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Kontaktujte nás | Konrad Home Build",
  description:
    "Kontaktujte KONRAD HOME BUILD, s.r.o. Suchohrdly u Miroslavi. Moderní dřevostavby na klíč.",
  keywords: "kontakt, Konrad Home Build, Suchohrdly u Miroslavi, Jižní Morava, dřevostavby",
  openGraph: {
    title: "Kontaktujte nás | Konrad Home Build",
    description: "Kontaktujte nás pro více informací o našich službách.",
    type: "website",
    images: [{ url: "https://www.konradhomebuild.cz/images/logo/konrad_wide.png", width: 1200, height: 400, alt: "Konrad Home Build" }],
  },
  alternates: { canonical: "/kontakt" },
};

export default async function KontaktPage() {
  const siteConfig = await getSiteConfig();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] pt-40 pb-20 px-8 text-center">
        <div className="max-w-[900px] mx-auto hero-text">
          <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#B89B5E] mb-6">
            Jsme tu pro Vás
          </p>
          <h1 className="font-serif font-bold text-white mb-6 text-[clamp(2.5rem,6vw,4rem)]">
            Kontaktujte nás
          </h1>
          <p className="text-white text-[1.1rem] leading-relaxed max-w-[600px] mx-auto mb-3">
            Vyplňte formulář nebo nám zavolejte. Konzultace je nezávazná a zdarma. Odpovíme vám do 24 hodin.
          </p>
          <p className="text-white/60 text-[0.9rem] max-w-[500px] mx-auto">
            K ničemu se nezavazujete. Prostě se dozvíte, jaké máte možnosti.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[1400px] mx-auto px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — Form */}
          <div>
            <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#8B7340] mb-4">
              Poptávkový formulář
            </p>
            <h2 className="font-serif font-bold text-[#1A1A1A] mb-8 text-[1.8rem]">
              Napište nám
            </h2>
            <ContactFormWrapper />
          </div>

          {/* Right — Info */}
          <div className="space-y-8">
            {/* Company Info */}
            <div className="bg-[#F7F5F0] p-8 border-t-2 border-[#8B7340]">
              <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-6">
                {siteConfig.nazev_firmy}
              </h3>

              <div className="space-y-5">
                <div className="flex gap-4">
                  <MapPin size={20} className="text-[#8B7340] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[0.75rem] text-[#8A8A8A] uppercase tracking-[0.05em] mb-1">Adresa</p>
                    <p className="text-[#1A1A1A] font-medium">{siteConfig.adresa}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone size={20} className="text-[#8B7340] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[0.75rem] text-[#8A8A8A] uppercase tracking-[0.05em] mb-1">Telefon</p>
                    <a href={`tel:${siteConfig.telefon}`} className="text-[#1A1A1A] font-medium hover:text-[#8B7340] transition-colors">
                      {siteConfig.telefon}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail size={20} className="text-[#8B7340] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[0.75rem] text-[#8A8A8A] uppercase tracking-[0.05em] mb-1">Email</p>
                    <a href={`mailto:${siteConfig.email}`} className="text-[#1A1A1A] font-medium hover:text-[#8B7340] transition-colors">
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="pt-5 border-t border-[rgba(139,115,64,0.15)]">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[0.75rem] text-[#8A8A8A] uppercase tracking-[0.05em] mb-1">IČ</p>
                      <p className="text-[#1A1A1A] font-medium">{siteConfig.ico}</p>
                    </div>
                    <div>
                      <p className="text-[0.75rem] text-[#8A8A8A] uppercase tracking-[0.05em] mb-1">DIČ</p>
                      <p className="text-[#1A1A1A] font-medium">{siteConfig.dic}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-[rgba(139,115,64,0.15)]">
                  <p className="text-[0.75rem] text-[#8A8A8A] uppercase tracking-[0.05em] mb-1">Oblast působnosti</p>
                  <p className="text-[#1A1A1A] font-medium">{siteConfig.pusobnost}</p>
                </div>
              </div>
            </div>

            {/* Google Rating */}
            <a
              href="https://www.google.com/search?kgmid=/g/11l6f9zljh&q=Konrad+Home+Build"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-white p-6 border border-[rgba(139,115,64,0.15)] hover:border-[#8B7340] transition-colors"
            >
              <span className="text-[#F4B400] text-2xl">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <span className="font-semibold text-[#1A1A1A]">5,0 na Google</span>
            </a>

            {/* Opening Hours */}
            <div className="bg-[#F7F5F0] p-8">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={20} className="text-[#8B7340]" />
                <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">Otevírací doba</h3>
              </div>
              <p className="text-[#1A1A1A] font-medium">Pondělí - Pátek</p>
              <p className="text-[#3D3D3D] mb-3">8:00 - 17:00</p>
              <p className="text-[0.8rem] text-[#8A8A8A]">
                V sobotu a neděli jsme zavřeni. Neurgentní zprávy zpracovujeme v pracovních dnech.
              </p>
            </div>

            {/* Founder Contact */}
            <div className="bg-[#1A1A1A] text-white p-8">
              <h3 className="text-[#B89B5E] font-semibold text-[0.9rem] tracking-[0.15em] uppercase mb-4">
                Kontaktní osoba
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-white/60 text-sm mb-1">Jméno</p>
                  <p className="text-lg font-semibold">{siteConfig.zakladatel_jmeno}</p>
                  <p className="text-white/60 text-sm mt-1">{siteConfig.zakladatel_pozice}</p>
                </div>
                <a
                  href={`tel:${siteConfig.telefon}`}
                  className="flex items-center gap-2 text-white/80 hover:text-[#B89B5E] transition-colors"
                >
                  <Phone size={18} />
                  <span className="font-medium">{siteConfig.telefon}</span>
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 text-white/80 hover:text-[#B89B5E] transition-colors"
                >
                  <Mail size={18} />
                  <span className="font-medium">{siteConfig.email}</span>
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gradient-to-br from-[#8B7340] to-[#B89B5E] p-8 min-h-64 flex items-center justify-center text-white/80">
              <div className="text-center">
                <MapPin size={40} className="mx-auto mb-4" />
                <p className="font-semibold tracking-[0.05em]">{siteConfig.pusobnost}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
