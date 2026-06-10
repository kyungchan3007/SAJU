import type { Metadata } from "next";
import { PageContainer } from "@/shared/ui/page-container";

export const metadata: Metadata = {
  title: "음양오행(陰陽五行)이란? 사주의 핵심 원리 쉽게 이해하기",
  description:
    "사주팔자의 근간이 되는 음양오행의 개념과 상생·상극 관계를 알기 쉽게 설명합니다. 목·화·토·금·수 오행이 내 사주에서 어떤 의미를 갖는지 알아보세요.",
  alternates: { canonical: "/blog/yin-yang-ohaeng" },
};

const ohaeng = [
  {
    element: "목(木)",
    color: "bg-green-50 border-green-200",
    badgeColor: "bg-green-100 text-green-700",
    symbol: "🌱",
    nature: "성장·발전·인자함",
    season: "봄",
    direction: "동쪽",
    traits: "진취적, 창의적, 인자함, 성장 지향",
    weakness: "고집, 우유부단, 쉽게 꺾임",
  },
  {
    element: "화(火)",
    color: "bg-red-50 border-red-200",
    badgeColor: "bg-red-100 text-red-600",
    symbol: "🔥",
    nature: "열정·활력·예의",
    season: "여름",
    direction: "남쪽",
    traits: "열정적, 활발함, 직관력, 카리스마",
    weakness: "충동적, 산만함, 쉽게 지침",
  },
  {
    element: "토(土)",
    color: "bg-yellow-50 border-yellow-200",
    badgeColor: "bg-yellow-100 text-yellow-700",
    symbol: "🏔️",
    nature: "안정·신뢰·신의",
    season: "환절기",
    direction: "중앙",
    traits: "안정적, 포용력, 신뢰감, 현실적",
    weakness: "변화 거부, 고집, 느린 적응",
  },
  {
    element: "금(金)",
    color: "bg-gray-50 border-gray-200",
    badgeColor: "bg-gray-100 text-gray-600",
    symbol: "⚙️",
    nature: "결단·의리·정의",
    season: "가을",
    direction: "서쪽",
    traits: "결단력, 정확함, 의리, 완벽주의",
    weakness: "냉정함, 날카로움, 융통성 부족",
  },
  {
    element: "수(水)",
    color: "bg-blue-50 border-blue-200",
    badgeColor: "bg-blue-100 text-blue-600",
    symbol: "💧",
    nature: "지혜·유연·지략",
    season: "겨울",
    direction: "북쪽",
    traits: "지혜롭고 유연함, 통찰력, 적응력",
    weakness: "변덕, 우유부단, 과도한 걱정",
  },
];

export default function YinYangOhaengPage() {
  return (
    <main className="bg-white py-10 md:py-14">
      <PageContainer width="reading">
        <div className="flex flex-col gap-8">
          <header className="flex flex-col gap-3">
            <span className="w-fit rounded-full bg-[#F0EEFF] px-3 py-1 text-xs font-bold text-[#5956E9]">
              사주 기초
            </span>
            <h1 className="text-3xl font-black tracking-tight text-gray-900">
              음양오행(陰陽五行)이란?
            </h1>
            <p className="text-sm leading-relaxed text-gray-500">
              사주팔자의 핵심 원리, 목·화·토·금·수 오행 완벽 이해
            </p>
          </header>

          <section className="rounded-3xl border border-[#EDE9FF] bg-[#FAFAFF] px-5 py-5 text-sm leading-7 text-gray-600 md:px-7">
            <p>
              음양(陰陽)은 세상 모든 것이 음과 양의 두 기운으로 이루어진다는 원리이고,
              오행(五行)은 이 기운이 목·화·토·금·수 다섯 가지로 순환한다는 이론입니다.
              사주팔자의 8글자는 모두 오행 중 하나에 속하며, 이 균형이 개인의 성격과 운을 결정합니다.
            </p>
          </section>

          <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
            <h2 className="mb-4 text-lg font-black text-gray-900">오행의 특성</h2>
            <div className="flex flex-col gap-4">
              {ohaeng.map((item) => (
                <div key={item.element} className={`rounded-2xl border px-4 py-4 ${item.color}`}>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-xl">{item.symbol}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${item.badgeColor}`}>
                      {item.element}
                    </span>
                    <span className="text-xs text-gray-500">{item.nature}</span>
                  </div>
                  <div className="flex flex-col gap-1 text-xs text-gray-600">
                    <span>계절: {item.season} · 방위: {item.direction}</span>
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
                <strong className="text-gray-900">상생</strong>은 오행이 서로 도움을 주는 관계입니다.
                목→화→토→금→수→목의 순서로 앞의 오행이 뒤를 돕습니다.
                사주에서 상생 관계가 많으면 운이 순탄하게 흐릅니다.
              </p>
              <p>
                <strong className="text-gray-900">상극</strong>은 오행이 서로 억제하는 관계입니다.
                목→토, 토→수, 수→화, 화→금, 금→목의 관계입니다.
                상극이 과하면 갈등이 생기지만, 적절한 상극은 균형을 잡아주는 역할을 합니다.
              </p>
            </div>
          </section>

          <section className="rounded-3xl bg-[#F0EEFF] px-5 py-6 md:px-7">
            <div className="flex flex-col gap-2">
              <h2 className="text-base font-black text-[#5956E9]">
                내 사주의 오행 균형을 확인해보세요
              </h2>
              <p className="text-sm leading-6 text-gray-600">
                사주 분석을 통해 나의 오행 강약과 부족한 기운이 무엇인지 파악할 수 있습니다.
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
