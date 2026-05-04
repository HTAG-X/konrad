/**
 * Vytvoří RLS politiky pro storage buckety přes přímé DB připojení.
 * Spustit: node scripts/setup-policies.mjs
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import pg from "pg";

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

const client = new pg.Client({ connectionString: process.env.DIRECT_URL });
await client.connect();
console.log("Connected to database\n");

const policies = [
  `CREATE POLICY "storage_public_read" ON storage.objects FOR SELECT USING (bucket_id IN ('projekty-images', 'blog-images'))`,
  `CREATE POLICY "storage_auth_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id IN ('projekty-images', 'blog-images') AND (auth.role()) = 'authenticated')`,
  `CREATE POLICY "storage_auth_update" ON storage.objects FOR UPDATE USING (bucket_id IN ('projekty-images', 'blog-images') AND (auth.role()) = 'authenticated')`,
  `CREATE POLICY "storage_auth_delete" ON storage.objects FOR DELETE USING (bucket_id IN ('projekty-images', 'blog-images') AND (auth.role()) = 'authenticated')`,
];

for (const sql of policies) {
  const name = sql.match(/"([^"]+)"/)?.[1];
  try {
    await client.query(sql);
    console.log(`✓ ${name}`);
  } catch (e) {
    if (e.code === "42710") {
      console.log(`✓ ${name} (already exists)`);
    } else {
      console.error(`✗ ${name}: ${e.message}`);
    }
  }
}

// Verify
const { rows } = await client.query(
  "SELECT policyname, cmd FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects'"
);
console.log("\nAktuální politiky:");
for (const r of rows) {
  console.log(`  ${r.cmd.padEnd(8)} ${r.policyname}`);
}

await client.end();
console.log("\nHotovo!");
