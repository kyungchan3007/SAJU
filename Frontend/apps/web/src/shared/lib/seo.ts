import type { Metadata } from "next";
import { env } from "@/shared/config";

const SITE_URL_FALLBACK = "https://saju-me.com";

export const SITE_URL = env.NEXT_PUBLIC_APP_URL || SITE_URL_FALLBACK;
export const SITE_NAME = env.NEXT_PUBLIC_APP_NAME;
export const DEFAULT_OG_IMAGE_URL = getAbsoluteUrl("/image/background.png");

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: Metadata["keywords"];
  type?: "website" | "article";
};

export function getAbsoluteUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
}: PageMetadataOptions): Metadata {
  const url = getAbsoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    ...(keywords ? { keywords } : {}),
    openGraph: {
      title,
      description,
      url,
      type,
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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE_URL],
    },
  };
}

export function createWebPageStructuredData({
  title,
  description,
  path,
}: Pick<PageMetadataOptions, "title" | "description" | "path">) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: getAbsoluteUrl(path),
    inLanguage: "ko-KR",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
