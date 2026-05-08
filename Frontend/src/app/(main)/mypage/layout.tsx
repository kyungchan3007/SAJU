import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getMyProfileOnServer } from "@/entities/user/server/getMyProfileOnServer";
import { MypageProfileCard, MypageStatsCard, MYPAGE_DEFAULT_STATS } from "@/features/mypage";

export default async function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = (await cookies()).get("saju_access_token")?.value;
  if (!accessToken) {
    redirect("/login?next=/mypage");
  }

  const profileResult = await getMyProfileOnServer();
  const email =
    profileResult.success ? (profileResult.data?.email ?? "회원") : "회원";

  return (
    <main className="page-shell">
      <div className="grid gap-5 lg:grid-cols-[300px_1fr] lg:items-start lg:gap-6">
        {/* 좌측 — 웹: 고정 사이드바 / 모바일: 상단 */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-24">
          <MypageProfileCard user={{ email }} />
          <MypageStatsCard stats={MYPAGE_DEFAULT_STATS} />
        </div>

        {/* 우측 — 페이지별 콘텐츠 */}
        <div className="min-w-0">{children}</div>
      </div>
    </main>
  );
}
