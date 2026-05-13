"use client";

import { useYearFortune } from "@/features/year-fortune/hooks/useYearFortune";
import { YearFortuneHero } from "@/features/year-fortune/ui/year-fortune-hero";
import { YearFortuneOverview } from "@/features/year-fortune/ui/year-fortune-overview";
import { YearFortuneDomainTabs } from "@/features/year-fortune/ui/year-fortune-domain-tabs";
import { YearFortuneMonthly } from "@/features/year-fortune/ui/year-fortune-monthly";

export function YearFortuneSection() {
  const { isLoading, isError, errorMessage, isPending, display } =
    useYearFortune();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-[#d4d0c8] border-t-[#0d0d0d]" />
        <span className="font-display text-[15px]">
          신년운세 불러오는 중...
        </span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-sm border-2 border-red-400 bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-600">
        {errorMessage}
      </div>
    );
  }

  if (isPending || display?.status === "PENDING") {
    return (
      <div
        className="flex flex-col items-center gap-3 rounded-sm border-2 border-[#0d0d0d] bg-[#FDFCF8] py-14 text-center"
        style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
      >
        <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#d4d0c8] border-t-[#0d0d0d]" />
        <span className="font-display text-[17px]">신년운세 분석 중이에요</span>
        <p className="text-[13px] leading-relaxed text-[#7a7570]">
          사주 데이터를 분석하고 있어요.
          <br />
          잠시 후 자동으로 업데이트됩니다.
        </p>
      </div>
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
        <YearFortuneMonthly
          months={display.months}
          targetYear={display.targetYear}
        />
      )}
    </div>
  );
}
