import {
  API_ERROR_MESSAGES,
  createErrorResponse,
  createSuccessResponse,
} from "@/shared/api";
import { describe, expect, it } from "vitest";

describe("api response builders", () => {
  it("creates success envelope", () => {
    expect(
      createSuccessResponse(
        { saved: true },
        { requestId: "req-1" },
      ),
    ).toEqual({
      success: true,
      data: { saved: true },
      error: null,
      meta: { requestId: "req-1" },
    });
  });

  it("creates error envelope with centralized message", () => {
    expect(createErrorResponse("LOGIN_REQUIRED", { requestId: "req-2" })).toEqual({
      success: false,
      data: null,
      error: {
        code: "LOGIN_REQUIRED",
        message: API_ERROR_MESSAGES.LOGIN_REQUIRED,
      },
      meta: { requestId: "req-2" },
    });
  });

  it("creates success envelope with centralized message", () => {
    expect(
      createSuccessResponse(
        { saved: true },
        { requestId: "req-3" },
        "SAJU_SAVED",
      ),
    ).toEqual({
      success: true,
      data: { saved: true },
      error: null,
      meta: { requestId: "req-3" },
      message: "사주 정보를 저장했습니다.",
    });
  });
});
