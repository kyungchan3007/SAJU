import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getProtectedPageAuthStateOnServer } from "@/entities/auth/server/getProtectedPageAuthStateOnServer";
import { ProtectedSajuServiceGate } from "@/features/saju-profile/ui/protected-saju-service-gate";
import { AuthRefreshRetry } from "@/features/saju-result/ui/auth-refresh-retry.client";
import { JeongtongsajuAndFortuneSection } from "@/widgets/mypage/ui/jeongtongsaju-and-fortune-section";

export const metadata: Metadata = {
  title: "정통사주",
  description: "나의 명식 리포트와 연간 운세 풀이를 확인합니다.",
  robots: { index: false, follow: false },
};

export default async function TraditionalFortunePage() {
  const authState = await getProtectedPageAuthStateOnServer(
    "/mypage/traditional-fortune",
  );

  if (authState.kind === "refresh") {
    return <AuthRefreshRetry loginPath={authState.loginPath} />;
  }

  if (authState.kind === "redirect") {
    redirect(authState.loginPath);
  }

  return (
    <ProtectedSajuServiceGate servicePath="/mypage/traditional-fortune">
      <JeongtongsajuAndFortuneSection />
    </ProtectedSajuServiceGate>
  );
}
