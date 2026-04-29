export interface RankedValueItem {
  name: string;
  pct: number;
}

export function rankObjectValues(
  source: object | null | undefined,
  fallback: RankedValueItem[] = [],
): RankedValueItem[] {
  if (!source) {
    return [...fallback];
  }

  return Object.entries(source)
    .filter((entry): entry is [string, number] => typeof entry[1] === "number")
    .sort(([, leftValue], [, rightValue]) => rightValue - leftValue)
    .map(([name, pct]) => ({ name, pct }));
}
