import { parseTimeParts } from "@/shared/utils/Time";
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
