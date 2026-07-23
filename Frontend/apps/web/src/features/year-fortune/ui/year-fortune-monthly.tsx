"use client";

import { useState } from "react";
import type {
  MonthDisplay,
  MonthType,
} from "@/features/year-fortune/model/yearFortune";

type Props = {
  months: MonthDisplay[];
  targetYear: number;
};

const MONTH_NUM_COLOR: Record<MonthType, string> = {
  good: "text-[#5956E9]",
  normal: "text-[#6B7280]",
  caution: "text-[#EF4444]",
};

const MONTH_TAG_STYLE: Record<
  MonthType,
  { background: string; color: string }
> = {
  good: { background: "#F0EEFF", color: "#4338CA" },
  normal: { background: "#F3F4F6", color: "#4B5563" },
  caution: { background: "#FFF1F2", color: "#B91C1C" },
};

const MONTH_TAG_LABEL: Record<MonthType, string> = {
  good: "길함",
  normal: "보통",
  caution: "주의",
};

export function YearFortuneMonthly({ months }: Props) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  if (!months.length) return null;

  function toggle(month: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(month)) {
        next.delete(month);
      } else {
        next.add(month);
      }
      return next;
    });
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F0EEFF]">
          <span className="text-[15px]">📅</span>
        </div>
        <span className="text-base font-black">월별 운세</span>
        <span className="ml-auto text-[12px] text-slate-500">
          항목을 눌러 전체 내용을 확인하세요
        </span>
      </div>

      <div>
        {months.map((m, idx) => {
          const isExpanded = expanded.has(m.month);
          const numColor = MONTH_NUM_COLOR[m.type];
          const tagStyle = MONTH_TAG_STYLE[m.type];
          const tagLabel = MONTH_TAG_LABEL[m.type];
          const isLast = idx === months.length - 1;

          return (
            <div
              key={m.month}
              className={`py-[18px] ${!isLast ? "border-b border-[#F3F4F6]" : ""}`}
            >
              <div className="flex flex-col">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className={`text-[24px] font-black leading-none ${numColor}`}>
                    {m.month}월
                  </span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[11px] font-bold"
                    style={tagStyle}
                  >
                    {tagLabel}
                  </span>
                </div>

                <p
                  id={`year-fortune-month-${m.month}`}
                  className={`text-[13px] leading-[1.75] text-[#4B5563] ${
                    !isExpanded ? "line-clamp-3" : ""
                  }`}
                >
                  {m.fortune}
                </p>

                {m.fortune && (
                  <button
                    type="button"
                    onClick={() => toggle(m.month)}
                    aria-expanded={isExpanded}
                    aria-controls={`year-fortune-month-${m.month}`}
                    className="mt-1.5 inline-flex cursor-pointer items-center gap-1 text-[11px] font-bold text-[#5956E9] hover:opacity-75"
                  >
                    {isExpanded ? "접기 ↑" : "더보기 ↓"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
