import {
  describeBigLuckGanji,
  describeGanjiPillar,
  formatBigLuckGanjiSummary,
} from "@/shared/model/saju-ganji/utils";
import { describe, expect, it } from "vitest";

describe("saju ganji utils", () => {
  it("describes ganji pillar from user stem and branch", () => {
    expect(
      describeGanjiPillar({ type: "year", stem: "무", branch: "신" }),
    ).toContain("년주 무신");
    expect(
      describeGanjiPillar({ type: "year", stem: "무", branch: "신" }),
    ).toContain("판단력, 정리, 결단");
  });

  it("adds day pillar note for day pillar", () => {
    expect(
      describeGanjiPillar({ type: "day", stem: "기", branch: "묘" }),
    ).toContain("일주는 본인의 핵심 기운");
  });

  it("returns fallback descriptions for missing or unknown values", () => {
    expect(describeGanjiPillar({ type: "hour" })).toBe(
      "시주는 천간과 지지가 결합된 사주 기둥입니다.",
    );
    expect(describeGanjiPillar({ type: "month", stem: "X", branch: "Y" })).toBe(
      "월주 XY는 천간 X와 지지 Y가 만난 기둥입니다.",
    );
  });

  it("describes big luck ganji from pillar text", () => {
    expect(
      describeBigLuckGanji({ pillar: "무인", isCurrentDaeun: true }),
    ).toContain("무인 대운");
    expect(
      describeBigLuckGanji({ pillar: "무인", isCurrentDaeun: true }),
    ).toContain("현재 지나고 있는 대운");
    expect(describeBigLuckGanji({ pillar: "정축" })).toContain(
      "겨울의 흙처럼 천천히 축적하고 버티는 기운",
    );
  });

  it("returns fallback description for invalid big luck ganji", () => {
    expect(describeBigLuckGanji({ pillar: "" })).toBe(
      "이 대운은 10년 단위로 바뀌는 큰 운의 흐름입니다.",
    );
    expect(describeBigLuckGanji({ pillar: "XY" })).toBe(
      "XY 대운은 천간 X와 지지 Y가 만난 10년 흐름입니다.",
    );
  });

  it("formats big luck ganji summary without hanja", () => {
    expect(formatBigLuckGanjiSummary("무인")).toBe(
      "큰 산이나 넓은 대지 · 봄의 시작",
    );
    expect(formatBigLuckGanjiSummary("")).toBe("10년 흐름");
    expect(formatBigLuckGanjiSummary("XY")).toBe("천간과 지지가 만난 흐름");
  });
});
