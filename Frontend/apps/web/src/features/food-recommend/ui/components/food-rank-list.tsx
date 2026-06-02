"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { DisplayFood } from "@/features/food-recommend/model/food-recommend";

type Props = {
  foods: DisplayFood[]; // 2위~5위
};

const RANK_EMOJI = ["", "🥇", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];

/**
 * 2위~5위 음식 리스트 (아코디언 토글).
 */
export function FoodRankList({ foods }: Props) {
  const [openRank, setOpenRank] = useState<number | null>(null);

  if (foods.length === 0) return null;

  return (
    <div
      className="overflow-hidden rounded-[20px]"
      style={{
        background: "white",
        border: "1px solid #F3F4F6",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
      }}
    >
      {foods.map((food) => {
        const isOpen = openRank === food.rank;

        return (
          <div key={food.rank} className="border-b border-gray-50 last:border-b-0">
            {/* 행 */}
            <button
              className="flex w-full cursor-pointer items-center gap-3.5 px-5 py-4 text-left transition-colors hover:bg-gray-50"
              onClick={() => setOpenRank(isOpen ? null : food.rank)}
            >
              {/* 이모지 */}
              <span className="w-9 shrink-0 text-center text-[24px]">
                {food.categoryEmoji}
              </span>

              {/* 음식 정보 */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[14px]">{RANK_EMOJI[food.rank]}</span>
                  <span className="text-[14px] font-black text-gray-900">
                    {food.name}
                  </span>
                  {/* 카테고리 */}
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-500">
                    {food.category}
                  </span>
                  {/* 오행 태그 */}
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold"
                    style={{ background: food.elementBg, color: food.elementColor }}
                  >
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: food.elementColor }}
                    />
                    {food.fiveElementHanja}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-[12px] text-gray-400">
                  {food.reason}
                </p>
              </div>

              {/* 화살표 */}
              <ChevronDown
                size={15}
                className="shrink-0 text-gray-300 transition-transform duration-200"
                style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>

            {/* 펼쳐진 상세 */}
            {isOpen && (
              <div className="border-t border-gray-50 bg-gray-50 px-5 py-3.5 text-[12px] leading-relaxed text-gray-500">
                💡 {food.reason}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
