import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, Grid3X3 } from "lucide-react";
import { getPublishedBlogPosts, getBlogPostBySlug } from "@/lib/supabase/queries";
import { getStaticBlogSlugs, getStaticBlogPostBySlug } from "@/lib/supabase/static";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

export const revalidate = 60;

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getStaticBlogSlugs();
  return slugs.map((p: any) => ({ slug: p.slug }));
}

export async function generateMetadata(props: BlogDetailPageProps): Promise<Metadata> {
  const params = await props.params;
  let post;
  try {
    post = await getStaticBlogPostBySlug(params.slug);
  } catch {
    return { title: "Článek nenalezen" };
  }
  if (!post) return { title: "Článek nenalezen" };

  return {
    title: `${post.titulek} | Konrad Home Build`,
    description: post.kratky_popis,
    keywords: `${post.titulek}, aktuality, dřevostavby, blog`,
    openGraph: {
      title: post.titulek,
      description: post.kratky_popis,
      type: "article",
      url: `https://www.konradhomebuild.cz/aktuality/${post.slug}`,
      publishedTime: post.datum,
    },
    alternates: { canonical: `/aktuality/${post.slug}` },
  };
}

function formatCzechDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("cs-CZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export default async function BlogDetailPage(props: BlogDetailPageProps) {
  const params = await props.params;
  let post;
  try {
    post = await getBlogPostBySlug(params.slug);
  } catch {
    notFound();
  }
  if (!post) notFound();

  const allPosts = await getPublishedBlogPosts();
  const otherPosts = allPosts
    .filter((p: any) => p.slug !== params.slug)
    .slice(0, 3);

  const breadcrumbItems = [
    { name: "Úvod", url: "https://www.konradhomebuild.cz/" },
    { name: "Aktuality", url: "https://www.konradhomebuild.cz/aktuality" },
    { name: post.titulek, url: `https://www.konradhomebuild.cz/aktuality/${post.slug}` },
  ];

  return (
    <div>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <ArticleJsonLd
        headline={post.titulek}
        description={post.kratky_popis}
        author={post.autor}
        datePublished={post.datum}
        url={`https://www.konradhomebuild.cz/aktuality/${post.slug}`}
        image={post.nahledovy_obrazek}
      />

      {/* Breadcrumb */}
      <div className="max-w-[900px] mx-auto px-8 pt-28 pb-4">
        <nav className="flex items-center gap-2 text-[0.85rem] text-[#8A8A8A]">
          <Link href="/" className="hover:text-[#8B7340] transition-colors">Úvod</Link>
          <span>/</span>
          <Link href="/aktuality" className="hover:text-[#8B7340] transition-colors">Aktuality</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium line-clamp-1">{post.titulek}</span>
        </nav>
      </div>

      {/* Article Header */}
      <div className="max-w-[900px] mx-auto px-8 mb-10">
        <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold text-[#1A1A1A] mb-6">
          {post.titulek}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-[#8A8A8A] mb-8 pb-8 border-b border-[rgba(139,115,64,0.15)]">
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>{formatCzechDate(post.datum)}</span>
          </div>
          <div className="flex items-center gap-2">
            <User size={18} />
            <span>{post.autor}</span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-[900px] mx-auto px-8 mb-12">
        <div className="h-96 bg-gradient-to-br from-[#8B7340] via-[#B89B5E] to-[#D4AE6A] flex items-center justify-center text-white/50">
          <Grid3X3 size={48} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-8 mb-16">
        <div
          className="text-[#3D3D3D] leading-relaxed text-[1.05rem] [&_h2]:font-serif [&_h2]:text-[#1A1A1A] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-serif [&_h3]:text-[#1A1A1A] [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-2 [&_strong]:text-[#1A1A1A]"
          dangerouslySetInnerHTML={{ __html: post.obsah }}
        />
      </div>

      {/* Back Link */}
      <div className="max-w-[900px] mx-auto px-8 mb-20">
        <Link
          href="/aktuality"
          className="flex items-center gap-2 text-[#8A8A8A] hover:text-[#8B7340] font-medium transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Zpět na články</span>
        </Link>
      </div>

      {/* Related Articles */}
      {otherPosts.length > 0 && (
        <section className="bg-[#F7F5F0] py-24">
          <div className="max-w-[1400px] mx-auto px-8">
            <h2 className="font-serif text-[2rem] font-bold text-[#1A1A1A] mb-12">
              Další články
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {otherPosts.map((relatedPost: any) => (
                <Link key={relatedPost.id} href={`/aktuality/${relatedPost.slug}`}>
                  <article className="group bg-white border border-transparent shadow-[0_4px_12px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-500 hover:border-[#8B7340] hover:-translate-y-2 h-full flex flex-col">
                    <div className="h-[200px] bg-gradient-to-br from-[#8B7340] via-[#B89B5E] to-[#D4AE6A]" />
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-[#8A8A8A] mb-3 text-[0.85rem]">
                        <Calendar size={16} />
                        <span>{formatCzechDate(relatedPost.datum)}</span>
                      </div>
                      <h3 className="font-serif text-[1.2rem] font-bold text-[#1A1A1A] mb-3 line-clamp-2 group-hover:text-[#8B7340] transition-colors">
                        {relatedPost.titulek}
                      </h3>
                      <p className="text-[#3D3D3D] text-[0.9rem] line-clamp-3 flex-1">
                        {relatedPost.kratky_popis}
                      </p>
                      <span className="mt-4 text-[#8B7340] font-semibold text-[0.8rem] tracking-[0.1em] uppercase">
                        Číst více &rarr;
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
