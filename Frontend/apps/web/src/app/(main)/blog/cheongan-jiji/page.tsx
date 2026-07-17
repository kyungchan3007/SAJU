import type { Metadata } from "next";
import { PageContainer } from "@/shared/ui/page-container";
import { ArticleTrustNote } from "@/shared/ui/article-trust-note";
import { BlogArticleAdSlot } from "@/shared/ui/blog-article-ad-slot.client";
import { createBlogArticleAssets } from "../_data/blog-article-assets";
import { CHEONGAN_JIJI_PAGE_CONTENT } from "../_data/blog-page-content";

const article = createBlogArticleAssets("cheongan-jiji", CHEONGAN_JIJI_PAGE_CONTENT);

export const metadata: Metadata = article.metadata;

export default function CheonganJijiPage() {
  const content = CHEONGAN_JIJI_PAGE_CONTENT;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article.structuredData) }}
      />
      <main className="bg-white py-10 md:py-14">
        <PageContainer width="reading">
          <div className="flex flex-col gap-8">
            <header className="flex flex-col gap-3">
              <span className="w-fit rounded-full bg-[#F0EEFF] px-3 py-1 text-xs font-bold text-[#5956E9]">
                {content.badge}
              </span>
              <h1 className="text-3xl font-black tracking-tight text-gray-900">{content.heading}</h1>
              <p className="text-sm leading-relaxed text-gray-500">{content.intro}</p>
            </header>

            <section className="rounded-3xl border border-[#EDE9FF] bg-[#FAFAFF] px-5 py-5 text-sm leading-7 text-gray-600 md:px-7">
              <p>{content.summary}</p>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">
                천간과 지지를 먼저 이해해야 하는 이유
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                {content.readingIntro.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">
                사주팔자 8글자는 이렇게 생깁니다
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                {content.structureIntro.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">천간(天干) 10개</h2>
              <div className="mb-5 flex flex-col gap-3 text-sm leading-7 text-gray-600">
                {content.cheonganIntro.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {content.cheongan.map((item) => (
                  <div key={item.char} className="flex items-start gap-3">
                    <div className="flex w-16 shrink-0 flex-col items-center rounded-2xl bg-[#F0EEFF] py-2">
                      <span className="text-lg font-black text-[#5956E9]">{item.char}</span>
                      <span className="text-xs font-bold text-[#5956E9]">{item.korean}</span>
                    </div>
                    <div className="flex flex-col gap-1 pt-1">
                      <div className="flex gap-2">
                        <span className="text-xs font-semibold text-gray-400">{item.element}</span>
                        <span className="text-xs font-semibold text-gray-400">{item.nature}</span>
                      </div>
                      <p className="text-sm leading-6 text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">지지(地支) 12개</h2>
              <div className="mb-5 flex flex-col gap-3 text-sm leading-7 text-gray-600">
                {content.jijiIntro.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {content.jiji.map((item) => (
                  <div
                    key={item.char}
                    className="flex items-center gap-3 rounded-2xl border border-gray-100 px-4 py-3"
                  >
                    <div className="flex w-12 shrink-0 flex-col items-center rounded-xl bg-gray-50 py-2">
                      <span className="text-lg font-black text-gray-900">{item.char}</span>
                      <span className="text-[11px] font-bold text-gray-500">{item.korean}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-gray-900">{item.animal}띠</span>
                      <span className="text-xs text-gray-500">
                        {item.element} · 절기 기준 {item.month}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">천간과 지지를 읽는 순서</h2>
              <div className="flex flex-col gap-4">
                {content.readingSteps.map((item) => (
                  <div key={item.title} className="rounded-2xl bg-gray-50 px-4 py-4">
                    <h3 className="text-sm font-black text-gray-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">자주 생기는 오해</h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                {content.commonMistakes.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">
                같은 글자도 다르게 해석되는 이유
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                {content.interpretationBoundaries.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">
                천간과 지지를 실제로 읽을 때의 기준
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                {content.practicalUse.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">
                결국 중요한 건 글자 뜻보다 관계입니다
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                <p>
                  천간과 지지의 뜻을 외웠다면, 다음에는 글자 사이의 관계를
                  살펴볼 차례입니다. 태어난 계절은 언제인지, 어떤 글자가 함께
                  놓였는지, 일간을 중심으로 어떤 관계를 이루는지를 차례로
                  확인합니다.
                </p>
                <p>
                  그래서 입문 단계에서는 표를 다 외우려 하기보다, 위아래 구조와 오행, 계절감,
                  일간 중심 읽기만 먼저 익혀도 해석의 기반이 훨씬 단단해집니다.
                </p>
              </div>
            </section>

            <ArticleTrustNote
              kind="입문 가이드"
              updatedAt={article.updatedAt}
              scope={content.trustScope}
              highlights={content.trustHighlights}
            />

            <BlogArticleAdSlot />

            <section className="rounded-3xl bg-[#F0EEFF] px-5 py-6 md:px-7">
              <div className="flex flex-col gap-2">
                <h2 className="text-base font-black text-[#5956E9]">{content.cta.title}</h2>
                <p className="text-sm leading-6 text-gray-600">{content.cta.description}</p>
                <a
                  href={content.cta.href}
                  className="mt-2 w-fit rounded-full bg-[#5956E9] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#4745c8]"
                >
                  {content.cta.label}
                </a>
              </div>
            </section>
          </div>
        </PageContainer>
      </main>
    </>
  );
}
