import { AnalysisPendingGate } from "@/features/saju-result/ui/analysis-pending-gate.client";
import { AuthRefreshRetry } from "@/features/saju-result/ui/auth-refresh-retry.client";
import { SajuResult } from "@/widgets/saju-result/ui/saju-result";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { Suspense } from "react";
import { buildTurnstileVerifyPath } from "@/shared/api/auth/turnstileRecovery";
import { TURNSTILE_VERIFIED_COOKIE_KEY } from "@/shared/config/turnstile";
import {
  buildSajuResultPath,
  normalizeInternalRedirectPath,
} from "@/shared/lib/internalRedirect";

export const metadata: Metadata = {
  title: "사주 결과 미리보기",
  description: "로그인 후 사주 결과 미리보기를 확인할 수 있습니다.",
  alternates: {
    canonical: "/saju/result",
  },
  robots: {
    index: false,
    follow: false,
  },
};

type SajuResultPageProps = {
  searchParams: Promise<{
    next?: string;
  }>;
};

export default async function SajuResultPage({
  searchParams,
}: SajuResultPageProps) {
  const params = await searchParams;
  const nextPath = normalizeInternalRedirectPath(params.next);
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("saju_access_token")?.value;
  const refreshToken = cookieStore.get("saju_refresh_token")?.value;
  const isTurnstileVerified = Boolean(
    cookieStore.get(TURNSTILE_VERIFIED_COOKIE_KEY)?.value,
  );

  if (!accessToken) {
    if (refreshToken) {
      return <AuthRefreshRetry />;
    }

    redirect("/login");
  }

  if (!isTurnstileVerified) {
    redirect(buildTurnstileVerifyPath(buildSajuResultPath(nextPath)));
  }

  return (
    <Suspense fallback={<AnalysisPendingGate />}>
      <SajuResult nextPath={nextPath} />
    </Suspense>
  );
}
