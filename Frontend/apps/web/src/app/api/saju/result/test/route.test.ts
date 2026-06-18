import { POST } from "@/app/api/saju/result/route";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

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

function encodeCookiePayload(payload: unknown): string {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

function createJsonRequest(body: unknown) {
  return new Request("http://localhost/api/saju/result", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost",
    },
    body: JSON.stringify(body),
  });
}

function createEmptyRequest() {
  return new Request("http://localhost/api/saju/result", {
    method: "POST",
    headers: { Origin: "http://localhost" },
  });
}

describe("/api/saju/result POST", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns 401 when access token is missing", async () => {
    mockedCookies.mockResolvedValue(createCookieStore({}));

    const response = await POST(createEmptyRequest());
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
  });

  it("falls back to POST when daily result returns 404 and pending form exists", async () => {
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
      success: true,
      data: { weakElement: "fire" },
    });

    const response = await POST(createEmptyRequest());
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      data: { weakElement: "fire" },
      error: null,
    });
    expect(mockedOnSajuPostOnServer).toHaveBeenCalledTimes(1);
  });

  it("uses submitted form body without checking daily result first", async () => {
    mockedCookies.mockResolvedValue(
      createCookieStore({
        saju_access_token: "token",
      }),
    );
    mockedOnSajuPostOnServer.mockResolvedValue({
      success: true,
      data: { weakElement: "fire" },
    });

    const request = createJsonRequest({
      birthYear: "1992",
      birthDate: "03/14",
      city: "서울",
      calendarType: "SOLAR",
      birthTime: "",
      gender: "MALE",
      timeUnknown: "",
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      data: { weakElement: "fire" },
      error: null,
    });
    expect(mockedOnSajuPostOnServer).toHaveBeenCalledWith({
      birthYear: "1992",
      birthDate: "03/14",
      city: "서울",
      calendarType: "SOLAR",
      birthTime: "",
      gender: "MALE",
      timeUnknown: "",
    });
    expect(mockedOnSajuDailyGetOnServer).not.toHaveBeenCalled();
  });

  it("returns 400 when daily 404 but pending form is missing", async () => {
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

    const response = await POST(createEmptyRequest());
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "PENDING_FORM_NOT_FOUND",
        message: "사주 정보를 입력해주세요.",
      },
    });
  });

  it("returns mapped post error when fallback POST fails", async () => {
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

    const response = await POST(createEmptyRequest());
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "SAJU_POST_FAILED",
        message: "사주 결과를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
      },
    });
  });

  it("returns mapped daily-get error when daily call fails with non-404", async () => {
    mockedCookies.mockResolvedValue(
      createCookieStore({
        saju_access_token: "token",
      }),
    );
    mockedOnSajuDailyGetOnServer.mockResolvedValue({
      success: false,
      status: 503,
      message: "Daily saju request failed.",
    });

    const response = await POST(createEmptyRequest());
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "SAJU_DAILY_GET_FAILED",
        message: "오늘의 사주를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
      },
    });
  });

  it("treats broken pending cookie payload as missing and follows failure path", async () => {
    mockedCookies.mockResolvedValue(
      createCookieStore({
        saju_access_token: "token",
        saju_pending_form: "not-base64",
      }),
    );
    mockedOnSajuDailyGetOnServer.mockResolvedValue({
      success: false,
      status: 404,
      message: "Not found",
    });

    const response = await POST(createEmptyRequest());
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "PENDING_FORM_NOT_FOUND",
        message: "사주 정보를 입력해주세요.",
      },
    });
  });
});
