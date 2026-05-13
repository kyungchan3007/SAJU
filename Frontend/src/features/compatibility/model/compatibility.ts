import type { CompatibilityResponse, CompatibilitySection } from "@/generated/api";

export type CompatibilityStatus = "COMPLETE" | "PENDING" | "UNKNOWN";

export type CompatibilitySectionDisplay = {
  icon: string;
  label: string;
  score: number;
  color: string;
  keyword: string;
  content: string;
};

export type CompatibilityResultDisplay = {
  status: CompatibilityStatus;
  overallScore: number;
  keyword: string;
  description: string;
  sections: CompatibilitySectionDisplay[];
  tags: string[];
};

const SECTION_META: Record<string, { icon: string; color: string; label: string }> = {
  love:        { icon: "❤️",  color: "#EC4899", label: "사랑궁합" },
  personality: { icon: "🤝",  color: "#8B5CF6", label: "성격궁합" },
  wealth:      { icon: "💰",  color: "#F59E0B", label: "재물궁합" },
  health:      { icon: "🌿",  color: "#22C55E", label: "건강궁합" },
};

const SECTION_FALLBACK_META = [
  { icon: "❤️", color: "#EC4899", label: "사랑궁합" },
  { icon: "🤝", color: "#8B5CF6", label: "성격궁합" },
  { icon: "💰", color: "#F59E0B", label: "재물궁합" },
  { icon: "🌿", color: "#22C55E", label: "건강궁합" },
];

function parseSectionDisplay(
  section: CompatibilitySection,
  index: number,
): CompatibilitySectionDisplay {
  const meta =
    (section.key ? SECTION_META[section.key] : null) ??
    SECTION_FALLBACK_META[index] ??
    SECTION_FALLBACK_META[0];

  return {
    icon: meta.icon,
    label: section.title ?? meta.label,
    score: section.score ?? 50,
    color: meta.color,
    keyword: section.keyword ?? "",
    content: section.content ?? "",
  };
}

export function toCompatibilityResultDisplay(
  data: CompatibilityResponse,
): CompatibilityResultDisplay {
  const status = normalizeStatus(data.status);
  const sections = (data.sections ?? []).map(parseSectionDisplay);
  const tags = sections
    .map((s) => s.keyword)
    .filter(Boolean);

  return {
    status,
    overallScore: data.summary?.overallScore ?? 0,
    keyword: data.summary?.keyword ?? "",
    description: data.summary?.description ?? "",
    sections,
    tags,
  };
}

function normalizeStatus(raw?: string): CompatibilityStatus {
  if (raw === "COMPLETE") return "COMPLETE";
  if (raw === "PENDING") return "PENDING";
  return "UNKNOWN";
}

export function formatBirthDate(birthDate?: string): string {
  if (!birthDate) return "";
  const [y, m, d] = birthDate.split("-");
  if (!y) return birthDate;
  return `${y}년 ${Number(m)}월 ${Number(d)}일`;
}

export function formatGender(gender?: string): string {
  if (gender === "FEMALE") return "여성";
  if (gender === "MALE") return "남성";
  return "";
}
