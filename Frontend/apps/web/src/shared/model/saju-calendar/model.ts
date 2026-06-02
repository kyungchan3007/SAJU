export type SajuCalendarInputType = "SOLAR" | "LUNAR" | "LUNAR-LEAP";

export type SajuBackendCalendarType = "SOLAR" | "LUNAR";

export const SAJU_CALENDAR_TYPE_OPTIONS = [
  { value: "SOLAR", label: "양력" },
  { value: "LUNAR", label: "음력" },
  { value: "LUNAR-LEAP", label: "음력 (윤달)" },
] as const;
