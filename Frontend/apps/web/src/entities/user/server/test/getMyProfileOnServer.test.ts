import { getMyProfileOnServer } from "@/entities/user/server/getMyProfileOnServer";
import { SAJU_USERS_ME_PATH } from "@/shared/config/endPoint";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockedAuthenticatedBackendFetch = vi.hoisted(() => vi.fn());
const mockedParseBackendApiResponse = vi.hoisted(() => vi.fn());

vi.mock("@/shared/api/auth/authenticatedBackendFetch", () => ({
  authenticatedBackendFetch: mockedAuthenticatedBackendFetch,
}));

vi.mock("@/shared/api/backend/parseBackendApiResponse", () => ({
  parseBackendApiResponse: mockedParseBackendApiResponse,
}));

describe("getMyProfileOnServer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("requests profile endpoint and returns parsed success data", async () => {
    mockedAuthenticatedBackendFetch.mockResolvedValue({
      success: true,
      response: new Response(),
      accessToken: "token",
    });
    mockedParseBackendApiResponse.mockResolvedValue({
      success: true,
      data: { id: 1, nickname: "chan" },
    });

    await expect(getMyProfileOnServer()).resolves.toEqual({
      success: true,
      data: { id: 1, nickname: "chan" },
    });

    expect(mockedAuthenticatedBackendFetch).toHaveBeenCalledWith(
      SAJU_USERS_ME_PATH,
      { method: "GET" },
    );
    expect(mockedParseBackendApiResponse).toHaveBeenCalledWith(
      expect.any(Response),
      "User profile request failed.",
    );
  });

  it("returns parsed failure as-is", async () => {
    mockedAuthenticatedBackendFetch.mockResolvedValue({
      success: false,
      response: new Response(),
    });
    mockedParseBackendApiResponse.mockResolvedValue({
      success: false,
      status: 401,
      message: "LOGIN_REQUIRED",
    });

    await expect(getMyProfileOnServer()).resolves.toEqual({
      success: false,
      status: 401,
      message: "LOGIN_REQUIRED",
    });
  });
});
