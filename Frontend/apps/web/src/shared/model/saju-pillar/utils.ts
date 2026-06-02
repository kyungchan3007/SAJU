import {
  SAJU_PILLAR_DISPLAY_ORDER,
  type SajuPillar,
  type SajuPillarType,
} from "@/shared/model/saju-pillar/model";

export function orderSajuPillars<T extends SajuPillar>(
  pillars: T[],
): Array<T | null> {
  return SAJU_PILLAR_DISPLAY_ORDER.map(
    (type) => pillars.find((pillar) => pillar.type === type) ?? null,
  );
}

export function getSajuPillarTypeAt(index: number): SajuPillarType {
  return SAJU_PILLAR_DISPLAY_ORDER[index] ?? "year";
}

export function isDayPillar(type: string): boolean {
  return type === "day";
}
