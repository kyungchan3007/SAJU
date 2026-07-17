import type { MetadataRoute } from "next";
import {
  BLOG_ARTICLES,
  BLOG_ARTICLE_SLUGS,
} from "./(main)/blog/_data/articles";

const BASE_URL = "https://saju-me.com";

// lastModified는 각 콘텐츠 파일의 실제 최종 수정 커밋일이다.
// 빌드 시각을 쓰면 내용이 그대로여도 매 배포마다 갱신된 것처럼 보이므로 쓰지 않는다.
// 콘텐츠를 고치면 이 날짜(글은 _data/articles.ts)를 함께 갱신한다.
const STATIC_LAST_MODIFIED = {
  home: "2026-07-03",
  blogIndex: "2026-07-17",
  faq: "2026-07-03",
  contact: "2026-07-03",
  privacyPolicy: "2026-06-10",
  termsOfService: "2026-06-10",
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: STATIC_LAST_MODIFIED.home,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: STATIC_LAST_MODIFIED.blogIndex,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: STATIC_LAST_MODIFIED.faq,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: STATIC_LAST_MODIFIED.contact,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: STATIC_LAST_MODIFIED.privacyPolicy,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-of-service`,
      lastModified: STATIC_LAST_MODIFIED.termsOfService,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const blogPosts: MetadataRoute.Sitemap = BLOG_ARTICLE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: BLOG_ARTICLES[slug].updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPosts];
}
