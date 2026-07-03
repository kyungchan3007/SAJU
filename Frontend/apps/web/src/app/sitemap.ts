import type { MetadataRoute } from "next";

const BASE_URL = "https://saju-me.com";
const PUBLIC_LAST_MODIFIED = new Date("2026-07-03T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  // 콘텐츠별 실제 수정일을 아직 연결하지 못한 상태라, 빌드마다 변하는 현재 시간을 쓰지 않고
  // 검증 가능한 고정 기준일만 노출한다.
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: PUBLIC_LAST_MODIFIED,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: PUBLIC_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: PUBLIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: PUBLIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: PUBLIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-of-service`,
      lastModified: PUBLIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const blogPosts: MetadataRoute.Sitemap = [
    "saju-meaning",
    "cheongan-jiji",
    "yin-yang-ohaeng",
    "how-to-read-saju",
    "fortune-vs-saju",
    "2026-fortune",
    "2026-zodiac-fortune",
    "rat-zodiac",
    "ox-zodiac",
    "tiger-zodiac",
    "rabbit-zodiac",
    "dragon-zodiac",
    "snake-zodiac",
    "horse-zodiac",
    "goat-zodiac",
    "monkey-zodiac",
    "rooster-zodiac",
    "dog-zodiac",
    "pig-zodiac",
  ].map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: PUBLIC_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPosts];
}
