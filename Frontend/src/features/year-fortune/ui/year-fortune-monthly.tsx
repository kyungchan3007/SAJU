"use client";

import { useState } from "react";
import type { MonthDisplay } from "@/features/year-fortune/model/yearFortune";

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
        <h3 className="font-display text-[14px]">📅 {targetYear}년 월별 운세</h3>
        <span className="text-[11px] text-[rgba(13,13,13,.45)]">월 클릭 → 상세보기</span>
      </div>

      <div className="flex flex-col gap-3 p-[18px]">
        {/* month grid */}
        <div className="grid grid-cols-6 gap-[6px]">
          {months.map((m) => {
            const isActive = m.month === activeMonth;
            return (
              <button
                key={m.month}
                type="button"
                onClick={() => setActiveMonth(m.month)}
                className="cursor-pointer rounded-sm border-2 border-[#0d0d0d] px-1 py-2 text-center transition-all"
                style={
                  isActive
                    ? {
                        background: "#0d0d0d",
                        color: "white",
                        transform: "translate(-1px,-1px)",
                        boxShadow: "3px 3px 0 #0d0d0d",
                      }
                    : { background: "#FFFEF9", boxShadow: "2px 2px 0 #0d0d0d" }
                }
              >
                <div
                  className="text-[10px] font-semibold"
                  style={{
                    color: isActive ? "rgba(255,255,255,.6)" : "rgba(13,13,13,.45)",
                  }}
                >
                  {m.month}월
                </div>
                <div className="my-0.5 text-[15px]">{m.emoji}</div>
                <div
                  className="text-[7px] tracking-[1px]"
                  style={{ color: isActive ? "#FDE047" : "#F59E0B" }}
                >
                  ★★★
                </div>
              </button>
            );
          })}
        </div>

        {/* month detail */}
        {active && (
          <div
            className="rounded-sm border-2 border-[#0d0d0d] p-[14px_16px]"
            style={{ background: "rgb(253,251,245)" }}
          >
            <div className="mb-2 flex items-center gap-2 font-display text-[15px]">
              <span>{active.month}월</span>
              <span
                className="inline-block rounded-full border-2 border-[#0d0d0d] px-2 py-0.5 text-[10px] font-bold"
                style={{ background: "#FDE047", boxShadow: "1px 1px 0 #0d0d0d" }}
              >
                {active.tagText}
              </span>
            </div>
            <p className="text-[13px] leading-[1.8] text-[rgba(13,13,13,.68)]">
              {active.fortune}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
