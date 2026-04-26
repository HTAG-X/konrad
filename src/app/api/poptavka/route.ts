import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  // Honeypot check
  if (data.website && data.website.trim()) {
    return NextResponse.json({ success: true }); // Fake success for bots
  }

  // reCAPTCHA verify
  const recaptchaToken = data.recaptchaToken;
  if (recaptchaToken && process.env.RECAPTCHA_SECRET_KEY) {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    });
    const verify = await res.json();
    if (!verify.success || verify.score < 0.5) {
      return NextResponse.json({ success: false, error: "Ověření selhalo" }, { status: 400 });
    }
  }

  // Get IP
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "";

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );

  const { error } = await supabase.from("poptavky").insert({
    jmeno: data.jmeno,
    prijmeni: data.prijmeni,
    email: data.email,
    telefon: data.telefon,
    adresa: data.adresa,
    predmet: data.predmet,
    zprava: data.zprava,
    projekt: data.projekt || null,
    ip_adresa: ip,
  });

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
