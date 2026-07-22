import type { Route } from "next";
import { HomeTodaySajuCardSlot } from "@/widgets/homeSection/ui/home-today-saju-card-slot.client";
import { HomeMarketingSections } from "@/features/home/ui/home-marketing-sections";
import { HomeHeroSection } from "@/widgets/home-hero/ui/home-hero-section";

type HomeSectionProps = {
  primaryCtaHref: Route;
};

export function HomeSection({ primaryCtaHref }: HomeSectionProps) {
  return (
    <div className="w-full">
      {/* 로그인 사용자 홈 첫 화면: 공통 히어로에 오늘의 운세 카드 주입. */}
      <HomeHeroSection
        headingId="home-hero-heading"
        badgeLabel="커뮤니티"
        primaryCtaLabel="커뮤니티 참가하기 →"
        primaryCtaHref={primaryCtaHref}
        rightSlot={
          <div
            className="w-full rounded-2xl [&_.hero-panel]:p-5"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
          >
            <HomeTodaySajuCardSlot />
          </div>
        }
      />

      {/* 히어로 아래 공통 마케팅/서비스 소개 영역. */}
      <HomeMarketingSections />
    </div>
  );
}
