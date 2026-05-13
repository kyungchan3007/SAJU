import { GET } from "@/app/api/auth/kakao/callback/route";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockedExchangeOAuthCodeOnServer = vi.hoisted(() => vi.fn());

vi.mock("@/entities/auth/server/exchangeOAuthCodeOnServer", () => ({
  exchangeOAuthCodeOnServer: mockedExchangeOAuthCodeOnServer,
}));

function createRequest(url: string) {
  return {
    url,
    nextUrl: new URL(url),
  } as never;
}

describe("/api/auth/kakao/callback GET", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("redirects to missing_code when code query is absent", async () => {
    const response = await GET(
      createRequest("http://localhost/api/auth/kakao/callback"),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost/login?error=missing_code",
    );
    expect(mockedExchangeOAuthCodeOnServer).not.toHaveBeenCalled();
  });

  it("redirects to oauth_failed when exchange returns failure", async () => {
    mockedExchangeOAuthCodeOnServer.mockResolvedValue({ success: false });

    const response = await GET(
      createRequest("http://localhost/api/auth/kakao/callback?code=abc"),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost/login?error=oauth_failed",
    );
    expect(mockedExchangeOAuthCodeOnServer).toHaveBeenCalledWith("abc");
  });

  it("redirects to /saju and sets auth cookies for new user", async () => {
    mockedExchangeOAuthCodeOnServer.mockResolvedValue({
      success: true,
      data: {
        isNewUser: true,
        accessToken: "access-new",
        refreshToken: "refresh-new",
      },
    });

    const response = await GET(
      createRequest("http://localhost/api/auth/kakao/callback?code=abc"),
    );
    const setCookie = response.headers.get("set-cookie") ?? "";

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost/saju");
    expect(setCookie).toContain("saju_access_token=access-new");
    expect(setCookie).toContain("saju_refresh_token=refresh-new");
  });

  it("redirects to /home for existing user", async () => {
    mockedExchangeOAuthCodeOnServer.mockResolvedValue({
      success: true,
      data: {
        isNewUser: false,
        accessToken: "access-old",
        refreshToken: "refresh-old",
      },
    });

    const response = await GET(
      createRequest("http://localhost/api/auth/kakao/callback?code=abc"),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost/home");
  });

  it("redirects to /auth/restore for pending deletion user", async () => {
    mockedExchangeOAuthCodeOnServer.mockResolvedValue({
      success: true,
      data: {
        isNewUser: false,
        accountStatus: "PENDING_DELETION",
        accessToken: "access-pending",
        refreshToken: "refresh-pending",
      },
    });

    const response = await GET(
      createRequest("http://localhost/api/auth/kakao/callback?code=abc"),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost/auth/restore",
    );
  });

  it("redirects to oauth_exception when exchange throws", async () => {
    mockedExchangeOAuthCodeOnServer.mockRejectedValue(new Error("boom"));

    const response = await GET(
      createRequest("http://localhost/api/auth/kakao/callback?code=abc"),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost/login?error=oauth_exception",
    );
  });
});
