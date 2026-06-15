"use client";

import { usePersonalityProfile } from "@/features/personality/hooks/usePersonalityProfile";
import { PersonalityCareerCard } from "@/features/personality/ui/components/personality-career-card";
import { PersonalityHero } from "@/features/personality/ui/components/personality-hero";
import { PersonalityRomanticCard } from "@/features/personality/ui/components/personality-romantic-card";
import { PersonalityTraitsCard } from "@/features/personality/ui/components/personality-traits-card";
import { RedirectToError } from "@/shared/app-infra/navigation/redirect-to-error.client";
import { useAdGate } from "@/shared/hooks/use-ad-gate";
import { LoadingStateCard } from "@/shared/ui";
import { AdProgressGate } from "@/shared/ui/ad-progress-gate.client";
import {
  FortuneGateLayout,
  FortunePageLayout,
} from "@/shared/ui/fortune-page-layout";

export function PersonalitySection() {
  const { isLoading, isError, data, isPending } = usePersonalityProfile();
  const isContentReady = !isLoading && !isPending && Boolean(data);
  const adGate = useAdGate({ enabled: true, isContentReady });

  if (isError) {
    return <RedirectToError code="PERSONALITY_REPORT_LOAD_FAILED" />;
  }

  if (isPending) {
    return (
      <FortunePageLayout>
        <LoadingStateCard message="상세 성향 리포트를 생성 중입니다." />
      </FortunePageLayout>
    );
  }

  if (adGate.shouldShowGate) {
    return (
      <FortuneGateLayout>
        <AdProgressGate
          progress={isContentReady ? 100 : 80}
          isComplete={isContentReady}
          onRevealResult={adGate.unlock}
          revealButtonLabel="상세 성향 리포트 보기"
        />
      </FortuneGateLayout>
    );
  }

  if (!data) {
    return <RedirectToError code="PERSONALITY_REPORT_NOT_FOUND" />;
  }

  return (
    <FortunePageLayout>
      <div data-testid="personality-page" className="flex flex-col gap-4">
        <PersonalityHero data={data} />
        <PersonalityRomanticCard
          romanticStyle={data.romanticStyle}
          romanticCompatibility={data.romanticCompatibility}
        />
        <PersonalityCareerCard
          careerStyle={data.careerStyle}
          careerTypes={data.careerTypes}
        />
        <PersonalityTraitsCard
          strengths={data.strengths}
          weaknesses={data.weaknesses}
        />
      </div>
    </FortunePageLayout>
  );
}
