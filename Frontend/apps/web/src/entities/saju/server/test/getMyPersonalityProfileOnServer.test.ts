import { getMyPersonalityProfileOnServer } from "@/entities/saju/server/getMyPersonalityProfileOnServer";
import { parseGeneratedInterpretationResponse } from "@/shared/api/backend/parseGeneratedInterpretationResponse";
import { SAJU_PERSONALITY_ENDPOINT_PATH } from "@/shared/config/endPoint";
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

describe("getMyPersonalityProfileOnServer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("requests personality endpoint and returns parsed success data with meta", async () => {
    mockedAuthenticatedBackendFetch.mockResolvedValue({
      success: true,
      response: new Response(),
      accessToken: "token",
    });
    mockedParseGeneratedInterpretationResponse.mockResolvedValue({
      success: true,
      data: { personalityType: "임수(壬水) 감성형" },
      meta: { backendStatus: 200, backendMessage: "success" },
    });

    await expect(getMyPersonalityProfileOnServer()).resolves.toEqual({
      success: true,
      data: { personalityType: "임수(壬水) 감성형" },
      meta: { backendStatus: 200, backendMessage: "success" },
    });

    expect(mockedAuthenticatedBackendFetch).toHaveBeenCalledWith(
      SAJU_PERSONALITY_ENDPOINT_PATH,
      { method: "GET" },
    );
    expect(parseGeneratedInterpretationResponse).toHaveBeenCalledWith(
      expect.any(Response),
      "Get personality profile request failed.",
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

    await expect(getMyPersonalityProfileOnServer()).resolves.toEqual({
      success: false,
      status: 404,
      message: "Saju not found.",
    });
  });
});
