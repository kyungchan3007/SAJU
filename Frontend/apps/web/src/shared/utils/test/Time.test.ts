import {
  buildTimeString,
  parseTimeParts,
  updateTimeStringPart,
} from "@/shared/utils/Time";
import { describe, expect, it } from "vitest";

describe("parseTimeParts", () => {
  it("normalizes HH:mm values for select inputs", () => {
    expect(parseTimeParts("09:05")).toEqual({ hour: "9", minute: "5" });
    expect(parseTimeParts("00:00")).toEqual({ hour: "0", minute: "0" });
  });

  it("returns empty values for missing input", () => {
    expect(parseTimeParts(null)).toEqual({ hour: "", minute: "" });
    expect(parseTimeParts("")).toEqual({ hour: "", minute: "" });
  });
});

describe("buildTimeString", () => {
  it("builds padded HH:MM strings for hour and minute selects", () => {
    expect(buildTimeString("9", "5")).toBe("09:05");
    expect(buildTimeString("0", "0")).toBe("00:00");
  });

  it("keeps partial selections representable for validation", () => {
    expect(buildTimeString("9", "")).toBe("09:");
    expect(buildTimeString("", "30")).toBe(":30");
    expect(buildTimeString("", "")).toBe("");
  });
});

describe("updateTimeStringPart", () => {
  it("updates a single time part while preserving the other", () => {
    expect(updateTimeStringPart("09:05", "hour", "10")).toBe("10:05");
    expect(updateTimeStringPart("09:05", "minute", "30")).toBe("09:30");
  });

  it("supports partial selections from empty state", () => {
    expect(updateTimeStringPart("", "hour", "9")).toBe("09:");
    expect(updateTimeStringPart("", "minute", "15")).toBe(":15");
  });
});
