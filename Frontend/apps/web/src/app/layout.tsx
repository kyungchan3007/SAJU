import type { Metadata } from "next";
import { Jua, Noto_Sans_KR } from "next/font/google";
import { cookies } from "next/headers";
import Script from "next/script";
import type { ReactNode } from "react";
import { Providers } from "@/shared/app-infra/query-provider/query-providers";
import { env } from "@/shared/config";
import {
  ACCESS_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
  USER_EMAIL_COOKIE_KEY,
} from "@/shared/config/authToken";
import { Footer } from "@/shared/ui";
import { GlobalNav } from "@/widgets/global-nav";
import "./globals.css";

/**
 * 홈 페이지와 SEO 페이지를 전역 클라이언트 경계 밖으로
 * 앱 전체 기본값을 서버 컴포넌트로 유지
 * */

const appUrl = env.NEXT_PUBLIC_APP_URL || "https://your-domain.com";
const ogImageUrl = new URL("/image/background.png", appUrl).toString();

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jua = Jua({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: env.NEXT_PUBLIC_APP_NAME,
    template: `%s | ${env.NEXT_PUBLIC_APP_NAME}`,
  },
  description: env.NEXT_PUBLIC_APP_DES,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: env.NEXT_PUBLIC_APP_NAME,
    description: env.NEXT_PUBLIC_APP_DES,
    url: appUrl,
    siteName: env.NEXT_PUBLIC_APP_NAME,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: `${env.NEXT_PUBLIC_APP_NAME} 대표 이미지`,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: env.NEXT_PUBLIC_APP_NAME,
    description: env.NEXT_PUBLIC_APP_DES,
    images: [ogImageUrl],
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_KEY)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE_KEY)?.value;
  const userEmail = cookieStore.get(USER_EMAIL_COOKIE_KEY)?.value?.trim();
  const isLoggedIn = Boolean(accessToken || refreshToken);
  const authScope = isLoggedIn ? userEmail || "authenticated" : "guest";
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${notoSansKr.variable} ${jua.variable} flex min-h-dvh flex-col font-sans text-foreground antialiased pt-14 pb-16 md:pb-0`}
      >
        {env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ? (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
        <Providers authScope={authScope}>
          <GlobalNav isLoggedIn={isLoggedIn} />
          <main className="flex flex-1 flex-col bg-white">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
