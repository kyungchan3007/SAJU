import { SAJU_SECTION_HELP } from "@/shared/model/saju-section-help/model";
import { getSajuSectionHelp } from "@/shared/model/saju-section-help/utils";
import { describe, expect, it } from "vitest";

describe("saju section help utils", () => {
  it("provides help copy for each jeongtongsaju section", () => {
    expect(Object.keys(SAJU_SECTION_HELP)).toEqual([
      "jeongtongsajuSummary",
      "pillars",
      "fiveElements",
      "twelveGrowth",
      "bigLuck",
    ]);
  });

  it("returns title and description by key", () => {
    expect(getSajuSectionHelp("bigLuck")).toMatchObject({
      title: "대운 흐름",
    });
    expect(getSajuSectionHelp("bigLuck").description).toContain("10년 단위");
  });
});
