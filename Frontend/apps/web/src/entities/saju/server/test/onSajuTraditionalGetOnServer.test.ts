import { onSajuTraditionalGetOnServer } from "@/entities/saju/server/onSajuTraditionalGetOnServer";
import { SAJU_TRADITIONAL_ENDPOINT_PATH } from "@/shared/config/endPoint";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockedAuthenticatedBackendFetch = vi.hoisted(() => vi.fn());
const mockedParseBackendApiResponse = vi.hoisted(() => vi.fn());

vi.mock("@/shared/api/auth/authenticatedBackendFetch", () => ({
  authenticatedBackendFetch: mockedAuthenticatedBackendFetch,
}));

vi.mock("@/shared/api/backend/parseBackendApiResponse", () => ({
  parseBackendApiResponse: mockedParseBackendApiResponse,
}));

describe("onSajuTraditionalGetOnServer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("requests traditional saju endpoint and returns parsed success data", async () => {
    mockedAuthenticatedBackendFetch.mockResolvedValue({
      success: true,
      response: new Response(),
      accessToken: "token",
    });
    mockedParseBackendApiResponse.mockResolvedValue({
      success: true,
      data: { sajuId: 1, traits: { summaryZodiac: "닭띠" } },
    });

    await expect(onSajuTraditionalGetOnServer()).resolves.toEqual({
      success: true,
      data: { sajuId: 1, traits: { summaryZodiac: "닭띠" } },
    });

    expect(mockedAuthenticatedBackendFetch).toHaveBeenCalledWith(
      SAJU_TRADITIONAL_ENDPOINT_PATH,
      { method: "GET" },
    );
    expect(mockedParseBackendApiResponse).toHaveBeenCalledWith(
      expect.any(Response),
      "Traditional saju request failed.",
    );
  });

  it("returns parsed failure as-is", async () => {
    mockedAuthenticatedBackendFetch.mockResolvedValue({
      success: false,
      response: new Response(),
    });
    mockedParseBackendApiResponse.mockResolvedValue({
      success: false,
      status: 404,
      message: "Saju not found.",
    });

    await expect(onSajuTraditionalGetOnServer()).resolves.toEqual({
      success: false,
      status: 404,
      message: "Saju not found.",
    });
  });
});
