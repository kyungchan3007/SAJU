import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getProtectedPageAuthStateOnServer } from "@/entities/auth/server/getProtectedPageAuthStateOnServer";
import { ProtectedSajuServiceGate } from "@/features/saju-profile/ui/protected-saju-service-gate";
import { AuthRefreshRetry } from "@/features/saju-result/ui/auth-refresh-retry.client";
import { CompatibilitySection } from "@/widgets/compatibility/ui/compatibility-section";

export const metadata: Metadata = {
  title: "짝궁합",
  description: "나의 사주와 상대방의 사주를 비교해 궁합을 확인합니다.",
  robots: { index: false, follow: false },
};

export default async function CompatibilityPage() {
  const authState =
    await getProtectedPageAuthStateOnServer("/compatibility");

  if (authState.kind === "refresh") {
    return <AuthRefreshRetry loginPath={authState.loginPath} />;
  }

  if (authState.kind === "redirect") {
    redirect(authState.loginPath);
  }

  return (
    <ProtectedSajuServiceGate servicePath="/compatibility">
      <CompatibilitySection />
    </ProtectedSajuServiceGate>
  );
}
