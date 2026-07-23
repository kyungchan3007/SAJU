import type { FiveElementsBalance } from "@/shared/model/five-elements/model";
import {
  formatYongshinDisplayLabel,
  getFiveElementConfig,
  getFiveElementValue,
  getOrderedFiveElementKeys,
} from "@/shared/model/five-elements/utils";

export type FiveElements = FiveElementsBalance;

type Props = { fiveElements: FiveElements };

export function JeongtongsajuFiveElements({ fiveElements }: Props) {
  const { elements, yongshinPrimary, yongshinSecondary } = fiveElements;
  const sorted = getOrderedFiveElementKeys(elements);

  return (
    <div className="rounded-3xl bg-white p-6 sm:border sm:border-gray-100 sm:shadow-[0_2px_16px_rgba(0,0,0,0.08)]">
      <div className="mb-5 flex items-baseline gap-2">
        <h2 className="text-[18px] font-bold text-gray-900">오행 분포도</h2>
        <span className="text-[13px] text-gray-500">나의 오행 에너지 균형</span>
      </div>

      <div className="flex flex-col gap-3">
        {sorted.map((key) => {
          const cfg = getFiveElementConfig(key);
          const pct = getFiveElementValue(elements, key);

          return (
            <div key={key} className="flex items-center gap-3">
              <div
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
                style={{ background: cfg?.color }}
              >
                {key}
              </div>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, background: cfg?.color }}
                />
              </div>
              <span className="w-10 text-right text-[12px] text-gray-500">
                {pct.toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>

      {(yongshinPrimary || yongshinSecondary) && (
        <div className="mt-5 rounded-2xl border border-[#E0DAFF] bg-[#F9F8FF] p-4">
          <div className="mb-1.5 text-[13px] font-bold text-[#5956E9]">
            오행 해석
          </div>
          <p className="mb-3 text-[13px] text-gray-700">
            균형을 위해 보완이 필요한 기운이에요
          </p>
          <div className="flex gap-2">
            {yongshinPrimary && (
              <div className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#C4BAFF] bg-white px-3 py-2">
                <span className="text-[12px] text-gray-500">용신</span>
                <span className="text-[14px] font-bold text-gray-900">
                  {formatYongshinDisplayLabel(yongshinPrimary)}
                </span>
              </div>
            )}
            {yongshinSecondary && (
              <div className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#C4BAFF] bg-white px-3 py-2">
                <span className="text-[12px] text-gray-500">보조 용신</span>
                <span className="text-[14px] font-bold text-gray-900">
                  {formatYongshinDisplayLabel(yongshinSecondary)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
