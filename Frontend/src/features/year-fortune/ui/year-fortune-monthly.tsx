"use client";

import { useState } from "react";
import type { MonthDisplay } from "@/features/year-fortune/model/yearFortune";
import { YearFortuneMonthlyDetail } from "@/features/year-fortune/ui/components/year-fortune-monthly-detail";
import { YearFortuneMonthlyGrid } from "@/features/year-fortune/ui/components/year-fortune-monthly-grid";

type Props = {
  months: MonthDisplay[];
  targetYear: number;
};

export function YearFortuneMonthly({ months, targetYear }: Props) {
  const firstMonth = months[0]?.month ?? 1;
  const [activeMonth, setActiveMonth] = useState(firstMonth);

  if (!months.length) return null;

  const active = months.find((m) => m.month === activeMonth) ?? months[0];

  return (
    <div
      className="overflow-hidden rounded-md border-2 border-[#0d0d0d] bg-[#FFFEF9]"
      style={{ boxShadow: "3px 3px 0 #0d0d0d" }}
    >
      <div className="flex items-center justify-between border-b-2 border-[#0d0d0d] bg-[rgb(240,238,232)] px-[18px] py-[13px]">
        <h3 className="font-display text-[14px]">🗓 {targetYear}년 월별 운세</h3>
        <span className="text-[11px] text-[rgba(13,13,13,.45)]">
          월을 클릭해 상세보기
        </span>
      </div>

      <div className="flex flex-col gap-3 p-[18px]">
        <YearFortuneMonthlyGrid
          months={months}
          activeMonth={activeMonth}
          onSelectMonth={setActiveMonth}
        />
        {active && <YearFortuneMonthlyDetail active={active} />}
      </div>
    </div>
  );
}
