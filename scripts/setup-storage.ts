/**
 * Vytvoří storage buckety v Supabase + nastaví RLS politiky pro upload
 *
 * 1. Přidejte do .env.local:
 *    SUPABASE_SERVICE_ROLE_KEY=váš_service_role_key
 *
 * 2. Spustit: npx tsx scripts/setup-storage.ts
 *
 * Service role key najdete v Supabase dashboard:
 * Settings → API → service_role (secret)
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

const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!serviceRoleKey) {
  console.error("❌ Chybí SUPABASE_SERVICE_ROLE_KEY v .env.local");
  console.error("   Najdete ho v Supabase dashboard: Settings → API → service_role (secret)");
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  serviceRoleKey,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const BUCKETS = [
  {
    id: "projekty-images",
    name: "projekty-images",
    public: true,
    fileSizeLimit: 10 * 1024 * 1024, // 10 MB
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  },
  {
    id: "blog-images",
    name: "blog-images",
    public: true,
    fileSizeLimit: 10 * 1024 * 1024,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  },
];

async function createBuckets() {
  console.log("=== Vytváření storage bucketů ===\n");

  for (const bucket of BUCKETS) {
    // Check if exists
    const { data: existing } = await supabase.storage.getBucket(bucket.id);

    if (existing) {
      console.log(`✓ Bucket "${bucket.id}" už existuje`);

      // Update settings
      const { error } = await supabase.storage.updateBucket(bucket.id, {
        public: bucket.public,
        fileSizeLimit: bucket.fileSizeLimit,
        allowedMimeTypes: bucket.allowedMimeTypes,
      });
      if (error) {
        console.error(`  ⚠ Chyba při aktualizaci: ${error.message}`);
      } else {
        console.log(`  → Nastavení aktualizováno`);
      }
      continue;
    }

    const { error } = await supabase.storage.createBucket(bucket.id, {
      public: bucket.public,
      fileSizeLimit: bucket.fileSizeLimit,
      allowedMimeTypes: bucket.allowedMimeTypes,
    });

    if (error) {
      console.error(`✗ Bucket "${bucket.id}": ${error.message}`);
    } else {
      console.log(`✓ Bucket "${bucket.id}" vytvořen`);
    }
  }
}

async function setupPolicies() {
  console.log("\n=== Nastavení RLS politik ===\n");

  // SQL policies for storage — allow authenticated users to upload/read/delete
  const policies = [
    {
      name: "Allow public read",
      sql: `
        CREATE POLICY IF NOT EXISTS "Allow public read" ON storage.objects
        FOR SELECT USING (bucket_id IN ('projekty-images', 'blog-images'));
      `,
    },
    {
      name: "Allow authenticated upload",
      sql: `
        CREATE POLICY IF NOT EXISTS "Allow authenticated upload" ON storage.objects
        FOR INSERT WITH CHECK (
          bucket_id IN ('projekty-images', 'blog-images')
          AND auth.role() = 'authenticated'
        );
      `,
    },
    {
      name: "Allow authenticated update",
      sql: `
        CREATE POLICY IF NOT EXISTS "Allow authenticated update" ON storage.objects
        FOR UPDATE USING (
          bucket_id IN ('projekty-images', 'blog-images')
          AND auth.role() = 'authenticated'
        );
      `,
    },
    {
      name: "Allow authenticated delete",
      sql: `
        CREATE POLICY IF NOT EXISTS "Allow authenticated delete" ON storage.objects
        FOR DELETE USING (
          bucket_id IN ('projekty-images', 'blog-images')
          AND auth.role() = 'authenticated'
        );
      `,
    },
  ];

  for (const policy of policies) {
    const { error } = await supabase.rpc("exec_sql", { sql: policy.sql }).maybeSingle();

    if (error) {
      // Try direct approach if exec_sql doesn't exist
      console.log(`  ⚠ "${policy.name}": Nelze vytvořit automaticky — nastavte ručně v Supabase dashboard`);
      console.log(`    Storage → Policies → New policy`);
    } else {
      console.log(`✓ Policy "${policy.name}" vytvořena`);
    }
  }
}

async function main() {
  await createBuckets();
  await setupPolicies();

  // Verify
  console.log("\n=== Kontrola ===\n");
  const { data: buckets } = await supabase.storage.listBuckets();
  if (buckets) {
    for (const b of buckets) {
      console.log(`  ${b.name} (public: ${b.public})`);
    }
  }

  console.log("\n=== Hotovo ===");
  console.log("\nPokud se RLS politiky nevytvořily automaticky, nastavte je v Supabase dashboard:");
  console.log("  1. Jděte do Storage → Policies");
  console.log("  2. Pro oba buckety přidejte:");
  console.log("     - SELECT: Allow for everyone (public read)");
  console.log("     - INSERT: Allow for authenticated users");
  console.log("     - UPDATE: Allow for authenticated users");
  console.log("     - DELETE: Allow for authenticated users");
}

main().catch(console.error);
