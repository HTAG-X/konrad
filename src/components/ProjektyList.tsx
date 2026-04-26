"use client";

import { useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

interface Projekt {
  id: number;
  slug: string;
  nazev: string;
  lokalita: string;
  cena: number;
  dispozice: string;
  uzitna_plocha: number;
  pozemek: number;
  stav: "Volné" | "Rezervace" | "Zamluveno" | "Prodáno";
  hlavni_foto: string;
}

interface ProjektyListProps {
  projekty: Projekt[];
}

const filterOptions = ["Vše", "Volné", "Rezervace", "Zamluveno", "Prodáno"] as const;

export default function ProjektyList({ projekty }: ProjektyListProps) {
  const [filter, setFilter] = useState<"Vše" | "Volné" | "Rezervace" | "Zamluveno" | "Prodáno">("Vše");

  const filteredProjekty =
    filter === "Vše" ? projekty : projekty.filter((p) => p.stav === filter);

  return (
    <>
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3 mb-12 justify-center">
        {filterOptions.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-6 py-3 font-semibold text-[0.75rem] tracking-[0.15em] uppercase transition-all duration-400 border ${
              filter === status
                ? "bg-[#8B7340] text-white border-[#8B7340]"
                : "bg-transparent text-[#8B7340] border-[#8B7340] hover:bg-[#8B7340] hover:text-white"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredProjekty.map((projekt) => (
          <Link key={projekt.id} href={`/projekty/${projekt.slug}`}>
            <div className="group bg-white border border-transparent shadow-[0_4px_12px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-500 hover:border-[#8B7340] hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] h-full flex flex-col">
              {/* Image */}
              <div className="relative h-[300px] bg-[#F7F5F0] overflow-hidden">
                <img
                  src={projekt.hlavni_foto}
                  alt={projekt.nazev}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Badge */}
                <span
                  className={`absolute top-6 left-6 px-5 py-2 font-semibold text-[0.75rem] tracking-[0.1em] uppercase bg-white/95 border ${
                    projekt.stav === "Volné"
                      ? "border-[#6BA73D] text-[#6BA73D]"
                      : projekt.stav === "Rezervace"
                      ? "border-[#C9A96E] text-[#C9A96E]"
                      : projekt.stav === "Zamluveno"
                      ? "border-[#D97706] text-[#D97706]"
                      : "border-[#999] text-[#999] line-through opacity-60"
                  }`}
                >
                  {projekt.stav}
                </span>
              </div>

              {/* Content */}
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="font-serif text-[1.5rem] font-bold text-[#1A1A1A] mb-2">
                  {projekt.nazev}
                </h3>
                <p className="text-[#8A8A8A] text-[0.9rem] tracking-[0.05em] mb-4">
                  {projekt.lokalita}
                </p>

                <div className="font-serif text-[2rem] font-bold text-[#8B7340] mb-6">
                  {formatPrice(projekt.cena)}
                </div>

                {/* Specs */}
                <div className="flex gap-8 pt-6 mt-auto border-t border-[rgba(139,115,64,0.15)]">
                  <div className="flex-1 text-center">
                    <div className="font-serif text-[1.1rem] font-bold text-[#1A1A1A]">
                      {projekt.dispozice}
                    </div>
                    <div className="text-[0.7rem] text-[#8A8A8A] uppercase tracking-[0.1em] mt-1">
                      Dispozice
                    </div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="font-serif text-[1.1rem] font-bold text-[#1A1A1A]">
                      {projekt.uzitna_plocha} m²
                    </div>
                    <div className="text-[0.7rem] text-[#8A8A8A] uppercase tracking-[0.1em] mt-1">
                      Užitná plocha
                    </div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="font-serif text-[1.1rem] font-bold text-[#1A1A1A]">
                      {projekt.pozemek} m²
                    </div>
                    <div className="text-[0.7rem] text-[#8A8A8A] uppercase tracking-[0.1em] mt-1">
                      Pozemek
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredProjekty.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[#8A8A8A] text-lg">
            V této kategorii momentálně nemáme žádné projekty.
          </p>
        </div>
      )}
    </>
  );
}
