import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/shared/config/authToken";
import {
  createPageMetadata,
  createWebPageStructuredData,
} from "@/shared/lib/seo";
import { resolveCommunityEntryHref } from "@/features/home/model/community-entry";
import { WelcomSection } from "@/widgets/welcom-section/ui/welcom-section";
import { Footer } from "@/shared/ui";

const homeTitle = "무료 사주 풀이와 궁합 확인";
const homeDescription =
  "사주팔자, 궁합, 오늘의 흐름을 한 곳에서 확인하세요. 무료 사주 풀이로 운명과 인연의 방향을 살펴볼 수 있습니다.";

export const metadata: Metadata = createPageMetadata({
  title: homeTitle,
  description: homeDescription,
  path: "/",
  keywords: ["무료 사주", "사주", "궁합", "사주팔자", "인연"],
});

const homeStructuredData = createWebPageStructuredData({
  title: homeTitle,
  description: homeDescription,
  path: "/",
});

export default async function HomePage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_KEY)?.value;
  if (accessToken) redirect("/home");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeStructuredData),
        }}
      />
      <main className="flex min-h-dvh">
        <WelcomSection primaryCtaHref={resolveCommunityEntryHref(false)} />
      </main>
      <Footer showOnMobile />
    </>
  );
}
