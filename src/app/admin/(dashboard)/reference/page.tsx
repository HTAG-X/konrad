"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { X, Plus } from "lucide-react";

interface Reference {
  id?: number;
  jmeno: string;
  text: string;
  poradi: number;
}

export default function ReferenceAdminPage() {
  const supabase = createClient();

  const [reference, setReference] = useState<Reference[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const fetchReference = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from("reference")
      .select("*")
      .order("poradi", { ascending: true });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setReference(data || []);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchReference();
  }, [fetchReference]);

  const addReference = () => {
    setReference((prev) => [
      ...prev,
      { jmeno: "", text: "", poradi: prev.length + 1 },
    ]);
  };

  const removeReference = (index: number) => {
    setReference((prev) => prev.filter((_, i) => i !== index));
  };

  const updateReference = (index: number, field: keyof Reference, value: string | number) => {
    setReference((prev) =>
      prev.map((r, i) => (i === index ? { ...r, [field]: value } : r))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    // Delete all existing
    const { error: deleteError } = await supabase
      .from("reference")
      .delete()
      .gte("id", 0);

    if (deleteError) {
      setError(deleteError.message);
      setSaving(false);
      return;
    }

    // Insert all current
    if (reference.length > 0) {
      const payload = reference.map((r, i) => ({
        jmeno: r.jmeno,
        text: r.text,
        poradi: i + 1,
      }));

      const { error: insertError } = await supabase
        .from("reference")
        .insert(payload);

      if (insertError) {
        setError(insertError.message);
        setSaving(false);
        return;
      }
    }

    setSuccess(true);
    setSaving(false);
    await fetchReference();

    setTimeout(() => setSuccess(false), 3000);
  };

  const inputClass =
    "w-full px-4 py-3 border border-[rgba(139,115,64,0.3)] bg-white text-[#3D3D3D] focus:outline-none focus:border-[#8B7340] transition-colors";
  const labelClass =
    "block text-[0.8rem] font-semibold text-[#3D3D3D] mb-2 tracking-[0.05em] uppercase";

  if (loading) {
    return (
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-8">Reference</h1>
        <p className="text-[#8A8A8A]">Načítám...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">
          Reference
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
          Reference byly úspěšně uloženy.
        </div>
      )}

      <div className="space-y-4">
        {reference.map((ref, index) => (
          <div
            key={index}
            className="bg-white p-6 border border-[rgba(139,115,64,0.15)] relative"
          >
            <button
              type="button"
              onClick={() => removeReference(index)}
              className="absolute top-4 right-4 text-[#8A8A8A] hover:text-red-600 transition-colors"
              title="Odebrat referenci"
            >
              <X size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className={labelClass}>Jméno</label>
                <input
                  type="text"
                  value={ref.jmeno}
                  onChange={(e) => updateReference(index, "jmeno", e.target.value)}
                  className={inputClass}
                  placeholder="Jméno zákazníka"
                />
              </div>
              <div className="md:col-span-3">
                <label className={labelClass}>Text reference</label>
                <textarea
                  value={ref.text}
                  onChange={(e) => updateReference(index, "text", e.target.value)}
                  className={inputClass}
                  rows={2}
                  placeholder="Text recenze..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addReference}
        className="mt-6 border border-[#8B7340] text-[#8B7340] px-6 py-3 font-semibold text-sm hover:bg-[#8B7340] hover:text-white transition-colors flex items-center gap-2"
      >
        <Plus size={16} />
        Přidat referenci
      </button>
    </div>
  );
}
