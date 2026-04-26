"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { logAction } from "@/lib/auditLog";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Nesprávný email nebo heslo");
      setLoading(false);
      return;
    }

    await logAction({
      akce: "Přihlášení",
      detail: email,
    });

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-10">
          <img
            src="/images/logo/konrad_wide.png"
            alt="Konrad Home Build"
            className="h-12 mx-auto mb-6 brightness-0 invert"
          />
          <p className="text-white/50 text-sm tracking-[0.1em] uppercase">
            Administrace
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-white/50 text-xs uppercase tracking-[0.1em] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:border-[#B89B5E] focus:outline-none transition-colors"
              placeholder="vas@email.cz"
            />
          </div>

          <div>
            <label className="block text-white/50 text-xs uppercase tracking-[0.1em] mb-2">
              Heslo
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:border-[#B89B5E] focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8B7340] text-white py-3 font-semibold text-sm tracking-[0.1em] uppercase transition-all hover:bg-[#B89B5E] disabled:opacity-50"
          >
            {loading ? "Přihlašování..." : "Přihlásit se"}
          </button>
        </form>
      </div>
    </div>
  );
}
