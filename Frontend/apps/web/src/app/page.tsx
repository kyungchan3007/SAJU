import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/shared/config";
import {
  ACCESS_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
} from "@/shared/config/authToken";
import { resolveCommunityEntryHref } from "@/features/home/model/community-entry";
import { WelcomSection } from "@/widgets/welcom-section/ui/welcom-section";

const appUrl = env.NEXT_PUBLIC_APP_URL || "https://your-domain.com";
const homeUrl = new URL("/", appUrl).toString();
const ogImageUrl = new URL("/image/background.png", appUrl).toString();
const homeTitle = "무료 사주 풀이와 궁합 확인";
const homeDescription =
  "사주팔자, 궁합, 오늘의 흐름을 한 곳에서 확인하세요. 무료 사주 풀이와 AI 기반 해석으로 운명과 인연의 방향을 살펴볼 수 있습니다.";

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  alternates: {
    canonical: "/",
  },
  keywords: ["무료 사주", "사주", "궁합", "사주팔자", "인연"],
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: homeUrl,
    type: "website",
    siteName: env.NEXT_PUBLIC_APP_NAME,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: `${env.NEXT_PUBLIC_APP_NAME} 대표 이미지`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: [ogImageUrl],
  },
};

const homeStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: homeTitle,
  description: homeDescription,
  url: homeUrl,
  inLanguage: "ko-KR",
  isPartOf: {
    "@type": "WebSite",
    name: env.NEXT_PUBLIC_APP_NAME,
    url: appUrl,
  },
};

export default async function HomePage() {
  const cookieStore = await cookies();
  const isLoggedIn = Boolean(
    cookieStore.get(ACCESS_TOKEN_COOKIE_KEY)?.value ||
      cookieStore.get(REFRESH_TOKEN_COOKIE_KEY)?.value,
  );
  if (isLoggedIn) redirect("/home");

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
    </>
  );
}
