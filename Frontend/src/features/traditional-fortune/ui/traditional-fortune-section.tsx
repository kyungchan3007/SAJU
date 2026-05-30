"use client";

import type { TraditionalFortuneResponse } from "@/generated/api";
import { useTraditionalFortune } from "@/features/traditional-fortune/hooks/useTraditionalFortune";
import { useTraditionalFortuneSectionState } from "@/features/traditional-fortune/hooks/useTraditionalFortuneSectionState";
import { TraditionalFortuneCautionCard } from "@/features/traditional-fortune/ui/components/traditional-fortune-caution-card";
import { TraditionalFortuneDomainCard } from "@/features/traditional-fortune/ui/components/traditional-fortune-domain-card";
import { TraditionalFortuneEmptyState } from "@/features/traditional-fortune/ui/components/traditional-fortune-empty-state";
import { TraditionalFortuneHeader } from "@/features/traditional-fortune/ui/components/traditional-fortune-header";
import { TraditionalFortuneHeroBanner } from "@/features/traditional-fortune/ui/components/traditional-fortune-hero-banner";
import { TraditionalFortuneOverallCard } from "@/features/traditional-fortune/ui/components/traditional-fortune-overall-card";
import type { ApiEnvelope } from "@/shared/api";
import { useAdGate } from "@/shared/hooks/use-ad-gate";
import { AdProgressGate } from "@/shared/ui/ad-progress-gate.client";
import { FortuneGateLayout, FortunePageLayout } from "@/shared/ui/fortune-page-layout";

type TraditionalFortuneSectionProps = {
  initialData?: ApiEnvelope<TraditionalFortuneResponse | undefined>;
};

export function TraditionalFortuneSection({
  initialData,
}: TraditionalFortuneSectionProps) {
  const { isLoading, isError, errorMessage, data, domains } =
    useTraditionalFortune({ initialData });
  const { activeDomain, setActiveDomain, activeDomainData } =
    useTraditionalFortuneSectionState({ domains });
  const isContentReady = !isLoading && Boolean(data);
  const adGate = useAdGate({ enabled: true, isContentReady });

  if (isError) {
    return (
      <TraditionalFortuneEmptyState
        message={errorMessage ?? "사주 데이터를 불러오지 못했어."}
      />
    );
  }

  if (adGate.shouldShowGate) {
    return (
      <FortuneGateLayout>
        <AdProgressGate
          progress={isContentReady ? 100 : 80}
          isComplete={isContentReady}
          onRevealResult={adGate.unlock}
        />
      </FortuneGateLayout>
    );
  }

  if (!data) return null;

  return (
    <FortunePageLayout>
    <div className="flex flex-col gap-4">
      <TraditionalFortuneHeader
        yearDescription={data.description}
      />
      <TraditionalFortuneHeroBanner data={data} />
      {(data.overallFortune ||
        data.favorablePeriods ||
        data.cautiousPeriods) && <TraditionalFortuneOverallCard data={data} />}
      {domains.length > 0 && (
        <TraditionalFortuneDomainCard
          domains={domains}
          activeDomain={activeDomain}
          activeDomainData={activeDomainData}
          onSelectDomain={setActiveDomain}
        />
      )}
      {data.yearCautions && (
        <TraditionalFortuneCautionCard text={data.yearCautions} />
      )}
    </div>
    </FortunePageLayout>
  );
}
