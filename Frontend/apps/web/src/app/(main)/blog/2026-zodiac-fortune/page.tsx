import type { Metadata } from "next";
import { PageContainer } from "@/shared/ui/page-container";
import { ArticleTrustNote } from "@/shared/ui/article-trust-note";
import { BlogArticleAdSlot } from "@/shared/ui/blog-article-ad-slot.client";
import { createBlogArticleAssets } from "../_data/blog-article-assets";
import {
  ZODIAC_FORTUNE_2026_PAGE_CONTENT,
  ZODIAC_FORTUNE_2026_ZODIACS,
} from "../_data/blog-page-content";

const article = createBlogArticleAssets("2026-zodiac-fortune", ZODIAC_FORTUNE_2026_PAGE_CONTENT);

export const metadata: Metadata = article.metadata;

export default function ZodiacFortune2026Page() {
  const content = ZODIAC_FORTUNE_2026_PAGE_CONTENT;

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
              <h2 className="mb-4 text-lg font-black text-gray-900">먼저 읽어야 할 기준</h2>
              <div className="flex flex-col gap-3">
                {content.readingGuide.map((item) => (
                  <p key={item} className="text-sm leading-7 text-gray-600">
                    {item}
                  </p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">2026년 병오년 공통 신호</h2>
              <div className="flex flex-col gap-3">
                {content.yearlySignals.map((signal) => (
                  <div
                    key={signal.title}
                    className="rounded-2xl border border-gray-100 bg-gray-50 px-5 py-5"
                  >
                    <h3 className="text-sm font-black text-gray-900 md:text-[15px]">
                      {signal.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-gray-600">
                      {signal.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">12띠를 비교할 때 보는 기준</h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                <p>
                  한 페이지에서 여러 띠의 운세를 비교할 때는 어느 띠가 더
                  좋은지를 가르기보다, 띠마다 어떤 흐름을 조심하거나 활용할 수
                  있는지 살펴보면 됩니다.
                </p>
                {content.comparisonPrinciples.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">병오년과 띠 오행이 만나는 방식</h2>
              <div className="flex flex-col gap-3">
                {content.zodiacReadingTips.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-gray-100 bg-gray-50 px-5 py-5"
                  >
                    <h3 className="text-sm font-black text-gray-900 md:text-[15px]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-gray-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">띠 운세를 개인 해석으로 바꿔 읽는 예시</h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                {content.zodiacCase.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <div className="flex flex-col gap-6">
              {ZODIAC_FORTUNE_2026_ZODIACS.map((z) => (
                <section
                  key={z.slug}
                  className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7"
                >
                  <div className="mb-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{z.emoji}</span>
                      <h2 className="text-lg font-black text-gray-900">{z.name}</h2>
                    </div>
                    <p className="text-xs font-semibold text-[#5956E9]">
                      {z.years} · 기본 오행 {z.element}
                    </p>
                    <p className="text-sm leading-7 text-gray-600">{z.summary}</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="rounded-2xl border border-gray-100 bg-gray-50 px-5 py-5">
                      <h3 className="text-sm font-black text-gray-900">강점과 주의점</h3>
                      <div className="mt-3 flex flex-col gap-3">
                        <p className="text-sm leading-6 text-gray-600">
                          <span className="font-bold text-[#5956E9]">{z.traits[0]?.label}</span>{" "}
                          {z.traits[0]?.desc}
                        </p>
                        <p className="text-sm leading-6 text-gray-600">
                          <span className="font-bold text-gray-900">{z.weaknesses[0]?.label}</span>{" "}
                          {z.weaknesses[0]?.desc}
                        </p>
                        <p className="text-sm leading-6 text-gray-600">
                          궁합은 {z.compatibility[0]?.zodiac}와의 호흡이 강하고,{" "}
                          {z.compatibility.at(-1)?.zodiac}와는 속도 차이를 조율하는 편이 좋습니다.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-[#EDE9FF] bg-[#FAFAFF] px-5 py-5">
                      <h3 className="text-sm font-black text-gray-900">읽을 때 체크할 점</h3>
                      <div className="mt-3 flex flex-col gap-3 text-sm leading-7 text-gray-600">
                        <p>
                          {z.name}의 2026년 운세는 {z.element} 기운이 병오년의
                          화(火) 흐름과 어떤 관계를 이루는지 중심으로
                          살펴봅니다.
                        </p>
                        <p>
                          특히 {z.name}의 기본 성향이 올해에는 기회로 확장되는지, 아니면 원래
                          강한 면이 더 강해져 피로와 충돌을 만들 수 있는지 함께 보는 편이
                          좋습니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-2">
                    {z.fortune2026.map((f) => (
                      <div
                        key={f.area}
                        className="rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4"
                      >
                        <p className="mb-1 text-xs font-bold text-[#5956E9]">{f.area}</p>
                        <p className="text-sm leading-7 text-gray-600">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">{content.closing.title}</h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                {content.closing.paragraphs.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">
                같은 띠여도 해석이 갈리는 이유
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                {content.interpretationBoundaries.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">
                띠 운세를 참고 자료로 쓰는 방법
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                {content.practicalUse.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <ArticleTrustNote
              kind="공개 운세 가이드"
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
