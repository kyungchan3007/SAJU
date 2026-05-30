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
import { Badge, IconBadge, ProgressBar } from "@/shared/ui";

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
        <IconBadge size="sm">
          <ChartColumn size={16} />
        </IconBadge>
        <span className="text-[15px] font-extrabold text-[#111827]">분야별 궁합</span>
      </div>

      {/* 섹션 리스트 */}
      <div className="flex flex-col gap-4">
        {sections.map((section, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconBadge
                  className="h-6 w-6 rounded-lg"
                  style={{ background: `${section.color}18` }}
                >
                  <SectionIcon icon={section.icon} color={section.color} />
                </IconBadge>
                <span className="text-[13px] font-bold text-[#111827]">{section.label}</span>
                {section.keyword && (
                  <Badge
                    className="px-2 py-0.5 text-[10px]"
                    style={{ background: `${section.color}18`, color: section.color }}
                  >
                    {section.keyword}
                  </Badge>
                )}
              </div>
              <span className="text-[13px] font-extrabold" style={{ color: section.color }}>
                {section.score}
              </span>
            </div>
            <ProgressBar
              value={section.score}
              indicatorStyle={{ background: section.color }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
