import { SajuInput } from "@/widgets/saju-input";
import { SajuHub } from "@/widgets/saju-hub";
import { Metadata } from "next";
import type { Route } from "next";
import { redirect } from "next/navigation";
import { createPageMetadata } from "@/shared/lib/seo";
import { getSajuEntryRouteOnServer } from "@/entities/saju/server/getSajuEntryRouteOnServer";
import {
  buildSajuResultPath,
  normalizeInternalRedirectPath,
} from "@/shared/lib/internalRedirect";

export const metadata: Metadata = createPageMetadata({
  title: "무료 사주풀이 | 생년월일로 오늘의 운세 확인",
  description:
    "생년월일, 출생시간, 성별을 입력하면 오늘의 사주 흐름과 운세를 간편하게 확인할 수 있습니다. 양력·음력 선택과 시간 미상 입력도 지원합니다.",
  path: "/saju",
});

type SajuPageProps = {
  searchParams: Promise<{
    next?: string;
    forceInput?: string;
    step?: string;
  }>;
};

export default async function SajuPage({ searchParams }: SajuPageProps) {
  const params = await searchParams;
  const nextPath = normalizeInternalRedirectPath(params.next);
  const forceInput = params.forceInput === "1";
  const step = params.step === "hub" ? "hub" : "input";

  if (step === "hub") {
    return (
      <main className="page-shell">
        <SajuHub nextPath={nextPath} />
      </main>
    );
  }

  if (!forceInput) {
    const entryRoute = await getSajuEntryRouteOnServer();

    if (entryRoute === "result") {
      redirect(buildSajuResultPath(nextPath) as Route);
    }
  }

  return (
    <main className="page-shell">
      <SajuInput nextPath={nextPath} />
    </main>
  );
}
