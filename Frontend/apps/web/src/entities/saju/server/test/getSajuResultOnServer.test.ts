import { getSajuResultOnServer } from "@/entities/saju/server/getSajuResultOnServer";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockedCookies = vi.hoisted(() => vi.fn());
const mockedOnSajuDailyGetOnServer = vi.hoisted(() => vi.fn());
const mockedOnSajuPostOnServer = vi.hoisted(() => vi.fn());

vi.mock("next/headers", () => ({
  cookies: mockedCookies,
}));

vi.mock("@/entities/saju/server/onSajuDailyGetOnServer", () => ({
  onSajuDailyGetOnServer: mockedOnSajuDailyGetOnServer,
}));

vi.mock("@/entities/saju/server/onSajuPostOnServer", () => ({
  onSajuPostOnServer: mockedOnSajuPostOnServer,
}));

function createCookieStore(values: Record<string, string>) {
  return {
    get: vi.fn((key: string) => {
      const value = values[key];
      return value ? { value } : undefined;
    }),
  };
}

function encodeCookiePayload(payload: unknown): string {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

describe("getSajuResultOnServer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns structured login-required failure when access token is missing", async () => {
    mockedCookies.mockResolvedValue(createCookieStore({}));

    await expect(getSajuResultOnServer()).resolves.toEqual({
      success: false,
      status: 401,
      message: "로그인이 필요합니다.",
      reason: "LOGIN_REQUIRED",
    });
  });

  it("returns pending-form-required when daily data is missing and no draft exists", async () => {
    mockedCookies.mockResolvedValue(
      createCookieStore({
        saju_access_token: "token",
      }),
    );
    mockedOnSajuDailyGetOnServer.mockResolvedValue({
      success: false,
      status: 404,
      message: "Not found",
    });

    await expect(getSajuResultOnServer()).resolves.toEqual({
      success: false,
      status: 400,
      message: "First-time post requires pending saju form.",
      reason: "PENDING_FORM_REQUIRED",
    });
  });

  it("returns cached daily result before backend calls", async () => {
    const cached = encodeCookiePayload({
      data: {
        todayScore: 88,
        weakElement: "water",
      },
      exp: Date.now() + 60_000,
    });

    mockedCookies.mockResolvedValue(
      createCookieStore({
        saju_access_token: "token",
        saju_daily_cache: cached,
      }),
    );

    await expect(getSajuResultOnServer()).resolves.toEqual({
      success: true,
      data: {
        todayScore: 88,
        weakElement: "water",
      },
    });
    expect(mockedOnSajuDailyGetOnServer).not.toHaveBeenCalled();
    expect(mockedOnSajuPostOnServer).not.toHaveBeenCalled();
  });

  it("maps post failure to request-failed when draft recovery submit fails", async () => {
    const pending = encodeCookiePayload({
      formValues: {
        birthYear: "1992",
        birthDate: "03/14",
        city: "서울",
        calendarType: "SOLAR",
        birthTime: "",
        gender: "MALE",
        timeUnknown: "",
      },
      exp: Date.now() + 60_000,
    });

    mockedCookies.mockResolvedValue(
      createCookieStore({
        saju_access_token: "token",
        saju_pending_form: pending,
      }),
    );
    mockedOnSajuDailyGetOnServer.mockResolvedValue({
      success: false,
      status: 404,
      message: "Not found",
    });
    mockedOnSajuPostOnServer.mockResolvedValue({
      success: false,
      status: 500,
      message: "Saju request failed.",
    });

    await expect(getSajuResultOnServer()).resolves.toEqual({
      success: false,
      status: 500,
      message: "Saju request failed.",
      reason: "REQUEST_FAILED",
    });
  });
});
