import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BlogPostForm } from "@/app/admin/components/BlogPostForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-8">
        Upravit: {post.titulek}
      </h1>
      <BlogPostForm initialData={post} />
    </div>
  );
}
