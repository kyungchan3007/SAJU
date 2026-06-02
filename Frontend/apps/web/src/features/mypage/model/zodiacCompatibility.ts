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
  img: string;
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
  img: zodiac.img,
  name: `${zodiac.name}띠`,
  branch: zodiac.hanja,
}));

export const ZODIAC_COMPATIBILITY_GRADE_STYLES: Record<
  ZodiacCompatibilityGradeKey,
  { card: string; bar: string; badge: string; label: string }
> = {
  best: {
    card: "bg-[#FFFBEB] border-[#FDE68A]",
    bar: "bg-[#F59E0B]",
    badge: "bg-[#FEF3C7] text-[#92400E]",
    label: "최고",
  },
  good: {
    card: "bg-[#F0FDF4] border-[#BBF7D0]",
    bar: "bg-[#10B981]",
    badge: "bg-[#D1FAE5] text-[#065F46]",
    label: "좋음",
  },
  neutral: {
    card: "bg-white border-[#F3F4F6]",
    bar: "bg-[#D1D5DB]",
    badge: "bg-[#F3F4F6] text-[#6B7280]",
    label: "무난",
  },
  caution: {
    card: "bg-[#FFF7ED] border-[#FED7AA]",
    bar: "bg-[#F97316]",
    badge: "bg-[#FFEDD5] text-[#9A3412]",
    label: "주의",
  },
  bad: {
    card: "bg-[#FFF1F2] border-[#FECDD3]",
    bar: "bg-[#EF4444]",
    badge: "bg-[#FFE4E6] text-[#9F1239]",
    label: "나쁨",
  },
};

export const ZODIAC_COMPATIBILITY_LEGEND_ITEMS: Array<{
  grade: ZodiacCompatibilityGradeKey;
  color: string;
}> = [
  { grade: "best", color: "bg-[#F59E0B]" },
  { grade: "good", color: "bg-[#10B981]" },
  { grade: "neutral", color: "bg-[#D1D5DB]" },
  { grade: "caution", color: "bg-[#F97316]" },
  { grade: "bad", color: "bg-[#EF4444]" },
];

export const ZODIAC_COMPATIBILITY_ME_STYLE = {
  card: "bg-[#F0EEFF] border-[#A5B4FC]",
  bar: "bg-[#5956E9]",
  badge: "bg-[#EDE9FE] text-[#5956E9]",
  label: "나의 띠",
};

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
    key: staticItem.key,
    animal: staticItem.animal,
    img: staticItem.img,
    name: staticItem.name,
    branch: staticItem.branch,
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

  return {
    key: staticItem.key,
    animal: staticItem.animal,
    img: staticItem.img,
    name: staticItem.name,
    branch: staticItem.branch,
    score,
    grade,
    relation,
    description,
  };
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
