import type { FoodContextViewModel } from "@/features/food-recommend/model/food-recommend";

type Props = {
  viewModel: FoodContextViewModel;
};

/**
 * 오늘의 메뉴 추천 컨텍스트 헤더.
 * 그라디언트 배경 + 오행 에너지 바를 한 카드에 통합.
 */
export function FoodContextHeader({ viewModel }: Props) {
  return (
    <div
      className="rounded-3xl px-6 py-6"
      style={{
        background: "linear-gradient(135deg, #5956E9 0%, #7C3AED 100%)",
        boxShadow: "0 8px 32px rgba(89,86,233,0.28)",
      }}
    >
      {/* 상단 뱃지 행 */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-white/20 px-3 py-1 text-[12px] font-bold text-white">
          오늘의 메뉴 추천
        </span>
        <span className="rounded-full bg-white/20 px-3 py-1 text-[12px] font-bold text-white">
          {viewModel.dateLabel}
        </span>
      </div>

      {/* 오행 배지 */}
      {viewModel.dominantElement && viewModel.dominantHanja && (
        <div className="mb-2 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-white/20 px-4 py-1.5 text-[13px] font-bold text-white">
            {viewModel.dominantElement}({viewModel.dominantHanja}) 기운이 강한 날
          </span>
        </div>
      )}

      {/* 설명 */}
      {viewModel.description && (
        <p className="mb-5 text-[13px] text-white/80">
          {viewModel.description}
        </p>
      )}

      {/* 오행 에너지 바 */}
      {viewModel.entries.length > 0 && (
        <div className="flex flex-col gap-2.5">
          {viewModel.entries.map((entry) => (
            <div key={entry.key} className="flex items-center gap-2">
              <span
                className="w-5 shrink-0 text-[11px] font-bold"
                style={{
                  color: entry.isDominant ? "#fff" : "rgba(255,255,255,0.55)",
                }}
              >
                {entry.hanja}
              </span>
              <div
                className="h-1.5 flex-1 overflow-hidden rounded-full"
                style={{ background: "rgba(255,255,255,0.2)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${entry.barWidth}%`,
                    background: entry.isDominant
                      ? "#fff"
                      : "rgba(255,255,255,0.45)",
                  }}
                />
              </div>
              <span
                className="w-7 shrink-0 text-right text-[11px] font-black"
                style={{
                  color: entry.isDominant ? "#fff" : "rgba(255,255,255,0.55)",
                }}
              >
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
