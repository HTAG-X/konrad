import { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { OrganizationJsonLd } from "@/components/JsonLd";
import siteConfig from "@/data/siteConfig.json";

export const metadata: Metadata = {
  title: "Konrad Home Build | Moderní dřevostavby na klíč",
  description: siteConfig.popis,
};

export default function Home() {
  return (
    <>
      <OrganizationJsonLd
        name={siteConfig.nazevFirmy}
        url="https://www.konradhomebuild.cz"
        logo="https://www.konradhomebuild.cz/logo.png"
        address={siteConfig.adresa}
        telephone={siteConfig.telefon}
        sameAs={[
          siteConfig.socialniSite.facebook,
          siteConfig.socialniSite.instagram,
        ]}
      />
      <HomePage />
    </>
  );
}
