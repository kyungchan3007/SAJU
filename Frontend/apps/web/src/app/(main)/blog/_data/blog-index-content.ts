import type { Route } from "next";

type BlogListItem = {
  href: Route;
  title: string;
  desc: string;
};

export const BLOG_INDEX_PAGE_CONTENT = {
  title: "사주 이야기 | 사주 기초 · 띠별 운세 · 2026년 운세",
  description:
    "사주 보는 법, 사주팔자 뜻, 띠별 운세, 2026년 운세까지 무료 사주 콘텐츠를 알기 쉽게 정리합니다.",
  path: "/blog",
  badge: "SAJU:ME",
  heading: "사주 이야기",
  intro:
    "사주 보는 법, 사주팔자 기초, 띠별 운세, 2026년 운세를 한 곳에서 정리합니다.",
  summary:
    "이 페이지는 검색용 요약 카드만 모아둔 목록이 아니라, 사주를 처음 이해하려는 사람과 올해 흐름을 빠르게 파악하려는 사람을 위한 공개 읽기 순서를 정리한 허브입니다. 기초 개념부터 2026년 해석, 띠 비교 가이드까지 연결해서 읽을 수 있게 구성했습니다.",
  sections: {
    fortune: {
      title: "2026년 운세",
      posts: [
        {
          href: "/blog/2026-fortune",
          title: "2026년 병오년 운세 총정리",
          desc: "화(火)의 해, 분야별 2026년 전망",
        },
        {
          href: "/blog/2026-zodiac-fortune",
          title: "2026년 띠별 운세",
          desc: "12띠 재물·애정·건강·직장 운세 한눈에 보기",
        },
      ] satisfies BlogListItem[],
    },
    concept: {
      title: "사주 기초",
      posts: [
        {
          href: "/blog/saju-meaning",
          title: "사주팔자란 무엇인가?",
          desc: "사주팔자의 개념과 구성 원리 완벽 입문",
        },
        {
          href: "/blog/cheongan-jiji",
          title: "천간과 지지란?",
          desc: "사주 8글자를 이루는 천간 10개·지지 12개 정리",
        },
        {
          href: "/blog/yin-yang-ohaeng",
          title: "음양오행이란?",
          desc: "목·화·토·금·수 오행의 특성과 상생·상극 관계",
        },
        {
          href: "/blog/how-to-read-saju",
          title: "사주 보는 법 입문",
          desc: "초보자를 위한 사주팔자 분석 6단계 가이드",
        },
        {
          href: "/blog/fortune-vs-saju",
          title: "운세와 사주의 차이",
          desc: "사주·운세·타로·별자리 점성술 비교 정리",
        },
      ] satisfies BlogListItem[],
    },
    zodiacGuide: {
      title: "띠별 비교 가이드",
      badge: "통합 가이드",
      href: "/blog/2026-zodiac-fortune" as Route,
      heading: "12띠를 한 페이지에서 비교하는 2026년 띠별 운세",
      description:
        "개별 띠 카드가 아니라 12띠 흐름, 주의점, 읽는 기준을 한 번에 정리한 공개 문서입니다.",
    },
  },
} as const;
