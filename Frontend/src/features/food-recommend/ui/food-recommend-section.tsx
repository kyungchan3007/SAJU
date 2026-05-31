"use client";

import { UtensilsCrossed } from "lucide-react";
import Link from "next/link";

import { useFoodRecommend } from "@/features/food-recommend/hooks/useFoodRecommend";
import { getFoodContextViewModel } from "@/features/food-recommend/model/food-recommend";
import { FoodAvoidCard } from "@/features/food-recommend/ui/components/food-avoid-card";
import { FoodContextHeader } from "@/features/food-recommend/ui/components/food-context-header";
import { FoodGroceryList } from "@/features/food-recommend/ui/components/food-grocery-list";
import { FoodHeroCard } from "@/features/food-recommend/ui/components/food-hero-card";
import { FoodRankList } from "@/features/food-recommend/ui/components/food-rank-list";
import {
  Button,
  EmptyStateCard,
  ErrorStateCard,
  LoadingStateCard,
} from "@/shared/ui";

export function FoodRecommendSection() {
  const {
    topFood,
    rankedFoods,
    avoidFoods,
    groceryList,
    dailyFiveElements,
    isLoading,
    isError,
    errorMessage,
  } = useFoodRecommend();
  const contextViewModel = getFoodContextViewModel(dailyFiveElements);

  if (isLoading) {
    return <LoadingStateCard message="오늘의 메뉴를 불러오는 중..." />;
  }

  if (isError) {
    return (
      <ErrorStateCard
        title="메뉴 추천을 불러오지 못했어요"
        description={errorMessage ?? "잠시 후 다시 확인해 주세요."}
        action={
          <Button asChild size="sm" className="rounded-full">
            <Link href="/food">다시 확인하기</Link>
          </Button>
        }
      />
    );
  }

  if (!topFood) {
    return (
      <EmptyStateCard
        title="추천할 메뉴가 없습니다"
        description="오늘의 메뉴 데이터가 준비되면 이곳에서 확인할 수 있어요."
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* 오행 컨텍스트 헤더 */}
      <FoodContextHeader viewModel={contextViewModel} />

      {/* 추천 메뉴 섹션 타이틀 */}
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

      {/* 1위 히어로 */}
      <FoodHeroCard food={topFood} />

      {/* 2~5위 리스트 */}
      {rankedFoods.length > 1 && <FoodRankList foods={rankedFoods.slice(1)} />}

      {/* 피해야 할 음식 */}
      <FoodAvoidCard avoidFoods={avoidFoods} />

      {/* 식재료 */}
      <FoodGroceryList groceryList={groceryList} />
    </div>
  );
}
