"use client";

import { useId, useState } from "react";
import { AlertTriangle, BookOpen, CheckCircle2 } from "lucide-react";
import type { TraditionalFortuneResponse } from "@/generated/api";

type Props = {
  data: TraditionalFortuneResponse;
};

export function TraditionalFortuneOverallCard({ data }: Props) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F0EEFF]">
          <BookOpen size={13} color="#5956E9" />
        </div>
        <span className="text-[13px] font-black">종합 운세</span>
      </div>

      {(data.favorablePeriods || data.cautiousPeriods) && (
        <div className="mb-3 grid grid-cols-2 gap-2">
          {data.favorablePeriods && (
            <div className="rounded-xl bg-[#F0FDF4] p-3">
              <div className="mb-1 flex items-center gap-1">
                <CheckCircle2 size={11} className="text-green-600 shrink-0" />
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
                <AlertTriangle size={11} className="text-red-500 shrink-0" />
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

      {data.overallFortune && (
        <>
          <p
            id={contentId}
            className={`text-[13px] leading-[1.75] text-gray-600 ${
              !expanded ? "line-clamp-3" : ""
            }`}
          >
            {data.overallFortune}
          </p>
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            aria-controls={contentId}
            className="mt-1.5 text-[12px] font-bold text-[#5956E9]"
          >
            {expanded ? "접기" : "더보기…"}
          </button>
        </>
      )}
    </div>
  );
}
