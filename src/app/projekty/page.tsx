import type { Metadata } from "next";
import { getProjekty } from "@/lib/supabase/queries";
import ProjektyList from "@/components/ProjektyList";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Naše projekty | Konrad Home Build",
  description:
    "Prohlédněte si naše aktuální developerské projekty - moderní dřevostavby v Jižní Moravě. Volné domy, rezervace i prodané projekty.",
  keywords: "projekty, domy, dřevostavby, Suchohrdly, Jižní Morava",
  openGraph: {
    title: "Naše projekty | Konrad Home Build",
    description:
      "Prohlédněte si naše aktuální developerské projekty - moderní dřevostavby v Jižní Moravě.",
    type: "website",
    images: [{ url: "https://www.konradhomebuild.cz/images/logo/konrad_wide.png", width: 1200, height: 400, alt: "Konrad Home Build" }],
  },
  alternates: { canonical: "/projekty" },
};

export default async function ProjektyPage() {
  const projekty = await getProjekty();

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] pt-40 pb-20 px-8 text-center">
        <div className="max-w-[900px] mx-auto hero-text">
          <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#B89B5E] mb-6">
            Naše Nabídka
          </p>
          <h1 className="font-serif font-bold text-white mb-6 text-[clamp(2.5rem,6vw,4rem)]">
            Developerské projekty
          </h1>
          <p className="text-white text-[1.1rem] leading-relaxed max-w-[600px] mx-auto">
            Nabízíme přehled našich současných i již realizovaných projektů.
            Každý dům je postaven s péčí o detaily, kvalitu a ekologičnost.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[1400px] mx-auto px-8 py-24">
        <ProjektyList projekty={projekty as any[]} />
      </section>
    </div>
  );
}
