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

const SEGMENT_ACTIVE = "linear-gradient(90deg, #6C63FF 0%, #5B5CF0 100%)";
const SEGMENT_INACTIVE = "#ECECF3";
const CARD_BG_ACTIVE = "linear-gradient(135deg, #6C63FF 0%, #5B5CF0 100%)";
const CARD_SHADOW_ACTIVE = "0 10px 30px rgba(91,92,240,0.25)";
const CARD_SHADOW = "0 10px 30px rgba(0,0,0,0.06)";

export function JeongtongsajuDaewoon({ bigLuck, description }: Props) {
  const currentItem = bigLuck.find((d) => d.isCurrentDaeun);

  return (
    <div className="rounded-3xl bg-white p-6 sm:border sm:border-gray-100 sm:shadow-[0_2px_16px_rgba(0,0,0,0.08)]">
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

      {/* 모바일: 세로 목록 */}
      <div className="flex flex-col gap-2 sm:hidden">
        {bigLuck.map((item, i) => {
          const summary = formatBigLuckGanjiSummary(item.pillar);
          const isCurrent = item.isCurrentDaeun;

          return (
            <div key={i} className="flex flex-col">
              {/* segment */}
              <div
                className="mb-2 w-full rounded-full"
                style={{
                  height: 8,
                  background: isCurrent ? SEGMENT_ACTIVE : SEGMENT_INACTIVE,
                }}
              />
              {/* card */}
              <div
                className="flex items-center gap-4 rounded-2xl px-4 py-4"
                style={{
                  background: isCurrent ? CARD_BG_ACTIVE : "#fff",
                  boxShadow: isCurrent ? CARD_SHADOW_ACTIVE : CARD_SHADOW,
                }}
              >
                <div className="flex flex-col items-center gap-0.5 min-w-[48px]">
                  <span
                    className="text-[22px] font-bold"
                    style={{ color: isCurrent ? "#fff" : "#9CA3AF" }}
                  >
                    {item.pillar}
                  </span>
                  {summary && (
                    <span
                      className="text-[11px]"
                      style={{ color: isCurrent ? "rgba(255,255,255,0.75)" : "#9CA3AF" }}
                    >
                      {summary}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span
                    className="text-[12px] font-medium"
                    style={{ color: isCurrent ? "rgba(255,255,255,0.9)" : "#6B7280" }}
                  >
                    {item.age_range}
                  </span>
                  <span
                    className="text-[11px]"
                    style={{ color: isCurrent ? "rgba(255,255,255,0.5)" : "#D1D5DB" }}
                  >
                    {item.year_range}
                  </span>
                </div>
                {isCurrent && (
                  <span className="ml-auto rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold text-white">
                    현재
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* sm+: 가로 스크롤 */}
      <div className="hidden overflow-x-auto [scrollbar-width:none] sm:block [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-2 pb-3">
          {bigLuck.map((item, i) => {
            const summary = formatBigLuckGanjiSummary(item.pillar);
            const isCurrent = item.isCurrentDaeun;

            return (
              <div key={i} className="flex min-w-[100px] flex-1 flex-col">
                {/* segment */}
                <div
                  className="mb-2 w-full rounded-full"
                  style={{
                    height: 8,
                    background: isCurrent ? SEGMENT_ACTIVE : SEGMENT_INACTIVE,
                  }}
                />
                {/* card */}
                <div
                  className="flex flex-1 flex-col items-center rounded-2xl px-3 py-4 text-center"
                  style={{
                    background: isCurrent ? CARD_BG_ACTIVE : "#fff",
                    boxShadow: isCurrent ? CARD_SHADOW_ACTIVE : CARD_SHADOW,
                  }}
                >
                  <span
                    className="mb-1.5 text-[11px] font-medium"
                    style={{ color: isCurrent ? "rgba(255,255,255,0.75)" : "#9CA3AF" }}
                  >
                    {item.age_range}
                  </span>
                  <div
                    className="mb-1 text-[24px] font-bold"
                    style={{ color: isCurrent ? "#fff" : "#9CA3AF" }}
                  >
                    {item.pillar}
                  </div>
                  {summary && (
                    <div
                      className="mb-1 text-[12px]"
                      style={{ color: isCurrent ? "rgba(255,255,255,0.8)" : "#9CA3AF" }}
                    >
                      {summary}
                    </div>
                  )}
                  <div
                    className="text-[10px]"
                    style={{ color: isCurrent ? "rgba(255,255,255,0.5)" : "#D1D5DB" }}
                  >
                    {item.year_range}
                  </div>
                  {isCurrent && (
                    <span className="mt-2 rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold text-white">
                      현재 대운
                    </span>
                  )}
                </div>
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
              <strong className="text-[#5B5CF0]">
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
