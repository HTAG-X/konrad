"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";

interface AdminHeaderProps {
  userEmail: string;
  userRole: string;
}

export function AdminHeader({ userEmail, userRole }: AdminHeaderProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="bg-white border-b border-[rgba(139,115,64,0.15)] px-8 py-4 flex items-center justify-between">
      <div />
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-sm text-[#1A1A1A] font-medium">{userEmail}</p>
          <p className="text-xs text-[#8A8A8A] uppercase tracking-[0.05em]">{userRole}</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-[#8A8A8A] hover:text-[#8B7340] transition-colors p-2"
          title="Odhlásit se"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
