import type { DailyEnergyResponse } from "@/generated/api";

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null;
}

function pickRecord(value: unknown, key: string): UnknownRecord | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const nextValue = value[key];
  return isRecord(nextValue) ? nextValue : undefined;
}

function pickString(
  source: UnknownRecord,
  camelKey: string,
  snakeKey: string,
): string | undefined {
  const value = source[camelKey] ?? source[snakeKey];
  return typeof value === "string" ? value : undefined;
}

function pickNumber(
  source: UnknownRecord,
  camelKey: string,
  snakeKey: string,
): number | undefined {
  const value = source[camelKey] ?? source[snakeKey];
  return typeof value === "number" ? value : undefined;
}

function pickStringArray(
  source: UnknownRecord,
  camelKey: string,
  snakeKey: string,
): string[] | undefined {
  const value = source[camelKey] ?? source[snakeKey];
  return Array.isArray(value) && value.every((item) => typeof item === "string")
    ? value
    : undefined;
}

function pickNumberRecord(
  source: UnknownRecord,
  camelKey: string,
  snakeKey: string,
): Record<string, number> | undefined {
  const value = source[camelKey] ?? source[snakeKey];

  if (!isRecord(value)) {
    return undefined;
  }

  const entries = Object.entries(value).filter(
    (entry): entry is [string, number] => {
      const [, entryValue] = entry;
      return typeof entryValue === "number";
    },
  );

  if (entries.length === 0) {
    return undefined;
  }

  return Object.fromEntries(entries);
}

function compactDailyEnergyResponse(
  value: DailyEnergyResponse,
): DailyEnergyResponse {
  return Object.fromEntries(
    Object.entries(value).filter(([, entryValue]) => entryValue !== undefined),
  ) as DailyEnergyResponse;
}

export function normalizeDailyEnergyResponse(
  value: unknown,
): DailyEnergyResponse | undefined {
  const source = pickRecord(value, "daily") ?? value;

  if (!isRecord(source)) {
    return undefined;
  }

  return compactDailyEnergyResponse({
    targetDate: pickString(source, "targetDate", "target_date"),
    todayScore: pickNumber(source, "todayScore", "today_score"),
    goodTime: pickString(source, "goodTime", "good_time"),
    mood: pickString(source, "mood", "mood"),
    dailyMessage: pickString(source, "dailyMessage", "daily_message"),
    goodActions: pickStringArray(source, "goodActions", "good_actions"),
    avoidActions: pickStringArray(source, "avoidActions", "avoid_actions"),
    avoidFlows: pickStringArray(source, "avoidFlows", "avoid_flows"),
    weakElement: pickString(source, "weakElement", "weak_element"),
    fiveElements: pickNumberRecord(source, "fiveElements", "five_elements"),
  });
}
