"use client";

import { useYearFortune } from "@/features/year-fortune/hooks/useYearFortune";
import { YearFortuneDomainTabs } from "@/features/year-fortune/ui/year-fortune-domain-tabs";
import { YearFortuneHero } from "@/features/year-fortune/ui/year-fortune-hero";
import { YearFortuneMonthly } from "@/features/year-fortune/ui/year-fortune-monthly";
import { useAdGate } from "@/shared/hooks/use-ad-gate";
import { AdProgressGate } from "@/shared/ui/ad-progress-gate.client";

export function YearFortuneSection() {
  const { isLoading, isError, errorMessage, isPending, display } =
    useYearFortune();
  const isContentReady = !isLoading && !isPending && Boolean(display);
  const adGate = useAdGate({ enabled: true, isContentReady });

  if (isError) {
    return (
      <div className="rounded-sm border-2 border-red-400 bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-600">
        {errorMessage}
      </div>
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

  if (!display) return null;

  return (
    <div className="flex flex-col gap-4 pb-6 pt-6">
      <YearFortuneHero
        yearLabel={display.yearLabel}
        targetYear={display.targetYear}
        userInfo={display.userInfo}
      />

      <YearFortuneDomainTabs domains={display.domains} />

      {display.months.length > 0 && (
        <YearFortuneMonthly
          months={display.months}
          targetYear={display.targetYear}
        />
      )}
    </div>
  );
}
