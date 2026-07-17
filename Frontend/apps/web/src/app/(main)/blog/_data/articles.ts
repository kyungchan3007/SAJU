/**
 * 블로그 글의 발행/수정일 단일 출처.
 *
 * 날짜는 git 커밋 이력이 근거다(최초 추가 커밋 = publishedAt, 최종 수정 커밋 = updatedAt).
 * 검색엔진과 AdSense가 읽는 신뢰 신호이므로 실제와 다르게 최신화하지 않는다.
 * 글을 고치면 그 글의 updatedAt만 실제 수정일로 갱신한다.
 *
 * 이 값은 화면 표기(ArticleTrustNote)와 JSON-LD(createArticleStructuredData)가
 * 함께 쓴다. 두 곳이 다른 날짜를 말하지 않게 하려고 상수로 모아둔다.
 */

export type BlogArticleMeta = {
  publishedAt: string;
  updatedAt: string;
};

export const BLOG_ARTICLES = {
  "saju-meaning": { publishedAt: "2026-06-10", updatedAt: "2026-07-17" },
  "cheongan-jiji": { publishedAt: "2026-06-10", updatedAt: "2026-07-17" },
  "yin-yang-ohaeng": { publishedAt: "2026-06-10", updatedAt: "2026-07-17" },
  "how-to-read-saju": { publishedAt: "2026-06-10", updatedAt: "2026-07-17" },
  "fortune-vs-saju": { publishedAt: "2026-06-10", updatedAt: "2026-07-17" },
  "2026-fortune": { publishedAt: "2026-06-10", updatedAt: "2026-07-17" },
  "2026-zodiac-fortune": { publishedAt: "2026-06-10", updatedAt: "2026-07-17" },
} as const satisfies Record<string, BlogArticleMeta>;

export type BlogArticleSlug = keyof typeof BLOG_ARTICLES;

export const BLOG_ARTICLE_SLUGS = Object.keys(
  BLOG_ARTICLES,
) as BlogArticleSlug[];
