import type { Metadata } from "next";
import projekty from "@/data/projekty.json";
import ProjektyList from "@/components/ProjektyList";

interface Projekt {
  id: number;
  slug: string;
  nazev: string;
  lokalita: string;
  cena: number;
  dispozice: string;
  uzitnaPlocha: number;
  pozemek: number;
  stav: "Volné" | "Rezervace" | "Zamluveno" | "Prodáno";
  hlavniFoto: string;
}

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
  },
};

export default function ProjektyPage() {
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
        <ProjektyList projekty={projekty as Projekt[]} />
      </section>
    </div>
  );
}
