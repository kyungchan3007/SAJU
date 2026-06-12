import type {
  CompatibilityResponse,
  CompatibilitySection,
  PartnerResponse,
  SajuProfileResponse,
} from "@/generated/api";
import { type FunLabel, getFunLabel } from "./funLabel";

export type CompatibilityStatus = "COMPLETE" | "PENDING" | "UNKNOWN";

export type CompatibilitySectionDisplay = {
  icon: string;
  label: string;
  score: number;
  scoreLabel: string;
  funLabel: FunLabel;
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

const SECTION_META: Record<
  string,
  { icon: string; color: string; label: string }
> = {
  love: { icon: "💘", color: "#EC4899", label: "연인궁합" },
  personality: { icon: "🧠", color: "#8B5CF6", label: "성격궁합" },
  communication: { icon: "🗣️", color: "#06B6D4", label: "소통궁합" },
  trust: { icon: "🤝", color: "#3B82F6", label: "신뢰궁합" },
  marriage: { icon: "💍", color: "#14B8A6", label: "결혼궁합" },
  wealth: { icon: "💰", color: "#F59E0B", label: "재물궁합" },
  conflict: { icon: "⚡", color: "#EF4444", label: "갈등요인" },
};

const SECTION_FALLBACK_META = [
  { icon: "💘", color: "#EC4899", label: "연인궁합" },
  { icon: "🧠", color: "#8B5CF6", label: "성격궁합" },
  { icon: "🗣️", color: "#06B6D4", label: "소통궁합" },
  { icon: "🤝", color: "#3B82F6", label: "신뢰궁합" },
  { icon: "💍", color: "#14B8A6", label: "결혼궁합" },
  { icon: "💰", color: "#F59E0B", label: "재물궁합" },
  { icon: "⚡", color: "#EF4444", label: "갈등요인" },
];

function parseSectionDisplay(
  section: CompatibilitySection,
  index: number,
): CompatibilitySectionDisplay {
  const meta =
    (section.key ? SECTION_META[section.key] : null) ??
    SECTION_FALLBACK_META[index] ??
    SECTION_FALLBACK_META[0];

  const score = section.score ?? 3;

  return {
    icon: meta.icon,
    label: section.title ?? meta.label,
    score,
    scoreLabel: section.scoreLabel ?? "",
    funLabel: getFunLabel(score),
    color: meta.color,
    keyword: section.keyword ?? "",
    content: section.content ?? "",
  };
}

export function toCompatibilityResultDisplay(
  data: CompatibilityResponse,
  backendStatus?: unknown,
): CompatibilityResultDisplay {
  const status = normalizeStatus(backendStatus, data.status);
  const sections = (data.sections ?? []).map(parseSectionDisplay);
  const tags = sections.map((s) => s.keyword).filter(Boolean);

  return {
    status,
    overallScore: data.summary?.overallScore ?? 0,
    keyword: data.summary?.keyword ?? "",
    description: data.summary?.description ?? "",
    sections,
    tags,
  };
}

export function resolveCompatibilityStatus(
  backendStatus?: unknown,
  dataStatus?: string,
): CompatibilityStatus {
  return normalizeStatus(backendStatus, dataStatus);
}

function normalizeStatus(...rawStatuses: Array<unknown>): CompatibilityStatus {
  for (const raw of rawStatuses) {
    if (raw === "COMPLETE") return "COMPLETE";
    if (raw === "PENDING") return "PENDING";
  }

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

export const COMPATIBILITY_ANALYSIS_LABELS = [
  "성격 궁합",
  "연애 궁합",
  "결혼 궁합",
  "재물 궁합",
  "대화 궁합",
  "미래 흐름",
] as const;

export function formatProfileSummary(
  profile?: Pick<SajuProfileResponse, "birthDate" | "gender"> | null,
): string {
  const birthYear = profile?.birthDate?.split("-")[0];
  const gender = profile?.gender ? formatGender(profile.gender) : null;

  return [birthYear ? `${birthYear}년생` : null, gender]
    .filter(Boolean)
    .join(" · ");
}

export function formatPartnerSummary(
  partner?: Pick<PartnerResponse, "birthDate" | "gender"> | null,
): string {
  const birthYear = partner?.birthDate?.split("-")[0];
  const gender = partner?.gender ? formatGender(partner.gender) : null;

  return [birthYear ? `${birthYear}년생` : null, gender]
    .filter(Boolean)
    .join(" · ");
}

export function getPartnerSelectCtaLabel(
  partner?: PartnerResponse | null,
): string {
  if (!partner) return "상대를 선택해주세요";
  return `${partner.name}${koreanParticle(partner.name ?? "", "과", "와")} 궁합 보기`;
}

// ── 이미지 매핑 ──────────────────────────────────────

const PARTNER_FEMALE_IMAGES = [
  "/image/compatibility/avatar-FEMALE-1.png",
  "/image/compatibility/avatar-FEMALE-2.png",
  "/image/compatibility/avatar-FEMALE-3.png",
  "/image/compatibility/avatar-FEMALE-4.png",
] as const;

const PARTNER_MALE_IMAGES = [
  "/image/compatibility/avatar-MALE-1.png",
  "/image/compatibility/avatar-MALE-2.png",
  "/image/compatibility/avatar-MALE-3.png",
  "/image/compatibility/avatar-MALE-4.png",
] as const;

/** 내 프로필 아바타 이미지 (gender → me/ 폴더) */
export function getMyAvatarSrc(gender?: string | null): string {
  if (gender === "MALE") return "/image/compatibility/me/avatar-MALE.png";
  return "/image/compatibility/me/avatar-FEMALE.png";
}

/** 상대방 아바타 이미지 (gender + stable index → compatibility/ 폴더) */
export function getPartnerAvatarSrc(
  gender?: string | null,
  index: number = 0,
): string {
  const imgs = gender === "MALE" ? PARTNER_MALE_IMAGES : PARTNER_FEMALE_IMAGES;
  return imgs[index % imgs.length] ?? imgs[0];
}

/** MyProfileCard용 매칭 이미지 (gender → matching/ 폴더) */
export function getMatchingImageSrc(gender?: string | null): string {
  return gender === "MALE"
    ? "/image/compatibility/matching/avatar-MALE_TIN.png"
    : "/image/compatibility/matching/avatar-FEMALE_TIN.png";
}

/** SelectedPartnerCard용 TIN 이미지 (gender → matching/ 폴더) */
export function getPartnerTinImageSrc(gender?: string | null): string {
  return gender === "MALE"
    ? "/image/compatibility/matching/matching_MALE.png"
    : "/image/compatibility/matching/matching_FEMALE.png";
}

/** 이름 첫 글자 추출 */
export function getInitial(name?: string | null): string {
  if (!name) return "?";
  return name.charAt(0);
}

/** 한국어 조사 선택 (받침 유무 기준) */
export function koreanParticle(
  word: string,
  withBatchim: string,
  withoutBatchim: string,
): string {
  if (!word) return withoutBatchim;
  const code = word.charCodeAt(word.length - 1);
  if (code < 0xac00 || code > 0xd7a3) return withoutBatchim;
  return (code - 0xac00) % 28 !== 0 ? withBatchim : withoutBatchim;
}

/** 오늘 날짜 한국어 포맷 (클라이언트 전용) */
export function formatTodayKo(): string {
  const days = ["일", "월", "화", "수", "목", "금", "토"] as const;
  const d = new Date();
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 (${days[d.getDay()]})`;
}
