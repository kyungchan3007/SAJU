import { SAJU_PILLAR_LABEL_MAP } from "@/shared/model/saju-pillar/model";
import {
  getSajuPillarTypeAt,
  isDayPillar,
  orderSajuPillars,
} from "@/shared/model/saju-pillar/utils";
import { describeGanjiPillar } from "@/shared/model/saju-ganji/utils";
import { SajuSectionHeading } from "@/shared/ui/saju-section-heading/saju-section-heading";

export type Pillar = {
  type: string;
  stem: string;
  branch: string;
  twelveGrowth?: string;
};

type Props = { pillars: Pillar[] };

export function JeongtongsajuPillars({ pillars }: Props) {
  const ordered = orderSajuPillars(pillars);

  return (
    <div
      className="rounded-sm border-2 border-black bg-[#FDFCF8]"
      style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
    >
      <SajuSectionHeading helpKey="pillars" />
      <div className="p-4">
        <div
          className="overflow-hidden rounded-sm border-2 border-black"
          style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
        >
          <div className="grid grid-cols-4">
            {ordered.map((pillar, i) => {
              const type = getSajuPillarTypeAt(i);
              const isDay = isDayPillar(type);
              const description = pillar
                ? describeGanjiPillar(pillar)
                : `${SAJU_PILLAR_LABEL_MAP[type]}는 천간과 지지가 결합된 사주 기둥입니다.`;

              return (
                <div
                  key={type}
                  className={`flex flex-col ${i < 3 ? "border-r-2 border-black" : ""}`}
                >
                  <div className="bg-[#0d0d0d] py-1.5 text-center text-[11px] font-bold tracking-wider text-white">
                    {SAJU_PILLAR_LABEL_MAP[type]}
                  </div>
                  <div
                    className={`border-b border-[#d4d0c8] py-3 text-center font-['Jua',sans-serif] text-[28px] sm:text-[24px] ${
                      isDay ? "bg-[#fffbeb]" : "bg-[#FDFCF8]"
                    }`}
                  >
                    {pillar?.stem ?? "—"}
                  </div>
                  <div
                    className={`border-b border-[#d4d0c8] py-3 text-center font-['Jua',sans-serif] text-[28px] sm:text-[24px] ${
                      isDay ? "bg-[#fef9c3]" : "bg-[#F8F6F1]"
                    }`}
                  >
                    {pillar?.branch ?? "—"}
                  </div>
                  <div className="bg-[#FDFCF8] py-2 text-center text-[11px] text-[#7a7570]">
                    {pillar?.twelveGrowth ?? ""}
                  </div>
                  <p className="min-h-[72px] border-t border-[#d4d0c8] bg-[#FDFCF8] px-2.5 py-2 text-left text-[10px] leading-relaxed text-[#0d0d0d]/65">
                    {description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <p className="mt-2.5 text-center text-[10px] text-[#7a7570]">
          일주가 본인의 핵심 기운입니다
        </p>
      </div>
    </div>
  );
}
