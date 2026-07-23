"use client";

import { useState } from "react";
import type { DomainDisplay } from "@/features/year-fortune/model/yearFortune";
import { YearFortuneDomainContent } from "@/features/year-fortune/ui/components/year-fortune-domain-content";

type Props = {
  domains: DomainDisplay[];
};

export function YearFortuneDomainTabs({ domains }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const safeActiveIdx =
    domains.length === 0 ? 0 : Math.min(activeIdx, domains.length - 1);
  const active = domains[safeActiveIdx];

  if (!active) return null;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      {/* 섹션 헤더 */}
      <div className="mb-5 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F0EEFF]">
          <span className="text-[15px]">⊞</span>
        </div>
        <span className="text-base font-black">영역별 운세</span>
      </div>

      {/* 탭 필 */}
      <div
        role="tablist"
        aria-label="신년운세 영역 탭"
        className="mb-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {domains.map((domain, index) => {
          const isActive = index === safeActiveIdx;
          const panelId = `year-fortune-domain-panel-${index}`;
          const tabId = `year-fortune-domain-tab-${index}`;

          return (
            <button
              key={domain.key}
              id={tabId}
              role="tab"
              type="button"
              onClick={() => setActiveIdx(index)}
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              className={`inline-flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full px-5 py-[9px] text-[13px] font-bold transition-colors transition-shadow ${
                isActive
                  ? "bg-[#5956E9] text-white shadow-[0_4px_12px_rgba(89,86,233,0.25)]"
                  : "border-[1.5px] border-[#E5E7EB] bg-white text-[#4B5563] hover:border-[#5956E9] hover:text-[#5956E9]"
              }`}
            >
              {domain.icon} {domain.label}
            </button>
          );
        })}
      </div>

      {domains.map((domain, index) => {
        const isActive = index === safeActiveIdx;
        const panelId = `year-fortune-domain-panel-${index}`;
        const tabId = `year-fortune-domain-tab-${index}`;

        return (
          <YearFortuneDomainContent
            key={domain.key}
            active={domain}
            id={panelId}
            labelledBy={tabId}
            hidden={!isActive}
          />
        );
      })}
    </div>
  );
}
