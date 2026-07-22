"use client";

import {
  Brain,
  Gem,
  Handshake,
  Heart,
  MessageCircle,
  Shield,
  TrendingUp,
  Zap,
} from "lucide-react";
import type { CompatibilitySectionDisplay } from "@/features/compatibility/model/compatibility";

function SectionIcon({ icon, color }: { icon: string; color: string }) {
  const props = { size: 12, style: { color }, strokeWidth: 2 };
  switch (icon) {
    case "💘": return <Heart {...props} />;
    case "🧠": return <Brain {...props} />;
    case "🗣️": return <MessageCircle {...props} />;
    case "🤝": return <Handshake {...props} />;
    case "💍": return <Gem {...props} />;
    case "💰": return <TrendingUp {...props} />;
    case "⚡": return <Zap {...props} />;
    default:   return <Shield {...props} />;
  }
}

type Props = {
  sections: CompatibilitySectionDisplay[];
  activeSectionIndex: number;
  activeSection: CompatibilitySectionDisplay | undefined;
  onSelectSection: (index: number) => void;
};

export function CompatibilityResultDetailTabs({
  sections,
  activeSectionIndex,
  activeSection,
  onSelectSection,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white shadow-sm overflow-hidden">
      {/* 헤더 */}
      <div className="border-b border-slate-100 px-6 py-4">
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-xl"
            style={{ background: "#F0EEFF" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5956E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <span className="text-[15px] font-extrabold text-[#111827]">분야별 상세 풀이</span>
        </div>
      </div>

      {/* 탭 버튼 */}
      <div
        role="tablist"
        aria-label="궁합 상세 풀이 탭"
        className="grid grid-cols-3 gap-2 px-5 pb-0 pt-4 sm:grid-cols-4"
      >
        {sections.map((section, i) => {
          const isActive = i === activeSectionIndex;
          const tabId = `compatibility-detail-tab-${i}`;
          const panelId = `compatibility-detail-panel-${i}`;
          return (
            <button
              key={`${section.label}-${i}`}
              id={tabId}
              role="tab"
              type="button"
              onClick={() => onSelectSection(i)}
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              className="inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-2 py-1.5 text-[11px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5956E9] focus-visible:ring-offset-2 sm:text-[12px]"
              style={
                isActive
                  ? {
                      background: "#5956E9",
                      color: "white",
                    }
                  : {
                      background: "#F3F4F6",
                      color: "#6B7280",
                    }
              }
            >
              <SectionIcon icon={section.icon} color={isActive ? "white" : section.color} />
              <span>{section.label}</span>
            </button>
          );
        })}
      </div>

      {/* 내용 */}
      <div className="p-5">
        {activeSection?.content ? (
          <div
            id={`compatibility-detail-panel-${activeSectionIndex}`}
            role="tabpanel"
            aria-labelledby={`compatibility-detail-tab-${activeSectionIndex}`}
            className="rounded-2xl border p-4"
            style={{ background: "#F9F8FF", borderColor: "#E0DAFF" }}
          >
            {activeSection.keyword && (
              <span
                className="mb-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                style={{ background: "#E0DAFF", color: "#5956E9" }}
              >
                {activeSection.keyword}
              </span>
            )}
            <p className="whitespace-pre-line text-[13px] leading-[1.85] text-[#374151]">
              {activeSection.content}
            </p>
          </div>
        ) : (
          <p className="text-[13px] text-slate-400">아직 상세 풀이가 없어요.</p>
        )}
      </div>
    </div>
  );
}
