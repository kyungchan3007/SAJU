import type { Metadata } from "next";
import { env } from "@/shared/config";
import { WelcomSection } from "@/widgets/welcom-section/ui/welcom-section";

const appUrl = env.NEXT_PUBLIC_APP_URL || "https://your-domain.com";
const homeTitle = "무료 사주 풀이와 궁합 확인";
const homeDescription =
  "사주팔자, 궁합, 오늘의 흐름을 한 곳에서 확인하세요. 무료 사주 풀이와 AI 기반 해석으로 운명과 인연의 방향을 살펴볼 수 있습니다.";

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: appUrl,
  },
  twitter: {
    title: homeTitle,
    description: homeDescription,
  },
};

const homeStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: homeTitle,
  description: homeDescription,
  url: appUrl,
  inLanguage: "ko-KR",
  isPartOf: {
    "@type": "WebSite",
    name: env.NEXT_PUBLIC_APP_NAME,
    url: appUrl,
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeStructuredData),
        }}
      />
      <main>
        <WelcomSection />
      </main>
    </>
  );
}
