import type { Metadata } from "next";
import { Jua, Noto_Sans_KR } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import { env } from "@/shared/config";
import {
  DEFAULT_OG_IMAGE_URL,
  SITE_NAME,
  SITE_URL,
} from "@/shared/lib/seo";
import "@saju/design-tokens/css";
import "./globals.css";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: env.NEXT_PUBLIC_APP_DES,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: SITE_NAME,
    description: env.NEXT_PUBLIC_APP_DES,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} 대표 이미지`,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: env.NEXT_PUBLIC_APP_DES,
    images: [DEFAULT_OG_IMAGE_URL],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${notoSansKr.variable} ${jua.variable} font-sans text-foreground antialiased`}
      >
        {env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ? (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
        {children}
      </body>
    </html>
  );
}
