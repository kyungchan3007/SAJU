import { ZODIAC_LIST } from "@/shared/model/zodiac/model";
import { findZodiacByLabel } from "@/shared/model/zodiac/utils";
import { describe, expect, it } from "vitest";

describe("zodiac utils", () => {
  it("contains twelve zodiac items", () => {
    expect(ZODIAC_LIST).toHaveLength(12);
  });

  it("finds zodiac by plain name or name with suffix", () => {
    expect(findZodiacByLabel("닭")).toMatchObject({
      emoji: "🐔",
      name: "닭",
      hanja: "酉",
    });
    expect(findZodiacByLabel("뱀띠")).toMatchObject({
      emoji: "🐍",
      name: "뱀",
      hanja: "巳",
    });
  });

  it("returns null for empty or unknown labels", () => {
    expect(findZodiacByLabel("")).toBeNull();
    expect(findZodiacByLabel(null)).toBeNull();
    expect(findZodiacByLabel("고양이띠")).toBeNull();
  });
});
