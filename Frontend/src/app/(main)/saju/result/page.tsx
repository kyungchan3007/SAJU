import { SajuResultQueryGate } from "@/features/saju-result";
import { SajuResult } from "@/widgets/saju-result";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";

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
    <main className="page-shell">
      <SajuResultQueryGate>
        <SajuResult />
      </SajuResultQueryGate>
    </main>
  );
}
