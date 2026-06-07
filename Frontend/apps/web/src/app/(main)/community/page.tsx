import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getProtectedPageAuthStateOnServer } from "@/entities/auth/server/getProtectedPageAuthStateOnServer";
import { ProtectedSajuServiceGate } from "@/features/saju-profile/ui/protected-saju-service-gate";
import { AuthRefreshRetry } from "@/features/saju-result/ui/auth-refresh-retry.client";
import { CommunitySection } from "@/widgets/community/ui/community-section";

export const metadata: Metadata = {
  title: "커뮤니티",
  description: "나와 비슷한 기운의 사람들과 연결되어보세요.",
  robots: { index: false, follow: false },
};

export default async function CommunityPage() {
  const authState = await getProtectedPageAuthStateOnServer("/community");

  if (authState.kind === "refresh") {
    return (
      <main className="bg-white">
        <AuthRefreshRetry loginPath={authState.loginPath} />
      </main>
    );
  }

  if (authState.kind === "redirect") {
    redirect(authState.loginPath);
  }

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-[1152px] px-4 py-8 md:px-8">
        <div className="min-w-0">
          <ProtectedSajuServiceGate servicePath="/community">
            <CommunitySection />
          </ProtectedSajuServiceGate>
        </div>
      </div>
    </main>
  );
}
