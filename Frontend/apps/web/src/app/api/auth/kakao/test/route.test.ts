import { GET } from "@/app/api/auth/kakao/route";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockedGetServerEnv = vi.hoisted(() => vi.fn());

vi.mock("@/shared/config", () => ({
  getServerEnv: mockedGetServerEnv,
}));

function createRequest(url: string) {
  return {
    url,
    nextUrl: new URL(url),
  } as never;
}

describe("/api/auth/kakao GET", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns 500 when backend base url is missing", async () => {
    mockedGetServerEnv.mockReturnValue({ BACKEND_API_BASE_URL: "" });

    const response = await GET(createRequest("http://localhost/api/auth/kakao"));
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "CONFIG_ERROR",
        message: "BACKEND_API_BASE_URL is not configured.",
      },
    });
  });

  it("returns 502 when backend request throws", async () => {
    mockedGetServerEnv.mockReturnValue({
      BACKEND_API_BASE_URL: "https://backend.test",
    });
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network"));

    const response = await GET(createRequest("http://localhost/api/auth/kakao"));
    const body = await response.json();

    expect(response.status).toBe(502);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "BACKEND_UNAVAILABLE",
        message: "Unable to reach backend auth endpoint.",
      },
    });
  });

  it("redirects when backend returns 3xx with location header", async () => {
    mockedGetServerEnv.mockReturnValue({
      BACKEND_API_BASE_URL: "https://backend.test",
    });
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, {
        status: 302,
        headers: {
          location: "/oauth2/authorization/kakao",
        },
      }),
    );

    const response = await GET(createRequest("http://localhost/api/auth/kakao"));
    const location = new URL(response.headers.get("location") ?? "");
    const oauthState = location.searchParams.get("state");
    const setCookie = response.headers.get("set-cookie") ?? "";

    expect(response.status).toBe(307);
    expect(location.origin).toBe("https://backend.test");
    expect(location.pathname).toBe("/oauth2/authorization/kakao");
    expect(oauthState).toBeTruthy();
    expect(setCookie).toContain(`saju_oauth_state=${oauthState}`);
    expect(setCookie).toContain("HttpOnly");
  });

  it("stores requested next path before redirecting to kakao auth", async () => {
    mockedGetServerEnv.mockReturnValue({
      BACKEND_API_BASE_URL: "https://backend.test",
    });
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, {
        status: 302,
        headers: {
          location: "/oauth2/authorization/kakao",
        },
      }),
    );

    const response = await GET(
      createRequest("http://localhost/api/auth/kakao?next=%2Fcommunity"),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("set-cookie")).toContain(
      "saju_post_login_redirect=%2Fcommunity",
    );
  });

  it("returns 502 when redirect location header is missing", async () => {
    mockedGetServerEnv.mockReturnValue({
      BACKEND_API_BASE_URL: "https://backend.test",
    });
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, { status: 302 }),
    );

    const response = await GET(createRequest("http://localhost/api/auth/kakao"));
    const body = await response.json();

    expect(response.status).toBe(502);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "KAKAO_AUTH_FAILED",
        message: "Backend auth redirect is missing Location header.",
      },
    });
  });

  it("returns mapped failure when backend status is not redirect", async () => {
    mockedGetServerEnv.mockReturnValue({
      BACKEND_API_BASE_URL: "https://backend.test",
    });
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, { status: 401 }),
    );

    const response = await GET(createRequest("http://localhost/api/auth/kakao"));
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "KAKAO_AUTH_FAILED",
        message: "Backend auth request failed with status 401.",
      },
    });
  });
});
