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

describe("/api/saju/result POST", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns 401 when access token is missing", async () => {
    mockedCookies.mockResolvedValue(createCookieStore({}));

    const response = await POST();
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

  it("returns cached daily result without server calls", async () => {
    const cached = encodeCookiePayload({
      data: { weakElement: "water" },
      exp: Date.now() + 60_000,
    });
    mockedCookies.mockResolvedValue(
      createCookieStore({
        saju_access_token: "token",
        saju_daily_cache: cached,
      }),
    );

    const response = await POST();
    const body = await response.json();
    const setCookie = response.headers.get("set-cookie") ?? "";

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      data: { weakElement: "water" },
      error: null,
    });
    expect(mockedOnSajuDailyGetOnServer).not.toHaveBeenCalled();
    expect(mockedOnSajuPostOnServer).not.toHaveBeenCalled();
    expect(setCookie).toContain("saju_pending_form=");
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

    const response = await POST();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      data: { weakElement: "fire" },
      error: null,
    });
    expect(mockedOnSajuPostOnServer).toHaveBeenCalledTimes(1);
  });

  it("uses submitted form body when daily result returns 404", async () => {
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

    const response = await POST();
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "PENDING_FORM_NOT_FOUND",
        message: "First-time post requires pending saju form.",
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

    const response = await POST();
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "SAJU_POST_FAILED",
        message: "Saju request failed.",
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

    const response = await POST();
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "SAJU_DAILY_GET_FAILED",
        message: "Daily saju request failed.",
      },
    });
  });

  it("treats broken cache/pending cookie payload as missing and follows failure path", async () => {
    mockedCookies.mockResolvedValue(
      createCookieStore({
        saju_access_token: "token",
        saju_daily_cache: "not-base64",
      }),
    );
    mockedOnSajuDailyGetOnServer.mockResolvedValue({
      success: false,
      status: 404,
      message: "Not found",
    });

    const response = await POST();
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "PENDING_FORM_NOT_FOUND",
        message: "First-time post requires pending saju form.",
      },
    });
  });
});
