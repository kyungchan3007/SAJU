import type { Metadata } from "next";
import type { Route } from "next";
import { createPageMetadata } from "@/shared/lib/seo";

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
    metadata: createPageMetadata({
      title: "정통사주 풀이 구성 안내 | 명식·오행·대운 공개 예시",
      description:
        "정통사주 풀이에서 어떤 항목을 읽게 되는지 공개 예시로 확인해보세요. 명식, 오행 밸런스, 12운성, 대운 흐름을 설명과 함께 정리했습니다.",
      path: "/preview/traditional-saju",
    }),
    badge: "정통사주 공개 예시",
    title: "정통사주 풀이",
    description:
      "정통사주 풀이가 어떤 순서로 구성되는지, 명식 요약과 오행 균형을 어떤 관점으로 읽는지 공개 예시 화면으로 정리했습니다.",
    cta: {
      title: "정통사주 전체 풀이가 궁금하다면",
      description:
        "예시 화면으로 구조를 먼저 확인했다면, 실제 서비스에서 내 명식과 운의 흐름을 기반으로 더 자세한 풀이를 볼 수 있습니다.",
      href: "/mypage/traditional-fortune",
      label: "정통사주 풀이 보러가기",
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
    metadata: createPageMetadata({
      title: "2026년 신년운세 구성 안내 | 월별 흐름 공개 예시",
      description:
        "2026년 신년운세에서 어떤 정보를 읽게 되는지 공개 예시로 확인해보세요. 연간 요약, 분야별 포인트, 월별 흐름까지 한 화면에서 볼 수 있습니다.",
      path: "/preview/year-fortune",
    }),
    badge: "신년운세 공개 예시",
    title: "2026년 신년운세",
    description:
      "연간 운세 화면이 어떤 구조로 읽히는지, 영역별 해석과 월별 흐름이 어떻게 이어지는지 공개 예시로 정리했습니다.",
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
    metadata: createPageMetadata({
      title: "사주 궁합 구성 안내 | 두 사람 비교 공개 예시",
      description:
        "사주 궁합 결과가 어떤 구조로 제공되는지 공개 예시로 확인해보세요. 두 사람 비교, 종합 점수, 분야별 해석, 총평까지 한 번에 살펴볼 수 있습니다.",
      path: "/preview/compatibility",
    }),
    badge: "궁합 공개 예시",
    title: "사주 궁합",
    description:
      "두 사람의 사주를 어떤 기준으로 비교하고 결과를 어떻게 읽는지 공개 예시 화면과 함께 설명합니다.",
    cta: {
      title: "내 궁합 결과를 직접 확인하고 싶다면",
      description:
        "공개 예시로 구조를 먼저 확인했다면, 실제 서비스에서 내 사주와 상대 정보를 기준으로 더 자세한 궁합 분석을 볼 수 있습니다.",
      href: "/compatibility",
      label: "무료 궁합 보러가기",
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
