import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/shared/config/authToken";
import { MypageLayoutShell } from "@/features/mypage/ui/mypage-layout-shell.client";

export default async function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = (await cookies()).get(ACCESS_TOKEN_COOKIE_KEY)?.value;
  if (!accessToken) {
    redirect("/login?next=/mypage");
  }

  return (
    <main className="page-shell">
      <MypageLayoutShell>{children}</MypageLayoutShell>
    </main>
  );
}
