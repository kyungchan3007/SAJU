import { GET } from "@/app/api/saju/traditional/route";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockedCookies = vi.hoisted(() => vi.fn());
const mockedOnSajuTraditionalGetOnServer = vi.hoisted(() => vi.fn());

vi.mock("next/headers", () => ({
  cookies: mockedCookies,
}));

vi.mock("@/entities/saju/server/onSajuTraditionalGetOnServer", () => ({
  onSajuTraditionalGetOnServer: mockedOnSajuTraditionalGetOnServer,
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

const mockRequest = new Request("http://localhost/api/saju/traditional");

describe("/api/saju/traditional GET", () => {
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
    expect(mockedOnSajuTraditionalGetOnServer).not.toHaveBeenCalled();
  });

  it("returns traditional saju data when server call succeeds", async () => {
    mockedCookies.mockResolvedValue(
      createCookieStore({ saju_access_token: "token" }),
    );
    mockedOnSajuTraditionalGetOnServer.mockResolvedValue({
      success: true,
      data: {
        sajuId: 1,
        traits: { summaryZodiac: "닭띠" },
      },
    });

    const response = await GET(mockRequest);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      data: {
        sajuId: 1,
        traits: { summaryZodiac: "닭띠" },
      },
      error: null,
    });
  });

  it("returns mapped error when server call fails", async () => {
    mockedCookies.mockResolvedValue(
      createCookieStore({ saju_access_token: "token" }),
    );
    mockedOnSajuTraditionalGetOnServer.mockResolvedValue({
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
        code: "SAJU_TRADITIONAL_GET_FAILED",
        message: "Saju not found.",
      },
    });
  });
});
