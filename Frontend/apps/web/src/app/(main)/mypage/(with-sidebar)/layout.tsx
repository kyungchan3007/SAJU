import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthRefreshRetry } from "@/features/saju-result/ui/auth-refresh-retry.client";
import { MypageLayoutShell } from "@/features/mypage/ui/mypage-layout-shell.client";
import {
  ACCESS_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
  USER_EMAIL_COOKIE_KEY,
} from "@/shared/config/authToken";

export default async function MypageSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_KEY)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE_KEY)?.value;

  if (!accessToken) {
    if (refreshToken) {
      return <AuthRefreshRetry loginPath="/login?next=/mypage" />;
    }

    redirect("/login?next=/mypage");
  }

  const initialProfile = {
    email: cookieStore.get(USER_EMAIL_COOKIE_KEY)?.value ?? "회원",
    summaryZodiac: "",
  };

  return (
    <MypageLayoutShell initialProfile={initialProfile}>{children}</MypageLayoutShell>
  );
}
