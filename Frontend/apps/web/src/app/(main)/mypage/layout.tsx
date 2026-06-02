import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ACCESS_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
} from "@/shared/config/authToken";
import { AuthRefreshRetry } from "@/features/saju-result/ui/auth-refresh-retry.client";

export default async function MypageLayout({
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

  return <main>{children}</main>;
}
