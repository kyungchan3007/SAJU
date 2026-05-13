"use client";

import { useState } from "react";
import type { DomainDisplay } from "@/features/year-fortune/model/yearFortune";

type Props = {
  domains: DomainDisplay[];
};

export function YearFortuneDomainTabs({ domains }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = domains[activeIdx];

  if (!active) return null;

  return (
    <div
      className="overflow-hidden rounded-md border-2 border-[#0d0d0d] bg-[#FFFEF9]"
      style={{ boxShadow: "3px 3px 0 #0d0d0d" }}
    >
      <div className="flex items-center justify-between border-b-2 border-[#0d0d0d] bg-[rgb(240,238,232)] px-[18px] py-[13px]">
        <h3 className="font-display text-[14px]">🗂 분야별 상세 풀이</h3>
        <span className="text-[10px] text-[rgba(13,13,13,.45)]">탭을 선택해 확인하세요</span>
      </div>

      {/* domain pills */}
      <div className="flex gap-[5px] overflow-x-auto border-b-2 border-[#0d0d0d] px-[14px] py-[10px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {domains.map((d, i) => {
          const isActive = i === activeIdx;
          return (
            <button
              key={d.key}
              type="button"
              onClick={() => setActiveIdx(i)}
              className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full border-2 border-[#0d0d0d] px-3 py-[5px] text-[11px] font-bold whitespace-nowrap transition-all"
              style={
                isActive
                  ? {
                      background: "#0d0d0d",
                      color: "white",
                      transform: "translate(-1px,-1px)",
                      boxShadow: "2px 2px 0 #0d0d0d",
                    }
                  : { background: "#FFFEF9", boxShadow: "2px 2px 0 #0d0d0d" }
              }
            >
              {d.icon} {d.label}
            </button>
          );
        })}
      </div>

      {/* domain content */}
      <div className="p-[18px]">
        {active.content ? (
          <div
            className="rounded-sm border-2 border-[#0d0d0d] p-[14px_16px]"
            style={{ background: "rgb(253,251,240)", boxShadow: "2px 2px 0 #0d0d0d" }}
          >
            {active.title && (
              <div className="mb-1.5 text-[10px] font-bold tracking-[.1em] text-[rgba(13,13,13,.45)]">
                {active.title}
              </div>
            )}
            <p className="whitespace-pre-line text-[13px] leading-[1.85] text-[rgba(13,13,13,.72)]">
              {active.content}
            </p>
          </div>
        ) : (
          <p className="text-[13px] text-[rgba(13,13,13,.45)]">내용이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
