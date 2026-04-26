"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Mail, Phone, Calendar, MapPin, ChevronDown, ChevronUp, Check, Archive, Inbox } from "lucide-react";

interface Poptavka {
  id: number;
  jmeno: string;
  prijmeni: string;
  email: string;
  telefon: string;
  adresa: string;
  predmet: string;
  zprava: string;
  projekt: string | null;
  stav: string;
  poznamka: string | null;
  ip_adresa: string;
  created_at: string;
}

const STAV_BADGE: Record<string, string> = {
  "Nová": "bg-green-100 text-green-800",
  "Zpracováno": "bg-blue-100 text-blue-800",
  "Archiv": "bg-gray-100 text-gray-600",
};

function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PoptavkyPage() {
  const supabase = createClient();
  const [poptavky, setPoptavky] = useState<Poptavka[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"Vše" | "Nová" | "Zpracováno" | "Archiv">("Vše");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from("poptavky")
      .select("*")
      .order("created_at", { ascending: false });

    if (filter !== "Vše") {
      query = query.eq("stav", filter);
    }

    const { data } = await query;
    setPoptavky(data || []);
    setLoading(false);
  }, [filter, supabase]);

  useEffect(() => {
    load();
  }, [load]);

  const updateStav = async (id: number, stav: string) => {
    await supabase.from("poptavky").update({ stav }).eq("id", id);
    load();
  };

  const updatePoznamka = async (id: number, poznamka: string) => {
    await supabase.from("poptavky").update({ poznamka }).eq("id", id);
  };

  const novaCount = poptavky.filter((p) => p.stav === "Nová").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">Poptávky</h1>
          {novaCount > 0 && (
            <span className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              {novaCount} nových
            </span>
          )}
        </div>
      </div>

      {/* Filtry */}
      <div className="flex gap-3 mb-6">
        {(["Vše", "Nová", "Zpracováno", "Archiv"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 text-sm font-semibold transition-colors ${
              filter === s
                ? "bg-[#8B7340] text-white"
                : "bg-white border border-[rgba(139,115,64,0.3)] text-[#3D3D3D] hover:border-[#8B7340]"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-[#8A8A8A]">Načítám...</p>
      ) : poptavky.length === 0 ? (
        <div className="bg-white p-12 border border-[rgba(139,115,64,0.15)] text-center">
          <Inbox size={40} className="mx-auto mb-3 text-[#8A8A8A]" />
          <p className="text-[#8A8A8A]">Žádné poptávky</p>
        </div>
      ) : (
        <div className="space-y-3">
          {poptavky.map((p) => (
            <div
              key={p.id}
              className={`bg-white border transition-colors ${
                p.stav === "Nová"
                  ? "border-green-300"
                  : "border-[rgba(139,115,64,0.15)]"
              }`}
            >
              {/* Header row */}
              <div
                className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-[#F7F5F0] transition-colors"
                onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${STAV_BADGE[p.stav]}`}>
                    {p.stav}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#1A1A1A] truncate">
                      {p.jmeno} {p.prijmeni}
                    </p>
                    <p className="text-sm text-[#8A8A8A] truncate">
                      {p.predmet}{p.projekt ? ` / ${p.projekt}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="text-xs text-[#8A8A8A] hidden sm:block">
                    {formatDateTime(p.created_at)}
                  </span>
                  {expandedId === p.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {/* Expanded detail */}
              {expandedId === p.id && (
                <div className="px-6 pb-6 border-t border-[rgba(139,115,64,0.1)]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {/* Contact info */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail size={14} className="text-[#8B7340]" />
                        <a href={`mailto:${p.email}`} className="text-[#8B7340] hover:underline">{p.email}</a>
                      </div>
                      {p.telefon && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone size={14} className="text-[#8B7340]" />
                          <a href={`tel:${p.telefon}`} className="text-[#8B7340] hover:underline">{p.telefon}</a>
                        </div>
                      )}
                      {p.adresa && (
                        <div className="flex items-center gap-2 text-sm text-[#3D3D3D]">
                          <MapPin size={14} className="text-[#8A8A8A]" />
                          {p.adresa}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-[#8A8A8A]">
                        <Calendar size={14} />
                        {formatDateTime(p.created_at)}
                      </div>
                      {p.ip_adresa && (
                        <p className="text-xs text-[#8A8A8A] font-mono">IP: {p.ip_adresa}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <p className="text-xs text-[#8A8A8A] uppercase tracking-[0.05em] mb-2">Zpráva</p>
                      <p className="text-[#3D3D3D] text-sm leading-relaxed bg-[#F7F5F0] p-4">
                        {p.zprava || "Bez zprávy"}
                      </p>
                    </div>
                  </div>

                  {/* Poznámka */}
                  <div className="mt-4">
                    <p className="text-xs text-[#8A8A8A] uppercase tracking-[0.05em] mb-2">Interní poznámka</p>
                    <textarea
                      defaultValue={p.poznamka || ""}
                      onBlur={(e) => updatePoznamka(p.id, e.target.value)}
                      className="w-full px-4 py-3 border border-[rgba(139,115,64,0.3)] bg-white text-[#3D3D3D] text-sm focus:outline-none focus:border-[#8B7340] resize-none"
                      rows={2}
                      placeholder="Poznámka pro interní potřebu..."
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-4">
                    {p.stav !== "Zpracováno" && (
                      <button
                        onClick={() => updateStav(p.id, "Zpracováno")}
                        className="flex items-center gap-2 bg-[#8B7340] text-white px-4 py-2 text-sm font-semibold hover:bg-[#B89B5E] transition-colors"
                      >
                        <Check size={14} />
                        Označit jako zpracováno
                      </button>
                    )}
                    {p.stav !== "Nová" && (
                      <button
                        onClick={() => updateStav(p.id, "Nová")}
                        className="flex items-center gap-2 border border-[#8B7340] text-[#8B7340] px-4 py-2 text-sm font-semibold hover:bg-[#8B7340] hover:text-white transition-colors"
                      >
                        Vrátit na Nová
                      </button>
                    )}
                    {p.stav !== "Archiv" && (
                      <button
                        onClick={() => updateStav(p.id, "Archiv")}
                        className="flex items-center gap-2 text-[#8A8A8A] px-4 py-2 text-sm hover:text-[#3D3D3D] transition-colors"
                      >
                        <Archive size={14} />
                        Archivovat
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
