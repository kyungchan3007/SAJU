"use client";

import { useState } from "react";
import type { DomainDisplay } from "@/features/year-fortune/model/yearFortune";
import { YearFortuneDomainContent } from "@/features/year-fortune/ui/components/year-fortune-domain-content";
import { YearFortuneDomainPills } from "@/features/year-fortune/ui/components/year-fortune-domain-pills";

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
      <YearFortuneDomainPills
        domains={domains}
        activeIdx={safeActiveIdx}
        onSelect={setActiveIdx}
      />

      {/* 내용 */}
      <YearFortuneDomainContent active={active} />
    </div>
  );
}
