import { GET } from "@/app/api/saju/me/personality/route";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockedCookies = vi.hoisted(() => vi.fn());
const mockedGetMyPersonalityProfileOnServer = vi.hoisted(() => vi.fn());

vi.mock("next/headers", () => ({
  cookies: mockedCookies,
}));

vi.mock("@/entities/saju/server/getMyPersonalityProfileOnServer", () => ({
  getMyPersonalityProfileOnServer: mockedGetMyPersonalityProfileOnServer,
}));

function createCookieStore(values: Record<string, string>) {
  return {
    get: vi.fn((key: string) => {
      const value = values[key];
      return value ? { value } : undefined;
    }),
  };
}

describe("/api/saju/me/personality GET", () => {
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
    expect(mockedGetMyPersonalityProfileOnServer).not.toHaveBeenCalled();
  });

  it("returns personality payload with backend meta and cache header", async () => {
    mockedCookies.mockResolvedValue(
      createCookieStore({ saju_access_token: "token" }),
    );
    mockedGetMyPersonalityProfileOnServer.mockResolvedValue({
      success: true,
      data: { personalityType: "임수(壬水) 감성형" },
      meta: { backendStatus: 200, backendMessage: "success" },
    });

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe(
      "private, max-age=300, stale-while-revalidate=600",
    );
    expect(body).toEqual({
      success: true,
      data: { personalityType: "임수(壬水) 감성형" },
      error: null,
      meta: { backendStatus: 200, backendMessage: "success" },
    });
  });

  it("returns mapped error when server call fails", async () => {
    mockedCookies.mockResolvedValue(
      createCookieStore({ saju_access_token: "token" }),
    );
    mockedGetMyPersonalityProfileOnServer.mockResolvedValue({
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
        code: "PERSONALITY_PROFILE_GET_FAILED",
        message: "성향 분석을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
      },
    });
  });
});
