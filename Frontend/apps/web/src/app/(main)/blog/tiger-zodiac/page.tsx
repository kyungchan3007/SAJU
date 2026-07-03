import type { Metadata } from "next";
import { createPageMetadata } from "@/shared/lib/seo";
import { ZodiacPageTemplate } from "../_components/zodiac-page-template";
import { ZODIAC_DATA } from "../_data/zodiac-data";

const data = ZODIAC_DATA.tiger;

export const metadata: Metadata = createPageMetadata({
  title: `${data.name} 성격과 2026년 운세 완벽 정리`,
  description: `${data.years} ${data.name}의 성격, 장단점, 2026년 운세, 잘 맞는 띠를 사주 관점에서 상세히 안내합니다.`,
  path: `/blog/${data.slug}`,
  type: "article",
});

export default function TigerZodiacPage() {
  return <ZodiacPageTemplate data={data} />;
}
