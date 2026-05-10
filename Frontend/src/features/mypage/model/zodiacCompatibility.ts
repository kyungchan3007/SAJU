import { ZODIAC_LIST } from "@/shared/model/zodiac/model";

export type ZodiacCompatibilityGradeKey =
  | "best"
  | "good"
  | "neutral"
  | "caution"
  | "bad";

export type ZodiacCompatibilityEntry = {
  key: string;
  animal: string;
  name: string;
  branch: string;
  score: number;
  grade: ZodiacCompatibilityGradeKey;
  relation: string;
  description: string;
};

const ZODIAC_COMPATIBILITY_ITEMS = ZODIAC_LIST.map((zodiac) => ({
  key: zodiac.key,
  animal: zodiac.emoji,
  name: `${zodiac.name}띠`,
  branch: zodiac.hanja,
}));

export const ZODIAC_COMPATIBILITY_GRADE_STYLES: Record<
  ZodiacCompatibilityGradeKey,
  { card: string; bar: string; badge: string; label: string }
> = {
  best: {
    card: "bg-[#fffbeb]",
    bar: "bg-[#fbbf24]",
    badge: "border-[#f59e0b] bg-[#fbbf24] text-[#92400e]",
    label: "최고",
  },
  good: {
    card: "bg-[#FDFCF8]",
    bar: "bg-[#4ade80]",
    badge: "border-[#16a34a] bg-[#bbf7d0] text-[#14532d]",
    label: "좋음",
  },
  neutral: {
    card: "bg-[#FDFCF8]",
    bar: "bg-[#d1d5db]",
    badge: "border-[#d4d0c8] bg-[#F0EDE6] text-[#7a7570]",
    label: "무난",
  },
  caution: {
    card: "bg-[#FDFCF8]",
    bar: "bg-[#fb923c]",
    badge: "border-[#d97706] bg-[#fde68a] text-[#92400e]",
    label: "주의",
  },
  bad: {
    card: "bg-[#FDFCF8]",
    bar: "bg-[#f87171]",
    badge: "border-[#dc2626] bg-[#fecaca] text-[#7f1d1d]",
    label: "나쁨",
  },
};

export const ZODIAC_COMPATIBILITY_LEGEND_ITEMS: Array<{
  grade: ZodiacCompatibilityGradeKey;
  color: string;
}> = [
  { grade: "best", color: "bg-[#fbbf24]" },
  { grade: "good", color: "bg-[#4ade80]" },
  { grade: "neutral", color: "bg-[#d1d5db]" },
  { grade: "caution", color: "bg-[#fb923c]" },
  { grade: "bad", color: "bg-[#f87171]" },
];

export function buildZodiacCompatibilityEntries(
  data: Record<string, unknown> | Array<unknown>,
): ZodiacCompatibilityEntry[] {
  return ZODIAC_COMPATIBILITY_ITEMS.map((zodiac) => {
    const raw = findRawCompatibilityValue(data, zodiac);
    return toZodiacCompatibilityEntry(zodiac, raw);
  });
}

export function findMyZodiacEntry(myZodiac?: string | null) {
  const normalized = myZodiac?.replace(/띠$/, "").trim();

  if (!normalized) {
    return null;
  }

  return (
    ZODIAC_COMPATIBILITY_ITEMS.find(
      (zodiac) =>
        zodiac.name === myZodiac ||
        zodiac.name.replace("띠", "") === normalized,
    ) ?? null
  );
}

function findRawCompatibilityValue(
  data: Record<string, unknown> | Array<unknown>,
  zodiac: (typeof ZODIAC_COMPATIBILITY_ITEMS)[number],
) {
  const plainName = zodiac.name.replace("띠", "");
  const aliases = [zodiac.key, zodiac.name, plainName, zodiac.branch];

  if (Array.isArray(data)) {
    return (
      data.find((item) => {
        if (!item || typeof item !== "object") {
          return false;
        }

        const record = item as Record<string, unknown>;
        return aliases.some((alias) =>
          [record.key, record.name, record.animal, record.branch].includes(
            alias,
          ),
        );
      }) ?? null
    );
  }

  for (const alias of aliases) {
    if (alias in data) {
      return data[alias];
    }
  }

  return null;
}

function toZodiacCompatibilityEntry(
  staticItem: (typeof ZODIAC_COMPATIBILITY_ITEMS)[number],
  raw: unknown,
): ZodiacCompatibilityEntry {
  const base: ZodiacCompatibilityEntry = {
    ...staticItem,
    score: 50,
    grade: "neutral",
    relation: "평(平)",
    description: "무난한 관계입니다.",
  };

  if (typeof raw === "number" || typeof raw === "string") {
    const score = normalizeScore(raw, base.score);
    return { ...base, score, grade: resolveZodiacCompatibilityGrade(score) };
  }

  if (!raw || typeof raw !== "object") {
    return base;
  }

  const record = raw as Record<string, unknown>;
  const score = normalizeScore(record.score, base.score);
  const grade = isZodiacCompatibilityGrade(record.grade)
    ? record.grade
    : resolveZodiacCompatibilityGrade(score);
  const relation =
    typeof record.relation === "string" ? record.relation : base.relation;
  const description =
    typeof record.description === "string" || typeof record.desc === "string"
      ? String(record.description ?? record.desc)
      : base.description;

  return { ...staticItem, score, grade, relation, description };
}

function normalizeScore(value: unknown, fallback: number) {
  const score = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(score)) {
    return fallback;
  }

  return Math.min(100, Math.max(0, Math.round(score)));
}

function resolveZodiacCompatibilityGrade(
  score: number,
): ZodiacCompatibilityGradeKey {
  if (score >= 90) return "best";
  if (score >= 70) return "good";
  if (score >= 50) return "neutral";
  if (score >= 30) return "caution";
  return "bad";
}

function isZodiacCompatibilityGrade(
  value: unknown,
): value is ZodiacCompatibilityGradeKey {
  return (
    value === "best" ||
    value === "good" ||
    value === "neutral" ||
    value === "caution" ||
    value === "bad"
  );
}
