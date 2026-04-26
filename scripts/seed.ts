/**
 * Seed script — migruje data z JSON souborů do Supabase
 * Spustit: npx tsx scripts/seed.ts
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

// Load .env.local
const envPath = resolve(process.cwd(), ".env.local");
const envContent = readFileSync(envPath, "utf-8");
for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eqIndex = trimmed.indexOf("=");
  if (eqIndex === -1) continue;
  const key = trimmed.slice(0, eqIndex);
  let value = trimmed.slice(eqIndex + 1);
  if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
  process.env[key] = value;
}
import projektyData from "../src/data/projekty.json";
import blogPostsData from "../src/data/blogPosts.json";
import siteConfigData from "../src/data/siteConfig.json";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

async function seedProjekty() {
  console.log("Seeding projekty...");
  for (const p of projektyData) {
    const { error } = await supabase.from("projekty").upsert({
      slug: p.slug,
      nazev: p.nazev,
      lokalita: p.lokalita,
      cena: p.cena,
      poznamka_cena: p.poznamkaCena,
      dispozice: p.dispozice,
      uzitna_plocha: p.uzitnaPlocha,
      pozemek: p.pozemek,
      energeticka_trida: p.energetickaTrida,
      stav: p.stav,
      typ_domu: p.typDomu,
      druh_objektu: p.druhObjektu,
      stav_domu: p.stavDomu,
      realizace: p.realizace,
      popis: p.popis,
      vybava: p.vybava,
      fotogalerie: p.fotogalerie,
      pudorys: p.pudorys,
      hlavni_foto: p.hlavniFoto,
      maklerka_jmeno: p.maklerka.jmeno,
      maklerka_telefon: p.maklerka.telefon,
      maklerka_email: p.maklerka.email,
    }, { onConflict: "slug" });

    if (error) {
      console.error(`  Error: ${p.nazev}:`, error.message);
    } else {
      console.log(`  OK: ${p.nazev}`);
    }
  }
}

async function seedBlogPosts() {
  console.log("Seeding blog_posts...");
  for (const post of blogPostsData) {
    const { error } = await supabase.from("blog_posts").upsert({
      slug: post.slug,
      titulek: post.titulek,
      datum: post.datum,
      autor: post.autor,
      kratky_popis: post.kratkyPopis,
      obsah: post.obsah,
      nahledovy_obrazek: post.nahledovyObrazek,
      published: true,
    }, { onConflict: "slug" });

    if (error) {
      console.error(`  Error: ${post.titulek}:`, error.message);
    } else {
      console.log(`  OK: ${post.titulek}`);
    }
  }
}

async function seedSiteConfig() {
  console.log("Seeding site_config...");
  const { error } = await supabase.from("site_config").upsert({
    id: 1,
    nazev_firmy: siteConfigData.nazevFirmy,
    nazev_kratky: siteConfigData.nazevKratky,
    popis: siteConfigData.popis,
    telefon: siteConfigData.telefon,
    email: siteConfigData.email,
    adresa: siteConfigData.adresa,
    ico: siteConfigData.ico,
    dic: siteConfigData.dic,
    web: siteConfigData.web,
    pusobnost: siteConfigData.pusobnost,
    facebook_url: siteConfigData.socialniSite.facebook,
    instagram_url: siteConfigData.socialniSite.instagram,
    zakladatel_jmeno: siteConfigData.zakladatel.jmeno,
    zakladatel_pozice: siteConfigData.zakladatel.pozice,
    zakladatel_citat: siteConfigData.zakladatel.citat,
    zakladatel_foto: siteConfigData.zakladatel.fotografie,
    sluzby: siteConfigData.sluzby,
    partneri: siteConfigData.partneri,
  }, { onConflict: "id" });

  if (error) {
    console.error("  Error:", error.message);
  } else {
    console.log("  OK: site_config");
  }
}

async function seedUsp() {
  console.log("Seeding usp...");
  for (let i = 0; i < siteConfigData.usp.length; i++) {
    const usp = siteConfigData.usp[i];
    const { error } = await supabase.from("usp").insert({
      titulek: usp.titulek,
      popis: usp.popis,
      poradi: i,
    });

    if (error) {
      console.error(`  Error: ${usp.titulek}:`, error.message);
    } else {
      console.log(`  OK: ${usp.titulek}`);
    }
  }
}

async function seedReference() {
  console.log("Seeding reference...");
  for (let i = 0; i < siteConfigData.reference.length; i++) {
    const ref = siteConfigData.reference[i];
    const { error } = await supabase.from("reference").insert({
      jmeno: ref.jmeno,
      text: ref.text,
      poradi: i,
    });

    if (error) {
      console.error(`  Error: ${ref.jmeno}:`, error.message);
    } else {
      console.log(`  OK: ${ref.jmeno}`);
    }
  }
}

async function main() {
  console.log("=== Supabase Seed ===\n");
  await seedProjekty();
  console.log();
  await seedBlogPosts();
  console.log();
  await seedSiteConfig();
  console.log();
  await seedUsp();
  console.log();
  await seedReference();
  console.log("\n=== Done ===");
}

main().catch(console.error);
