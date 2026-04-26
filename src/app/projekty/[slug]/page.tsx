import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Home, Ruler, Zap, Phone, Mail, ArrowLeft, Check } from "lucide-react";
import { ProjectGallery } from "@/components/ProjectGallery";
import { getProjektBySlug } from "@/lib/supabase/queries";
import { getStaticProjektySlugs, getStaticProjektBySlug } from "@/lib/supabase/static";
import { formatPrice } from "@/lib/utils";
import { PropertyJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { PudorysPreview } from "@/components/PudorysPreview";

export const revalidate = 60;

interface ProjektyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getStaticProjektySlugs();
  return slugs.map((p: any) => ({ slug: p.slug }));
}

export async function generateMetadata(props: ProjektyDetailPageProps): Promise<Metadata> {
  const params = await props.params;
  let projekt;
  try {
    projekt = await getStaticProjektBySlug(params.slug);
  } catch {
    return { title: "Projekt nenalezen" };
  }
  if (!projekt) return { title: "Projekt nenalezen" };

  return {
    title: `${projekt.nazev} | Konrad Home Build`,
    description: projekt.popis,
    keywords: `${projekt.nazev}, ${projekt.lokalita}, dům, dřevostavba, ${projekt.dispozice}, ${projekt.energeticka_trida}`,
    openGraph: {
      title: projekt.nazev,
      description: projekt.popis,
      type: "website",
      url: `https://www.konradhomebuild.cz/projekty/${projekt.slug}`,
    },
    alternates: { canonical: `/projekty/${projekt.slug}` },
  };
}

export default async function ProjektyDetailPage(props: ProjektyDetailPageProps) {
  const params = await props.params;
  let projekt;
  try {
    projekt = await getProjektBySlug(params.slug);
  } catch {
    notFound();
  }
  if (!projekt) notFound();

  const breadcrumbItems = [
    { name: "Úvod", url: "https://www.konradhomebuild.cz/" },
    { name: "Projekty", url: "https://www.konradhomebuild.cz/projekty" },
    { name: projekt.nazev, url: `https://www.konradhomebuild.cz/projekty/${projekt.slug}` },
  ];

  return (
    <div className="bg-white">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <PropertyJsonLd
        name={projekt.nazev}
        description={projekt.popis}
        url={`https://www.konradhomebuild.cz/projekty/${projekt.slug}`}
        price={projekt.cena}
        priceCurrency="CZK"
        availability={projekt.stav}
        addressStreet={projekt.lokalita}
        addressCity="Suchohrdly u Miroslavi"
        addressPostalCode="671 72"
        addressCountry="CZ"
        floorSize={projekt.uzitna_plocha}
      />

      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-8 pt-28 pb-4">
        <nav className="flex items-center gap-2 text-[0.85rem] text-[#8A8A8A]">
          <Link href="/" className="hover:text-[#8B7340] transition-colors">Úvod</Link>
          <span>/</span>
          <Link href="/projekty" className="hover:text-[#8B7340] transition-colors">Projekty</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium line-clamp-1">{projekt.nazev}</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="max-w-[1400px] mx-auto px-8 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
          <div className="flex-1 mb-4 sm:mb-0">
            <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold text-[#1A1A1A] mb-3">
              {projekt.nazev}
            </h1>
            <div className="flex items-center gap-2 text-[#8A8A8A]">
              <MapPin size={20} />
              <span>{projekt.lokalita}</span>
            </div>
          </div>
          <span
            className={`px-5 py-2 font-semibold text-[0.75rem] tracking-[0.1em] uppercase bg-white border ${
              projekt.stav === "Volné"
                ? "border-[#6BA73D] text-[#6BA73D]"
                : projekt.stav === "Rezervace"
                ? "border-[#C9A96E] text-[#C9A96E]"
                : projekt.stav === "Zamluveno"
                ? "border-[#D97706] text-[#D97706]"
                : "border-[#999] text-[#999] line-through opacity-60"
            }`}
          >
            {projekt.stav}
          </span>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-[1400px] mx-auto px-8 mb-12">
        <ProjectGallery
          nazev={projekt.nazev}
          hlavniFoto={projekt.hlavni_foto}
          fotogalerie={projekt.fotogalerie}
          pudorys={projekt.pudorys}
        />
      </div>

      {/* Content Grid */}
      <div className="max-w-[1400px] mx-auto px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Price */}
            <div className="mb-10">
              <p className="text-[0.75rem] text-[#8A8A8A] uppercase tracking-[0.1em] mb-2">Cena</p>
              <p className="font-serif text-[3rem] font-bold text-[#8B7340]">
                {formatPrice(projekt.cena)}
              </p>
              {projekt.poznamka_cena && (
                <p className="text-[0.85rem] text-[#8A8A8A] mt-2">{projekt.poznamka_cena}</p>
              )}
            </div>

            {/* Parameters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 pb-12 border-b border-[rgba(139,115,64,0.15)]">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Home size={18} className="text-[#8B7340]" />
                  <p className="text-[0.8rem] text-[#8A8A8A] uppercase tracking-[0.05em]">Dispozice</p>
                </div>
                <p className="font-serif text-2xl font-bold text-[#1A1A1A]">{projekt.dispozice}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Ruler size={18} className="text-[#8B7340]" />
                  <p className="text-[0.8rem] text-[#8A8A8A] uppercase tracking-[0.05em]">Užitná plocha</p>
                </div>
                <p className="font-serif text-2xl font-bold text-[#1A1A1A]">{projekt.uzitna_plocha} m²</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Ruler size={18} className="text-[#8B7340]" />
                  <p className="text-[0.8rem] text-[#8A8A8A] uppercase tracking-[0.05em]">Pozemek</p>
                </div>
                <p className="font-serif text-2xl font-bold text-[#1A1A1A]">{projekt.pozemek} m²</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={18} className="text-[#8B7340]" />
                  <p className="text-[0.8rem] text-[#8A8A8A] uppercase tracking-[0.05em]">Energ. třída</p>
                </div>
                <p className="font-serif text-2xl font-bold text-[#1A1A1A]">{projekt.energeticka_trida}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">O projektu</h2>
              <div
                className="text-[#3D3D3D] leading-[1.8] text-[1.05rem] [&_p]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-4 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_li]:mb-1 [&_blockquote]:border-l-2 [&_blockquote]:border-[#8B7340] [&_blockquote]:pl-4 [&_blockquote]:italic [&_a]:text-[#8B7340] [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: projekt.popis || "" }}
              />
            </div>

            {/* Features */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-6">Vybavení a vlastnosti</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projekt.vybava.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check size={18} className="text-[#6BA73D] flex-shrink-0 mt-0.5" />
                    <span className="text-[#3D3D3D]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column — Sidebar */}
          <div className="lg:col-span-1">
            {/* Půdorys */}
            {projekt.pudorys && (
              <PudorysPreview src={projekt.pudorys} nazev={projekt.nazev} />
            )}

            {/* Broker Contact */}
            <div className="bg-[#1A1A1A] text-white p-6 mb-6">
              <h3 className="font-semibold mb-4 text-lg text-[#B89B5E]">Kontaktní osoba</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-white/60 mb-1">Jméno</p>
                  <p className="font-semibold text-lg">{projekt.maklerka_jmeno}</p>
                </div>
                <a
                  href={`tel:${projekt.maklerka_telefon}`}
                  className="flex items-center gap-2 text-white/80 hover:text-[#B89B5E] transition-colors"
                >
                  <Phone size={18} />
                  <span className="font-medium">{projekt.maklerka_telefon}</span>
                </a>
                <a
                  href={`mailto:${projekt.maklerka_email}`}
                  className="flex items-center gap-2 text-white/80 hover:text-[#B89B5E] transition-colors text-sm break-all"
                >
                  <Mail size={18} />
                  <span className="font-medium">{projekt.maklerka_email}</span>
                </a>
              </div>
            </div>

            {/* CTA */}
            <Link
              href={`/kontakt?projekt=${encodeURIComponent(projekt.nazev)}`}
              className="block w-full bg-[#8B7340] text-white font-semibold py-4 text-center text-[0.85rem] tracking-[0.1em] uppercase transition-all duration-400 hover:bg-[#B89B5E] mb-2"
            >
              Nezávazná poptávka zdarma
            </Link>
            <p className="text-[0.8rem] text-[#8A8A8A] text-center mb-6">K ničemu se nezavazujete</p>

            {/* Back Link */}
            <Link
              href="/projekty"
              className="flex items-center gap-2 text-[#8A8A8A] hover:text-[#8B7340] font-medium transition-colors"
            >
              <ArrowLeft size={18} />
              <span>Zpět na seznam projektů</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
