import type { Metadata, Route } from "next";
import Link from "next/link";
import { PageContainer } from "@/shared/ui/page-container";
import { ZODIAC_DATA } from "./_data/zodiac-data";

export const metadata: Metadata = {
  title: "사주 이야기 | 띠별 운세 · 사주 기초 · 2026년 운세",
  description:
    "사주팔자 기초 개념, 띠별 성격과 운세, 2026년 운세를 알기 쉽게 정리합니다. SAJU:ME의 사주 정보 콘텐츠를 확인하세요.",
  alternates: { canonical: "/blog" },
};

const conceptPosts: Array<{ href: Route; title: string; desc: string }> = [
  { href: "/blog/saju-meaning", title: "사주팔자란 무엇인가?", desc: "사주팔자의 개념과 구성 원리 완벽 입문" },
  { href: "/blog/cheongan-jiji", title: "천간과 지지란?", desc: "사주 8글자를 이루는 천간 10개·지지 12개 정리" },
  { href: "/blog/yin-yang-ohaeng", title: "음양오행이란?", desc: "목·화·토·금·수 오행의 특성과 상생·상극 관계" },
  { href: "/blog/how-to-read-saju", title: "사주 보는 법 입문", desc: "초보자를 위한 사주팔자 분석 6단계 가이드" },
  { href: "/blog/fortune-vs-saju", title: "운세와 사주의 차이", desc: "사주·운세·타로·별자리 점성술 비교 정리" },
];

const fortunePosts: Array<{ href: Route; title: string; desc: string }> = [
  { href: "/blog/2026-fortune", title: "2026년 병오년 운세 총정리", desc: "화(火)의 해, 분야별 2026년 전망" },
  { href: "/blog/2026-zodiac-fortune", title: "2026년 띠별 운세", desc: "12띠 재물·애정·건강·직장 운세 한눈에 보기" },
];

const zodiacs = Object.values(ZODIAC_DATA);

export default function BlogIndexPage() {
  return (
    <main className="bg-white py-10 md:py-14">
      <PageContainer width="reading">
        <div className="flex flex-col gap-10">
          <header className="flex flex-col gap-3">
            <span className="w-fit rounded-full bg-[#F0EEFF] px-3 py-1 text-xs font-bold text-[#5956E9]">
              SAJU:ME
            </span>
            <h1 className="text-3xl font-black tracking-tight text-gray-900">사주 이야기</h1>
            <p className="text-sm leading-relaxed text-gray-500">
              사주팔자 기초부터 띠별 운세, 연도별 운세까지 알기 쉽게 정리합니다.
            </p>
          </header>

          <section>
            <h2 className="mb-4 text-lg font-black text-gray-900">2026년 운세</h2>
            <div className="flex flex-col gap-3">
              {fortunePosts.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="flex flex-col gap-1 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="text-sm font-bold text-gray-900">{p.title}</span>
                  <span className="text-xs text-gray-500">{p.desc}</span>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-black text-gray-900">사주 기초</h2>
            <div className="flex flex-col gap-3">
              {conceptPosts.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="flex flex-col gap-1 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="text-sm font-bold text-gray-900">{p.title}</span>
                  <span className="text-xs text-gray-500">{p.desc}</span>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-black text-gray-900">띠별 성격과 운세</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {zodiacs.map((z) => (
                <Link
                  key={z.slug}
                  href={`/blog/${z.slug}` as Route}
                  className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="text-xl">{z.emoji}</span>
                  <span className="text-sm font-bold text-gray-800">{z.name}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </PageContainer>
    </main>
  );
}
