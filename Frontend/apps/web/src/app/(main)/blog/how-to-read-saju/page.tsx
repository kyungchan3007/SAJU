import type { Metadata } from "next";
import { PageContainer } from "@/shared/ui/page-container";
import { ArticleTrustNote } from "@/shared/ui/article-trust-note";
import { BlogArticleAdSlot } from "@/shared/ui/blog-article-ad-slot.client";
import { createBlogArticleAssets } from "../_data/blog-article-assets";
import { HOW_TO_READ_SAJU_PAGE_CONTENT } from "../_data/blog-page-content";

const article = createBlogArticleAssets("how-to-read-saju", HOW_TO_READ_SAJU_PAGE_CONTENT);

export const metadata: Metadata = article.metadata;

export default function HowToReadSajuPage() {
  const content = HOW_TO_READ_SAJU_PAGE_CONTENT;

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
                시작하기 전에 먼저 알아두면 좋은 점
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                <p>
                  처음 사주 풀이를 읽으면 천간, 지지, 일간, 십성, 대운 같은
                  용어부터 눈에 들어옵니다. 처음부터 모두 이해하려 하기보다,
                  풀이에 필요한 개념을 순서대로 살펴보는 편이 덜 복잡합니다.
                </p>
                {content.beforeYouStart.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <div className="flex flex-col gap-4">
              {content.steps.map((s) => (
                <section
                  key={s.step}
                  className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#5956E9] text-xs font-black text-white">
                      {s.step}
                    </span>
                    <h2 className="text-base font-black text-gray-900">
                      {s.title}
                    </h2>
                  </div>
                  <p className="text-sm leading-7 text-gray-600">{s.desc}</p>
                </section>
              ))}
            </div>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">
                초보자가 자주 막히는 지점
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                {content.beginnerNotes.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">
                순서를 지키면 해석이 달라지는 이유
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                {content.beginnerCase.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">
                입문자가 특히 조심해야 할 해석 오차
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                {content.interpretationBoundaries.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">
                처음 자기 사주를 볼 때 써먹는 순서
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                {content.practicalUse.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">
                처음에는 순서 익히기
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                <p>
                  처음에는 “무슨 사주인가”부터 결론 내리기보다, 어떤 요소를
                  어떤 순서로 살펴보는지 익혀두는 편이 좋습니다. 기본 순서를
                  알고 나면 다른 풀이를 볼 때도 그 설명이 나온 과정을 짚어볼 수
                  있습니다.
                </p>
                <p>
                  이 글의 6단계가 익숙해지면 다음에는 천간과 지지, 음양오행,
                  십성의 연결만 하나씩 더 얹으면 됩니다. 사주 보는 법은 내용을
                  외우는 것만큼, 일정한 순서에 따라 반복해서 읽어보는 과정도
                  중요합니다.
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
                <h2 className="text-base font-black text-[#5956E9]">
                  {content.cta.title}
                </h2>
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
