import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogAdminPage() {
  const supabase = await createClient();
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .or("deleted.is.null,deleted.eq.false")
    .order("datum", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">
          Blog
        </h1>
        <Link
          href="/admin/blog/novy"
          className="bg-[#8B7340] text-white px-6 py-3 font-semibold text-sm tracking-[0.05em] uppercase hover:bg-[#B89B5E] transition-colors"
        >
          Nový článek
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
                <th className="text-left text-xs font-semibold text-[#8A8A8A] uppercase tracking-[0.05em] px-4 py-3">
                  Titulek
                </th>
                <th className="text-left text-xs font-semibold text-[#8A8A8A] uppercase tracking-[0.05em] px-4 py-3">
                  Datum
                </th>
                <th className="text-left text-xs font-semibold text-[#8A8A8A] uppercase tracking-[0.05em] px-4 py-3">
                  Autor
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
              {posts && posts.length > 0 ? (
                posts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-[rgba(139,115,64,0.1)] hover:bg-[#F7F5F0] transition-colors"
                  >
                    <td className="px-4 py-4 text-[#3D3D3D] font-medium">
                      {post.titulek}
                    </td>
                    <td className="px-4 py-4 text-[#3D3D3D]">
                      {post.datum ? formatDate(post.datum) : "—"}
                    </td>
                    <td className="px-4 py-4 text-[#3D3D3D]">
                      {post.autor || "—"}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                          post.published
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {post.published ? "Publikováno" : "Koncept"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="text-[#8B7340] text-sm font-semibold hover:text-[#B89B5E] transition-colors"
                      >
                        Upravit
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-[#8A8A8A]">
                    Zatím žádné články. Vytvořte první článek.
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
