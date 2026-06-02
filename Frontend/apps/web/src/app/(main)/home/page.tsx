import { HomeSection } from "@/widgets/homeSection/ui/homeSection";
import { cookies } from "next/headers";
import {
  ACCESS_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
} from "@/shared/config/authToken";
import { resolveCommunityEntryHref } from "@/features/home/model/community-entry";

export default async function HomePage() {
  const cookieStore = await cookies();
  const isLoggedIn = Boolean(
    cookieStore.get(ACCESS_TOKEN_COOKIE_KEY)?.value ||
      cookieStore.get(REFRESH_TOKEN_COOKIE_KEY)?.value,
  );
  const primaryCtaHref = resolveCommunityEntryHref(isLoggedIn);

  return (
    <main>
      <HomeSection primaryCtaHref={primaryCtaHref} />
    </main>
  );
}
