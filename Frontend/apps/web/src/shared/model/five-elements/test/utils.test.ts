import {
  formatYongshinDisplayLabel,
  getFiveElementConfig,
  getFiveElementValue,
  getOrderedFiveElementKeys,
  getYongshinDisplayInfo,
  normalizeFiveElementKey,
} from "@/shared/model/five-elements/utils";
import { describe, expect, it } from "vitest";

describe("five elements utils", () => {
  it("orders Korean element keys by display order", () => {
    expect(getOrderedFiveElementKeys({ 수: 10, 목: 20, 금: 30 })).toEqual([
      "금",
      "목",
      "수",
    ]);
  });

  it("normalizes English element keys", () => {
    expect(normalizeFiveElementKey("wood")).toBe("목");
    expect(getOrderedFiveElementKeys({ water: 10, fire: 20 })).toEqual([
      "화",
      "수",
    ]);
    expect(getFiveElementValue({ water: 10 }, "수")).toBe(10);
  });

  it("returns display config for normalized keys", () => {
    expect(getFiveElementConfig("fire")).toMatchObject({
      label: "화(火)",
      emoji: "🔥",
      description: "표현, 열정, 드러남과 추진의 기운",
    });
  });

  it("formats yongshin labels and resolves display info", () => {
    expect(formatYongshinDisplayLabel("metal")).toBe("금(金)");
    expect(formatYongshinDisplayLabel("water", { spaced: true })).toBe("수 (水)");
    expect(getYongshinDisplayInfo("wood")).toMatchObject({
      ko: "목",
      hanja: "木",
    });
  });
});
