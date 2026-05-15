"use client";

import { useYearFortune } from "@/features/year-fortune/hooks/useYearFortune";
import { YearFortuneDomainTabs } from "@/features/year-fortune/ui/year-fortune-domain-tabs";
import { YearFortuneHero } from "@/features/year-fortune/ui/year-fortune-hero";
import { YearFortuneMonthly } from "@/features/year-fortune/ui/year-fortune-monthly";
import { YearFortuneOverview } from "@/features/year-fortune/ui/year-fortune-overview";
import { useAdGate } from "@/shared/hooks/use-ad-gate";
import { AdProgressGate } from "@/shared/ui/ad-progress-gate.client";

export function YearFortuneSection() {
  const { isLoading, isError, errorMessage, isPending, display } = useYearFortune();

  if (isError) {
    return (
      <div className="rounded-sm border-2 border-red-400 bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-600">
        {errorMessage}
      </div>
    );
  }

  const isContentReady = !isLoading && !isPending && Boolean(display);
  const adGate = useAdGate({ enabled: true, isContentReady });

  if (adGate.shouldShowGate) {
    return (
      <AdProgressGate
        progress={isContentReady ? 100 : 80}
        isComplete={isContentReady}
        onRevealResult={adGate.unlock}
      />
    );
  }

  if (!display) return null;

  const generalDomain = display.domains.find((d) => d.key === "general");

  return (
    <div className="flex flex-col gap-4">
      <YearFortuneHero
        yearLabel={display.yearLabel}
        targetYear={display.targetYear}
        generalTitle={generalDomain?.title}
      />

      <YearFortuneOverview
        title={generalDomain?.title}
        content={generalDomain?.content}
        targetYear={display.targetYear}
      />

      <YearFortuneDomainTabs domains={display.domains} />

      {display.months.length > 0 && (
        <YearFortuneMonthly months={display.months} targetYear={display.targetYear} />
      )}
    </div>
  );
}
