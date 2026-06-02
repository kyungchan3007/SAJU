import { SAJU_PILLAR_LABEL_MAP } from "@/shared/model/saju-pillar/model";
import { SAJU_PILLAR_TWELVE_GROWTH_COLUMNS } from "@/shared/model/saju-pillar/model";
import {
  getSajuPillarTypeAt,
  isDayPillar,
  orderSajuPillars,
} from "@/shared/model/saju-pillar/utils";
import { describe, expect, it } from "vitest";

describe("saju pillar utils", () => {
  it("orders pillars by display order", () => {
    const pillars = [
      { type: "year", stem: "甲" },
      { type: "month", stem: "乙" },
      { type: "day", stem: "丙" },
      { type: "hour", stem: "丁" },
    ];

    expect(orderSajuPillars(pillars)).toEqual([
      { type: "hour", stem: "丁" },
      { type: "day", stem: "丙" },
      { type: "month", stem: "乙" },
      { type: "year", stem: "甲" },
    ]);
  });

  it("keeps null slots when a pillar is missing", () => {
    expect(orderSajuPillars([{ type: "day", stem: "丙" }])).toEqual([
      null,
      { type: "day", stem: "丙" },
      null,
      null,
    ]);
  });

  it("provides labels and day pillar checks", () => {
    expect(SAJU_PILLAR_LABEL_MAP.day).toBe("일주");
    expect(getSajuPillarTypeAt(0)).toBe("hour");
    expect(getSajuPillarTypeAt(10)).toBe("year");
    expect(isDayPillar("day")).toBe(true);
    expect(isDayPillar("year")).toBe(false);
  });

  it("provides twelve growth columns with day pillar marked as main", () => {
    expect(SAJU_PILLAR_TWELVE_GROWTH_COLUMNS).toEqual([
      { type: "hour", label: "시주", isMain: false },
      { type: "day", label: "일주 ★", isMain: true },
      { type: "month", label: "월주", isMain: false },
      { type: "year", label: "년주", isMain: false },
    ]);
  });
});
