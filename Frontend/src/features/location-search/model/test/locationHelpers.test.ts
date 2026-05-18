import { formatDistance, getKeywordEmoji } from "@/features/location-search/model/locationHelpers";
import { describe, expect, it } from "vitest";

describe("formatDistance", () => {
  it("returns empty string when distance is undefined", () => {
    expect(formatDistance(undefined)).toBe("");
  });

  it("formats meters when below 1000", () => {
    expect(formatDistance(0)).toBe("0m");
    expect(formatDistance(325)).toBe("325m");
    expect(formatDistance(999)).toBe("999m");
  });

  it("formats kilometers with one decimal place at 1000m or above", () => {
    expect(formatDistance(1000)).toBe("1.0km");
    expect(formatDistance(1540)).toBe("1.5km");
  });
});

describe("getKeywordEmoji", () => {
  it("returns fallback emoji when keyword is unknown", () => {
    expect(getKeywordEmoji("unknown keyword")).not.toBe("");
  });
});
