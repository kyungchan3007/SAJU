import type { Metadata } from "next";
import { env } from "@/shared/config";

const SITE_URL_FALLBACK = "https://saju-me.com";

export const SITE_URL = env.NEXT_PUBLIC_APP_URL || SITE_URL_FALLBACK;
export const SITE_NAME = env.NEXT_PUBLIC_APP_NAME;
export const DEFAULT_OG_IMAGE_URL = getAbsoluteUrl("/image/background.png");

/**
 * 콘텐츠의 발행 주체명.
 *
 * `SITE_NAME`(= NEXT_PUBLIC_APP_NAME)은 "무료 사주 풀이, ... | 사주 톡톡" 형태의
 * SEO 타이틀 문자열이라 발행 주체명으로 쓸 수 없어 별도로 둔다.
 * 화면 표기(ArticleTrustNote)와 JSON-LD의 author/publisher가 이 값을 함께 쓴다.
 */
export const SITE_BRAND = "SAJU:ME";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: Metadata["keywords"];
  type?: "website" | "article";
  /** `type: "article"`일 때만 반영된다. YYYY-MM-DD. */
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
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
  publishedTime,
  modifiedTime,
  author,
}: PageMetadataOptions): Metadata {
  const url = getAbsoluteUrl(path);

  const openGraphBase = {
    title,
    description,
    url,
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
  };

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    ...(keywords ? { keywords } : {}),
    ...(author ? { authors: [{ name: author }] } : {}),
    openGraph:
      type === "article"
        ? {
            ...openGraphBase,
            type: "article",
            ...(publishedTime ? { publishedTime } : {}),
            ...(modifiedTime ? { modifiedTime } : {}),
            ...(author ? { authors: [author] } : {}),
          }
        : { ...openGraphBase, type: "website" },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE_URL],
    },
  };
}

type ArticleStructuredDataOptions = Pick<
  PageMetadataOptions,
  "title" | "description" | "path"
> & {
  publishedAt: string;
  updatedAt: string;
  author: string;
};

/**
 * 글의 작성자와 발행/수정일을 검색엔진이 파싱할 수 있는 형태로 노출한다.
 * 화면의 byline 표기와 값이 어긋나면 안 된다.
 */
export function createArticleStructuredData({
  title,
  description,
  path,
  publishedAt,
  updatedAt,
  author,
}: ArticleStructuredDataOptions) {
  const url = getAbsoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    inLanguage: "ko-KR",
    datePublished: publishedAt,
    dateModified: updatedAt,
    image: DEFAULT_OG_IMAGE_URL,
    author: {
      "@type": "Organization",
      name: author,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: author,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
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
