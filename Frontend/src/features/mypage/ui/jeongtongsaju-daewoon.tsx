import {
  describeBigLuckGanji,
  formatBigLuckGanjiSummary,
} from "@/shared/model/saju-ganji/utils";
import { SajuSectionHeading } from "@/shared/ui/saju-section-heading/saju-section-heading";

export type DaewoonItem = {
  pillar: string;
  pillar_kor: string;
  year_range: string;
  age_range: string;
  isCurrentDaeun: boolean;
};

type Props = { bigLuck: DaewoonItem[] };

export function JeongtongsajuDaewoon({ bigLuck }: Props) {
  return (
    <div
      className="rounded-sm border-2 border-black bg-[#FDFCF8]"
      style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
    >
      <SajuSectionHeading helpKey="bigLuck" />
      <div className="flex flex-col">
        {bigLuck.map((item, i) => {
          const description = describeBigLuckGanji(item);
          const summary = formatBigLuckGanjiSummary(item.pillar);

          return (
            <div
              key={i}
              className={`border-b border-[#d4d0c8] px-4 py-3 last:border-b-0 ${
                item.isCurrentDaeun ? "bg-yellow-300" : ""
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`h-3 w-3 shrink-0 rounded-full border-2 border-black ${
                    item.isCurrentDaeun ? "bg-[#0d0d0d]" : "bg-[#F8F6F1]"
                  }`}
                />
                <div className="min-w-[44px] font-['Jua',sans-serif] text-[18px]">
                  {item.pillar}
                </div>
                <div className="min-w-[40px] text-[13px] font-semibold">
                  {summary}
                  {item.isCurrentDaeun && (
                    <span className="ml-1 rounded-full bg-[#0d0d0d] px-1.5 py-0.5 text-[9px] font-bold text-white">
                      현재
                    </span>
                  )}
                </div>
                <div className="flex-1 text-[11px] text-[#7a7570]">
                  {item.year_range}
                </div>
                <div className="min-w-[60px] text-right text-[11px] font-bold">
                  {item.age_range}
                </div>
              </div>
              <p className="mt-2 pl-[calc(0.75rem+14px)] text-[11px] leading-relaxed text-[#0d0d0d]/60">
                {description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
