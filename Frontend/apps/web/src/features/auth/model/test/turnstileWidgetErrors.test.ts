import { describe, expect, it } from "vitest";

import {
  getTurnstileWidgetErrorMessage,
  TURNSTILE_WIDGET_MISSING_SITE_KEY,
} from "@/features/auth/model/turnstile-widget-errors";

describe("getTurnstileWidgetErrorMessage", () => {
  it("returns a configuration message when the site key is missing", () => {
    expect(
      getTurnstileWidgetErrorMessage(TURNSTILE_WIDGET_MISSING_SITE_KEY),
    ).toBe(
      "보안 인증 설정이 누락되어 인증을 시작할 수 없어요. 관리자에게 문의해주세요.",
    );
  });

  it("returns a browser guidance message for unsupported widget errors", () => {
    expect(getTurnstileWidgetErrorMessage("110500")).toBe(
      "브라우저 환경 때문에 보안 인증을 완료하지 못했어요. 다시 시도해주세요.",
    );
  });

  it("keeps retryable challenge states silent", () => {
    expect(getTurnstileWidgetErrorMessage("110600")).toBeNull();
  });
});
