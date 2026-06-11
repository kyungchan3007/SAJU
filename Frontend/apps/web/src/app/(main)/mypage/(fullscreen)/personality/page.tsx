import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getProtectedPageAuthStateOnServer } from "@/entities/auth/server/getProtectedPageAuthStateOnServer";
import { PersonalitySection } from "@/features/personality/ui/personality-section";
import { ProtectedSajuServiceGate } from "@/features/saju-profile/ui/protected-saju-service-gate";
import { AuthRefreshRetry } from "@/features/saju-result/ui/auth-refresh-retry.client";

export const metadata: Metadata = {
  title: "상세 성향 리포트",
  description: "성격, 연애, 직업 성향을 한 번에 확인합니다.",
  robots: { index: false, follow: false },
};

export default async function PersonalityPage() {
  const authState = await getProtectedPageAuthStateOnServer(
    "/mypage/personality",
  );

  if (authState.kind === "refresh") {
    return <AuthRefreshRetry loginPath={authState.loginPath} />;
  }

  if (authState.kind === "redirect") {
    redirect(authState.loginPath);
  }

  return (
    <ProtectedSajuServiceGate servicePath="/mypage/personality">
      <PersonalitySection />
    </ProtectedSajuServiceGate>
  );
}
