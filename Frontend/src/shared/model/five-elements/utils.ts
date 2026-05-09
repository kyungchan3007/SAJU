import {
  FIVE_ELEMENT_CONFIG,
  FIVE_ELEMENT_ORDER,
  type FiveElementKey,
} from "@/shared/model/five-elements/model";

const FIVE_ELEMENT_KEY_ALIASES: Record<string, FiveElementKey> = {
  metal: "금",
  wood: "목",
  earth: "토",
  fire: "화",
  water: "수",
};

export function normalizeFiveElementKey(key: string): string {
  return FIVE_ELEMENT_KEY_ALIASES[key] ?? key;
}

export function getOrderedFiveElementKeys(
  elements: Record<string, number>,
): string[] {
  const normalizedKeys = new Set(
    Object.keys(elements).map(normalizeFiveElementKey),
  );

  return [
    ...FIVE_ELEMENT_ORDER.filter((key) => normalizedKeys.has(key)),
    ...Object.keys(elements).filter(
      (key) =>
        !FIVE_ELEMENT_ORDER.includes(
          normalizeFiveElementKey(key) as FiveElementKey,
        ),
    ),
  ];
}

export function getFiveElementValue(
  elements: Record<string, number>,
  key: string,
): number {
  const originalKey = Object.keys(elements).find(
    (elementKey) => normalizeFiveElementKey(elementKey) === key,
  );

  return originalKey ? (elements[originalKey] ?? 0) : (elements[key] ?? 0);
}

export function getFiveElementConfig(key: string) {
  const normalizedKey = normalizeFiveElementKey(key);

  return FIVE_ELEMENT_CONFIG[normalizedKey as FiveElementKey];
}
