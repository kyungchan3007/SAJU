import { GET } from "@/app/api/saju/me/year/route";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockedCookies = vi.hoisted(() => vi.fn());
const mockedGetMyYearFortuneOnServer = vi.hoisted(() => vi.fn());

vi.mock("next/headers", () => ({
  cookies: mockedCookies,
}));

vi.mock("@/entities/saju/server/getMyYearFortuneOnServer", () => ({
  getMyYearFortuneOnServer: mockedGetMyYearFortuneOnServer,
}));

function createCookieStore(values: Record<string, string>) {
  return {
    get: vi.fn((key: string) => {
      const value = values[key];
      return value ? { value } : undefined;
    }),
  };
}

describe("/api/saju/me/year GET", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when access token is missing", async () => {
    mockedCookies.mockResolvedValue(createCookieStore({}));

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "LOGIN_REQUIRED",
        message: "Login is required.",
      },
    });
    expect(mockedGetMyYearFortuneOnServer).not.toHaveBeenCalled();
  });

  it("returns year fortune payload with backend meta", async () => {
    mockedCookies.mockResolvedValue(
      createCookieStore({ saju_access_token: "token" }),
    );
    mockedGetMyYearFortuneOnServer.mockResolvedValue({
      success: true,
      data: { targetYear: 2026, yearLabel: "2026년 (병오년)" },
      meta: { backendStatus: "COMPLETE", backendMessage: "ok" },
    });

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      data: { targetYear: 2026, yearLabel: "2026년 (병오년)" },
      error: null,
      meta: { backendStatus: "COMPLETE", backendMessage: "ok" },
    });
  });

  it("returns mapped error when server call fails", async () => {
    mockedCookies.mockResolvedValue(
      createCookieStore({ saju_access_token: "token" }),
    );
    mockedGetMyYearFortuneOnServer.mockResolvedValue({
      success: false,
      status: 404,
      message: "Saju not found.",
    });

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "YEAR_FORTUNE_GET_FAILED",
        message: "Saju not found.",
      },
    });
  });
});
