import {
  buildErrorPagePath,
  resolveErrorPageCopy,
} from "@/shared/lib/error-page";
import { describe, expect, it } from "vitest";

describe("error-page helpers", () => {
  it("builds error page path from a centralized code", () => {
    expect(buildErrorPagePath({ code: "SAJU_RESULT_LOAD_FAILED" })).toBe(
      "/error?code=SAJU_RESULT_LOAD_FAILED",
    );
  });

  it("resolves registered error page copy by code", () => {
    expect(
      resolveErrorPageCopy({ code: "PERSONALITY_REPORT_NOT_FOUND" }),
    ).toEqual({
      code: "PERSONALITY_REPORT_NOT_FOUND",
      title: "상세 성향 리포트를 찾을 수 없습니다",
      description: "사주 분석 정보가 준비된 뒤 다시 확인해 주세요.",
    });
  });

  it("falls back to unknown copy for unsupported code", () => {
    expect(resolveErrorPageCopy({ code: "NOPE" })).toEqual({
      code: "UNKNOWN",
      title: "오류가 발생했습니다",
      description: "잠시 후 다시 시도해 주세요.",
    });
  });
});
