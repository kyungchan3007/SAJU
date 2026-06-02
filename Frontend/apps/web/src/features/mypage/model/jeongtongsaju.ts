import type { SajuResponse } from "@/generated/api";
import type { DaewoonItem } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-daewoon";
import type { FiveElements } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-fiveelements";
import type { Pillar } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-pillars";
import type { TwelveGrowthInfo } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-twelve-growth";

export type JeongtongsajuViewModel = {
  traits: Record<string, string>;
  pillars: Pillar[];
  fiveElements: FiveElements;
  twelveGrowthInfo: TwelveGrowthInfo;
  bigLuck: DaewoonItem[];
  sectionDescriptions: Record<string, string>;
};

export function toJeongtongsajuViewModel(
  saju?: SajuResponse,
): JeongtongsajuViewModel {
  return {
    traits: toStringRecord(saju?.traits),
    pillars: toArray<Pillar>(saju?.pillars),
    fiveElements: toFiveElements(saju?.fiveElements),
    twelveGrowthInfo: toObject<TwelveGrowthInfo>(saju?.twelveGrowthInfo),
    bigLuck: toArray<DaewoonItem>(saju?.bigLuck),
    sectionDescriptions: toStringRecord(saju?.sectionDescriptions),
  };
}

function toStringRecord(value: unknown): Record<string, string> {
  if (!isObject(value)) {
    return {};
  }

  return Object.entries(value).reduce<Record<string, string>>(
    (acc, [key, entry]) => {
      if (typeof entry === "string") {
        acc[key] = entry;
      }
      return acc;
    },
    {},
  );
}

function toArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function toFiveElements(value: unknown): FiveElements {
  if (!isObject(value)) {
    return { elements: {} };
  }

  return value as FiveElements;
}

function toObject<T>(value: unknown): T {
  return (isObject(value) ? value : {}) as T;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
