import type { Metadata } from "next";
import { createPageMetadata } from "@/shared/lib/seo";
import { PageContainer } from "@/shared/ui/page-container";

export const metadata: Metadata = createPageMetadata({
  title: "운세와 사주의 차이 | 사주팔자·타로·별자리 비교 정리",
  description: "운세와 사주의 차이가 궁금한 분을 위해 사주팔자, 타로, 별자리 점성술의 기준과 활용 차이를 알기 쉽게 비교했습니다.",
  path: "/blog/fortune-vs-saju",
  type: "article",
});

const comparisons = [
  {
    title: "사주팔자",
    badge: "동양 철학",
    badgeColor: "bg-[#F0EEFF] text-[#5956E9]",
    basis: "생년월일시",
    strength: "타고난 성격, 재능, 평생 운의 흐름",
    limitation: "시간 정보가 정확해야 정밀한 분석 가능",
    best: "인생 전반의 방향성, 적성, 결혼·직업 운 파악",
  },
  {
    title: "운세",
    badge: "일반 점술",
    badgeColor: "bg-gray-100 text-gray-600",
    basis: "띠·별자리·날짜 등",
    strength: "오늘·이번 주·이번 달 등 단기 흐름",
    limitation: "개인 맞춤이 아닌 집단 평균 정보",
    best: "일상적인 길흉 판단, 빠른 참고용",
  },
  {
    title: "타로",
    badge: "서양 점술",
    badgeColor: "bg-purple-50 text-purple-600",
    basis: "카드 배열과 직관",
    strength: "현재 상황과 심리 상태, 선택의 방향",
    limitation: "리더의 주관적 해석에 크게 의존",
    best: "특정 고민이나 선택 앞에서 직관적 조언",
  },
  {
    title: "별자리 점성술",
    badge: "서양 철학",
    badgeColor: "bg-indigo-50 text-indigo-600",
    basis: "출생 시 행성 위치",
    strength: "성격 유형, 인간관계 패턴",
    limitation: "서양식 세계관 기반으로 동양과 해석 차이",
    best: "성격 이해, 대인 관계 파악",
  },
];

export default function FortuneVsSajuPage() {
  return (
    <main className="bg-white py-10 md:py-14">
      <PageContainer width="reading">
        <div className="flex flex-col gap-8">
          <header className="flex flex-col gap-3">
            <span className="w-fit rounded-full bg-[#F0EEFF] px-3 py-1 text-xs font-bold text-[#5956E9]">
              사주 기초
            </span>
            <h1 className="text-3xl font-black tracking-tight text-gray-900">
              운세와 사주의 차이
            </h1>
            <p className="text-sm leading-relaxed text-gray-500">
              사주팔자·운세·타로·별자리, 무엇이 어떻게 다른가?
            </p>
          </header>

          <section className="rounded-3xl border border-[#EDE9FF] bg-[#FAFAFF] px-5 py-5 text-sm leading-7 text-gray-600 md:px-7">
            <p>
              <q>사주랑 운세랑 같은 건가요?</q> 많은 분이 혼동하는
              질문입니다. 사주팔자는 개인의 생년월일시를 기반으로 한 정밀한
              분석 체계이고, 일반 운세는 띠나 별자리 등 집단 단위로 제공되는
              참고 정보입니다. 각각의 특성을 이해하면 상황에 맞게 더 잘 활용할
              수 있습니다.
            </p>
          </section>

          <div className="flex flex-col gap-4">
            {comparisons.map((c) => (
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

          <section className="rounded-3xl bg-[#F0EEFF] px-5 py-6 md:px-7">
            <div className="flex flex-col gap-2">
              <h2 className="text-base font-black text-[#5956E9]">
                가장 정밀한 사주팔자 분석을 받아보세요
              </h2>
              <p className="text-sm leading-6 text-gray-600">
                단순 운세가 아닌 나만의 생년월일시 기반 사주 분석으로 더 깊은 인사이트를 확인하세요.
              </p>
              <a
                href="/saju"
                className="mt-2 w-fit rounded-full bg-[#5956E9] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#4745c8]"
              >
                내 사주 보러 가기
              </a>
            </div>
          </section>
        </div>
      </PageContainer>
    </main>
  );
}
