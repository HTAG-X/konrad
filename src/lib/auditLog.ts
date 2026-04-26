import { createClient } from "@/lib/supabase/client";

interface LogParams {
  akce: string;
  tabulka?: string;
  zaznam_id?: number;
  zaznam_nazev?: string;
  detail?: string;
}

export async function logAction(params: LogParams) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get IP and user agent
  let ip = "";
  let userAgent = "";

  try {
    userAgent = navigator.userAgent;
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    ip = data.ip;
  } catch {}

  await supabase.from("audit_log").insert({
    user_id: user?.id,
    user_email: user?.email,
    akce: params.akce,
    tabulka: params.tabulka,
    zaznam_id: params.zaznam_id,
    zaznam_nazev: params.zaznam_nazev,
    detail: params.detail,
    ip_adresa: ip,
    user_agent: userAgent,
  });
}
