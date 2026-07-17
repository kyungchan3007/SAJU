import type { Metadata } from "next";
import {
  SITE_BRAND,
  createArticleStructuredData,
  createPageMetadata,
} from "@/shared/lib/seo";
import type { BlogArticleSlug } from "./articles";
import { BLOG_ARTICLES } from "./articles";

type BlogArticleSeoContent = {
  title: string;
  description: string;
  path: string;
};

export function createBlogArticleAssets(
  slug: BlogArticleSlug,
  content: BlogArticleSeoContent,
): {
  metadata: Metadata;
  structuredData: ReturnType<typeof createArticleStructuredData>;
  updatedAt: string;
} {
  const meta = BLOG_ARTICLES[slug];

  return {
    metadata: createPageMetadata({
      title: content.title,
      description: content.description,
      path: content.path,
      type: "article",
      publishedTime: meta.publishedAt,
      modifiedTime: meta.updatedAt,
      author: SITE_BRAND,
    }),
    structuredData: createArticleStructuredData({
      title: content.title,
      description: content.description,
      path: content.path,
      publishedAt: meta.publishedAt,
      updatedAt: meta.updatedAt,
      author: SITE_BRAND,
    }),
    updatedAt: meta.updatedAt,
  };
}
