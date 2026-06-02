import { parseGeneratedInterpretationResponse } from "@/shared/api/backend/parseGeneratedInterpretationResponse";
import { describe, expect, it } from "vitest";

describe("parseGeneratedInterpretationResponse", () => {
  it("returns data and backend meta for successful generated interpretation response", async () => {
    const response = Response.json({
      status: "PENDING",
      message: "Retry later.",
      errorCode: null,
      data: undefined,
    });

    await expect(
      parseGeneratedInterpretationResponse(response, "Request failed."),
    ).resolves.toEqual({
      success: true,
      data: undefined,
      meta: {
        backendStatus: "PENDING",
        backendMessage: "Retry later.",
        backendErrorCode: null,
      },
    });
  });

  it("returns mapped failure for unsuccessful response", async () => {
    const response = Response.json(
      { message: "Saju not found." },
      { status: 404 },
    );

    await expect(
      parseGeneratedInterpretationResponse(response, "Request failed."),
    ).resolves.toEqual({
      success: false,
      status: 404,
      message: "Saju not found.",
    });
  });
});
