import type {
  HomeFiveElementBalanceRow,
  HomeFiveElementOrderItem,
} from "@/features/home/type/type";

export const HOME_FIVE_ELEMENT_COLORS: Record<string, string> = {
  목: "#4CAF50",
  화: "#FF5722",
  토: "#FFC107",
  금: "#9E9E9E",
  수: "#2196F3",
};

export const HOME_FIVE_ELEMENT_ORDER: HomeFiveElementOrderItem[] = [
  { key: "wood", label: "목" },
  { key: "fire", label: "화" },
  { key: "earth", label: "토" },
  { key: "metal", label: "금" },
  { key: "water", label: "수" },
];

export function getHomeFiveElementBalanceRows(
  fiveElements: Record<string, number>,
): HomeFiveElementBalanceRow[] {
  return HOME_FIVE_ELEMENT_ORDER.map(({ key, label }) => {
    const raw = fiveElements[label] ?? fiveElements[key] ?? 0;
    const percentage = clampPercentage(raw);

    return {
      key,
      label,
      percentage,
      percentageLabel: formatHomePercentage(percentage),
      color: HOME_FIVE_ELEMENT_COLORS[label] ?? "#5956E9",
    };
  });
}

function clampPercentage(value: number) {
  return Math.max(0, Math.min(value, 100));
}

function formatHomePercentage(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}
