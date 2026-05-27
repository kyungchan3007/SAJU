const WEAK_ELEMENT_LABEL_MAP: Record<string, string> = {
  wood: "목(木)",
  fire: "화(火)",
  earth: "토(土)",
  metal: "금(金)",
  water: "수(水)",
};

const WEAK_ELEMENT_DISPLAY_MAP: Record<
  string,
  { ko: string; hanja: string; color: string }
> = {
  water: { ko: "수", hanja: "水", color: "#3B82F6" },
  fire: { ko: "화", hanja: "火", color: "#EF4444" },
  wood: { ko: "목", hanja: "木", color: "#10B981" },
  metal: { ko: "금", hanja: "金", color: "#6B7280" },
  earth: { ko: "토", hanja: "土", color: "#F59E0B" },
};

export function formatWeakElementLabel(
  weakElement: string | null | undefined,
): string {
  if (!weakElement) {
    return "-";
  }

  return WEAK_ELEMENT_LABEL_MAP[weakElement] ?? weakElement;
}

export function getWeakElementDisplayInfo(
  weakElement: string | null | undefined,
) {
  if (!weakElement) return null;

  return WEAK_ELEMENT_DISPLAY_MAP[weakElement] ?? null;
}
