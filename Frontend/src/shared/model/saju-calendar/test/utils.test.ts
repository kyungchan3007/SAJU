import {
  isSajuCalendarInputType,
  normalizeSajuCalendarInputType,
  toBackendSajuCalendarType,
} from "@/shared/model/saju-calendar/utils";
import { describe, expect, it } from "vitest";

describe("normalizeSajuCalendarInputType", () => {
  it("keeps supported values and defaults to SOLAR", () => {
    expect(normalizeSajuCalendarInputType("LUNAR")).toBe("LUNAR");
    expect(normalizeSajuCalendarInputType("LUNAR-LEAP")).toBe("LUNAR-LEAP");
    expect(normalizeSajuCalendarInputType("UNKNOWN")).toBe("SOLAR");
    expect(normalizeSajuCalendarInputType(null)).toBe("SOLAR");
  });
});

describe("isSajuCalendarInputType", () => {
  it("accepts UI calendar values", () => {
    expect(isSajuCalendarInputType("SOLAR")).toBe(true);
    expect(isSajuCalendarInputType("LUNAR")).toBe(true);
    expect(isSajuCalendarInputType("LUNAR-LEAP")).toBe(true);
    expect(isSajuCalendarInputType("solar")).toBe(false);
  });
});

describe("toBackendSajuCalendarType", () => {
  it("maps leap lunar input to backend lunar value", () => {
    expect(toBackendSajuCalendarType("SOLAR")).toBe("SOLAR");
    expect(toBackendSajuCalendarType("LUNAR")).toBe("LUNAR");
    expect(toBackendSajuCalendarType("LUNAR-LEAP")).toBe("LUNAR");
  });
});
