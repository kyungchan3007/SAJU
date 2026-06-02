export const SAJU_PILLAR_DISPLAY_ORDER = [
  "hour",
  "day",
  "month",
  "year",
] as const;

export type SajuPillarType = (typeof SAJU_PILLAR_DISPLAY_ORDER)[number];

export const SAJU_PILLAR_LABEL_MAP: Record<SajuPillarType, string> = {
  hour: "시주",
  day: "일주",
  month: "월주",
  year: "년주",
};

export const SAJU_PILLAR_TWELVE_GROWTH_COLUMNS = SAJU_PILLAR_DISPLAY_ORDER.map(
  (type) => ({
    type,
    label:
      type === "day"
        ? `${SAJU_PILLAR_LABEL_MAP[type]} ★`
        : SAJU_PILLAR_LABEL_MAP[type],
    isMain: type === "day",
  }),
);

export type SajuPillar = {
  type: string;
};
