import type { RankedFood } from "@/generated/api";
import {
  DAILY_FIVE_ELEMENT_CONFIG,
  DAILY_FIVE_ELEMENT_ORDER,
  FIVE_ELEMENT_CONFIG,
  type FiveElementKey,
} from "@/shared/model/five-elements/model";
import { getFiveElementValue } from "@/shared/model/five-elements/utils";

/** 음식 카테고리 이모지 */
export const CATEGORY_EMOJI: Record<string, string> = {
  한식: "🍲",
  일식: "🍣",
  양식: "🍝",
  중식: "🥢",
};

/** 오행 한자 */
export const ELEMENT_HANJA: Record<string, string> = {
  목: "木",
  화: "火",
  토: "土",
  금: "金",
  수: "水",
};

/** 오행 오늘 설명 */
export const ELEMENT_DESC: Record<string, string> = {
  목: "오늘은 신선하고 가벼운 음식이 목(木) 기운의 생명력을 더해줘요",
  화: "오늘은 따뜻하고 매콤한 음식이 화(火) 기운의 열정을 살려줘요",
  토: "오늘은 든든하고 부드러운 음식이 토(土) 기운의 안정을 줘요",
  금: "오늘은 담백하고 고소한 음식이 금(金) 기운의 집중력을 높여줘요",
  수: "오늘은 따뜻하고 든든한 음식이 수(水) 냉기를 잡아줘요",
};

/**
 * dailyFiveElements에서 가장 높은 오행을 반환.
 * shared utils의 getOrderedFiveElementKeys 순서대로 탐색.
 */
export function getDominantElement(
  dailyFiveElements: Record<string, number>,
): string | null {
  const entries = Object.entries(dailyFiveElements);
  if (entries.length === 0) return null;
  return entries.reduce((a, b) => (b[1] > a[1] ? b : a))[0];
}

/** RankedFood → 화면용 데이터 */
export function toDisplayFood(food: RankedFood) {
  const element = food.fiveElement ?? "";
  const cfg = FIVE_ELEMENT_CONFIG[element as FiveElementKey];
  const dailyCfg = DAILY_FIVE_ELEMENT_CONFIG[element as FiveElementKey];

  return {
    rank: food.rank ?? 0,
    name: food.name ?? "",
    reason: food.reason ?? "",
    category: food.category ?? "",
    fiveElement: element,
    fiveElementHanja: ELEMENT_HANJA[element] ?? element,
    categoryEmoji: CATEGORY_EMOJI[food.category ?? ""] ?? "🍽️",
    elementColor: dailyCfg?.color ?? cfg?.color ?? "#5956E9",
    elementBg: cfg?.bg ?? "#F0EEFF",
    elementLabel: cfg?.label ?? element,
  };
}

export type DisplayFood = ReturnType<typeof toDisplayFood>;

export type FoodContextEntry = {
  key: string;
  value: number;
  hanja: string;
  isDominant: boolean;
  barWidth: number;
};

export type FoodContextViewModel = {
  dateLabel: string;
  dominantElement: string | null;
  dominantHanja: string | null;
  description: string | null;
  entries: FoodContextEntry[];
};

function formatFoodContextDate(now: Date): string {
  return `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`;
}

/**
 * 오늘의 메뉴 컨텍스트 헤더에서 사용할 오행 표시 모델을 만든다.
 * React 상태가 필요 없는 순수 계산이라 컴포넌트 밖 model에 둔다.
 */
export function getFoodContextViewModel(
  dailyFiveElements: Record<string, number>,
  now = new Date(),
): FoodContextViewModel {
  const dominantElement = getDominantElement(dailyFiveElements);
  const baseEntries = DAILY_FIVE_ELEMENT_ORDER.map((key) => ({
    key,
    value: getFiveElementValue(dailyFiveElements, key),
  })).filter((entry) => entry.value > 0);
  const max =
    baseEntries.length > 0
      ? Math.max(...baseEntries.map((entry) => entry.value))
      : 1;

  return {
    dateLabel: formatFoodContextDate(now),
    dominantElement,
    dominantHanja: dominantElement
      ? (ELEMENT_HANJA[dominantElement] ?? dominantElement)
      : null,
    description: dominantElement ? (ELEMENT_DESC[dominantElement] ?? null) : null,
    entries: baseEntries.map((entry) => ({
      ...entry,
      hanja: ELEMENT_HANJA[entry.key] ?? entry.key,
      isDominant: entry.key === dominantElement,
      barWidth: max > 0 ? (entry.value / max) * 100 : 0,
    })),
  };
}
