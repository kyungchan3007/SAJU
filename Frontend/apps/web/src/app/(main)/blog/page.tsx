import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/shared/ui/page-container";
import { createPageMetadata } from "@/shared/lib/seo";
import { BLOG_INDEX_PAGE_CONTENT } from "./_data/blog-index-content";

export const metadata: Metadata = createPageMetadata({
  title: BLOG_INDEX_PAGE_CONTENT.title,
  description: BLOG_INDEX_PAGE_CONTENT.description,
  path: BLOG_INDEX_PAGE_CONTENT.path,
});

export default function BlogIndexPage() {
  const { badge, heading, intro, summary, sections } = BLOG_INDEX_PAGE_CONTENT;

  return (
    <main className="bg-white py-10 md:py-14">
      <PageContainer width="reading">
        <div className="flex flex-col gap-10">
          <header className="flex flex-col gap-3">
            <span className="w-fit rounded-full bg-[#F0EEFF] px-3 py-1 text-xs font-bold text-[#5956E9]">
              {badge}
            </span>
            <h1 className="text-3xl font-black tracking-tight text-gray-900">{heading}</h1>
            <p className="text-sm leading-relaxed text-gray-500">{intro}</p>
          </header>

          <section className="rounded-3xl border border-[#EDE9FF] bg-[#FAFAFF] px-5 py-5 text-sm leading-7 text-gray-600 md:px-7">
            <p>{summary}</p>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-black text-gray-900">{sections.fortune.title}</h2>
            <div className="flex flex-col gap-3">
              {sections.fortune.posts.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="flex flex-col gap-1 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="text-sm font-bold text-gray-900">{p.title}</span>
                  <span className="text-xs text-gray-500">{p.desc}</span>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-black text-gray-900">{sections.concept.title}</h2>
            <div className="flex flex-col gap-3">
              {sections.concept.posts.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="flex flex-col gap-1 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="text-sm font-bold text-gray-900">{p.title}</span>
                  <span className="text-xs text-gray-500">{p.desc}</span>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-black text-gray-900">
              {sections.zodiacGuide.title}
            </h2>
            <Link
              href={sections.zodiacGuide.href}
              className="flex flex-col gap-2 rounded-3xl border border-gray-100 bg-white px-5 py-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="w-fit rounded-full bg-[#F0EEFF] px-3 py-1 text-xs font-bold text-[#5956E9]">
                {sections.zodiacGuide.badge}
              </span>
              <span className="text-base font-black text-gray-900">{sections.zodiacGuide.heading}</span>
              <span className="text-sm leading-6 text-gray-500">{sections.zodiacGuide.description}</span>
            </Link>
          </section>
        </div>
      </PageContainer>
    </main>
  );
}
