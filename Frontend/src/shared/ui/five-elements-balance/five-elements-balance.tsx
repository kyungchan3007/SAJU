import { type FiveElementsBalance } from "@/shared/model/five-elements/model";
import {
  getFiveElementConfig,
  getFiveElementValue,
  getOrderedFiveElementKeys,
} from "@/shared/model/five-elements/utils";
import { SajuSectionHeading } from "@/shared/ui/saju-section-heading/saju-section-heading";

type Props = {
  fiveElements: FiveElementsBalance;
};

export function FiveElementsBalanceCard({ fiveElements }: Props) {
  const { elements, yongshinPrimary, yongshinSecondary } = fiveElements;
  const sorted = getOrderedFiveElementKeys(elements);

  return (
    <div
      className="rounded-sm border-2 border-black bg-[#FDFCF8]"
      style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
    >
      <SajuSectionHeading helpKey="fiveElements" />
      <div className="p-5">
        <div className="flex flex-col gap-2.5">
          {sorted.map((key) => {
            const cfg = getFiveElementConfig(key);
            const pct = getFiveElementValue(elements, key);

            return (
              <div key={key} className="flex flex-col gap-1.5">
                <div className="flex justify-between">
                  <span className="flex items-center gap-1.5 text-[12px] font-bold">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full border-[1.5px] border-black"
                      style={{ background: cfg?.color }}
                    />
                    {cfg?.label ?? key}
                  </span>
                  <span className="text-[12px] font-bold">
                    {pct.toFixed(1)}%
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-sm border-[1.5px] border-black bg-[#F8F6F1]">
                  <div
                    className="h-full rounded-[1px]"
                    style={{ width: `${pct}%`, background: cfg?.color }}
                  />
                </div>
                <p className="text-[11px] leading-relaxed text-[#0d0d0d]/55">
                  {cfg?.description ?? "오행의 기운을 나타냅니다."}
                </p>
              </div>
            );
          })}
        </div>

        {(yongshinPrimary ?? yongshinSecondary) && (
          <div className="mt-4 border-t border-dashed border-[#d4d0c8] pt-4">
            <p className="mb-2.5 text-[11px] font-bold tracking-wider text-[#7a7570]">
              보완이 필요한 기운 (용신)
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { key: yongshinPrimary, label: "1차 용신" },
                { key: yongshinSecondary, label: "2차 용신" },
              ].map(({ key, label }) => {
                if (!key) return null;

                const cfg = getFiveElementConfig(key);

                return (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1.5 rounded-sm border-2 border-black bg-[#FDFCF8] p-3.5 text-center"
                    style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
                  >
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black text-[22px]"
                      style={{
                        background: cfg?.bg,
                        boxShadow: "2px 2px 0 #0d0d0d",
                      }}
                    >
                      {cfg?.emoji ?? "✨"}
                    </div>
                    <span className="text-[10px] font-semibold tracking-wider text-[#7a7570]">
                      {label}
                    </span>
                    <span className="font-['Jua',sans-serif] text-[18px]">
                      {cfg?.label ?? key}
                    </span>
                    <span className="text-[11px] leading-relaxed text-[#0d0d0d]/55">
                      {cfg?.description ?? "보완이 필요한 기운입니다."}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
