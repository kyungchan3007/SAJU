"use client";

import { UtensilsCrossed } from "lucide-react";

import type {
  DisplayFood,
  FoodContextViewModel,
} from "@/features/food-recommend/model/food-recommend";
import { FoodAvoidCard } from "@/features/food-recommend/ui/components/food-avoid-card";
import { FoodContextHeader } from "@/features/food-recommend/ui/components/food-context-header";
import { FoodGroceryList } from "@/features/food-recommend/ui/components/food-grocery-list";
import { FoodHeroCard } from "@/features/food-recommend/ui/components/food-hero-card";
import { FoodRankList } from "@/features/food-recommend/ui/components/food-rank-list";

type Props = {
  topFood: DisplayFood;
  rankedFoods: DisplayFood[];
  avoidFoods: string[];
  groceryList: string[];
  contextViewModel: FoodContextViewModel;
};

export function FoodRecommendContent({
  topFood,
  rankedFoods,
  avoidFoods,
  groceryList,
  contextViewModel,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <FoodContextHeader viewModel={contextViewModel} />

      <div className="flex items-center gap-2">
        <div
          className="flex h-7 w-7 items-center justify-center rounded-full"
          style={{ background: "#F0EEFF" }}
        >
          <UtensilsCrossed size={13} color="#5956E9" />
        </div>
        <span className="text-[16px] font-black text-gray-900">
          오늘의 추천 메뉴
        </span>
        <span className="ml-auto text-[12px] font-semibold text-slate-400">
          최대 5개
        </span>
      </div>

      <FoodHeroCard food={topFood} />

      {rankedFoods.length > 1 ? (
        <FoodRankList foods={rankedFoods.slice(1)} />
      ) : null}

      <FoodAvoidCard avoidFoods={avoidFoods} />

      <FoodGroceryList groceryList={groceryList} />
    </div>
  );
}
