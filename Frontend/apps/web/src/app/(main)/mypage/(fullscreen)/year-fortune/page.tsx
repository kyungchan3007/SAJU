import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getProtectedPageAuthStateOnServer } from "@/entities/auth/server/getProtectedPageAuthStateOnServer";
import { ProtectedSajuServiceGate } from "@/features/saju-profile/ui/protected-saju-service-gate";
import { AuthRefreshRetry } from "@/features/saju-result/ui/auth-refresh-retry.client";
import { YearFortuneSection } from "@/widgets/year-fortune/ui/year-fortune-section";

export const metadata: Metadata = {
  title: "신년운세",
  description: "사주를 바탕으로 새해의 운세를 확인해.",
  robots: { index: false, follow: false },
};

export default async function YearFortunePage() {
  const authState = await getProtectedPageAuthStateOnServer(
    "/mypage/year-fortune",
  );

  if (authState.kind === "refresh") {
    return <AuthRefreshRetry loginPath={authState.loginPath} />;
  }

  if (authState.kind === "redirect") {
    redirect(authState.loginPath);
  }

  return (
    <ProtectedSajuServiceGate servicePath="/mypage/year-fortune">
      <YearFortuneSection />
    </ProtectedSajuServiceGate>
  );
}

