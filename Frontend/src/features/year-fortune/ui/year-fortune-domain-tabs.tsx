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
  const active = domains[activeIdx];

  if (!active) return null;

  return (
    <div
      className="overflow-hidden rounded-md border-2 border-[#0d0d0d] bg-[#FFFEF9]"
      style={{ boxShadow: "3px 3px 0 #0d0d0d" }}
    >
      <div className="flex items-center justify-between border-b-2 border-[#0d0d0d] bg-[rgb(240,238,232)] px-[18px] py-[13px]">
        <h3 className="font-display text-[14px]">올해 분야별 상세 운세</h3>
        <span className="text-[10px] text-[rgba(13,13,13,.45)]">
          탭을 선택해 확인하세요
        </span>
      </div>

      <YearFortuneDomainPills
        domains={domains}
        activeIdx={activeIdx}
        onSelect={setActiveIdx}
      />
      <YearFortuneDomainContent active={active} />
    </div>
  );
}
