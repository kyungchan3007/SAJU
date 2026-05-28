import type { YearFortuneResponse, YearMonthlyFortune } from "@/generated/api";

export const YEAR_FORTUNE_QUERY_KEY = ["year-fortune"] as const;

export type YearFortuneStatus = "PENDING" | "COMPLETE" | "UNKNOWN";

export type DomainKey =
  | "general"
  | "wealth"
  | "relationship"
  | "careerBusiness"
  | "familyHealth";

export type DomainDisplay = {
  key: DomainKey;
  icon: string;
  label: string;
  color: string;
  bg: string;
  title: string | undefined;
  content: string | undefined;
};

export type UserInfoDisplay = {
  manse: string | undefined;
  gender: string | undefined;
  birthYear: number | undefined;
  daeun: string | undefined;
};

export type MonthType = "good" | "normal" | "caution";

export type MonthDisplay = {
  month: number;
  type: MonthType;
  tagText: string;
  emoji: string;
  fortune: string;
};

export type YearFortuneDisplay = {
  status: YearFortuneStatus;
  targetYear: number;
  yearLabel: string;
  userInfo: UserInfoDisplay;
  domains: DomainDisplay[];
  months: MonthDisplay[];
};

const DOMAIN_META: Record<
  DomainKey,
  { icon: string; label: string; color: string; bg: string }
> = {
  general: { icon: "🌟", label: "총론", color: "#6366F1", bg: "#EEF2FF" },
  wealth: { icon: "💰", label: "재물운", color: "#F59E0B", bg: "#FEF9C3" },
  relationship: {
    icon: "💕",
    label: "이성·대인관계",
    color: "#EC4899",
    bg: "#FCE7F3",
  },
  careerBusiness: {
    icon: "💼",
    label: "직장·사업운",
    color: "#3B82F6",
    bg: "#DBEAFE",
  },
  familyHealth: {
    icon: "🏠",
    label: "가정·건강운",
    color: "#22C55E",
    bg: "#DCFCE7",
  },
};

const DOMAIN_ORDER: DomainKey[] = [
  "general",
  "wealth",
  "relationship",
  "careerBusiness",
  "familyHealth",
];

const MONTH_EMOJIS: Record<number, string> = {
  1: "🌱",
  2: "❄️",
  3: "🌸",
  4: "🌼",
  5: "🌿",
  6: "☀️",
  7: "🔥",
  8: "⛅",
  9: "🍁",
  10: "🌟",
  11: "🏆",
  12: "🎄",
};

function getTagText(label: string | undefined): string {
  if (!label) return "🟡 평";
  if (label.includes("대길")) return "🟢 대길";
  if (label.includes("길")) return "🔵 길";
  if (label.includes("주의") || label.includes("흉")) return "🔴 주의";
  return "🟡 평";
}

function getMonthType(label: string | undefined): MonthType {
  if (!label) return "normal";
  if (label.includes("길")) return "good";
  if (label.includes("주의") || label.includes("흉")) return "caution";
  return "normal";
}

function normalizeGender(gender: string | undefined): string | undefined {
  if (!gender) return undefined;
  if (gender === "MALE" || gender === "male") return "남성";
  if (gender === "FEMALE" || gender === "female") return "여성";
  return gender;
}

function toMonthDisplay(m: YearMonthlyFortune): MonthDisplay {
  return {
    month: m.month ?? 0,
    type: getMonthType(m.label),
    tagText: getTagText(m.label),
    emoji: MONTH_EMOJIS[m.month ?? 0] ?? "📅",
    fortune: m.fortune ?? "",
  };
}

export function toYearFortuneDisplay(
  data: YearFortuneResponse | undefined,
  backendStatus: unknown,
): YearFortuneDisplay {
  const status = normalizeStatus(backendStatus);
  const year = data?.targetYear ?? new Date().getFullYear();
  const yearLabel = data?.yearLabel ?? `${year}년`;

  const userInfo: UserInfoDisplay = {
    manse: data?.userInfo?.manse,
    gender: normalizeGender(data?.userInfo?.gender),
    birthYear: data?.userInfo?.birthYear,
    daeun: data?.userInfo?.daeun,
  };

  const domains = DOMAIN_ORDER.map((key): DomainDisplay => {
    const meta = DOMAIN_META[key];
    const section = data?.[key];
    return {
      key,
      icon: meta.icon,
      label: meta.label,
      color: meta.color,
      bg: meta.bg,
      title: section?.title,
      content: section?.content,
    };
  });

  const months = (data?.monthlyFortunes ?? [])
    .slice()
    .sort((a, b) => (a.month ?? 0) - (b.month ?? 0))
    .map(toMonthDisplay);

  return {
    status,
    targetYear: year,
    yearLabel,
    userInfo,
    domains,
    months,
  };
}

function normalizeStatus(raw: unknown): YearFortuneStatus {
  if (raw === "COMPLETE") return "COMPLETE";
  if (raw === "PENDING") return "PENDING";
  return "UNKNOWN";
}
