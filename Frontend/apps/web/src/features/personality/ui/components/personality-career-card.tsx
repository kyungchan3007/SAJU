"use client";

import { useId, useState } from "react";
import { Briefcase } from "lucide-react";

type Props = {
  careerStyle?: string;
  careerTypes?: Array<string>;
};

export function PersonalityCareerCard({ careerStyle, careerTypes }: Props) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();
  const validTypes = (careerTypes ?? []).filter(
    (t): t is string => typeof t === "string" && t.length > 0,
  );

  if (!careerStyle && validTypes.length === 0) return null;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EEF2FF]">
          <Briefcase size={13} color="#5956E9" />
        </div>
        <span className="text-[13px] font-black">직업 성향</span>
      </div>

      {validTypes.length > 0 && (
        <div className="mb-4">
          <div className="mb-2 text-[11px] font-bold text-slate-400">
            추천 직무
          </div>
          <div className="flex flex-wrap gap-1.5">
            {validTypes.map((type) => (
              <span
                key={type}
                className="inline-flex items-center rounded-full bg-[#F0EEFF] px-3 py-1.5 text-[12px] font-bold text-[#5956E9]"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      )}

      {careerStyle && (
        <div className="rounded-2xl border border-indigo-50 bg-[#F8F7FF] p-4">
          <div className="mb-2 text-[11px] font-bold text-[#5956E9]">
            직업 스타일
          </div>
          <p
            id={contentId}
            className={`text-[13px] leading-[1.75] text-gray-600 ${!expanded ? "line-clamp-4" : ""}`}
          >
            {careerStyle}
          </p>
          <button
            type="button"
            onClick={() => setExpanded((p) => !p)}
            aria-expanded={expanded}
            aria-controls={contentId}
            className="mt-1 text-[12px] font-bold text-[#5956E9]"
          >
            {expanded ? "접기" : "더보기…"}
          </button>
        </div>
      )}
    </div>
  );
}
