"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { logAction } from "@/lib/auditLog";
import { RotateCcw, Trash2 } from "lucide-react";

interface DeletedItem {
  id: number;
  nazev?: string;
  titulek?: string;
  jmeno?: string;
  deleted_from: string;
}

export default function KosPage() {
  const supabase = createClient();
  const [items, setItems] = useState<DeletedItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDeleted = async () => {
    setLoading(true);

    const [projektyRes, blogRes, referenceRes] = await Promise.all([
      supabase.from("projekty").select("id, nazev").eq("deleted", true),
      supabase.from("blog_posts").select("id, titulek").eq("deleted", true),
      supabase.from("reference").select("id, jmeno").eq("deleted", true),
    ]);

    const all: DeletedItem[] = [
      ...(projektyRes.data || []).map((p) => ({
        id: p.id,
        nazev: p.nazev,
        deleted_from: "projekty",
      })),
      ...(blogRes.data || []).map((b) => ({
        id: b.id,
        titulek: b.titulek,
        deleted_from: "blog_posts",
      })),
      ...(referenceRes.data || []).map((r) => ({
        id: r.id,
        jmeno: r.jmeno,
        deleted_from: "reference",
      })),
    ];

    setItems(all);
    setLoading(false);
  };

  useEffect(() => {
    loadDeleted();
  }, []);

  const handleRestore = async (item: DeletedItem) => {
    const { error } = await supabase
      .from(item.deleted_from)
      .update({ deleted: false })
      .eq("id", item.id);

    if (error) {
      alert("Chyba: " + error.message);
      return;
    }

    const name = item.nazev || item.titulek || item.jmeno || "";
    await logAction({
      akce: "Obnovení z koše",
      tabulka: item.deleted_from,
      zaznam_id: item.id,
      zaznam_nazev: name,
    });

    loadDeleted();
  };

  const handlePermanentDelete = async (item: DeletedItem) => {
    if (!confirm("Opravdu chcete trvale smazat tento záznam? Tato akce je NEVRATNÁ.")) return;

    const { error } = await supabase
      .from(item.deleted_from)
      .delete()
      .eq("id", item.id);

    if (error) {
      alert("Chyba: " + error.message);
      return;
    }

    const name = item.nazev || item.titulek || item.jmeno || "";
    await logAction({
      akce: "Trvalé smazání",
      tabulka: item.deleted_from,
      zaznam_id: item.id,
      zaznam_nazev: name,
    });

    loadDeleted();
  };

  const typeLabels: Record<string, string> = {
    projekty: "Projekt",
    blog_posts: "Článek",
    reference: "Reference",
  };

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-8">
        Koš
      </h1>

      {loading ? (
        <p className="text-[#8A8A8A]">Načítám...</p>
      ) : items.length === 0 ? (
        <div className="bg-white p-12 border border-[rgba(139,115,64,0.15)] text-center">
          <p className="text-[#8A8A8A]">Koš je prázdný</p>
        </div>
      ) : (
        <div className="bg-white border border-[rgba(139,115,64,0.15)]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(139,115,64,0.15)]">
                <th className="text-left text-xs font-semibold text-[#8A8A8A] uppercase tracking-[0.05em] px-4 py-3">
                  Typ
                </th>
                <th className="text-left text-xs font-semibold text-[#8A8A8A] uppercase tracking-[0.05em] px-4 py-3">
                  Název
                </th>
                <th className="text-left text-xs font-semibold text-[#8A8A8A] uppercase tracking-[0.05em] px-4 py-3">
                  Akce
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={`${item.deleted_from}-${item.id}`}
                  className="border-b border-[rgba(139,115,64,0.1)] hover:bg-[#F7F5F0] transition-colors"
                >
                  <td className="px-4 py-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-600 rounded-full">
                      {typeLabels[item.deleted_from]}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[#3D3D3D] font-medium">
                    {item.nazev || item.titulek || item.jmeno}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleRestore(item)}
                        className="flex items-center gap-1.5 text-[#8B7340] text-sm font-semibold hover:text-[#B89B5E] transition-colors"
                      >
                        <RotateCcw size={14} />
                        Obnovit
                      </button>
                      <button
                        onClick={() => handlePermanentDelete(item)}
                        className="flex items-center gap-1.5 text-red-500 text-sm font-semibold hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={14} />
                        Smazat trvale
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
