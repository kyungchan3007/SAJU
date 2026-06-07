import {
  Brain,
  ChartColumn,
  Gem,
  Handshake,
  Heart,
  MessageCircle,
  Shield,
  TrendingUp,
  Zap,
} from "lucide-react";
import type { CompatibilitySectionDisplay } from "@/features/compatibility/model/compatibility";
import { Badge, IconBadge } from "@/shared/ui";

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

const STEP_COUNT = 5;

function JourneyTrack({ score, color }: { score: number; color: string }) {
  return (
    <div className="flex items-center">
      {Array.from({ length: STEP_COUNT }).map((_, i) => {
        const step = i + 1;
        const isPassed = step < score;
        const isActive = step === score;

        return (
          <div key={step} className="flex flex-1 items-center">
            <div
              className="relative z-10 flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-extrabold"
              style={
                isPassed
                  ? { borderColor: color, background: color, color: "white" }
                  : isActive
                    ? {
                        borderColor: color,
                        background: "white",
                        color,
                        width: 28,
                        height: 28,
                        fontSize: 12,
                        boxShadow: `0 0 0 4px ${color}22`,
                      }
                    : { borderColor: "#e5e7eb", background: "white", color: "#d1d5db" }
              }
            >
              {step}
            </div>
            {i < STEP_COUNT - 1 && (
              <div
                className="h-[2px] flex-1 rounded-full"
                style={{ background: step < score ? color : "#e5e7eb" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function FunLabelBox({ section }: { section: CompatibilitySectionDisplay }) {
  const { funLabel, color } = section;
  return (
    <div
      className="flex items-center gap-3 rounded-2xl border-[1.5px] px-4 py-3"
      style={{ background: `${color}08`, borderColor: `${color}35` }}
    >
      <span className="flex-shrink-0 text-[26px] leading-none">{funLabel.emoji}</span>
      <div className="flex flex-1 flex-col gap-0.5">
        <span className="text-[13px] font-black leading-snug tracking-tight" style={{ color }}>
          {funLabel.text}
        </span>
        <span className="text-[10px] font-medium text-gray-400">{section.scoreLabel}</span>
      </div>
      <span
        className="flex-shrink-0 rounded-full px-2 py-1 text-[9px] font-extrabold tracking-wide"
        style={{ background: `${color}18`, color }}
      >
        {funLabel.badge}
      </span>
    </div>
  );
}

export function CompatibilityResultSections({ sections }: Props) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      {/* 헤더 */}
      <div className="mb-5 flex items-center gap-2">
        <IconBadge size="sm">
          <ChartColumn size={16} />
        </IconBadge>
        <span className="text-[15px] font-extrabold text-[#111827]">분야별 궁합</span>
      </div>

      {/* 섹션 리스트 */}
      <div className="flex flex-col gap-5">
        {sections.map((section, i) => (
          <div key={i} className="flex flex-col gap-3">
            {/* 분야명 + 키워드 */}
            <div className="flex items-center gap-2">
              <IconBadge
                className="h-7 w-7 rounded-lg"
                style={{ background: `${section.color}18` }}
              >
                <SectionIcon icon={section.icon} color={section.color} />
              </IconBadge>
              <span className="text-[13px] font-extrabold text-[#111827]">{section.label}</span>
              {section.keyword && (
                <Badge
                  className="hidden max-w-[160px] truncate px-2 py-0.5 text-[10px] sm:inline-flex"
                  style={{ background: `${section.color}18`, color: section.color }}
                >
                  {section.keyword}
                </Badge>
              )}
            </div>

            {/* 여정 트랙 */}
            <JourneyTrack score={section.score} color={section.color} />

            {/* 재밌는 레이블 */}
            <FunLabelBox section={section} />
          </div>
        ))}
      </div>
    </div>
  );
}
