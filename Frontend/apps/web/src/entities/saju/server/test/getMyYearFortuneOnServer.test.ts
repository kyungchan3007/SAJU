import { getMyYearFortuneOnServer } from "@/entities/saju/server/getMyYearFortuneOnServer";
import { parseGeneratedInterpretationResponse } from "@/shared/api/backend/parseGeneratedInterpretationResponse";
import { SAJU_YEAR_FORTUNE_ENDPOINT_PATH } from "@/shared/config/endPoint";
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

describe("getMyYearFortuneOnServer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("requests year fortune endpoint and returns parsed success data with meta", async () => {
    mockedAuthenticatedBackendFetch.mockResolvedValue({
      success: true,
      response: new Response(),
      accessToken: "token",
    });
    mockedParseGeneratedInterpretationResponse.mockResolvedValue({
      success: true,
      data: { targetYear: 2026, yearLabel: "2026년 (병오년)" },
      meta: { backendStatus: "COMPLETE", backendMessage: "ok" },
    });

    await expect(getMyYearFortuneOnServer()).resolves.toEqual({
      success: true,
      data: { targetYear: 2026, yearLabel: "2026년 (병오년)" },
      meta: { backendStatus: "COMPLETE", backendMessage: "ok" },
    });

    expect(mockedAuthenticatedBackendFetch).toHaveBeenCalledWith(
      SAJU_YEAR_FORTUNE_ENDPOINT_PATH,
      { method: "GET" },
    );
    expect(parseGeneratedInterpretationResponse).toHaveBeenCalledWith(
      expect.any(Response),
      "Get year fortune request failed.",
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
      message: "Saju not found.",
    });

    await expect(getMyYearFortuneOnServer()).resolves.toEqual({
      success: false,
      status: 404,
      message: "Saju not found.",
    });
  });
});
