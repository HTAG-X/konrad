import { BlogPostForm } from "@/app/admin/components/BlogPostForm";

export default function NovyBlogPostPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-8">
        Nový článek
      </h1>
      <BlogPostForm />
    </div>
  );
}
