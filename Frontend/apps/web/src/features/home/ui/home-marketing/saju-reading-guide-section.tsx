import { MarketingExampleCard, MarketingSupportLinks } from "@/features/home/ui/home-marketing/marketing-support";
import { PageContainer } from "@/shared/ui/page-container";

const guideCards = [
  {
    title: "오행 균형 예시",
    description:
      "수(水)의 비중이 높으면 사고가 유연하고 상황 판단이 빠르다고 해석할 수 있습니다. 반대로 화(火)가 강하면 추진력과 표현력이 두드러질 수 있습니다.",
  },
  {
    title: "일간 해석 예시",
    description:
      "일간은 나 자신의 성향을 읽는 출발점입니다. 같은 사주라도 일간과 오행 분포를 함께 봐야 성격과 선택 패턴을 더 정확히 설명할 수 있습니다.",
  },
  {
    title: "운의 흐름 예시",
    description:
      "대운과 세운은 타고난 성향 위에 작용하는 시기적 변화입니다. 상반기 안정, 하반기 변화처럼 시기별 포인트를 나눠 읽는 방식이 여기에 해당합니다.",
  },
];

export function SajuReadingGuideSection() {
  return (
    <section className="bg-white py-20">
      <PageContainer width="content">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3 text-center md:text-left">
            <div className="text-xs text-gray-500">공개 예시로 먼저 이해해보세요</div>
            <h2 className="text-3xl font-black leading-snug text-gray-900">
              사주 해석은 이렇게 읽습니다
            </h2>
            <p className="text-sm leading-relaxed text-gray-500">
              로그인 없이도 사주 해석이 어떤 방식으로 이루어지는지 핵심 개념과 짧은 예시로 먼저 살펴볼 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {guideCards.map((card) => (
              <MarketingExampleCard
                key={card.title}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>

          <MarketingSupportLinks
            heading="관련 글"
            links={[
              { href: "/blog/saju-meaning", label: "사주팔자란 무엇인가?" },
              { href: "/blog/how-to-read-saju", label: "사주 보는 법 입문" },
              { href: "/blog/yin-yang-ohaeng", label: "음양오행 이해하기" },
            ]}
          />
        </div>
      </PageContainer>
    </section>
  );
}
