import type { SajuBackendCalendarType, SajuCalendarInputType } from "./model";

export function normalizeSajuCalendarInputType(
  value?: string | null,
): SajuCalendarInputType {
  if (value === "LUNAR") return "LUNAR";
  if (value === "LUNAR-LEAP") return "LUNAR-LEAP";
  return "SOLAR";
}

export function isSajuCalendarInputType(
  value: string,
): value is SajuCalendarInputType {
  return value === "SOLAR" || value === "LUNAR" || value === "LUNAR-LEAP";
}

export function toBackendSajuCalendarType(
  value: SajuCalendarInputType,
): SajuBackendCalendarType {
  return value === "LUNAR-LEAP" ? "LUNAR" : value;
}
