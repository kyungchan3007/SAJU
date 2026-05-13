import { getCompatibilityOnServer } from "@/entities/compatibility/server/getCompatibilityOnServer";
import { parseGeneratedInterpretationResponse } from "@/shared/api/backend/parseGeneratedInterpretationResponse";
import { SAJU_COMPATIBILITY_ENDPOINT_PATH } from "@/shared/config/endPoint";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockedAuthenticatedBackendFetch = vi.hoisted(() => vi.fn());
const mockedParseGeneratedInterpretationResponse = vi.hoisted(() => vi.fn());

vi.mock("@/shared/api/auth/authenticatedBackendFetch", () => ({
  authenticatedBackendFetch: mockedAuthenticatedBackendFetch,
}));

vi.mock("@/shared/api/backend/parseGeneratedInterpretationResponse", () => ({
  parseGeneratedInterpretationResponse:
    mockedParseGeneratedInterpretationResponse,
}));

describe("getCompatibilityOnServer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("requests compatibility endpoint and returns parsed success data with meta", async () => {
    mockedAuthenticatedBackendFetch.mockResolvedValue({
      success: true,
      response: new Response(),
      accessToken: "token",
    });
    mockedParseGeneratedInterpretationResponse.mockResolvedValue({
      success: true,
      data: { status: "COMPLETE", summary: { overallScore: 81 } },
      meta: { backendStatus: "COMPLETE", backendMessage: "ok" },
    });

    await expect(getCompatibilityOnServer(7)).resolves.toEqual({
      success: true,
      data: { status: "COMPLETE", summary: { overallScore: 81 } },
      meta: { backendStatus: "COMPLETE", backendMessage: "ok" },
    });

    expect(mockedAuthenticatedBackendFetch).toHaveBeenCalledWith(
      `${SAJU_COMPATIBILITY_ENDPOINT_PATH}/7`,
      { method: "GET" },
    );
    expect(parseGeneratedInterpretationResponse).toHaveBeenCalledWith(
      expect.any(Response),
      "Get compatibility request failed.",
    );
  });

  it("returns parsed failure as-is", async () => {
    mockedAuthenticatedBackendFetch.mockResolvedValue({
      success: false,
      response: new Response(),
    });
    mockedParseGeneratedInterpretationResponse.mockResolvedValue({
      success: false,
      status: 404,
      message: "Partner not found.",
    });

    await expect(getCompatibilityOnServer(7)).resolves.toEqual({
      success: false,
      status: 404,
      message: "Partner not found.",
    });
  });
});
