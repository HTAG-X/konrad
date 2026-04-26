import { createClient } from "@/lib/supabase/server";

function parseDevice(ua: string): string {
  if (!ua) return "Neznámé";
  if (/iPhone/i.test(ua)) return "iPhone";
  if (/iPad/i.test(ua)) return "iPad";
  if (/Android/i.test(ua)) {
    if (/Mobile/i.test(ua)) return "Android mobil";
    return "Android tablet";
  }
  if (/Macintosh/i.test(ua)) return "Mac";
  if (/Windows/i.test(ua)) return "Windows PC";
  if (/Linux/i.test(ua)) return "Linux";
  return "Jiné";
}

function parseBrowser(ua: string): string {
  if (!ua) return "";
  if (/Edg\//i.test(ua)) return "Edge";
  if (/Chrome/i.test(ua)) return "Chrome";
  if (/Safari/i.test(ua)) return "Safari";
  if (/Firefox/i.test(ua)) return "Firefox";
  return "";
}

function formatDateTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const akceColors: Record<string, string> = {
  Přihlášení: "bg-blue-100 text-blue-800",
  "Vytvoření projektu": "bg-green-100 text-green-800",
  "Úprava projektu": "bg-amber-100 text-amber-800",
  "Smazání projektu": "bg-red-100 text-red-800",
  "Duplikace projektu": "bg-purple-100 text-purple-800",
  "Vytvoření článku": "bg-green-100 text-green-800",
  "Úprava článku": "bg-amber-100 text-amber-800",
  "Smazání článku": "bg-red-100 text-red-800",
  "Obnovení z koše": "bg-teal-100 text-teal-800",
  "Trvalé smazání": "bg-red-200 text-red-900",
};

export default async function LogPage() {
  const supabase = await createClient();
  const { data: logs } = await supabase
    .from("audit_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-8">
        Log aktivit
      </h1>

      <div className="bg-white border border-[rgba(139,115,64,0.15)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(139,115,64,0.15)]">
                <th className="text-left text-xs font-semibold text-[#8A8A8A] uppercase tracking-[0.05em] px-4 py-3">
                  Kdy
                </th>
                <th className="text-left text-xs font-semibold text-[#8A8A8A] uppercase tracking-[0.05em] px-4 py-3">
                  Kdo
                </th>
                <th className="text-left text-xs font-semibold text-[#8A8A8A] uppercase tracking-[0.05em] px-4 py-3">
                  Akce
                </th>
                <th className="text-left text-xs font-semibold text-[#8A8A8A] uppercase tracking-[0.05em] px-4 py-3">
                  Záznam
                </th>
                <th className="text-left text-xs font-semibold text-[#8A8A8A] uppercase tracking-[0.05em] px-4 py-3">
                  IP
                </th>
                <th className="text-left text-xs font-semibold text-[#8A8A8A] uppercase tracking-[0.05em] px-4 py-3">
                  Zařízení
                </th>
              </tr>
            </thead>
            <tbody>
              {logs && logs.length > 0 ? (
                logs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b border-[rgba(139,115,64,0.1)] hover:bg-[#F7F5F0] transition-colors"
                  >
                    <td className="px-4 py-3 text-[#3D3D3D] text-sm whitespace-nowrap">
                      {formatDateTime(log.created_at)}
                    </td>
                    <td className="px-4 py-3 text-[#3D3D3D] text-sm">
                      {log.user_email || log.detail || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${
                          akceColors[log.akce] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {log.akce}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#3D3D3D] text-sm">
                      {log.zaznam_nazev ? (
                        <span>
                          {log.zaznam_nazev}
                          {log.tabulka && (
                            <span className="text-[#8A8A8A] ml-1">
                              ({log.tabulka})
                            </span>
                          )}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3 text-[#8A8A8A] text-xs font-mono">
                      {log.ip_adresa || "—"}
                    </td>
                    <td className="px-4 py-3 text-[#8A8A8A] text-xs">
                      {log.user_agent ? (
                        <span>
                          {parseDevice(log.user_agent)}
                          {parseBrowser(log.user_agent) && (
                            <span className="ml-1">
                              ({parseBrowser(log.user_agent)})
                            </span>
                          )}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-[#8A8A8A]"
                  >
                    Zatím žádné záznamy.
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
