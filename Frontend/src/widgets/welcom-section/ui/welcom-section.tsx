import { CtaButton } from "@/widgets/welcom-section/ui/button/cta-button";
import { Title } from "@/widgets/welcom-section/ui/title/title";
import { ReviewMarquee } from "@/widgets/welcom-section/ui/review/review-marquee";
import { ServiceCards } from "@/widgets/welcom-section/ui/service/service-cards";

export function WelcomSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="flex w-full flex-1 flex-col overflow-hidden"
    >
      {/* 히어로 — flex-1로 남은 공간 채우며 내부 콘텐츠 센터 */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center sm:px-6">
        <Title />
        <CtaButton />
        {/* 서비스 소개 카드 — 주석으로 on/off */}
        <ServiceCards />
      </div>

      {/* 마퀴 — 자연 흐름으로 하단 배치 */}
      <div className="container overflow-hidden border-t-2 border-black/10 pb-10">
        <ReviewMarquee />
      </div>
    </section>
  );
}
