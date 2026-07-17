import type { Metadata } from "next";
import { PageContainer } from "@/shared/ui/page-container";
import { ArticleTrustNote } from "@/shared/ui/article-trust-note";
import { BlogArticleAdSlot } from "@/shared/ui/blog-article-ad-slot.client";
import { createBlogArticleAssets } from "../_data/blog-article-assets";
import { SAJU_MEANING_PAGE_CONTENT } from "../_data/blog-page-content";

const article = createBlogArticleAssets("saju-meaning", SAJU_MEANING_PAGE_CONTENT);

export const metadata: Metadata = article.metadata;

export default function SajuMeaningPage() {
  const content = SAJU_MEANING_PAGE_CONTENT;

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
                사주를 처음 찾게 되는 이유
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                <p>
                  사주를 찾는 사람은 대개 두 가지를 같이 궁금해합니다. 앞으로의
                  흐름도 궁금하고, 지금의 내가 왜 비슷한 선택을 반복하는지도
                  알고 싶어집니다.
                </p>
                {content.whyPeopleLookAtSaju.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            {content.sections.map((s) => (
              <section
                key={s.title}
                className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7"
              >
                <h2 className="mb-3 text-lg font-black text-gray-900">
                  {s.title}
                </h2>
                <p className="text-sm leading-7 text-gray-600">{s.content}</p>
              </section>
            ))}

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">
                사주를 볼 때 자주 오해하는 부분
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                <p>
                  사주팔자는 여덟 글자로 구성되지만, 글자만 확인한다고 바로
                  풀이가 끝나는 것은 아닙니다. 태어난 계절과 오행의 분포, 천간과
                  지지의 관계를 먼저 살펴보고, 해석 목적에 따라 대운과 세운도
                  함께 참고합니다.
                </p>
                <p>
                  또 하나는 사주가 사람을 한 문장으로 확정한다고 보는
                  시선입니다. 하지만 실제로는 같은 구조도 환경과 선택에 따라
                  전혀 다르게 드러납니다. 그래서 사주는 “나는 원래 이런
                  사람”이라고 낙인찍는 도구보다, 어떤 경향이 강하고 어떤
                  조건에서 흔들리는지 이해하는 도구로 읽는 편이 더 정확합니다.
                </p>
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">
                {content.readingCase.title}
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                <p>{content.readingCase.summary}</p>
                {content.readingCase.points.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">
                입문자가 먼저 잡아두면 좋은 질문
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                {content.beginnerQuestions.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">
                같은 사주 설명도 다르게 읽히는 경우
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                {content.interpretationBoundaries.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">
                입문 단계에서 실제로 활용하는 방법
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                {content.practicalUse.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">
                사주를 읽는 관점
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                <p>
                  사주팔자는 상징 몇 개의 뜻을 외우는 데서 끝나지 않고, 내
                  성향과 선택이 어떤 흐름으로 이어지는지 살펴보는 방식에
                  가깝습니다. 그래서 처음에는 모든 용어를 한 번에 이해하려고
                  하기보다, 네 기둥, 천간과 지지, 오행 균형, 대운 흐름처럼 큰
                  구조부터 익히는 편이 오래 갑니다.
                </p>
                <p>
                  이 글을 입문용으로 읽었다면 다음 단계는 천간과 지지, 음양오행,
                  그리고 실제 사주 보는 순서를 차례대로 익히는 것입니다. 그렇게
                  연결해서 보면 사주팔자는 더 이상 낯선 한자 여덟 글자가 아니라,
                  성향과 흐름을 해석하는 체계로 보이기 시작합니다.
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
