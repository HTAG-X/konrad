"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const consentCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookie_consent="));

    if (!consentCookie) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (necessary: boolean) => {
    const expiresDate = new Date();
    expiresDate.setFullYear(expiresDate.getFullYear() + 1);
    const expires = `expires=${expiresDate.toUTCString()}`;

    const cookieValue = necessary ? "necessary_only" : "all";
    document.cookie = `cookie_consent=${cookieValue};${expires};path=/`;

    setShowBanner(false);
  };

  if (!isClient || !showBanner) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-white/95 p-6 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] animate-slide-up"
      role="dialog"
      aria-label="Cookie Consent"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <p className="text-[#3D3D3D] text-[0.85rem] flex-1">
          Používáme cookies pro zlepšení vašeho zážitku a analýzu návštěvnosti.{" "}
          <Link
            href="/zasady-ochrany-osobnich-udaju"
            className="underline hover:text-[#8B7340] transition-colors"
          >
            Zásady ochrany osobních údajů
          </Link>
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => handleConsent(true)}
            className="px-6 py-2.5 border border-[#8B7340] text-[#8B7340] font-semibold text-[0.75rem] tracking-[0.1em] uppercase transition-all duration-400 hover:bg-[#8B7340] hover:text-white whitespace-nowrap"
          >
            Pouze nezbytné
          </button>
          <button
            onClick={() => handleConsent(false)}
            className="px-6 py-2.5 bg-[#8B7340] text-white font-semibold text-[0.75rem] tracking-[0.1em] uppercase transition-all duration-400 hover:bg-[#B89B5E] whitespace-nowrap"
          >
            Přijmout vše
          </button>
        </div>
      </div>
    </div>
  );
}
