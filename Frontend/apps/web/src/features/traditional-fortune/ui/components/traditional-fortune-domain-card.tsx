"use client";

import { useId, useState } from "react";
import {
  Briefcase,
  Heart,
  LayoutGrid,
  Leaf,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import type {
  DomainDisplay,
  DomainKey,
} from "@/features/traditional-fortune/model/traditionalFortune";

function DomainIcon({ icon, size, color }: { icon: string; size: number; color: string }) {
  const props = { size, color, strokeWidth: 2 };
  switch (icon) {
    case "TrendingUp": return <TrendingUp {...props} />;
    case "Heart":      return <Heart {...props} />;
    case "Briefcase":  return <Briefcase {...props} />;
    case "Leaf":       return <Leaf {...props} />;
    default:           return <TrendingUp {...props} />;
  }
}

type Props = {
  domains: DomainDisplay[];
  activeDomain: DomainKey;
  activeDomainData: DomainDisplay | null;
  onSelectDomain: (key: DomainKey) => void;
};

const DOMAIN_COLORS: Record<
  string,
  { header: string; bar: string; key: string; bg: string }
> = {
  love:   { header: "bg-[#FFF1F2]", bar: "from-[#F43F5E] to-[#E8718D]", key: "text-[#F43F5E]", bg: "bg-[#FFF8F8]" },
  career: { header: "bg-[#F0FDF4]", bar: "from-[#22C55E] to-[#16A34A]", key: "text-green-700", bg: "bg-[#F0FDF4]" },
  wealth: { header: "bg-[#FEFCE8]", bar: "from-[#EAB308] to-[#CA8A04]", key: "text-yellow-700", bg: "bg-[#FEFCE8]" },
  health: { header: "bg-[#F0F9FF]", bar: "from-[#38BDF8] to-[#0284C7]", key: "text-sky-700",   bg: "bg-[#F0F9FF]" },
};

function SectionExpandable({
  title,
  text,
  color,
}: {
  title: string;
  text: string;
  color: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();

  return (
    <div>
      <div className="mb-1.5 text-[11px] font-bold text-slate-400">{title}</div>
      <p
        id={contentId}
        className={`text-[13px] leading-[1.75] text-gray-600 ${
          !expanded ? "line-clamp-3" : ""
        }`}
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

export function TraditionalFortuneDomainCard({
  domains,
  activeDomain,
  activeDomainData,
  onSelectDomain,
}: Props) {
  const c = activeDomainData
    ? DOMAIN_COLORS[activeDomainData.key] ?? DOMAIN_COLORS.love
    : DOMAIN_COLORS.love;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F0EEFF]">
          <LayoutGrid size={13} color="#5956E9" />
        </div>
        <span className="text-[13px] font-black">영역별 운세 풀이</span>
      </div>

      {/* 탭 */}
      <div
        role="tablist"
        aria-label="영역별 운세 탭"
        className="mb-4 flex gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {domains.map((d) => {
          const isActive = activeDomain === d.key;
          const tabId = `traditional-domain-tab-${d.key}`;
          const panelId = `traditional-domain-panel-${d.key}`;
          return (
            <button
              key={d.key}
              id={tabId}
              role="tab"
              type="button"
              onClick={() => onSelectDomain(d.key)}
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-bold transition-colors transition-shadow ${
                isActive
                  ? "bg-[#5956E9] text-white shadow-[0_4px_12px_rgba(89,86,233,0.25)]"
                  : "border border-[1.5px] border-gray-200 bg-white text-gray-500 hover:border-[#5956E9] hover:text-[#5956E9]"
              }`}
            >
              <DomainIcon icon={d.icon} size={13} color={isActive ? "white" : d.color} />
              {d.label}
            </button>
          );
        })}
      </div>

      {activeDomainData && (
        <div
          id={`traditional-domain-panel-${activeDomainData.key}`}
          role="tabpanel"
          aria-labelledby={`traditional-domain-tab-${activeDomainData.key}`}
          className="flex flex-col gap-3"
        >
          {/* 점수 헤더 */}
          <div
            className={`flex items-center justify-between rounded-2xl p-4 ${c.header}`}
          >
            <div className="flex items-center gap-2">
              <DomainIcon icon={activeDomainData.icon} size={18} color={activeDomainData.color} />
              <span className="text-[13px] font-black">{activeDomainData.label}</span>
            </div>
            <span
              className="text-[20px] font-black"
              style={{ color: activeDomainData.color }}
            >
              {activeDomainData.score}점
            </span>
          </div>

          {/* 점수 바 */}
          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${c.bar}`}
              style={{ width: `${activeDomainData.score}%` }}
            />
          </div>

          {/* 키포인트 */}
          {activeDomainData.keyPoint && (
            <div
              className={`flex items-center gap-2 rounded-xl px-3 py-2 ${c.header}`}
            >
              <Lightbulb size={12} style={{ color: activeDomainData.color }} className="shrink-0" />
              <span
                className={`text-[11px] font-black ${c.key}`}
              >
                {activeDomainData.keyPoint}
              </span>
            </div>
          )}

          {/* 섹션별 내용 */}
          {activeDomainData.sections.map((section, i) => (
            <div
              key={i}
              className={`rounded-2xl border border-gray-100 p-3.5 ${c.bg}`}
            >
              <SectionExpandable
                title={section.title}
                text={section.text}
                color={activeDomainData.color}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
