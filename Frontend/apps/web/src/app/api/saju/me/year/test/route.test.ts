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

vi.mock("@/shared/api/auth/rejectUnverifiedTurnstile", () => ({
  rejectUnverifiedTurnstile: vi.fn().mockResolvedValue(null),
}));

function createCookieStore(values: Record<string, string>) {
  return {
    get: vi.fn((key: string) => {
      const value = values[key];
      return value ? { value } : undefined;
    }),
  };
}

const mockRequest = new Request("http://localhost/api/saju/me/year");

describe("/api/saju/me/year GET", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when access token is missing", async () => {
    mockedCookies.mockResolvedValue(createCookieStore({}));

    const response = await GET(mockRequest);
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "LOGIN_REQUIRED",
        message: "로그인이 필요합니다.",
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
      data: { targetYear: 2026, yearLabel: "2026년(병오년)" },
      meta: { backendStatus: "COMPLETE", backendMessage: "ok" },
    });

    const response = await GET(mockRequest);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      data: { targetYear: 2026, yearLabel: "2026년(병오년)" },
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

    const response = await GET(mockRequest);
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "YEAR_FORTUNE_GET_FAILED",
        message: "올해 운세를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
      },
    });
  });
});
