import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // Staré stránky z původního webu (Wix)
      {
        source: "/sluzby",
        destination: "/drevostavby",
        permanent: true,
      },
      {
        source: "/book-online",
        destination: "/kontakt",
        permanent: true,
      },
      {
        source: "/zasady-pouzivani-souboru-cookie",
        destination: "/zasady-ochrany-osobnich-udaju",
        permanent: true,
      },
      // Staré detaily domů (Wix product pages)
      {
        source: "/product-page/:slug*",
        destination: "/projekty",
        permanent: true,
      },
      // Wix store pages
      {
        source: "/store-products-sitemap.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/store-categories-sitemap.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/pages-sitemap.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    unoptimized: true,
  },
};

export default nextConfig;
