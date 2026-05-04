"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ImageUploader } from "./ImageUploader";
import { Copy, Eye, Trash2, X } from "lucide-react";
import { RichTextEditor } from "./RichTextEditor";
import { logAction } from "@/lib/auditLog";

interface PropertyFormProps {
  initialData?: Record<string, any>;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatPriceDisplay(value: number | string): string {
  const num = typeof value === "string" ? parseInt(value) : value;
  if (!num || isNaN(num)) return "";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const stavOptions = ["Volné", "Rezervace", "Zamluveno", "Prodáno"];
const stavColors: Record<string, string> = {
  Volné: "bg-green-500",
  Rezervace: "bg-amber-500",
  Zamluveno: "bg-orange-500",
  Prodáno: "bg-gray-500",
};
const energieOptions = ["A+", "A", "B", "C", "D"];

const inputClass =
  "w-full px-4 py-3 border border-[rgba(139,115,64,0.3)] bg-white text-[#3D3D3D] focus:outline-none focus:border-[#8B7340] transition-colors";
const labelClass =
  "block text-[0.8rem] font-semibold text-[#3D3D3D] mb-2 tracking-[0.05em] uppercase";

export function PropertyForm({ initialData }: PropertyFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const isEdit = !!initialData?.id;

  const [form, setForm] = useState({
    nazev: initialData?.nazev || "",
    lokalita: initialData?.lokalita || "",
    cena: initialData?.cena || "",
    poznamka_cena: initialData?.poznamka_cena || "",
    dispozice: initialData?.dispozice || "4+kk",
    uzitna_plocha: initialData?.uzitna_plocha || "",
    pozemek: initialData?.pozemek || "",
    energeticka_trida: initialData?.energeticka_trida || "B",
    stav: initialData?.stav || "Volné",
    typ_domu: initialData?.typ_domu || "",
    druh_objektu: initialData?.druh_objektu || "Dřevostavba",
    stav_domu: initialData?.stav_domu || "Novostavba",
    realizace: initialData?.realizace || "",
    popis: initialData?.popis || "",
    vybava: "", // unused, using vybavaItems instead
    maklerka_jmeno: initialData?.maklerka_jmeno || "",
    maklerka_telefon: initialData?.maklerka_telefon || "",
    maklerka_email: initialData?.maklerka_email || "",
    published: initialData?.published ?? true,
  });

  const [vybavaItems, setVybavaItems] = useState<string[]>(
    Array.isArray(initialData?.vybava) ? initialData.vybava : []
  );

  const [fotogalerie, setFotogalerie] = useState<string[]>(
    initialData?.fotogalerie || []
  );
  const [hlavniFoto, setHlavniFoto] = useState<string>(
    initialData?.hlavni_foto || ""
  );
  const [pudorys, setPudorys] = useState<string>(initialData?.pudorys || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const slug = isEdit
    ? initialData?.slug
    : slugify(form.nazev) || "novy-projekt";

  const update = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const data = {
      slug: isEdit ? initialData.slug : slugify(form.nazev) + "-" + Date.now().toString(36),
      nazev: form.nazev,
      lokalita: form.lokalita,
      cena: parseInt(String(form.cena)) || 0,
      poznamka_cena: form.poznamka_cena,
      dispozice: form.dispozice,
      uzitna_plocha: parseInt(String(form.uzitna_plocha)) || 0,
      pozemek: parseInt(String(form.pozemek)) || 0,
      energeticka_trida: form.energeticka_trida,
      stav: form.stav,
      typ_domu: form.typ_domu,
      druh_objektu: form.druh_objektu,
      stav_domu: form.stav_domu,
      realizace: form.realizace,
      popis: form.popis,
      vybava: vybavaItems.filter(Boolean),
      fotogalerie: fotogalerie,
      hlavni_foto: hlavniFoto,
      pudorys: pudorys,
      maklerka_jmeno: form.maklerka_jmeno,
      maklerka_telefon: form.maklerka_telefon,
      maklerka_email: form.maklerka_email,
      published: form.published,
    };

    let result;
    if (isEdit) {
      result = await supabase
        .from("projekty")
        .update(data)
        .eq("id", initialData.id);
    } else {
      result = await supabase.from("projekty").insert(data);
    }

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }

    await logAction({
      akce: isEdit ? "Úprava projektu" : "Vytvoření projektu",
      tabulka: "projekty",
      zaznam_id: initialData?.id,
      zaznam_nazev: form.nazev,
    });

    router.push("/admin/projekty");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!confirm("Opravdu chcete smazat tento projekt? Tato akce je nevratná."))
      return;

    const { error } = await supabase
      .from("projekty")
      .update({ deleted: true, published: false })
      .eq("id", initialData?.id);

    if (error) {
      setError(error.message);
      return;
    }

    await logAction({
      akce: "Smazání projektu",
      tabulka: "projekty",
      zaznam_id: initialData?.id,
      zaznam_nazev: form.nazev,
    });

    router.push("/admin/projekty");
    router.refresh();
  };

  const handleDuplicate = async () => {
    const data = {
      slug: slugify(form.nazev + " kopie") + "-" + Date.now().toString(36),
      nazev: form.nazev + " (kopie)",
      lokalita: form.lokalita,
      cena: parseInt(String(form.cena)) || 0,
      poznamka_cena: form.poznamka_cena,
      dispozice: form.dispozice,
      uzitna_plocha: parseInt(String(form.uzitna_plocha)) || 0,
      pozemek: parseInt(String(form.pozemek)) || 0,
      energeticka_trida: form.energeticka_trida,
      stav: "Volné",
      typ_domu: form.typ_domu,
      druh_objektu: form.druh_objektu,
      stav_domu: form.stav_domu,
      realizace: form.realizace,
      popis: form.popis,
      vybava: vybavaItems.filter(Boolean),
      fotogalerie: fotogalerie,
      hlavni_foto: hlavniFoto,
      pudorys: pudorys,
      maklerka_jmeno: form.maklerka_jmeno,
      maklerka_telefon: form.maklerka_telefon,
      maklerka_email: form.maklerka_email,
      published: false,
    };

    const { data: newProject, error } = await supabase
      .from("projekty")
      .insert(data)
      .select("id")
      .single();

    if (error) {
      setError(error.message);
      return;
    }

    await logAction({
      akce: "Duplikace projektu",
      tabulka: "projekty",
      zaznam_id: newProject.id,
      zaznam_nazev: form.nazev + " (kopie)",
    });

    router.push(`/admin/projekty/${newProject.id}`);
    router.refresh();
  };

  // Pudorys upload handler
  const handlePudorysUpload = async (files: FileList) => {
    const file = files[0];
    if (!file) return;
    const ext = file.name.split(".").pop();
    const fileName = `pudorys-${Date.now()}.${ext}`;
    const path = `${slug}/${fileName}`;

    const { error } = await supabase.storage
      .from("projekty-images")
      .upload(path, file, { cacheControl: "31536000" });

    if (error) {
      setError("Chyba při nahrávání půdorysu: " + error.message);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("projekty-images").getPublicUrl(path);
    setPudorys(publicUrl);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-6 text-sm">
          {error}
        </div>
      )}

      {/* Top bar: status + actions (sticky) */}
      <div className="bg-white p-6 border border-[rgba(139,115,64,0.15)] mb-6 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Published toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              className={`w-12 h-6 rounded-full relative transition-colors ${
                form.published ? "bg-green-500" : "bg-gray-300"
              }`}
              onClick={() => update("published", !form.published)}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  form.published ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </div>
            <span className="text-sm font-medium text-[#3D3D3D]">
              {form.published ? "Publikováno" : "Koncept (draft)"}
            </span>
          </label>

          {/* Stav */}
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${stavColors[form.stav]}`}
            />
            <select
              value={form.stav}
              onChange={(e) => update("stav", e.target.value)}
              className="text-sm border border-[rgba(139,115,64,0.3)] px-3 py-1.5 focus:outline-none focus:border-[#8B7340]"
            >
              {stavOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isEdit && (
            <>
              <a
                href={`/projekty/${initialData.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-[rgba(139,115,64,0.3)] text-[#3D3D3D] px-4 py-2 text-sm hover:border-[#8B7340] transition-colors"
              >
                <Eye size={16} />
                Náhled
              </a>
              <button
                type="button"
                onClick={handleDuplicate}
                className="flex items-center gap-2 border border-[rgba(139,115,64,0.3)] text-[#3D3D3D] px-4 py-2 text-sm hover:border-[#8B7340] transition-colors"
              >
                <Copy size={16} />
                Duplikovat
              </button>
            </>
          )}
          <button
            type="submit"
            disabled={saving}
            className="bg-[#8B7340] text-white px-6 py-2 font-semibold text-sm tracking-[0.05em] uppercase hover:bg-[#B89B5E] transition-colors disabled:opacity-50"
          >
            {saving ? "Ukládám..." : isEdit ? "Uložit změny" : "Vytvořit projekt"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Základní údaje */}
          <div className="bg-white p-8 border border-[rgba(139,115,64,0.15)]">
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A] mb-6">
              Základní údaje
            </h2>
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Název projektu</label>
                <input
                  type="text"
                  value={form.nazev}
                  onChange={(e) => update("nazev", e.target.value)}
                  className={inputClass}
                  placeholder="RD 4+kk Hostěradice"
                  required
                />
                <p className="text-xs text-[#8A8A8A] mt-1">
                  URL: /projekty/{isEdit ? initialData?.slug : slugify(form.nazev) || "..."}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Lokalita</label>
                  <input
                    type="text"
                    value={form.lokalita}
                    onChange={(e) => update("lokalita", e.target.value)}
                    className={inputClass}
                    placeholder="Hostěradice, okres Znojmo"
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Dispozice</label>
                  <input
                    type="text"
                    value={form.dispozice}
                    onChange={(e) => update("dispozice", e.target.value)}
                    className={inputClass}
                    placeholder="4+kk"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Cena a parametry */}
          <div className="bg-white p-8 border border-[rgba(139,115,64,0.15)]">
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A] mb-6">
              Cena a parametry
            </h2>
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Cena (Kč)</label>
                  <input
                    type="number"
                    value={form.cena}
                    onChange={(e) => update("cena", e.target.value)}
                    className={inputClass}
                    placeholder="7300000"
                  />
                  {form.cena && (
                    <p className="text-sm text-[#8B7340] font-semibold mt-1">
                      {formatPriceDisplay(form.cena)} Kč
                    </p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Poznámka k ceně</label>
                  <input
                    type="text"
                    value={form.poznamka_cena}
                    onChange={(e) => update("poznamka_cena", e.target.value)}
                    className={inputClass}
                    placeholder="Cena vč. DPH. Provize RK..."
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className={labelClass}>Užitná plocha (m²)</label>
                  <input
                    type="number"
                    value={form.uzitna_plocha}
                    onChange={(e) => update("uzitna_plocha", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Pozemek (m²)</label>
                  <input
                    type="number"
                    value={form.pozemek}
                    onChange={(e) => update("pozemek", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Energetická třída</label>
                  <select
                    value={form.energeticka_trida}
                    onChange={(e) =>
                      update("energeticka_trida", e.target.value)
                    }
                    className={inputClass}
                  >
                    {energieOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Typ a stav */}
          <div className="bg-white p-8 border border-[rgba(139,115,64,0.15)]">
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A] mb-6">
              Typ a realizace
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Typ domu</label>
                <input
                  type="text"
                  value={form.typ_domu}
                  onChange={(e) => update("typ_domu", e.target.value)}
                  className={inputClass}
                  placeholder="Přízemní polořadový"
                />
              </div>
              <div>
                <label className={labelClass}>Druh objektu</label>
                <input
                  type="text"
                  value={form.druh_objektu}
                  onChange={(e) => update("druh_objektu", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Stav domu</label>
                <input
                  type="text"
                  value={form.stav_domu}
                  onChange={(e) => update("stav_domu", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Realizace</label>
                <input
                  type="text"
                  value={form.realizace}
                  onChange={(e) => update("realizace", e.target.value)}
                  className={inputClass}
                  placeholder="2026"
                />
              </div>
            </div>
          </div>

          {/* Popis a vybavení */}
          <div className="bg-white p-8 border border-[rgba(139,115,64,0.15)]">
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A] mb-6">
              Popis a vybavení
            </h2>
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Popis projektu</label>
                <RichTextEditor
                  content={form.popis}
                  onChange={(html) => update("popis", html)}
                  placeholder="Popište projekt..."
                />
              </div>
              <div>
                <label className={labelClass}>Vybavení</label>
                <div className="space-y-2">
                  {vybavaItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const updated = [...vybavaItems];
                          updated[index] = e.target.value;
                          setVybavaItems(updated);
                        }}
                        className={inputClass}
                        placeholder="Název položky"
                      />
                      <button
                        type="button"
                        onClick={() => setVybavaItems(vybavaItems.filter((_, i) => i !== index))}
                        className="p-3 text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setVybavaItems([...vybavaItems, ""])}
                  className="mt-3 text-[#8B7340] text-sm font-semibold hover:text-[#B89B5E] transition-colors"
                >
                  + Přidat položku
                </button>
              </div>
            </div>
          </div>

          {/* Fotogalerie */}
          <div className="bg-white p-8 border border-[rgba(139,115,64,0.15)]">
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A] mb-6">
              Fotogalerie
            </h2>
            <ImageUploader
              images={fotogalerie}
              onChange={setFotogalerie}
              mainImage={hlavniFoto}
              onMainImageChange={setHlavniFoto}
              bucket="projekty-images"
              folder={isEdit ? initialData.slug : slugify(form.nazev) || "temp"}
            />
          </div>

          {/* Půdorys */}
          <div className="bg-white p-8 border border-[rgba(139,115,64,0.15)]">
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A] mb-6">
              Půdorys
            </h2>
            {pudorys ? (
              <div className="relative inline-block">
                <img
                  src={pudorys}
                  alt="Půdorys"
                  className="max-h-64 border border-[rgba(139,115,64,0.15)]"
                />
                <button
                  type="button"
                  onClick={() => setPudorys("")}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label className="block border-2 border-dashed border-[rgba(139,115,64,0.3)] p-6 text-center cursor-pointer hover:border-[#8B7340] transition-colors">
                <p className="text-[#3D3D3D] font-medium">
                  Klikněte pro nahrání půdorysu
                </p>
                <p className="text-[#8A8A8A] text-sm mt-1">
                  JPG, PNG, WebP
                </p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) handlePudorysUpload(e.target.files);
                  }}
                />
              </label>
            )}
          </div>
        </div>

        {/* Right column - sidebar */}
        <div className="space-y-6">
          {/* Kontaktní osoba */}
          <div className="bg-white p-8 border border-[rgba(139,115,64,0.15)]">
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A] mb-6">
              Kontaktní osoba
            </h2>
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Jméno</label>
                <input
                  type="text"
                  value={form.maklerka_jmeno}
                  onChange={(e) => update("maklerka_jmeno", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Telefon</label>
                <input
                  type="text"
                  value={form.maklerka_telefon}
                  onChange={(e) => update("maklerka_telefon", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  value={form.maklerka_email}
                  onChange={(e) => update("maklerka_email", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Delete */}
          {isEdit && (
            <div className="bg-white p-8 border border-red-200">
              <h2 className="font-serif text-lg font-bold text-red-700 mb-4">
                Smazat projekt
              </h2>
              <p className="text-sm text-[#8A8A8A] mb-4">
                Tato akce je nevratná. Projekt bude trvale odstraněn.
              </p>
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 font-semibold text-sm hover:bg-red-700 transition-colors"
              >
                <Trash2 size={16} />
                Smazat projekt
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
