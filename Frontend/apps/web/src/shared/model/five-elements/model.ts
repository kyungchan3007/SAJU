export type FiveElementKey = "금" | "목" | "토" | "화" | "수";
export type YongshinImageKey = "metal" | "wood" | "earth" | "fire" | "water";

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

export const DAILY_FIVE_ELEMENT_ORDER: FiveElementKey[] = [
  "목",
  "화",
  "토",
  "금",
  "수",
];

export const DAILY_FIVE_ELEMENT_CONFIG: Record<
  FiveElementKey,
  { color: string; label: string }
> = {
  목: { color: "#10B981", label: "목 (木)" },
  화: { color: "#EF4444", label: "화 (火)" },
  토: { color: "#F59E0B", label: "토 (土)" },
  금: { color: "#6B7280", label: "금 (金)" },
  수: { color: "#3B82F6", label: "수 (水)" },
};

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

export const YONGSHIN_DISPLAY_BY_IMAGE_KEY: Record<
  YongshinImageKey,
  {
    ko: FiveElementKey;
    hanja: string;
    color: string;
    bg: string;
    emoji: string;
  }
> = {
  metal: {
    ko: "금",
    hanja: "金",
    color: "#94a3b8",
    bg: "#F1F5F9",
    emoji: "⚙️",
  },
  wood: {
    ko: "목",
    hanja: "木",
    color: "#4ade80",
    bg: "#DCFCE7",
    emoji: "🌿",
  },
  earth: {
    ko: "토",
    hanja: "土",
    color: "#fbbf24",
    bg: "#FEF9C3",
    emoji: "🪨",
  },
  fire: {
    ko: "화",
    hanja: "火",
    color: "#f87171",
    bg: "#FEE2E2",
    emoji: "🔥",
  },
  water: {
    ko: "수",
    hanja: "水",
    color: "#60a5fa",
    bg: "#DBEAFE",
    emoji: "💧",
  },
};
