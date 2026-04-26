"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Home, FileText, MessageSquareQuote, Settings } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projekty", label: "Projekty", icon: Home },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/reference", label: "Reference", icon: MessageSquareQuote },
  { href: "/admin/nastaveni", label: "Nastavení", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#1A1A1A] min-h-screen flex flex-col">
      <div className="p-6 border-b border-white/10">
        <Link href="/admin">
          <img
            src="/images/logo/konrad_wide.png"
            alt="Konrad Home Build"
            className="h-8 brightness-0 invert"
          />
        </Link>
        <p className="text-white/30 text-xs mt-2 tracking-[0.1em] uppercase">Administrace</p>
      </div>

      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                isActive
                  ? "text-[#B89B5E] bg-white/5 border-r-2 border-[#B89B5E]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/10">
        <Link
          href="/"
          target="_blank"
          className="text-white/40 text-xs hover:text-white/70 transition-colors"
        >
          Zobrazit web &rarr;
        </Link>
      </div>
    </aside>
  );
}
