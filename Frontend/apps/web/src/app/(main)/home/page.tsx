import { HomeSection } from "@/widgets/homeSection/ui/homeSection";
import { cookies } from "next/headers";
import { AuthRefreshRetry } from "@/features/saju-result/ui/auth-refresh-retry.client";
import {
  ACCESS_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
} from "@/shared/config/authToken";
import { resolveCommunityEntryHref } from "@/features/home/model/community-entry";

export default async function HomePage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_KEY)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE_KEY)?.value;
  const isLoggedIn = Boolean(accessToken || refreshToken);

  if (!accessToken && refreshToken) {
    return <AuthRefreshRetry loginPath="/" />;
  }

  const primaryCtaHref = resolveCommunityEntryHref(isLoggedIn);

  return (
    <main>
      <HomeSection primaryCtaHref={primaryCtaHref} />
    </main>
  );
}
