export type FiveElementKey = "금" | "목" | "토" | "화" | "수";

export type FiveElementsBalance = {
  elements: Record<string, number>;
  yongshinPrimary?: string;
  yongshinSecondary?: string;
};

export const FIVE_ELEMENT_ORDER: FiveElementKey[] = [
  "금",
  "목",
  "토",
  "화",
  "수",
];

export const FIVE_ELEMENT_CONFIG: Record<
  FiveElementKey,
  {
    label: string;
    color: string;
    bg: string;
    emoji: string;
    description: string;
  }
> = {
  금: {
    label: "금(金)",
    color: "#94a3b8",
    bg: "#F1F5F9",
    emoji: "⚙️",
    description: "기준, 정리, 판단과 완성도의 기운",
  },
  목: {
    label: "목(木)",
    color: "#4ade80",
    bg: "#DCFCE7",
    emoji: "🌿",
    description: "성장, 관계, 확장과 유연함의 기운",
  },
  토: {
    label: "토(土)",
    color: "#fbbf24",
    bg: "#FEF9C3",
    emoji: "🪨",
    description: "안정, 중심, 축적과 현실감의 기운",
  },
  화: {
    label: "화(火)",
    color: "#f87171",
    bg: "#FEE2E2",
    emoji: "🔥",
    description: "표현, 열정, 드러남과 추진의 기운",
  },
  수: {
    label: "수(水)",
    color: "#60a5fa",
    bg: "#DBEAFE",
    emoji: "💧",
    description: "사고, 흐름, 저장과 유연한 적응의 기운",
  },
};
