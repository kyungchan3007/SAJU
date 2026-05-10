import {
  isValidBirthMonthDay,
  parseBackendBirthDateParts,
  parseBirthMonthDay,
  toBackendBirthDate,
} from "@/shared/utils/BirthDate";
import { describe, expect, it } from "vitest";

describe("parseBirthMonthDay", () => {
  it("parses slash and compact inputs", () => {
    expect(parseBirthMonthDay("03/14")).toEqual({ month: 3, day: 14 });
    expect(parseBirthMonthDay("3.14")).toEqual({ month: 3, day: 14 });
    expect(parseBirthMonthDay("0314")).toEqual({ month: 3, day: 14 });
  });

  it("returns null for invalid month/day ranges", () => {
    expect(parseBirthMonthDay("13/10")).toBeNull();
    expect(parseBirthMonthDay("11/32")).toBeNull();
    expect(parseBirthMonthDay("00/10")).toBeNull();
  });
});

describe("isValidBirthMonthDay", () => {
  it("returns true only for accepted format and ranges", () => {
    expect(isValidBirthMonthDay("2-4")).toBe(true);
    expect(isValidBirthMonthDay("2/40")).toBe(false);
    expect(isValidBirthMonthDay("abcd")).toBe(false);
  });
});

describe("toBackendBirthDate", () => {
  it("normalizes year/month/day to backend format", () => {
    expect(toBackendBirthDate(" 1992 ", "3/4")).toBe("1992-03-04");
  });

  it("returns null when year or month/day is invalid", () => {
    expect(toBackendBirthDate("92", "3/4")).toBeNull();
    expect(toBackendBirthDate("1992", "13/4")).toBeNull();
  });
});

describe("parseBackendBirthDateParts", () => {
  it("splits backend date into select values", () => {
    expect(parseBackendBirthDateParts("1992-03-04")).toEqual({
      year: "1992",
      month: "3",
      day: "4",
    });
  });

  it("returns empty values for missing input", () => {
    expect(parseBackendBirthDateParts(null)).toEqual({
      year: "",
      month: "",
      day: "",
    });
  });
});
