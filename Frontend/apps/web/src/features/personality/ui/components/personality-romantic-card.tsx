"use client";

import { useId, useState } from "react";
import { Heart, Users } from "lucide-react";

type Props = {
  romanticStyle?: string;
  romanticCompatibility?: string;
};

function ExpandableText({ text, color }: { text: string; color: string }) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();
  return (
    <div>
      <p
        id={contentId}
        className={`text-[13px] leading-[1.75] text-gray-600 ${!expanded ? "line-clamp-4" : ""}`}
      >
        {text}
      </p>
      <button
        type="button"
        onClick={() => setExpanded((p) => !p)}
        aria-expanded={expanded}
        aria-controls={contentId}
        className="mt-1 text-[12px] font-bold"
        style={{ color }}
      >
        {expanded ? "접기" : "더보기…"}
      </button>
    </div>
  );
}

export function PersonalityRomanticCard({
  romanticStyle,
  romanticCompatibility,
}: Props) {
  if (!romanticStyle && !romanticCompatibility) return null;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFF0F6]">
          <Heart size={13} color="#EC4899" />
        </div>
        <span className="text-[13px] font-black">연애 성향</span>
      </div>

      <div className="flex flex-col gap-3">
        {romanticStyle && (
          <div className="rounded-2xl border border-pink-100 bg-[#FFF8FB] p-4">
            <div className="mb-2 text-[11px] font-bold text-pink-500">
              연애 스타일
            </div>
            <ExpandableText text={romanticStyle} color="#EC4899" />
          </div>
        )}

        {romanticCompatibility && (
          <div className="rounded-2xl border border-pink-100 bg-[#FFF8FB] p-4">
            <div className="mb-2 flex items-center gap-1.5">
              <Users size={11} className="shrink-0 text-pink-400" />
              <span className="text-[11px] font-bold text-pink-500">
                잘 맞는 관계
              </span>
            </div>
            <ExpandableText text={romanticCompatibility} color="#EC4899" />
          </div>
        )}
      </div>
    </div>
  );
}
