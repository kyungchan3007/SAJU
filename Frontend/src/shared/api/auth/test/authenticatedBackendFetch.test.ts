import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockedCookies = vi.hoisted(() => vi.fn());
const mockedRefreshTokenOnServer = vi.hoisted(() => vi.fn());
const mockedGetServerEnv = vi.hoisted(() => vi.fn());

vi.mock("next/headers", () => ({
  cookies: mockedCookies,
}));

vi.mock("@/entities/auth/server/refreshTokenOnServer", () => ({
  refreshTokenOnServer: mockedRefreshTokenOnServer,
}));

vi.mock("@/shared/config", () => ({
  getServerEnv: mockedGetServerEnv,
}));

function createCookieStore(values: Record<string, string>) {
  return {
    get: vi.fn((key: string) => {
      const value = values[key];
      return value ? { value } : undefined;
    }),
    set: vi.fn(),
    delete: vi.fn(),
  };
}

function expectSuccessResult(
  result: Awaited<ReturnType<typeof authenticatedBackendFetch>>,
) {
  if (!result.success) {
    throw new Error("Expected authenticated backend fetch to succeed.");
  }

  return result;
}

describe("authenticatedBackendFetch", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedGetServerEnv.mockReturnValue({
      BACKEND_API_BASE_URL: "https://backend.test",
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns 401 when access token does not exist", async () => {
    mockedCookies.mockResolvedValue(createCookieStore({}));

    const result = await authenticatedBackendFetch("/api/test");
    const body = await result.response.json();

    expect(result.success).toBe(false);
    expect(result.response.status).toBe(401);
    expect(body).toEqual({ success: false, message: "LOGIN_REQUIRED" });
  });

  it("returns first response when backend does not return 401", async () => {
    const cookieStore = createCookieStore({ saju_access_token: "access-1" });
    mockedCookies.mockResolvedValue(cookieStore);
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("ok", { status: 200 }));

    const result = await authenticatedBackendFetch("/api/test", {
      method: "GET",
    });
    const successResult = expectSuccessResult(result);

    expect(result.success).toBe(true);
    expect(successResult.accessToken).toBe("access-1");
    expect(successResult.response.status).toBe(200);
    expect(fetchSpy).toHaveBeenCalledWith(
      "https://backend.test/api/test",
      expect.objectContaining({
        method: "GET",
        cache: "no-store",
        headers: expect.objectContaining({
          Authorization: "Bearer access-1",
        }),
      }),
    );
  });

  it("returns first 401 response when refresh token is missing", async () => {
    mockedCookies.mockResolvedValue(
      createCookieStore({ saju_access_token: "a" }),
    );
    const firstResponse = new Response("unauthorized", { status: 401 });
    vi.spyOn(globalThis, "fetch").mockResolvedValue(firstResponse);

    const result = await authenticatedBackendFetch("/api/test");

    expect(result.success).toBe(false);
    expect(result.response.status).toBe(401);
    expect(mockedRefreshTokenOnServer).not.toHaveBeenCalled();
  });

  it("clears cookies and returns refresh failed response when refresh fails", async () => {
    const cookieStore = createCookieStore({
      saju_access_token: "a",
      saju_refresh_token: "r",
    });
    mockedCookies.mockResolvedValue(cookieStore);
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("unauthorized", { status: 401 }),
    );
    mockedRefreshTokenOnServer.mockResolvedValue({
      success: false,
    });

    const result = await authenticatedBackendFetch("/api/test");
    const body = await result.response.json();

    expect(result.success).toBe(false);
    expect(result.response.status).toBe(401);
    expect(body).toEqual({ success: false, message: "TOKEN_REFRESH_FAILED" });
    expect(cookieStore.delete).toHaveBeenCalledWith("saju_access_token");
    expect(cookieStore.delete).toHaveBeenCalledWith("saju_refresh_token");
  });

  it("retries request with refreshed token and stores new cookies", async () => {
    const cookieStore = createCookieStore({
      saju_access_token: "old-access",
      saju_refresh_token: "old-refresh",
    });
    mockedCookies.mockResolvedValue(cookieStore);
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(new Response("unauthorized", { status: 401 }))
      .mockResolvedValueOnce(new Response("ok", { status: 200 }));
    mockedRefreshTokenOnServer.mockResolvedValue({
      success: true,
      data: {
        accessToken: "new-access",
        refreshToken: "new-refresh",
      },
    });

    const result = await authenticatedBackendFetch("/api/test");
    const successResult = expectSuccessResult(result);

    expect(result.success).toBe(true);
    expect(successResult.accessToken).toBe("new-access");
    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(fetchSpy.mock.calls[1][1]).toEqual(
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer new-access",
        }),
      }),
    );
    expect(cookieStore.set).toHaveBeenCalledWith(
      "saju_access_token",
      "new-access",
      expect.objectContaining({ maxAge: 3600 }),
    );
    expect(cookieStore.set).toHaveBeenCalledWith(
      "saju_refresh_token",
      "new-refresh",
      expect.objectContaining({ maxAge: 3600 }),
    );
  });
});
