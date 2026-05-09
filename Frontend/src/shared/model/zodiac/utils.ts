import { ZODIAC_LIST, type Zodiac } from "@/shared/model/zodiac/model";

export function findZodiacByLabel(label?: string | null): Zodiac | null {
  const normalized = label?.replace(/띠$/, "").trim();

  if (!normalized) {
    return null;
  }

  return ZODIAC_LIST.find((zodiac) => zodiac.name === normalized) ?? null;
}
