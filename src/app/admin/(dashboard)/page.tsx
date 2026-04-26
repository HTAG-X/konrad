import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Home, FileText, MessageSquareQuote, Settings } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [projektyRes, blogRes, referenceRes] = await Promise.all([
    supabase.from("projekty").select("id, stav", { count: "exact" }),
    supabase.from("blog_posts").select("id", { count: "exact" }),
    supabase.from("reference").select("id", { count: "exact" }),
  ]);

  const projektyCount = projektyRes.count || 0;
  const blogCount = blogRes.count || 0;
  const referenceCount = referenceRes.count || 0;

  const volneCount = projektyRes.data?.filter((p) => p.stav === "Volné").length || 0;

  const cards = [
    { label: "Projekty", value: projektyCount, sub: `${volneCount} volných`, href: "/admin/projekty", icon: Home },
    { label: "Články", value: blogCount, sub: "blog", href: "/admin/blog", icon: FileText },
    { label: "Reference", value: referenceCount, sub: "recenze", href: "/admin/reference", icon: MessageSquareQuote },
    { label: "Nastavení", value: "", sub: "firemní údaje", href: "/admin/nastaveni", icon: Settings },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="bg-white p-6 border border-[rgba(139,115,64,0.15)] hover:border-[#8B7340] transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon size={24} className="text-[#8B7340]" />
                {card.value !== "" && (
                  <span className="font-serif text-3xl font-bold text-[#1A1A1A]">{card.value}</span>
                )}
              </div>
              <p className="font-semibold text-[#1A1A1A]">{card.label}</p>
              <p className="text-sm text-[#8A8A8A]">{card.sub}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
