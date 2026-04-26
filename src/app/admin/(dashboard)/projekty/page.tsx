import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

function formatPrice(price: number | null): string {
  if (!price) return "—";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " Kč";
}

const STAV_BADGE: Record<string, string> = {
  "Volné": "bg-green-100 text-green-800",
  "Rezervace": "bg-amber-100 text-amber-800",
  "Zamluveno": "bg-orange-100 text-orange-800",
  "Prodáno": "bg-gray-100 text-gray-600",
};

export default async function ProjektyAdminPage() {
  const supabase = await createClient();
  const { data: projekty, error } = await supabase
    .from("projekty")
    .select("*")
    .or("deleted.is.null,deleted.eq.false")
    .order("id", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">
          Projekty
        </h1>
        <Link
          href="/admin/projekty/novy"
          className="bg-[#8B7340] text-white px-6 py-3 font-semibold text-sm tracking-[0.05em] uppercase hover:bg-[#B89B5E] transition-colors"
        >
          Nový projekt
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
          Chyba při načítání: {error.message}
        </div>
      )}

      <div className="bg-white border border-[rgba(139,115,64,0.15)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(139,115,64,0.15)]">
                <th className="text-left text-xs font-semibold text-[#8A8A8A] uppercase tracking-[0.05em] px-4 py-3 w-16">
                  Foto
                </th>
                <th className="text-left text-xs font-semibold text-[#8A8A8A] uppercase tracking-[0.05em] px-4 py-3">
                  Název
                </th>
                <th className="text-left text-xs font-semibold text-[#8A8A8A] uppercase tracking-[0.05em] px-4 py-3">
                  Lokalita
                </th>
                <th className="text-left text-xs font-semibold text-[#8A8A8A] uppercase tracking-[0.05em] px-4 py-3">
                  Cena
                </th>
                <th className="text-left text-xs font-semibold text-[#8A8A8A] uppercase tracking-[0.05em] px-4 py-3">
                  Stav
                </th>
                <th className="text-left text-xs font-semibold text-[#8A8A8A] uppercase tracking-[0.05em] px-4 py-3">
                  Akce
                </th>
              </tr>
            </thead>
            <tbody>
              {projekty && projekty.length > 0 ? (
                projekty.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-[rgba(139,115,64,0.1)] hover:bg-[#F7F5F0] transition-colors"
                  >
                    <td className="px-4 py-4">
                      {p.hlavni_foto ? (
                        <img
                          src={p.hlavni_foto}
                          alt={p.nazev}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-[#F7F5F0] border border-[rgba(139,115,64,0.15)] rounded flex items-center justify-center">
                          <span className="text-[#8A8A8A] text-xs">—</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4 text-[#3D3D3D] font-medium">
                      {p.nazev}
                      {!p.published && (
                        <span className="ml-2 inline-block px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-[#3D3D3D]">{p.lokalita || "—"}</td>
                    <td className="px-4 py-4 text-[#3D3D3D]">
                      {formatPrice(p.cena)}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${STAV_BADGE[p.stav] || "bg-gray-100 text-gray-600"}`}
                      >
                        {p.stav}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <Link
                        href={`/admin/projekty/${p.id}`}
                        className="text-[#8B7340] text-sm font-semibold hover:text-[#B89B5E] transition-colors"
                      >
                        Upravit
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-[#8A8A8A]">
                    Zatím žádné projekty. Vytvořte první projekt.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
