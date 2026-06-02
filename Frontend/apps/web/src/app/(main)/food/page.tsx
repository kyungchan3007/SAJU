import type { Metadata } from "next";
import { FoodRecommendWidget } from "@/widgets/food-recommend/ui/food-recommend-widget";

export const metadata: Metadata = {
  title: "오늘의 메뉴",
  description: "오늘의 사주 오행 에너지에 맞는 음식을 추천해 드려요.",
};

export default function FoodPage() {
  return <FoodRecommendWidget />;
}
