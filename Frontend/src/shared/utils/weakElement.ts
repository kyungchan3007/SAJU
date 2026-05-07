const WEAK_ELEMENT_LABEL_MAP: Record<string, string> = {
  wood: "목(木)",
  fire: "화(火)",
  earth: "토(土)",
  metal: "금(金)",
  water: "수(水)",
};

export function formatWeakElementLabel(
  weakElement: string | null | undefined,
): string {
  if (!weakElement) {
    return "-";
  }

  return WEAK_ELEMENT_LABEL_MAP[weakElement] ?? weakElement;
}
