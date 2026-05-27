"use client";

import { useState } from "react";
import type { TraditionalFortuneResponse } from "@/generated/api";

type Props = {
  data: TraditionalFortuneResponse;
};

export function TraditionalFortuneOverallCard({ data }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F0EEFF]">
          <span className="text-[13px]">🧭</span>
        </div>
        <span className="text-[13px] font-black">
          {data.targetYear ? `${data.targetYear}년 종합 운세` : "종합 운세"}
        </span>
      </div>

      {/* 길/주의 시기 */}
      {(data.favorablePeriods || data.cautiousPeriods) && (
        <div className="mb-3 grid grid-cols-2 gap-2">
          {data.favorablePeriods && (
            <div className="rounded-xl bg-[#F0FDF4] p-3">
              <div className="mb-1 flex items-center gap-1">
                <span className="text-[11px]">☀️</span>
                <span className="text-[11px] font-bold text-green-700">
                  길한 시기
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-600">
                {data.favorablePeriods}
              </p>
            </div>
          )}
          {data.cautiousPeriods && (
            <div className="rounded-xl bg-[#FFF5F5] p-3">
              <div className="mb-1 flex items-center gap-1">
                <span className="text-[11px]">☁️</span>
                <span className="text-[11px] font-bold text-red-600">
                  주의 시기
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-600">
                {data.cautiousPeriods}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 종합 운세 텍스트 */}
      {data.overallFortune && (
        <>
          <p
            className={`text-[13px] leading-[1.75] text-gray-600 ${
              !expanded ? "line-clamp-3" : ""
            }`}
          >
            {data.overallFortune}
          </p>
          <button
            type="button"
            onClick={() => setExpanded((p) => !p)}
            className="mt-1.5 text-[12px] font-bold text-[#5956E9]"
          >
            {expanded ? "접기" : "더보기 ···"}
          </button>
        </>
      )}
    </div>
  );
}
