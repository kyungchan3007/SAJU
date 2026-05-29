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

type Props = {
  sections: CompatibilitySectionDisplay[];
};

function SectionIcon({ icon, color }: { icon: string; color: string }) {
  const props = { size: 15, style: { color }, strokeWidth: 2 };
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

export function CompatibilityResultSections({ sections }: Props) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      {/* 헤더 */}
      <div className="mb-5 flex items-center gap-2">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-xl"
          style={{ background: "#F0EEFF" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5956E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        </div>
        <span className="text-[15px] font-extrabold text-[#111827]">분야별 궁합</span>
      </div>

      {/* 섹션 리스트 */}
      <div className="flex flex-col gap-4">
        {sections.map((section, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: `${section.color}18` }}
                >
                  <SectionIcon icon={section.icon} color={section.color} />
                </div>
                <span className="text-[13px] font-bold text-[#111827]">{section.label}</span>
                {section.keyword && (
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                    style={{ background: `${section.color}18`, color: section.color }}
                  >
                    {section.keyword}
                  </span>
                )}
              </div>
              <span className="text-[13px] font-extrabold" style={{ color: section.color }}>
                {section.score}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${section.score}%`, background: section.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
