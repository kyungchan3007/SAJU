import { SAJU_PILLAR_TWELVE_GROWTH_COLUMNS } from "@/shared/model/saju-pillar/model";
import { SajuSectionHeading } from "@/shared/ui/saju-section-heading/saju-section-heading";

export type TwelveGrowthInfo = {
  year?: { hanja: string; meaning: string; description: string };
  month?: { hanja: string; meaning: string; description: string };
  day?: { hanja: string; meaning: string; description: string };
  hour?: { hanja: string; meaning: string; description: string };
};

type Props = { twelveGrowthInfo: TwelveGrowthInfo };

export function JeongtongsajuTwelveGrowth({ twelveGrowthInfo }: Props) {
  return (
    <div
      className="rounded-sm border-2 border-black bg-[#FDFCF8]"
      style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
    >
      <SajuSectionHeading helpKey="twelveGrowth" />
      <div className="p-4">
        <div className="grid grid-cols-4 gap-2.5">
          {SAJU_PILLAR_TWELVE_GROWTH_COLUMNS.map(({ type, label, isMain }) => {
            const info = twelveGrowthInfo[type];
            return (
              <div
                key={type}
                className={`flex flex-col items-center rounded-sm border-2 border-black p-3.5 text-center ${
                  isMain ? "bg-[#fffbeb]" : "bg-[#F8F6F1]"
                }`}
                style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
              >
                <div className="mb-1.5 text-[10px] font-bold text-[#7a7570]">
                  {label}
                </div>
                <div className="font-['Jua',sans-serif] text-[22px]">
                  {info?.meaning ?? "—"}
                </div>
                <div className="mt-1 text-[10px] text-[#7a7570]">
                  {info?.hanja ?? ""}
                </div>
                {info?.description && (
                  <div className="mt-1.5 text-[10px] leading-relaxed text-[#0d0d0d]">
                    {info.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
