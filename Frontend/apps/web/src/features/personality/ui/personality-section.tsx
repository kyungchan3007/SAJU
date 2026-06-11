"use client";

import { usePersonalityProfile } from "@/features/personality/hooks/usePersonalityProfile";
import { PersonalityCareerCard } from "@/features/personality/ui/components/personality-career-card";
import { PersonalityHero } from "@/features/personality/ui/components/personality-hero";
import { PersonalityRomanticCard } from "@/features/personality/ui/components/personality-romantic-card";
import { PersonalityTraitsCard } from "@/features/personality/ui/components/personality-traits-card";
import { useAdGate } from "@/shared/hooks/use-ad-gate";
import { ErrorStateCard } from "@/shared/ui";
import { AdProgressGate } from "@/shared/ui/ad-progress-gate.client";
import {
  FortuneGateLayout,
  FortunePageLayout,
} from "@/shared/ui/fortune-page-layout";

export function PersonalitySection() {
  const { isLoading, isError, errorMessage, data, isPending } =
    usePersonalityProfile();
  const isContentReady = !isLoading && !isPending && Boolean(data);
  const adGate = useAdGate({ enabled: true, isContentReady });

  if (isError) {
    return (
      <FortunePageLayout>
        <ErrorStateCard
          title="상세 성향 리포트를 불러오지 못했습니다."
          description={errorMessage ?? "잠시 후 다시 시도해 주세요."}
        />
      </FortunePageLayout>
    );
  }

  if (isPending) {
    return (
      <FortunePageLayout>
        <ErrorStateCard
          title="상세 성향 리포트를 생성 중입니다."
          description="분석이 완료되면 다시 열어 확인해 주세요."
        />
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
    return (
      <FortunePageLayout>
        <ErrorStateCard
          title="상세 성향 리포트를 찾을 수 없습니다."
          description="사주 분석 정보가 준비된 뒤 다시 확인해 주세요."
        />
      </FortunePageLayout>
    );
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
