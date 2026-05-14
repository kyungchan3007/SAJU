import type {
  TraditionalFortuneResponse,
  TraditionalFortuneWealthFortune,
  TraditionalFortuneLoveFortune,
  TraditionalFortuneCareerFortune,
  TraditionalFortuneHealthFortune,
} from "@/generated/api";

export type DomainKey = "wealth" | "love" | "career" | "health";

export type DomainSection = { title: string; text: string };

export type DomainDisplay = {
  key: DomainKey;
  icon: string;
  label: string;
  score: number;
  color: string;
  bg: string;
  sections: DomainSection[];
  keyPoint: string;
  keywords: string[];
};

export const DOMAIN_META: Record<
  DomainKey,
  { icon: string; label: string; color: string; bg: string; headerLabel: string }
> = {
  wealth:  { icon: "💰", label: "재물운", color: "#F59E0B", bg: "#FEF9C3", headerLabel: "올해 재물운은" },
  love:    { icon: "💕", label: "애정운", color: "#EC4899", bg: "#FCE7F3", headerLabel: "올해 애정운은" },
  career:  { icon: "💼", label: "직업운", color: "#3B82F6", bg: "#DBEAFE", headerLabel: "올해 직업운은" },
  health:  { icon: "🌿", label: "건강운", color: "#22C55E", bg: "#DCFCE7", headerLabel: "올해 건강운은" },
};

function wealthSections(d: TraditionalFortuneWealthFortune): DomainSection[] {
  return [
    d.flow      ? { title: "올해 재물의 큰 흐름",      text: d.flow }      : null,
    d.firstHalf ? { title: "상반기(1~6월) 재물 흐름",   text: d.firstHalf } : null,
    d.secondHalf? { title: "하반기(7~12월) 재물 반전",  text: d.secondHalf }: null,
    d.advice    ? { title: "재물을 지키는 실천 조언",   text: d.advice }    : null,
  ].filter((s): s is DomainSection => s !== null);
}

function loveSections(d: TraditionalFortuneLoveFortune): DomainSection[] {
  return [
    d.flow           ? { title: "올해 애정의 큰 흐름",  text: d.flow }           : null,
    d.inRelationship ? { title: "연애 중인 분께",        text: d.inRelationship } : null,
    d.single         ? { title: "솔로인 분께",           text: d.single }         : null,
    d.caution        ? { title: "감정 관리와 주의사항",  text: d.caution }        : null,
  ].filter((s): s is DomainSection => s !== null);
}

function careerSections(d: TraditionalFortuneCareerFortune): DomainSection[] {
  return [
    d.flow       ? { title: "올해 직업의 큰 흐름",            text: d.flow }       : null,
    d.firstHalf  ? { title: "상반기(1~6월) — 기반 다지기",    text: d.firstHalf }  : null,
    d.secondHalf ? { title: "하반기(7~12월) — 성과와 도약",   text: d.secondHalf } : null,
    d.advice     ? { title: "자기계발과 실천 조언",           text: d.advice }     : null,
  ].filter((s): s is DomainSection => s !== null);
}

function healthSections(d: TraditionalFortuneHealthFortune): DomainSection[] {
  return [
    d.flow             ? { title: "올해 건강의 큰 흐름",     text: d.flow }             : null,
    d.seasonal         ? { title: "계절별 건강 주의사항",    text: d.seasonal }         : null,
    d.stressManagement ? { title: "정신 건강과 스트레스 관리", text: d.stressManagement } : null,
    d.stressHabits     ? { title: "건강을 지키는 실천 습관", text: d.stressHabits }     : null,
  ].filter((s): s is DomainSection => s !== null);
}

export function toDomainDisplayList(
  data: TraditionalFortuneResponse,
): DomainDisplay[] {
  const domains: DomainDisplay[] = [];

  if (data.wealth) {
    const meta = DOMAIN_META.wealth;
    domains.push({
      key: "wealth",
      ...meta,
      score: data.wealth.score ?? 0,
      sections: wealthSections(data.wealth),
      keyPoint: data.wealth.advice ?? "",
      keywords: [],
    });
  }
  if (data.love) {
    const meta = DOMAIN_META.love;
    domains.push({
      key: "love",
      ...meta,
      score: data.love.score ?? 0,
      sections: loveSections(data.love),
      keyPoint: data.love.keyPoint ?? "",
      keywords: [],
    });
  }
  if (data.career) {
    const meta = DOMAIN_META.career;
    domains.push({
      key: "career",
      ...meta,
      score: data.career.score ?? 0,
      sections: careerSections(data.career),
      keyPoint: data.career.keyPoint ?? "",
      keywords: [],
    });
  }
  if (data.health) {
    const meta = DOMAIN_META.health;
    domains.push({
      key: "health",
      ...meta,
      score: data.health.score ?? 0,
      sections: healthSections(data.health),
      keyPoint: data.health.keyPoint ?? "",
      keywords: [],
    });
  }

  return domains;
}
