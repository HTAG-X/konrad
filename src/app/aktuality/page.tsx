import type { Metadata } from "next";
import Link from "next/link";
import { Calendar } from "lucide-react";
import blogPosts from "@/data/blogPosts.json";

export const metadata: Metadata = {
  title: "Aktuality a novinky | Konrad Home Build",
  description:
    "Čtěte naše nejnovější články o moderních dřevostavbách, ekologickém stavitelství a designu rodinných domů.",
  keywords: "aktuality, novinky, blog, dřevostavby, ekologické stavby, Jižní Morava",
  openGraph: {
    title: "Aktuality a novinky | Konrad Home Build",
    description: "Čtěte naše nejnovější články o moderních dřevostavbách a ekologickém stavitelství.",
    type: "website",
  },
};

function formatCzechDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("cs-CZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export default function AktualityPage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime()
  );

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] pt-40 pb-20 px-8 text-center">
        <div className="max-w-[900px] mx-auto hero-text">
          <p className="text-[0.75rem] tracking-[0.25em] uppercase text-[#B89B5E] mb-6">
            Blog
          </p>
          <h1 className="font-serif font-bold text-white mb-6 text-[clamp(2.5rem,6vw,4rem)]">
            Aktuality a novinky
          </h1>
          <p className="text-white text-[1.1rem] leading-relaxed max-w-[600px] mx-auto">
            Sledujte naše nejnovější články o moderních dřevostavbách, ekologickém stavitelství a designu rodinných domů.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-[1400px] mx-auto px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {sortedPosts.map((post) => (
            <Link key={post.id} href={`/aktuality/${post.slug}`}>
              <article className="group bg-white border border-transparent shadow-[0_4px_12px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-500 hover:border-[#8B7340] hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] h-full flex flex-col">
                {/* Image placeholder */}
                <div className="h-[240px] bg-gradient-to-br from-[#8B7340] via-[#B89B5E] to-[#D4AE6A]" />

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-[#8A8A8A] mb-4 text-[0.85rem]">
                    <Calendar size={16} />
                    <span>{formatCzechDate(post.datum)}</span>
                    <span className="mx-1">&middot;</span>
                    <span>{post.autor}</span>
                  </div>

                  <h3 className="font-serif text-[1.3rem] font-bold text-[#1A1A1A] mb-3 line-clamp-2 group-hover:text-[#8B7340] transition-colors">
                    {post.titulek}
                  </h3>

                  <p className="text-[#3D3D3D] text-[0.95rem] line-clamp-3 mb-6 flex-1 leading-relaxed">
                    {post.kratkyPopis}
                  </p>

                  <span className="text-[#8B7340] font-semibold text-[0.8rem] tracking-[0.1em] uppercase">
                    Číst více &rarr;
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {sortedPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#8A8A8A] text-lg">Zatím nemáme žádné články.</p>
          </div>
        )}
      </section>
    </div>
  );
}
