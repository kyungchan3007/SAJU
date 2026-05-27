import { AnalysisPendingGate } from "@/features/saju-result/ui/analysis-pending-gate.client";
import { SajuResult } from "@/widgets/saju-result/ui/saju-result";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { Suspense } from "react";

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

export default async function SajuResultPage() {
  const accessToken = (await cookies()).get("saju_access_token")?.value;

  if (!accessToken) {
    redirect("/login");
  }

  return (
    <main>
      <Suspense fallback={<AnalysisPendingGate />}>
        <SajuResult />
      </Suspense>
    </main>
  );
}
