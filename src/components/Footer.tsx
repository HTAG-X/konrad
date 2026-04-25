"use client";

import Link from "next/link";
import { Phone, Mail } from "lucide-react";

function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}
import siteConfig from "@/data/siteConfig.json";

const footerLinks = [
  { href: "/projekty", label: "Projekty" },
  { href: "/drevostavby", label: "Dřevostavby na klíč" },
  { href: "/o-nas", label: "O nás" },
  { href: "/aktuality", label: "Aktuality" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 pb-12 border-b border-[rgba(139,115,64,0.2)]">
          {/* O nás */}
          <div>
            <h3 className="text-[0.9rem] tracking-[0.15em] uppercase mb-6 text-[#B89B5E] font-sans font-semibold">
              O nás
            </h3>
            <p className="text-white/70 text-[0.9rem] leading-relaxed mb-3">
              Moderní dřevostavby na klíč. Od projektu po předání klíčů.
            </p>
            <a
              href="https://www.google.com/search?kgmid=/g/11l6f9zljh&q=Konrad+Home+Build"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[0.85rem] text-white/70 hover:text-[#B89B5E] transition-colors"
            >
              <span className="text-[#F4B400]">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <span className="font-semibold">5,0 na Google</span>
            </a>
            <div className="mt-4 space-y-1 text-white/50 text-[0.85rem]">
              <p>{siteConfig.adresa}</p>
              <p>IČO: {siteConfig.ico}</p>
              <p>DIČ: {siteConfig.dic}</p>
            </div>
          </div>

          {/* Odkazy */}
          <div>
            <h3 className="text-[0.9rem] tracking-[0.15em] uppercase mb-6 text-[#B89B5E] font-sans font-semibold">
              Odkazy
            </h3>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/70 text-[0.9rem] hover:text-[#B89B5E] transition-colors duration-400"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-[0.9rem] tracking-[0.15em] uppercase mb-6 text-[#B89B5E] font-sans font-semibold">
              Kontakt
            </h3>
            <div className="flex flex-col gap-3 mb-6">
              <a
                href={`tel:${siteConfig.telefon}`}
                className="flex items-center gap-3 text-white/70 hover:text-[#B89B5E] transition-colors duration-400 text-[0.9rem]"
              >
                <Phone className="w-4 h-4" />
                {siteConfig.telefon}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-white/70 hover:text-[#B89B5E] transition-colors duration-400 text-[0.9rem]"
              >
                <Mail className="w-4 h-4" />
                {siteConfig.email}
              </a>
            </div>

            {/* Social Media */}
            <div className="flex gap-4">
              <a
                href={siteConfig.socialniSite.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#B89B5E] transition-colors duration-400"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.socialniSite.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#B89B5E] transition-colors duration-400"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-white/60 text-[0.85rem] flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>&copy; 2026 Konrad Home Build. Všechna práva vyhrazena.</p>
          <Link
            href="/zasady-ochrany-osobnich-udaju"
            className="hover:text-[#B89B5E] transition-colors duration-400"
          >
            Zásady ochrany osobních údajů
          </Link>
        </div>
      </div>
    </footer>
  );
}
