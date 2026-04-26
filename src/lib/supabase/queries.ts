import { createClient } from "./server";

export async function getProjekty(publishedOnly = true) {
  const supabase = await createClient();
  let query = supabase
    .from("projekty")
    .select("*")
    .order("id", { ascending: true });

  query = query.or("deleted.is.null,deleted.eq.false");
  if (publishedOnly) {
    query = query.eq("published", true);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getProjektBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projekty")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) throw error;
  return data;
}

export async function getPublishedBlogPosts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .or("deleted.is.null,deleted.eq.false")
    .order("datum", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getBlogPostBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) throw error;
  return data;
}

export async function getSiteConfig() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_config")
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function getUsp() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("usp")
    .select("*")
    .order("poradi");
  if (error) throw error;
  return data;
}

export async function getReference() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reference")
    .select("*")
    .order("poradi");
  if (error) throw error;
  return data;
}
