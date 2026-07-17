import type { Metadata } from "next";
import { PageContainer } from "@/shared/ui/page-container";
import { ArticleTrustNote } from "@/shared/ui/article-trust-note";
import { BlogArticleAdSlot } from "@/shared/ui/blog-article-ad-slot.client";
import { createBlogArticleAssets } from "../_data/blog-article-assets";
import { FORTUNE_VS_SAJU_PAGE_CONTENT } from "../_data/blog-page-content";

const article = createBlogArticleAssets("fortune-vs-saju", FORTUNE_VS_SAJU_PAGE_CONTENT);

export const metadata: Metadata = article.metadata;

export default function FortuneVsSajuPage() {
  const content = FORTUNE_VS_SAJU_PAGE_CONTENT;

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
              <h2 className="mb-4 text-lg font-black text-gray-900">헷갈리는 이유부터 정리해보면</h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                <p>
                  “오늘 운세를 봤다”, “사주를 봤다”, “타로를 봤다”는 말은
                  일상에서 비슷하게 쓰이기도 합니다. 다만 각 방식이 참고하는
                  정보와 다루는 질문이 다르므로, 지금 무엇을 알고 싶은지에 따라
                  구분해서 볼 필요가 있습니다.
                </p>
                <p>
                  사주팔자는 태어난 시점의 구조를 해석하는 체계이고, 일반 운세는 집단 단위
                  흐름을 간단히 안내하는 정보에 가깝습니다. 타로는 특정 질문에 대한 현재의
                  흐름과 심리 상태를 읽는 데 강하고, 별자리 점성술은 출생 시점의 행성 배치를
                  바탕으로 성향과 관계 패턴을 해석합니다.
                </p>
                <p>
                  그래서 무엇이 더 우월하냐보다, 어떤 질문을 하고 싶은지에 따라 맞는 도구가
                  달라진다고 보는 편이 현실적입니다.
                </p>
              </div>
            </section>

            <div className="flex flex-col gap-4">
              {content.comparisons.map((c) => (
                <section
                  key={c.title}
                  className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <h2 className="text-lg font-black text-gray-900">{c.title}</h2>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${c.badgeColor}`}>
                      {c.badge}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex gap-2">
                      <span className="w-16 shrink-0 font-semibold text-gray-400">기반</span>
                      <span className="text-gray-700">{c.basis}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="w-16 shrink-0 font-semibold text-gray-400">강점</span>
                      <span className="text-gray-700">{c.strength}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="w-16 shrink-0 font-semibold text-gray-400">한계</span>
                      <span className="text-gray-700">{c.limitation}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="w-16 shrink-0 font-semibold text-[#5956E9]">활용</span>
                      <span className="font-medium text-gray-700">{c.best}</span>
                    </div>
                  </div>
                </section>
              ))}
            </div>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">
                질문별 도구 선택 기준
              </h2>
              <div className="flex flex-col gap-4">
                {content.choosingGuide.map((item) => (
                  <div key={item.title} className="rounded-2xl bg-gray-50 px-4 py-4">
                    <h3 className="text-sm font-black text-gray-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">특히 사주와 일반 운세가 다른 지점</h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                <p>
                  많은 분이 가장 헷갈려하는 건 사주와 일반 운세의 차이입니다. 둘 다 “앞으로의
                  흐름”을 말해주기 때문에 비슷하게 느껴지지만, 해석 단위가 다릅니다.
                </p>
                <p>
                  운세는 띠, 별자리, 날짜처럼 많은 사람을 묶는 기준으로 빠르게 읽히는 반면,
                  사주는 개인의 생년월일시를 중심으로 구조를 세밀하게 나눕니다.
                </p>
                <p>
                  그래서 오늘 기분 좋게 참고할 정보가 필요할 때는 운세로도 충분할 수 있지만,
                  직업 방향이나 인간관계 패턴, 반복되는 선택 문제처럼 더 깊은 질문에는 사주가
                  상대적으로 더 많은 설명력을 가집니다.
                </p>
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">자주 생기는 오해</h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                {content.commonMisunderstandings.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">
                같은 고민에도 도구 선택이 달라지는 경우
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                {content.interpretationBoundaries.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">
                어떤 질문에 어떤 도구를 붙이면 좋은가
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                {content.practicalUse.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">먼저 정할 질문</h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                <p>
                  어떤 방식이 더 잘 맞는지 고민된다면, 먼저 지금 확인하고 싶은
                  질문이 무엇인지 정리해보는 편이 좋습니다. 오늘의 기분과
                  흐름을 가볍게 확인하고 싶은지, 특정 고민 앞에서 선택의 방향을
                  정하고 싶은지, 아니면 내 기질과 인생 흐름을 길게 보고 싶은지에
                  따라 도구가 달라집니다.
                </p>
                <p>
                  사주는 여러 해석 방식 가운데 장기적인 구조와 흐름을 살펴보는 데 주로
                  활용됩니다. 그래서 단순히 좋고 나쁜 날을 맞히는 용도보다, 내가 어떤
                  환경에서 힘을 쓰고 어디에서 반복적으로 흔들리는지 이해하는 쪽에 더 잘
                  맞습니다.
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
