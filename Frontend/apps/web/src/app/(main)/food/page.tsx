import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getProtectedPageAuthStateOnServer } from "@/entities/auth/server/getProtectedPageAuthStateOnServer";
import { ProtectedSajuServiceGate } from "@/features/saju-profile/ui/protected-saju-service-gate";
import { AuthRefreshRetry } from "@/features/saju-result/ui/auth-refresh-retry.client";
import { FoodRecommendWidget } from "@/widgets/food-recommend/ui/food-recommend-widget";

export const metadata: Metadata = {
  title: "오늘의 메뉴",
  description: "오늘의 사주 오행 에너지에 맞는 음식을 추천해 드려요.",
};

export default async function FoodPage() {
  const authState = await getProtectedPageAuthStateOnServer("/food");

  if (authState.kind === "refresh") {
    return <AuthRefreshRetry loginPath={authState.loginPath} />;
  }

  if (authState.kind === "redirect") {
    redirect(authState.loginPath);
  }

  return (
    <ProtectedSajuServiceGate servicePath="/food">
      <FoodRecommendWidget />
    </ProtectedSajuServiceGate>
  );
}
