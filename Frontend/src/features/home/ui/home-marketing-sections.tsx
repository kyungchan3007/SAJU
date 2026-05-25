import { BigLuckMarketingSection } from "@/features/home/ui/home-marketing/big-luck-marketing-section";
import { CompatibilityMarketingSection } from "@/features/home/ui/home-marketing/compatibility-marketing-section";
import { HomeMarketingCtaSection } from "@/features/home/ui/home-marketing/home-marketing-cta-section";
import { TarotCommunityMarketingSection } from "@/features/home/ui/home-marketing/tarot-community-marketing-section";
import { TraditionalSajuMarketingSection } from "@/features/home/ui/home-marketing/traditional-saju-marketing-section";
import { YearFortuneMarketingSection } from "@/features/home/ui/home-marketing/year-fortune-marketing-section";

/** 게스트/로그인 홈 공통 섹션 02~06 + 하단 CTA */
export function HomeMarketingSections() {
  return (
    <>
      <TraditionalSajuMarketingSection />
      <BigLuckMarketingSection />
      <CompatibilityMarketingSection />
      <YearFortuneMarketingSection />
      <TarotCommunityMarketingSection />
      <HomeMarketingCtaSection />
    </>
  );
}
