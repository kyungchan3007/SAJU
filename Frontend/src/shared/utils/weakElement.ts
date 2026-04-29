import type { WeakElement } from "@/domain/saju/guid-card/preview-card/model/type";

const WEAK_ELEMENT_LABEL_MAP: Record<WeakElement, string> = {
  wood: "목(木)",
  fire: "화(火)",
  earth: "토(土)",
  metal: "금(金)",
  water: "수(水)",
};

export function formatWeakElementLabel(
  weakElement: WeakElement | null | undefined,
): string {
  if (!weakElement) {
    return "-";
  }

  return WEAK_ELEMENT_LABEL_MAP[weakElement];
}
