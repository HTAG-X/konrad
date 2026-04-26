import HomePage from "@/components/HomePage";
import { OrganizationJsonLd } from "@/components/JsonLd";
import { getProjekty, getSiteConfig, getUsp, getReference } from "@/lib/supabase/queries";

export const revalidate = 60;

export default async function Home() {
  const [projekty, siteConfig, usp, reference] = await Promise.all([
    getProjekty(),
    getSiteConfig(),
    getUsp(),
    getReference(),
  ]);

  return (
    <>
      <OrganizationJsonLd
        name={siteConfig.nazev_firmy}
        url="https://www.konradhomebuild.cz"
        logo="https://www.konradhomebuild.cz/logo.png"
        address={siteConfig.adresa}
        telephone={siteConfig.telefon}
        sameAs={[
          siteConfig.facebook_url,
          siteConfig.instagram_url,
        ]}
      />
      <HomePage
        projekty={projekty}
        siteConfig={siteConfig}
        usp={usp}
        reference={reference}
      />
    </>
  );
}
