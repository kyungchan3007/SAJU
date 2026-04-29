import { SajuInput } from "@/widgets/saju-input";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "무료 사주풀이 | 생년월일로 오늘의 운세 확인",
  description:
    "생년월일, 출생시간, 성별을 입력하면 오늘의 사주 흐름과 운세를 간편하게 확인할 수 있습니다. 양력·음력 선택과 시간 미상 입력도 지원합니다.",
  openGraph: {
    title: "무료 사주풀이 | 생년월일로 오늘의 운세 확인",
    description:
      "생년월일, 출생시간, 성별을 입력하면 오늘의 사주 흐름과 운세를 간편하게 확인할 수 있습니다.",
    url: "/saju",
    type: "website",
  },
  alternates: {
    canonical: "/saju",
  },
};

export default async function SajuPage() {
  const accessToken = (await cookies()).get("saju_access_token")?.value;

  if (accessToken) {
    redirect("/saju/result");
  }

  return (
    <main className="page-shell">
      <SajuInput />
    </main>
  );
}
