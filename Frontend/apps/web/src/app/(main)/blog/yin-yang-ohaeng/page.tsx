import type { Metadata } from "next";
import { PageContainer } from "@/shared/ui/page-container";
import { ArticleTrustNote } from "@/shared/ui/article-trust-note";
import { BlogArticleAdSlot } from "@/shared/ui/blog-article-ad-slot.client";
import { createBlogArticleAssets } from "../_data/blog-article-assets";
import { YIN_YANG_OHAENG_PAGE_CONTENT } from "../_data/blog-page-content";

const article = createBlogArticleAssets("yin-yang-ohaeng", YIN_YANG_OHAENG_PAGE_CONTENT);

export const metadata: Metadata = article.metadata;

export default function YinYangOhaengPage() {
  const content = YIN_YANG_OHAENG_PAGE_CONTENT;

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
              <h2 className="mb-4 text-lg font-black text-gray-900">왜 사주에서 오행 균형을 먼저 볼까?</h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                <p>
                  사주 풀이에서는 “목이 강하다”, “화가 부족하다” 같은 표현을
                  볼 수 있습니다. 이는 사람을 다섯 가지 성격으로 나눈다는 뜻이
                  아니라, 사주 안에서 오행이 어떻게 분포하고 관계를 맺는지
                  설명하는 말입니다.
                </p>
                {content.whyItMatters.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">음양과 오행의 연결</h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                <p>
                  오행을 이해할 때 자주 놓치는 부분이 음양입니다. 같은 목이라도 갑목처럼
                  바깥으로 뻗는 양의 움직임이 있고, 을목처럼 안으로 휘고 스며드는 음의
                  움직임이 있습니다.
                </p>
                <p>
                  사주에서 실제로 보는 것은 “목이 있느냐 없느냐”보다, 그 목이 어떤 계절에서
                  어떤 방식으로 작동하느냐입니다. 이 점을 이해하면 오행 표가 단순 분류표가
                  아니라 해석의 좌표처럼 보이기 시작합니다.
                </p>
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">오행의 특성</h2>
              <div className="mb-5 flex flex-col gap-3 text-sm leading-7 text-gray-600">
                <p>
                  아래 표는 각 오행의 대표 이미지를 빠르게 익히기 위한 요약입니다. 실제
                  해석에서는 장점과 단점이 고정된 성격표처럼 쓰이지 않고, 특정 기운이 강할 때
                  자주 나타나는 경향으로 읽는 편이 맞습니다.
                </p>
                <p>
                  예를 들어 화는 열정과 표현력을 살리지만 과하면 조급함과 소모로 나타날 수
                  있고, 수는 유연성과 통찰을 주지만 지나치면 망설임과 과한 걱정으로 이어질 수
                  있습니다.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {content.ohaeng.map((item) => (
                  <div key={item.element} className={`rounded-2xl border px-4 py-4 ${item.color}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-xl">{item.symbol}</span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${item.badgeColor}`}>
                        {item.element}
                      </span>
                      <span className="text-xs text-gray-500">{item.nature}</span>
                    </div>
                    <div className="flex flex-col gap-1 text-xs text-gray-600">
                      <span>
                        계절: {item.season} · 방위: {item.direction}
                      </span>
                      <span>장점: {item.traits}</span>
                      <span>단점: {item.weakness}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-3 text-lg font-black text-gray-900">상생(相生)과 상극(相剋)</h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                <p>
                  <strong className="text-gray-900">상생</strong>은 오행이 서로 도움을 주는
                  관계입니다. 목→화→토→금→수→목의 순서로 앞의 오행이 뒤를 돕습니다.
                </p>
                <p>
                  <strong className="text-gray-900">상극</strong>은 오행이 서로 억제하는
                  관계입니다. 목→토, 토→수, 수→화, 화→금, 금→목의 관계입니다.
                </p>
                <p>
                  초보자에게는 상생이 좋은 것, 상극이 나쁜 것처럼 보이기 쉽지만 실제 해석은
                  그렇게 단순하지 않습니다. 적절한 제어는 오히려 구조를 안정시킬 수 있습니다.
                </p>
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">오행을 읽는 실제 순서</h2>
              <div className="flex flex-col gap-4">
                {content.readingOrder.map((item) => (
                  <div key={item.title} className="rounded-2xl bg-gray-50 px-4 py-4">
                    <h3 className="text-sm font-black text-gray-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">자주 하는 오해</h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                {content.commonQuestions.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">
                같은 오행도 체감이 갈리는 이유
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                {content.interpretationBoundaries.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">
                오행을 생활 판단에 붙이는 방법
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                {content.practicalUse.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
              <h2 className="mb-4 text-lg font-black text-gray-900">
                오행을 보는 관점
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
                <p>
                  오행을 알고 나면 풀이에서 어떤 기준으로 목·화·토·금·수를
                  설명하는지 따라가기 수월해집니다. 특정 오행의 많고 적음만으로
                  사람을 단정하기보다, 생활 습관이나 선택을 돌아보는 참고
                  기준으로 활용할 수 있습니다.
                </p>
                <p>
                  그래서 오행 공부의 핵심은 “나는 무조건 어떤 타입이다”를 찾는 데 있지
                  않습니다. 지금 내 구조에서 무엇이 자연스럽고 무엇이 무리한지를 읽는 쪽에 더
                  가깝습니다.
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
