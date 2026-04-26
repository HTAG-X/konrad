import type { Metadata, Viewport } from "next";
import { Montserrat, Poppins } from "next/font/google";
import { headers } from "next/headers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { getSiteConfig } from "@/lib/supabase/queries";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Konrad Home Build | Moderní dřevostavby na klíč",
  description:
    "Stavíme moderní dřevostavby na klíč v Jižní Moravě. Ekologické, energeticky účinné a kvalitní domy z přírodních materiálů. Konrad Home Build vám postaví váš vysněný dům.",
  keywords: "dřevostavby, stavba domu, Jižní Morava, ekologické stavby",
  authors: [{ name: "Konrad Home Build" }],
  metadataBase: new URL("https://www.konradhomebuild.cz"),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "google-verification-code",
  },
  openGraph: {
    title: "Konrad Home Build | Moderní dřevostavby na klíč",
    description:
      "Stavíme moderní dřevostavby na klíč v Jižní Moravě. Ekologické a kvalitní domy z přírodních materiálů.",
    type: "website",
    url: "https://www.konradhomebuild.cz",
    siteName: "Konrad Home Build",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isAdmin = pathname.startsWith("/admin");

  const siteConfig = isAdmin ? null : await getSiteConfig();

  return (
    <html
      lang="cs"
      className={`${montserrat.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className={isAdmin ? "min-h-full font-sans" : "min-h-full flex flex-col font-sans"}>
        {!isAdmin && <Header />}
        {isAdmin ? children : <main className="flex-grow">{children}</main>}
        {!isAdmin && siteConfig && <Footer siteConfig={siteConfig} />}
        {!isAdmin && <CookieConsent />}
      </body>
    </html>
  );
}
