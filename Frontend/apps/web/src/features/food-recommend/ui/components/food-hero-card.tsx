import type { DisplayFood } from "@/features/food-recommend/model/food-recommend";

type Props = {
  food: DisplayFood;
};

/**
 * 1위 음식 히어로 카드.
 * 프로토타입 기준: #F0EEFF 배경 + 보라 테두리 + 중앙 정렬 레이아웃.
 */
export function FoodHeroCard({ food }: Props) {
  return (
    <div
      className="flex flex-col items-center rounded-[20px] px-6 py-6 text-center"
      style={{
        background: "#F0EEFF",
        border: "2px solid #5956E9",
        boxShadow: "0 4px 20px rgba(89,86,233,0.15)",
      }}
    >
      {/* 뱃지 + 태그 행 */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
        <span
          className="rounded-full px-4 py-1.5 text-[12px] font-black text-white"
          style={{ background: "#5956E9" }}
        >
          🥇 오늘의 1위 추천
        </span>
        {/* 카테고리 태그 */}
        <span className="rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-gray-600">
          {food.categoryEmoji} {food.category}
        </span>
        {/* 오행 태그 */}
        <span
          className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold"
          style={{ background: food.elementBg, color: food.elementColor }}
        >
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: food.elementColor }}
          />
          {food.fiveElementHanja}
        </span>
      </div>

      {/* 이모지 */}
      <span className="mb-3 text-[52px] leading-none">{food.categoryEmoji}</span>

      {/* 음식명 */}
      <p className="text-[24px] font-black text-gray-900">{food.name}</p>

      {/* 추천 이유 */}
      <p className="mt-2 text-[13px] leading-relaxed text-gray-500">{food.reason}</p>
    </div>
  );
}
