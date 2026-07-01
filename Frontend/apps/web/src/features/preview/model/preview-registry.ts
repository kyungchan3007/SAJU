import type { Metadata } from "next";
import type { Route } from "next";

export type PreviewSlug = "traditional-saju" | "year-fortune" | "compatibility";

type PreviewLink = {
  href: Route;
  label: string;
};

type PreviewEntry = {
  slug: PreviewSlug;
  metadata: Metadata;
  badge: string;
  title: string;
  description: string;
  cta: {
    title: string;
    description: string;
    href: Route;
    label: string;
  };
  relatedLinks: {
    heading: string;
    links: PreviewLink[];
  };
};

export const PREVIEW_REGISTRY: Record<PreviewSlug, PreviewEntry> = {
  "traditional-saju": {
    slug: "traditional-saju",
    metadata: {
      title: "정통사주 미리보기",
      description:
        "정통사주 풀이에서 제공하는 명식 요약, 4기둥, 오행 밸런스, 12운성, 대운 흐름을 예시 데이터로 먼저 확인할 수 있습니다.",
      alternates: {
        canonical: "/preview/traditional-saju",
      },
    },
    badge: "정통사주 미리보기",
    title: "",
    description:
      "실제 정통사주 화면과 같은 구조로 명식 요약, 4기둥, 오행 밸런스, 12운성, 대운 흐름을 예시 데이터로 먼저 확인할 수 있습니다.",
    cta: {
      title: "정통사주 전체 풀이가 궁금하다면",
      description:
        "예시 화면으로 구조를 먼저 확인했다면, 실제 서비스에서 내 명식과 운의 흐름을 기반으로 더 자세한 풀이를 볼 수 있습니다.",
      href: "/mypage/traditional-fortune",
      label: "정통사주 보러가기",
    },
    relatedLinks: {
      heading: "같이 읽어보면 좋은 글",
      links: [
        { href: "/blog/saju-meaning", label: "사주팔자란 무엇인가?" },
        { href: "/blog/how-to-read-saju", label: "사주 보는 법 입문" },
        { href: "/blog/cheongan-jiji", label: "천간과 지지란?" },
      ],
    },
  },
  "year-fortune": {
    slug: "year-fortune",
    metadata: {
      title: "신년운세 미리보기",
      description:
        "신년운세에서 제공하는 연도 헤더, 영역별 운세, 월별 운세 구성을 예시 데이터로 먼저 확인할 수 있습니다.",
      alternates: {
        canonical: "/preview/year-fortune",
      },
    },
    badge: "신년운세 미리보기",
    title: "",
    description:
      "실제 신년운세 화면과 같은 구조로 연도 헤더, 영역별 운세, 월별 흐름을 예시 데이터로 먼저 확인할 수 있습니다.",
    cta: {
      title: "내 신년운세 전체 풀이가 궁금하다면",
      description:
        "공개 예시로 화면 구성을 먼저 확인했다면, 실제 서비스에서 내 사주를 바탕으로 한 해의 흐름과 월별 포인트를 더 자세히 볼 수 있습니다.",
      href: "/mypage/year-fortune",
      label: "신년운세 보러가기",
    },
    relatedLinks: {
      heading: "같이 읽어보면 좋은 글",
      links: [
        { href: "/blog/2026-fortune", label: "2026년 병오년 운세" },
        { href: "/blog/2026-zodiac-fortune", label: "2026년 띠별 운세" },
        { href: "/faq", label: "FAQ" },
      ],
    },
  },
  compatibility: {
    slug: "compatibility",
    metadata: {
      title: "궁합 미리보기",
      description:
        "궁합 분석에서 제공하는 두 사람 비교, 종합 점수, 분야별 풀이 구성을 예시 데이터로 먼저 확인할 수 있습니다.",
      alternates: {
        canonical: "/preview/compatibility",
      },
    },
    badge: "궁합 미리보기",
    title: "",
    description:
      "실제 궁합 결과 화면과 같은 구조로 두 사람 비교, 종합 점수, 분야별 해석, 총평을 공개 예시로 먼저 확인할 수 있습니다.",
    cta: {
      title: "내 궁합 결과를 직접 확인하고 싶다면",
      description:
        "공개 예시로 구조를 먼저 확인했다면, 실제 서비스에서 내 사주와 상대 정보를 기준으로 더 자세한 궁합 분석을 볼 수 있습니다.",
      href: "/compatibility",
      label: "궁합 보러가기",
    },
    relatedLinks: {
      heading: "같이 읽어보면 좋은 글",
      links: [
        { href: "/blog/fortune-vs-saju", label: "운세와 사주의 차이" },
        { href: "/blog/yin-yang-ohaeng", label: "오행으로 관계 읽기" },
        { href: "/faq", label: "FAQ" },
      ],
    },
  },
};

export function getPreviewConfig(slug: PreviewSlug) {
  return PREVIEW_REGISTRY[slug];
}
