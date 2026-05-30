type Props = {
  avoidFoods: string[];
};

/**
 * 오늘 피해야 할 음식 카드.
 * 취소선 pill + 빨간 톤 배경.
 */
export function FoodAvoidCard({ avoidFoods }: Props) {
  if (avoidFoods.length === 0) return null;

  return (
    <div
      className="rounded-[20px] px-5 py-5"
      style={{ background: "#FFF5F5", border: "1px solid #FEE2E2" }}
    >
      {/* 헤더 */}
      <div className="mb-3 flex items-center gap-2">
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
          style={{ background: "#FEE2E2" }}
        >
          <svg
            width="13"
            height="13"
            fill="none"
            stroke="#EF4444"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          </svg>
        </div>
        <span className="text-[14px] font-bold text-red-700">
          오늘은 이런 음식을 줄여요
        </span>
      </div>

      {/* 취소선 pill 목록 */}
      <div className="flex flex-wrap gap-2">
        {avoidFoods.map((food) => (
          <span
            key={food}
            className="rounded-full px-3 py-1.5 text-[13px] font-bold text-red-400 line-through"
            style={{ background: "#FEE2E2" }}
          >
            {food}
          </span>
        ))}
      </div>
    </div>
  );
}
