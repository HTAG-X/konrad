import { createClient } from "@supabase/supabase-js";

// Client for build-time use (generateStaticParams, generateMetadata)
// Does NOT use cookies — safe for static generation
function getStaticClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

export async function getStaticProjektySlugs() {
  const { data } = await getStaticClient()
    .from("projekty")
    .select("slug");
  return data || [];
}

export async function getStaticProjektBySlug(slug: string) {
  const { data } = await getStaticClient()
    .from("projekty")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

export async function getStaticBlogSlugs() {
  const { data } = await getStaticClient()
    .from("blog_posts")
    .select("slug")
    .eq("published", true);
  return data || [];
}

export async function getStaticBlogPostBySlug(slug: string) {
  const { data } = await getStaticClient()
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}
