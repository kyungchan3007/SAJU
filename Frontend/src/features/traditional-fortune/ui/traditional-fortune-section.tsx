"use client";

import { useTraditionalFortune } from "@/features/traditional-fortune/hooks/useTraditionalFortune";
import { useTraditionalFortuneSectionState } from "@/features/traditional-fortune/hooks/useTraditionalFortuneSectionState";
import { TraditionalFortuneCautionCard } from "@/features/traditional-fortune/ui/components/traditional-fortune-caution-card";
import { TraditionalFortuneDomainCard } from "@/features/traditional-fortune/ui/components/traditional-fortune-domain-card";
import { TraditionalFortuneEmptyState } from "@/features/traditional-fortune/ui/components/traditional-fortune-empty-state";
import { TraditionalFortuneHeader } from "@/features/traditional-fortune/ui/components/traditional-fortune-header";
import { TraditionalFortuneHeroBanner } from "@/features/traditional-fortune/ui/components/traditional-fortune-hero-banner";
import { TraditionalFortuneOverallCard } from "@/features/traditional-fortune/ui/components/traditional-fortune-overall-card";
import { useAdGate } from "@/shared/hooks/use-ad-gate";
import { AdProgressGate } from "@/shared/ui/ad-progress-gate.client";

export function TraditionalFortuneSection() {
  const { isLoading, isError, errorMessage, data, domains } =
    useTraditionalFortune();
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
      <AdProgressGate
        progress={isContentReady ? 100 : 80}
        isComplete={isContentReady}
        onRevealResult={adGate.unlock}
      />
    );
  }

  if (!data) return null;

  return (
    <div className="flex flex-col gap-4">
      <TraditionalFortuneHeader targetYear={data.targetYear} />
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
  );
}
