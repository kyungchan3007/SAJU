import type { Metadata } from "next";
import { Jua, Noto_Sans_KR } from "next/font/google";
import type { ReactNode } from "react";
import { env } from "@/shared/config";
import { Providers } from "@/shared/ui";
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

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${notoSansKr.variable} ${jua.variable} min-h-dvh font-sans text-foreground antialiased`}
        style={{ backgroundColor: "rgb(250 248 242)" }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
