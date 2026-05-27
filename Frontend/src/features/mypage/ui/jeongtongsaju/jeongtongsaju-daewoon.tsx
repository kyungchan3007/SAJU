import {
  describeBigLuckGanji,
  formatBigLuckGanjiSummary,
} from "@/shared/model/saju-ganji/utils";

export type DaewoonItem = {
  pillar: string;
  pillar_kor: string;
  year_range: string;
  age_range: string;
  isCurrentDaeun: boolean;
};

type Props = {
  bigLuck: DaewoonItem[];
  description?: string;
};

export function JeongtongsajuDaewoon({ bigLuck, description }: Props) {
  const currentItem = bigLuck.find((d) => d.isCurrentDaeun);

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.08)]">
      <div className="mb-5">
        <div className="flex items-baseline gap-2">
          <h2 className="text-[18px] font-bold text-gray-900">대운 흐름</h2>
          <span className="text-[13px] text-gray-400">
            10년 단위로 변화하는 운의 흐름
          </span>
        </div>
        {description && (
          <p className="mt-2 text-[13px] leading-relaxed text-gray-500">
            {description}
          </p>
        )}
      </div>

      {/* 스크롤 대운 목록 */}
      <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-2 pb-3" style={{ paddingTop: 36 }}>
          {bigLuck.map((item, i) => {
            const summary = formatBigLuckGanjiSummary(item.pillar);
            const isCurrent = item.isCurrentDaeun;

            return (
              <div
                key={i}
                className={`relative flex min-w-[100px] flex-1 flex-col items-center ${
                  isCurrent ? "z-10" : "opacity-60"
                }`}
              >
                {isCurrent && (
                  <div className="absolute -top-7 rounded-full bg-[#5956E9] px-2.5 py-0.5 text-[11px] font-bold text-white">
                    현재 대운
                  </div>
                )}
                <span
                  className={`mb-2 text-[12px] ${
                    isCurrent
                      ? "mt-1 font-bold text-[#5956E9]"
                      : "text-gray-500"
                  }`}
                >
                  {item.age_range}
                </span>
                <div
                  className={`mb-1 text-[22px] font-bold text-gray-800 ${
                    isCurrent ? "text-[28px] text-gray-900" : ""
                  }`}
                >
                  {item.pillar}
                </div>
                {summary && (
                  <div
                    className={`mb-1 text-[13px] text-gray-600 ${isCurrent ? "text-[15px] font-bold text-gray-800" : ""}`}
                  >
                    {summary}
                  </div>
                )}
                <div
                  className={`text-[11px] ${isCurrent ? "font-bold text-[#5956E9]" : "text-gray-400"}`}
                >
                  {item.year_range}
                </div>
                {isCurrent && (
                  <div className="absolute inset-[-10px] -z-10 rounded-2xl border-2 border-[#C4BAFF] bg-[#F0EEFF]/20" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 현재 대운 분석 */}
      {currentItem && (
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#E0DAFF] bg-[#F9F8FF] p-4">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E0DAFF]">
            <span className="text-[14px]">💡</span>
          </div>
          <div>
            <p className="text-[14px] font-medium text-gray-800">
              현재{" "}
              <strong className="text-[#5956E9]">
                {formatBigLuckGanjiSummary(currentItem.pillar) ??
                  currentItem.pillar_kor}{" "}
                대운
              </strong>
              이에요.
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-gray-500">
              {describeBigLuckGanji(currentItem)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
