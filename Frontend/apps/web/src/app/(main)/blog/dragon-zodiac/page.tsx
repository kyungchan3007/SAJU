import type { Metadata } from "next";
import { ZodiacPageTemplate } from "../_components/zodiac-page-template";
import { ZODIAC_DATA } from "../_data/zodiac-data";

const data = ZODIAC_DATA.dragon;

export const metadata: Metadata = {
  title: `${data.name} 성격과 2026년 운세 완벽 정리`,
  description: `${data.years} ${data.name}의 성격, 장단점, 2026년 운세, 잘 맞는 띠를 사주 관점에서 상세히 안내합니다.`,
  alternates: { canonical: `/blog/${data.slug}` },
};

export default function DragonZodiacPage() {
  return <ZodiacPageTemplate data={data} />;
}
