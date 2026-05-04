"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { logAction } from "@/lib/auditLog";
import { ImageUploader } from "./ImageUploader";
import { Copy, Eye, Trash2, Image as ImageIconLucide } from "lucide-react";
import { RichTextEditor } from "./RichTextEditor";
import { ImagePicker } from "./ImagePicker";

interface BlogPostFormProps {
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

const inputClass =
  "w-full px-4 py-3 border border-[rgba(139,115,64,0.3)] bg-white text-[#3D3D3D] focus:outline-none focus:border-[#8B7340] transition-colors";
const labelClass =
  "block text-[0.8rem] font-semibold text-[#3D3D3D] mb-2 tracking-[0.05em] uppercase";

export function BlogPostForm({ initialData }: BlogPostFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const isEdit = !!initialData?.id;

  const [form, setForm] = useState({
    titulek: initialData?.titulek || "",
    datum: initialData?.datum
      ? String(initialData.datum).substring(0, 10)
      : new Date().toISOString().substring(0, 10),
    autor: initialData?.autor || "",
    kratky_popis: initialData?.kratky_popis || "",
    obsah: initialData?.obsah || "",
    published: initialData?.published ?? false,
  });

  const [nahledovyObrazek, setNahledovyObrazek] = useState<string[]>(
    initialData?.nahledovy_obrazek ? [initialData.nahledovy_obrazek] : []
  );
  const [mainImage, setMainImage] = useState<string>(
    initialData?.nahledovy_obrazek || ""
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const slug = isEdit
    ? initialData?.slug
    : slugify(form.titulek) || "novy-clanek";

  const update = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const data = {
      slug: isEdit ? initialData.slug : slugify(form.titulek) + "-" + Date.now().toString(36),
      titulek: form.titulek,
      datum: form.datum,
      autor: form.autor || null,
      kratky_popis: form.kratky_popis || null,
      obsah: form.obsah || null,
      nahledovy_obrazek: nahledovyObrazek[0] || null,
      published: form.published,
    };

    let result;
    if (isEdit) {
      result = await supabase
        .from("blog_posts")
        .update(data)
        .eq("id", initialData.id);
    } else {
      result = await supabase.from("blog_posts").insert(data);
    }

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }

    await logAction({
      akce: isEdit ? "Úprava článku" : "Vytvoření článku",
      tabulka: "blog_posts",
      zaznam_id: initialData?.id,
      zaznam_nazev: form.titulek,
    });

    router.push("/admin/blog");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!confirm("Opravdu chcete smazat tento článek? Tato akce je nevratná.")) return;

    const { error } = await supabase
      .from("blog_posts")
      .update({ deleted: true, published: false })
      .eq("id", initialData?.id);

    if (error) {
      setError(error.message);
      return;
    }

    await logAction({
      akce: "Smazání článku",
      tabulka: "blog_posts",
      zaznam_id: initialData?.id,
      zaznam_nazev: form.titulek,
    });

    router.push("/admin/blog");
    router.refresh();
  };

  const handleDuplicate = async () => {
    const data = {
      slug: slugify(form.titulek + " kopie") + "-" + Date.now().toString(36),
      titulek: form.titulek + " (kopie)",
      datum: form.datum,
      autor: form.autor || null,
      kratky_popis: form.kratky_popis || null,
      obsah: form.obsah || null,
      nahledovy_obrazek: nahledovyObrazek[0] || null,
      published: false,
    };

    const { data: newPost, error } = await supabase
      .from("blog_posts")
      .insert(data)
      .select("id")
      .single();

    if (error) {
      setError(error.message);
      return;
    }

    await logAction({
      akce: "Duplikace článku",
      tabulka: "blog_posts",
      zaznam_id: newPost.id,
      zaznam_nazev: form.titulek + " (kopie)",
    });

    router.push(`/admin/blog/${newPost.id}`);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-6 text-sm">
          {error}
        </div>
      )}

      {/* Top bar (sticky) */}
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
        </div>

        <div className="flex items-center gap-3">
          {isEdit && (
            <>
              <a
                href={`/aktuality/${initialData.slug}`}
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
            {saving ? "Ukládám..." : isEdit ? "Uložit změny" : "Vytvořit článek"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Základní údaje */}
          <div className="bg-white p-8 border border-[rgba(139,115,64,0.15)]">
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A] mb-6">
              Základní údaje
            </h2>
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Titulek</label>
                <input
                  type="text"
                  value={form.titulek}
                  onChange={(e) => update("titulek", e.target.value)}
                  className={inputClass}
                  placeholder="Název článku"
                  required
                />
                <p className="text-xs text-[#8A8A8A] mt-1">
                  URL: /aktuality/{isEdit ? initialData?.slug : slugify(form.titulek) || "..."}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Datum</label>
                  <input
                    type="date"
                    value={form.datum}
                    onChange={(e) => update("datum", e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Autor</label>
                  <input
                    type="text"
                    value={form.autor}
                    onChange={(e) => update("autor", e.target.value)}
                    className={inputClass}
                    placeholder="Jméno autora"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Krátký popis */}
          <div className="bg-white p-8 border border-[rgba(139,115,64,0.15)]">
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A] mb-6">
              Krátký popis
            </h2>
            <textarea
              value={form.kratky_popis}
              onChange={(e) => update("kratky_popis", e.target.value)}
              className={`${inputClass} resize-none`}
              rows={3}
              placeholder="Krátký popis pro výpis článků..."
            />
          </div>

          {/* Obsah */}
          <div className="bg-white p-8 border border-[rgba(139,115,64,0.15)]">
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A] mb-6">
              Obsah článku
            </h2>
            <RichTextEditor
              content={form.obsah}
              onChange={(html) => update("obsah", html)}
              placeholder="Začněte psát článek..."
            />
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Náhledový obrázek */}
          <div className="bg-white p-8 border border-[rgba(139,115,64,0.15)]">
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A] mb-6">
              Náhledový obrázek
            </h2>

            {/* Preview */}
            {nahledovyObrazek.length > 0 && nahledovyObrazek[0] ? (
              <div className="mb-4 relative inline-block">
                <img
                  src={nahledovyObrazek[0]}
                  alt="Náhled"
                  className="max-h-48 border border-[rgba(139,115,64,0.15)]"
                />
                <button
                  type="button"
                  onClick={() => { setNahledovyObrazek([]); setMainImage(""); }}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ) : null}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowPicker(true)}
                className="flex items-center gap-2 border border-[#8B7340] text-[#8B7340] px-4 py-2.5 text-sm font-semibold hover:bg-[#8B7340] hover:text-white transition-colors"
              >
                <ImageIconLucide size={16} />
                Vybrat z knihovny
              </button>
              <ImageUploader
                images={[]}
                onChange={(imgs) => {
                  if (imgs.length > 0) {
                    setNahledovyObrazek([imgs[imgs.length - 1]]);
                    setMainImage(imgs[imgs.length - 1]);
                  }
                }}
                mainImage=""
                onMainImageChange={() => {}}
                bucket="blog-images"
                folder={isEdit ? initialData.slug : slugify(form.titulek) || "temp"}
              />
            </div>
          </div>

          {showPicker && (
            <ImagePicker
              onSelect={(url) => {
                setNahledovyObrazek([url]);
                setMainImage(url);
              }}
              onClose={() => setShowPicker(false)}
            />
          )}

          {/* Smazat */}
          {isEdit && (
            <div className="bg-white p-8 border border-red-200">
              <h2 className="font-serif text-lg font-bold text-red-700 mb-4">
                Smazat článek
              </h2>
              <p className="text-sm text-[#8A8A8A] mb-4">
                Článek bude přesunut do koše. Můžete ho později obnovit.
              </p>
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 font-semibold text-sm hover:bg-red-700 transition-colors"
              >
                <Trash2 size={16} />
                Smazat článek
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
