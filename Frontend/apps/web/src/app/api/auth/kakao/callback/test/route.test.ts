import { GET } from "@/app/api/auth/kakao/callback/route";
import { KAKAO_LOGIN_CALLBACK_PATH } from "@/shared/config/endPoint";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const LOCAL_BASE_URL = "http://localhost";

const mockedExchangeOAuthCodeOnServer = vi.hoisted(() => vi.fn());
const mockedGetServerEnv = vi.hoisted(() => vi.fn());

vi.mock("@/entities/auth/server/exchangeOAuthCodeOnServer", () => ({
  exchangeOAuthCodeOnServer: mockedExchangeOAuthCodeOnServer,
}));

vi.mock("@/shared/config", () => ({
  getServerEnv: mockedGetServerEnv,
}));

function createRequest(
  url: string,
  redirectCookie?: string,
  stateCookie = "state-1",
) {
  return {
    url,
    nextUrl: new URL(url),
    cookies: {
      get: (name: string) => {
        if (name === "saju_post_login_redirect" && redirectCookie) {
          return { value: redirectCookie };
        }

        if (name === "saju_oauth_state" && stateCookie) {
          return { value: stateCookie };
        }

        return undefined;
      },
    },
  } as never;
}

function createCallbackRequest(search: string, redirectCookie?: string) {
  return createRequest(
    `${new URL(KAKAO_LOGIN_CALLBACK_PATH, LOCAL_BASE_URL)}${search}`,
    redirectCookie,
  );
}

describe("/api/auth/kakao/callback GET", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedGetServerEnv.mockReturnValue({ BACKEND_API_BASE_URL: "" });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("redirects to missing_code when code query is absent", async () => {
    const response = await GET(createCallbackRequest("?state=state-1"));

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost/login?error=missing_code",
    );
    expect(mockedExchangeOAuthCodeOnServer).not.toHaveBeenCalled();
  });

  it("rejects callback when oauth state is missing", async () => {
    const response = await GET(createCallbackRequest("?code=abc"));
    const setCookie = response.headers.get("set-cookie") ?? "";

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost/login?error=invalid_state",
    );
    expect(setCookie).toContain("saju_oauth_state=");
    expect(setCookie).toContain("Max-Age=0");
    expect(mockedExchangeOAuthCodeOnServer).not.toHaveBeenCalled();
  });

  it("rejects callback when oauth state does not match cookie", async () => {
    const response = await GET(
      createCallbackRequest("?code=abc&state=other-state"),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost/login?error=invalid_state",
    );
    expect(mockedExchangeOAuthCodeOnServer).not.toHaveBeenCalled();
  });

  it("redirects to oauth_failed when exchange returns failure", async () => {
    mockedExchangeOAuthCodeOnServer.mockResolvedValue({ success: false });

    const response = await GET(
      createCallbackRequest("?code=abc&state=state-1"),
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
      createCallbackRequest("?code=abc&state=state-1"),
    );
    const setCookie = response.headers.get("set-cookie") ?? "";

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost/saju");
    expect(setCookie).toContain("saju_access_token=access-new");
    expect(setCookie).toContain("saju_refresh_token=refresh-new");
    expect(setCookie).toContain("saju_oauth_state=");
    expect(setCookie).toContain("Max-Age=0");
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
      createCallbackRequest("?code=abc&state=state-1"),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost/home");
  });

  it("redirects to requested next path when post-login redirect cookie exists", async () => {
    mockedExchangeOAuthCodeOnServer.mockResolvedValue({
      success: true,
      data: {
        isNewUser: false,
        accessToken: "access-old",
        refreshToken: "refresh-old",
      },
    });

    const response = await GET(
      createCallbackRequest("?code=abc&state=state-1", "/community"),
    );
    const setCookie = response.headers.get("set-cookie") ?? "";

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost/community");
    expect(setCookie).toContain("saju_post_login_redirect=");
    expect(setCookie).toContain("Max-Age=0");
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
      createCallbackRequest("?code=abc&state=state-1"),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost/auth/restore",
    );
  });

  it("redirects to oauth_exception when exchange throws", async () => {
    mockedExchangeOAuthCodeOnServer.mockRejectedValue(new Error("boom"));

    const response = await GET(
      createCallbackRequest("?code=abc&state=state-1"),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost/login?error=oauth_exception",
    );
  });
});
