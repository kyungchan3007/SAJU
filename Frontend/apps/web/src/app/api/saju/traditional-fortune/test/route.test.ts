import { GET } from "@/app/api/saju/traditional-fortune/route";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockedCookies = vi.hoisted(() => vi.fn());
const mockedOnSajuTraditionalFortuneGetOnServer = vi.hoisted(() => vi.fn());

vi.mock("next/headers", () => ({
  cookies: mockedCookies,
}));

vi.mock("@/entities/saju/server/onSajuTraditionalFortuneGetOnServer", () => ({
  onSajuTraditionalFortuneGetOnServer: mockedOnSajuTraditionalFortuneGetOnServer,
}));

function createCookieStore(values: Record<string, string>) {
  return {
    get: vi.fn((key: string) => {
      const value = values[key];
      return value ? { value } : undefined;
    }),
  };
}

describe("/api/saju/traditional-fortune GET", () => {
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
        message: "로그인이 필요합니다.",
      },
    });
    expect(mockedOnSajuTraditionalFortuneGetOnServer).not.toHaveBeenCalled();
  });

  it("returns traditional fortune data when server call succeeds", async () => {
    mockedCookies.mockResolvedValue(
      createCookieStore({ saju_access_token: "token" }),
    );
    mockedOnSajuTraditionalFortuneGetOnServer.mockResolvedValue({
      success: true,
      data: {
        summary: "overall summary",
      },
    });

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      data: {
        summary: "overall summary",
      },
      error: null,
    });
  });

  it("returns mapped error when server call fails", async () => {
    mockedCookies.mockResolvedValue(
      createCookieStore({ saju_access_token: "token" }),
    );
    mockedOnSajuTraditionalFortuneGetOnServer.mockResolvedValue({
      success: false,
      status: 404,
      message: "Traditional fortune not found.",
    });

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "SAJU_TRADITIONAL_FORTUNE_GET_FAILED",
        message: "정통 운세를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
      },
    });
  });
});
