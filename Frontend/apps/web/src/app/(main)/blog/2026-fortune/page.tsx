import type { Metadata } from "next";
import { PageContainer } from "@/shared/ui/page-container";
import { ArticleTrustNote } from "@/shared/ui/article-trust-note";
import { BlogArticleAdSlot } from "@/shared/ui/blog-article-ad-slot.client";
import { createBlogArticleAssets } from "../_data/blog-article-assets";
import { FORTUNE_2026_PAGE_CONTENT } from "../_data/blog-page-content";

const article = createBlogArticleAssets("2026-fortune", FORTUNE_2026_PAGE_CONTENT);

export const metadata: Metadata = article.metadata;

export default function Fortune2026Page() {
  const content = FORTUNE_2026_PAGE_CONTENT;

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
              <h2 className="mb-4 text-lg font-black text-gray-900">2026년 운세를 읽기 전에 먼저 볼 기준</h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                <p>
                  해마다 공개되는 운세 글은 많은 사람에게 공통으로 적용되는
                  흐름을 정리한 내용에 가깝습니다. 2026년 병오년의 흐름을
                  중심으로 정리한 내용이므로, 개인에게 같은 사건이 일어난다는
                  뜻으로 받아들이기보다는 한 해의 전반적인 분위기를 참고하는
                  편이 좋습니다.
                </p>
                {content.readingPoints.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">병오년 전체 분위기에서 주의할 점</h2>
              <div className="flex flex-col gap-3">
                {content.yearlyCautions.map((item) => (
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

            <div className="flex flex-col gap-4">
              {content.areas.map((a) => (
                <section
                  key={a.area}
                  className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-xl">{a.icon}</span>
                    <h2 className="text-lg font-black text-gray-900">{a.area}</h2>
                    <span className="rounded-full bg-[#F0EEFF] px-2.5 py-0.5 text-xs font-bold text-[#5956E9]">
                      {a.summary}
                    </span>
                  </div>
                  <p className="text-sm leading-7 text-gray-600">{a.desc}</p>
                </section>
              ))}
            </div>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">올해 운세를 실전에서 활용하는 방법</h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                <p>
                  2026년 운세는 구체적인 사건을 예언하는 내용이 아닙니다. 일이나
                  관계, 생활 계획 가운데 어디에 조금 더 신경 쓸지 살펴보는 참고
                  자료로 활용할 수 있습니다.
                </p>
                <p>
                  애정운과 관계운 역시 “좋다/나쁘다”보다는 표현 방식과 속도 조절의 문제로
                  읽는 편이 현실적입니다.
                </p>
                <p>
                  결국 중요한 건 올해의 분위기를 내 일정과 선택에 맞춰 번역하는 일입니다.
                </p>
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">공통 운세를 실제 선택에 연결하는 사례</h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                {content.realWorldCase.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">
                같은 병오년도 사람마다 다르게 체감되는 이유
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                {content.interpretationBoundaries.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">
                공통 운세를 실제 계획으로 옮기는 방법
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                {content.practicalUse.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">개인 운세가 따로 필요한 이유</h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                <p>
                  같은 병오년을 살아가더라도 사람마다 체감은 다릅니다. 원래 화 기운이 강한
                  사람은 추진력이 크게 올라갈 수 있고, 이미 과열된 구조를 가진 사람은 피로와
                  감정 기복이 더 심해질 수도 있습니다.
                </p>
                <p>
                  그래서 올해 운세는 출발점으로는 유용하지만, 중요한 결정을 앞둔 상황이라면
                  자신의 사주와 현재 대운 흐름을 함께 보는 편이 훨씬 실질적인 판단에 도움이
                  됩니다.
                </p>
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
