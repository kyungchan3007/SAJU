import {
  createErrorResponse,
  createSuccessResponse,
} from "@/shared/api/response";
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

  it("creates error envelope", () => {
    expect(
      createErrorResponse(
        "USER_DELETE_FAILED",
        "Delete failed",
        { requestId: "req-2" },
      ),
    ).toEqual({
      success: false,
      data: null,
      error: {
        code: "USER_DELETE_FAILED",
        message: "Delete failed",
      },
      meta: { requestId: "req-2" },
    });
  });
});
