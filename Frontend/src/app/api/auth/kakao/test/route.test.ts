import { GET } from "@/app/api/auth/kakao/route";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockedGetServerEnv = vi.hoisted(() => vi.fn());

vi.mock("@/shared/config", () => ({
  getServerEnv: mockedGetServerEnv,
}));

describe("/api/auth/kakao GET", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns 500 when backend base url is missing", async () => {
    mockedGetServerEnv.mockReturnValue({ BACKEND_API_BASE_URL: "" });

    const response = await GET();
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

    const response = await GET();
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

    const response = await GET();

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "https://backend.test/oauth2/authorization/kakao",
    );
  });

  it("returns 502 when redirect location header is missing", async () => {
    mockedGetServerEnv.mockReturnValue({
      BACKEND_API_BASE_URL: "https://backend.test",
    });
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, { status: 302 }),
    );

    const response = await GET();
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

    const response = await GET();
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
