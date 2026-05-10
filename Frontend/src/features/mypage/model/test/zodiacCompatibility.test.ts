import {
  buildZodiacCompatibilityEntries,
  findMyZodiacEntry,
} from "@/features/mypage/model/zodiacCompatibility";
import { describe, expect, it } from "vitest";

describe("buildZodiacCompatibilityEntries", () => {
  it("maps numeric scores by Korean zodiac names", () => {
    const entries = buildZodiacCompatibilityEntries({
      쥐띠: 91,
      소: 73,
      寅: 44,
      rabbit: 12,
    });

    expect(entries.find((entry) => entry.name === "쥐띠")?.score).toBe(91);
    expect(entries.find((entry) => entry.name === "소띠")?.score).toBe(73);
    expect(entries.find((entry) => entry.name === "호랑이띠")?.score).toBe(44);
    expect(entries.find((entry) => entry.name === "토끼띠")?.score).toBe(12);
  });

  it("maps object entries with score, grade, relation, and description", () => {
    const entries = buildZodiacCompatibilityEntries({
      dog: {
        score: 88,
        grade: "good",
        relation: "삼합",
        description: "잘 맞는 관계입니다.",
      },
    });

    expect(entries.find((entry) => entry.name === "개띠")).toMatchObject({
      score: 88,
      grade: "good",
      relation: "삼합",
      description: "잘 맞는 관계입니다.",
    });
  });

  it("maps array entries by animal or branch", () => {
    const entries = buildZodiacCompatibilityEntries([
      { animal: "소", branch: "丑", score: 95, grade: "best", desc: "최상" },
      { animal: "개", branch: "戌", score: 40, grade: "caution", desc: "주의" },
      { animal: "돼지", branch: "亥", score: 20, grade: "bad", desc: "갈등" },
    ]);

    expect(entries.find((entry) => entry.name === "소띠")).toMatchObject({
      score: 95,
      grade: "best",
      description: "최상",
    });
    expect(entries.find((entry) => entry.name === "개띠")?.score).toBe(40);
    expect(entries.find((entry) => entry.name === "돼지띠")?.score).toBe(20);
  });

  it("uses neutral fallback only when data is missing", () => {
    const entries = buildZodiacCompatibilityEntries({});

    expect(entries.every((entry) => entry.score === 50)).toBe(true);
  });
});

describe("findMyZodiacEntry", () => {
  it("finds my zodiac with or without suffix", () => {
    expect(findMyZodiacEntry("닭")?.name).toBe("닭띠");
    expect(findMyZodiacEntry("닭띠")?.name).toBe("닭띠");
  });
});
