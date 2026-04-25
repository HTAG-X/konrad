"use client";

interface OrganizationJsonLdProps {
  name?: string;
  url?: string;
  logo?: string;
  address?: string;
  telephone?: string;
  sameAs?: string[];
}

interface PropertyJsonLdProps {
  name: string;
  description: string;
  url: string;
  price: number;
  priceCurrency?: string;
  availability: string;
  addressStreet?: string;
  addressCity?: string;
  addressPostalCode?: string;
  addressCountry?: string;
  floorSize: number;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

interface ArticleJsonLdProps {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}

export function OrganizationJsonLd({
  name = "Konrad Home Build",
  url = "https://www.konradhomebuild.cz",
  logo = "https://www.konradhomebuild.cz/logo.png",
  address = "Nová Hospodarka 123, 691 68 Miroslav, Česká republika",
  telephone = "+420 736 562 341",
  sameAs = [
    "https://www.facebook.com/konradhomebuild",
    "https://www.instagram.com/konradhomebuild",
  ],
}: OrganizationJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.split(",")[0],
      addressLocality: "Miroslav",
      postalCode: "691 68",
      addressCountry: "CZ",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone,
    },
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function PropertyJsonLd({
  name,
  description,
  url,
  price,
  priceCurrency = "CZK",
  availability,
  addressStreet = "Suchohrdly u Miroslavi",
  addressCity = "Miroslav",
  addressPostalCode = "691 68",
  addressCountry = "CZ",
  floorSize,
}: PropertyJsonLdProps) {
  const availabilityMap: { [key: string]: string } = {
    Volné: "https://schema.org/InStock",
    Rezervace: "https://schema.org/PreOrder",
    Prodáno: "https://schema.org/OutOfStock",
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name,
    description,
    url,
    image: "",
    address: {
      "@type": "PostalAddress",
      streetAddress: addressStreet,
      addressLocality: addressCity,
      postalCode: addressPostalCode,
      addressCountry,
    },
    offers: {
      "@type": "Offer",
      price: price.toString(),
      priceCurrency,
      availability: availabilityMap[availability] || "https://schema.org/InStock",
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: floorSize.toString(),
      unitCode: "MTK",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleJsonLd({
  headline,
  description,
  author,
  datePublished,
  dateModified,
  image,
  url,
}: ArticleJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    author: {
      "@type": "Person",
      name: author,
    },
    datePublished,
    dateModified: dateModified || datePublished,
    image: image || "",
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
