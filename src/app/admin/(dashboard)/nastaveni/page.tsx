"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { X, Plus, Trash2, ScrollText } from "lucide-react";

interface SiteConfig {
  id: number;
  nazev_firmy: string;
  nazev_kratky: string;
  popis: string;
  telefon: string;
  email: string;
  adresa: string;
  ico: string;
  dic: string;
  web: string;
  pusobnost: string;
  facebook_url: string;
  instagram_url: string;
  zakladatel_jmeno: string;
  zakladatel_pozice: string;
  zakladatel_citat: string;
  zakladatel_foto: string;
  sluzby: string[];
  partneri: boolean;
}

interface UspItem {
  id?: number;
  titulek: string;
  popis: string;
  poradi: number;
}

export default function NastaveniAdminPage() {
  const supabase = createClient();

  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [usp, setUsp] = useState<UspItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [configRes, uspRes] = await Promise.all([
      supabase.from("site_config").select("*").eq("id", 1).single(),
      supabase.from("usp").select("*").order("poradi", { ascending: true }),
    ]);

    if (configRes.error) {
      setError(configRes.error.message);
    } else {
      setConfig(configRes.data as SiteConfig);
    }

    if (!uspRes.error) {
      setUsp(uspRes.data || []);
    }

    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateConfig = (field: keyof SiteConfig, value: string | boolean | string[]) => {
    if (!config) return;
    setConfig({ ...config, [field]: value });
  };

  const addUsp = () => {
    setUsp((prev) => [...prev, { titulek: "", popis: "", poradi: prev.length + 1 }]);
  };

  const removeUsp = (index: number) => {
    setUsp((prev) => prev.filter((_, i) => i !== index));
  };

  const updateUsp = (index: number, field: keyof UspItem, value: string | number) => {
    setUsp((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleSave = async () => {
    if (!config) return;
    setSaving(true);
    setError(null);
    setSuccess(false);

    // Update site_config
    const { id, ...configPayload } = config;
    const { error: configError } = await supabase
      .from("site_config")
      .update(configPayload)
      .eq("id", 1);

    if (configError) {
      setError(configError.message);
      setSaving(false);
      return;
    }

    // Replace all USP items
    const { error: deleteError } = await supabase
      .from("usp")
      .delete()
      .gte("id", 0);

    if (deleteError) {
      setError(deleteError.message);
      setSaving(false);
      return;
    }

    if (usp.length > 0) {
      const uspPayload = usp.map((item, i) => ({
        titulek: item.titulek,
        popis: item.popis,
        poradi: i + 1,
      }));

      const { error: insertError } = await supabase
        .from("usp")
        .insert(uspPayload);

      if (insertError) {
        setError(insertError.message);
        setSaving(false);
        return;
      }
    }

    setSuccess(true);
    setSaving(false);

    setTimeout(() => setSuccess(false), 3000);
  };

  const inputClass =
    "w-full px-4 py-3 border border-[rgba(139,115,64,0.3)] bg-white text-[#3D3D3D] focus:outline-none focus:border-[#8B7340] transition-colors";
  const labelClass =
    "block text-[0.8rem] font-semibold text-[#3D3D3D] mb-2 tracking-[0.05em] uppercase";

  if (loading || !config) {
    return (
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-8">Nastavení</h1>
        <p className="text-[#8A8A8A]">Načítám...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">
          Nastavení
        </h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#8B7340] text-white px-6 py-3 font-semibold text-sm tracking-[0.05em] uppercase hover:bg-[#B89B5E] transition-colors disabled:opacity-50"
        >
          {saving ? "Ukládám..." : "Uložit vše"}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 text-sm">
          Nastavení bylo úspěšně uloženo.
        </div>
      )}

      {/* Firma */}
      <div className="bg-white p-8 border border-[rgba(139,115,64,0.15)] mb-6">
        <h2 className="font-serif text-lg font-bold text-[#1A1A1A] mb-6">
          Firma
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Název firmy</label>
            <input
              type="text"
              value={config.nazev_firmy || ""}
              onChange={(e) => updateConfig("nazev_firmy", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Název krátký</label>
            <input
              type="text"
              value={config.nazev_kratky || ""}
              onChange={(e) => updateConfig("nazev_kratky", e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Popis</label>
            <textarea
              value={config.popis || ""}
              onChange={(e) => updateConfig("popis", e.target.value)}
              className={inputClass}
              rows={3}
            />
          </div>
          <div>
            <label className={labelClass}>IČO</label>
            <input
              type="text"
              value={config.ico || ""}
              onChange={(e) => updateConfig("ico", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>DIČ</label>
            <input
              type="text"
              value={config.dic || ""}
              onChange={(e) => updateConfig("dic", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Kontakt */}
      <div className="bg-white p-8 border border-[rgba(139,115,64,0.15)] mb-6">
        <h2 className="font-serif text-lg font-bold text-[#1A1A1A] mb-6">
          Kontakt
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Telefon</label>
            <input
              type="text"
              value={config.telefon || ""}
              onChange={(e) => updateConfig("telefon", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              value={config.email || ""}
              onChange={(e) => updateConfig("email", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Adresa</label>
            <input
              type="text"
              value={config.adresa || ""}
              onChange={(e) => updateConfig("adresa", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Web</label>
            <input
              type="text"
              value={config.web || ""}
              onChange={(e) => updateConfig("web", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Působnost</label>
            <input
              type="text"
              value={config.pusobnost || ""}
              onChange={(e) => updateConfig("pusobnost", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Socialni site */}
      <div className="bg-white p-8 border border-[rgba(139,115,64,0.15)] mb-6">
        <h2 className="font-serif text-lg font-bold text-[#1A1A1A] mb-6">
          Sociální sítě
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Facebook URL</label>
            <input
              type="text"
              value={config.facebook_url || ""}
              onChange={(e) => updateConfig("facebook_url", e.target.value)}
              className={inputClass}
              placeholder="https://facebook.com/..."
            />
          </div>
          <div>
            <label className={labelClass}>Instagram URL</label>
            <input
              type="text"
              value={config.instagram_url || ""}
              onChange={(e) => updateConfig("instagram_url", e.target.value)}
              className={inputClass}
              placeholder="https://instagram.com/..."
            />
          </div>
        </div>
      </div>

      {/* Zakladatel */}
      <div className="bg-white p-8 border border-[rgba(139,115,64,0.15)] mb-6">
        <h2 className="font-serif text-lg font-bold text-[#1A1A1A] mb-6">
          Zakladatel
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Jméno</label>
            <input
              type="text"
              value={config.zakladatel_jmeno || ""}
              onChange={(e) => updateConfig("zakladatel_jmeno", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Pozice</label>
            <input
              type="text"
              value={config.zakladatel_pozice || ""}
              onChange={(e) => updateConfig("zakladatel_pozice", e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Citát</label>
            <textarea
              value={config.zakladatel_citat || ""}
              onChange={(e) => updateConfig("zakladatel_citat", e.target.value)}
              className={inputClass}
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* USP */}
      <div className="bg-white p-8 border border-[rgba(139,115,64,0.15)] mb-6">
        <h2 className="font-serif text-lg font-bold text-[#1A1A1A] mb-6">
          USP (Unikátní prodejní body)
        </h2>

        <div className="space-y-4">
          {usp.map((item, index) => (
            <div
              key={index}
              className="p-4 border border-[rgba(139,115,64,0.15)] relative"
            >
              <button
                type="button"
                onClick={() => removeUsp(index)}
                className="absolute top-3 right-3 text-[#8A8A8A] hover:text-red-600 transition-colors"
                title="Odebrat USP"
              >
                <X size={18} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Titulek</label>
                  <input
                    type="text"
                    value={item.titulek}
                    onChange={(e) => updateUsp(index, "titulek", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Popis</label>
                  <textarea
                    value={item.popis}
                    onChange={(e) => updateUsp(index, "popis", e.target.value)}
                    className={inputClass}
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addUsp}
          className="mt-4 border border-[#8B7340] text-[#8B7340] px-6 py-3 font-semibold text-sm hover:bg-[#8B7340] hover:text-white transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          Přidat USP
        </button>
      </div>

      {/* Správa systému */}
      <div className="bg-white p-8 border border-[rgba(139,115,64,0.15)] mt-8">
        <h2 className="font-serif text-lg font-bold text-[#1A1A1A] mb-6">
          Správa systému
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/admin/nastaveni/kos"
            className="flex items-center gap-3 p-4 border border-[rgba(139,115,64,0.15)] hover:border-[#8B7340] transition-colors"
          >
            <Trash2 size={20} className="text-[#8A8A8A]" />
            <div>
              <p className="font-semibold text-[#1A1A1A]">Koš</p>
              <p className="text-xs text-[#8A8A8A]">Obnovení smazaných záznamů</p>
            </div>
          </Link>
          <Link
            href="/admin/nastaveni/log"
            className="flex items-center gap-3 p-4 border border-[rgba(139,115,64,0.15)] hover:border-[#8B7340] transition-colors"
          >
            <ScrollText size={20} className="text-[#8A8A8A]" />
            <div>
              <p className="font-semibold text-[#1A1A1A]">Log aktivit</p>
              <p className="text-xs text-[#8A8A8A]">Kdo co kdy udělal</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
