"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const darkHeroPages = ["/", "/projekty", "/drevostavby", "/o-nas", "/kontakt", "/aktuality", "/zasady-ochrany-osobnich-udaju"];

const navLinks = [
  { href: "/projekty", label: "Projekty" },
  { href: "/drevostavby", label: "Dřevostavby na klíč" },
  { href: "/o-nas", label: "O nás" },
  { href: "/aktuality", label: "Aktuality" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
  const pathname = usePathname();
  const hasDarkHero = darkHeroPages.includes(pathname);
  const [isScrolled, setIsScrolled] = useState(!hasDarkHero);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!hasDarkHero) {
      setIsScrolled(true);
      return;
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasDarkHero]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled
          ? "bg-white/[0.98] border-b border-[rgba(139,115,64,0.15)] backdrop-blur-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 py-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <img
            src="/images/logo/konrad_wide.png"
            alt="Konrad Home Build"
            className={`h-[46px] w-auto transition-all duration-400 ${
              isScrolled ? "" : "brightness-0 invert"
            }`}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[0.75rem] font-semibold tracking-[0.15em] uppercase transition-colors duration-400 ${
                isScrolled
                  ? "text-[#3D3D3D] hover:text-[#8B7340]"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <Link
          href="/kontakt"
          className={`hidden md:inline-block px-7 py-3 font-semibold text-[0.75rem] tracking-[0.15em] uppercase transition-all duration-400 border ${
            isScrolled
              ? "bg-transparent text-[#8B7340] border-[#8B7340] hover:bg-[#8B7340] hover:text-white"
              : "bg-transparent text-white border-white/70 hover:bg-white hover:text-[#1A1A1A]"
          }`}
        >
          Nezávazná poptávka
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2"
          aria-label="Menu"
        >
          {isMobileMenuOpen ? (
            <X className={`w-6 h-6 ${isScrolled ? "text-[#1A1A1A]" : "text-white"}`} />
          ) : (
            <Menu className={`w-6 h-6 ${isScrolled ? "text-[#1A1A1A]" : "text-white"}`} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white/[0.98] backdrop-blur-[10px] px-8 py-6 flex flex-col gap-5 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#1A1A1A] text-[0.9rem] tracking-[0.1em] uppercase hover:text-[#8B7340] transition-colors duration-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            className="bg-transparent text-[#8B7340] px-7 py-3 border border-[#8B7340] font-semibold text-[0.75rem] tracking-[0.15em] uppercase text-center transition-all duration-400 hover:bg-[#8B7340] hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Nezávazná poptávka
          </Link>
        </nav>
      )}
    </header>
  );
}
