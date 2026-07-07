import { POST } from "@/app/api/saju/route";
import { SAJU_ENDPOINT_PATH } from "@/shared/config/endPoint";
import { beforeEach, describe, expect, it, vi } from "vitest";

const LOCAL_BASE_URL = "http://localhost";

const mockedCookies = vi.hoisted(() => vi.fn());
const mockedOnSajuPostOnServer = vi.hoisted(() => vi.fn());

vi.mock("next/headers", () => ({
  cookies: mockedCookies,
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
  return new Request(new URL(SAJU_ENDPOINT_PATH, LOCAL_BASE_URL), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost",
    },
    body: JSON.stringify(body),
  });
}

function createEmptyRequest() {
  return new Request(new URL(SAJU_ENDPOINT_PATH, LOCAL_BASE_URL), {
    method: "POST",
    headers: { Origin: "http://localhost" },
  });
}

describe("/api/saju POST", () => {
  beforeEach(() => {
    vi.clearAllMocks();
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

  it("saves submitted form body", async () => {
    mockedCookies.mockResolvedValue(
      createCookieStore({
        saju_access_token: "token",
      }),
    );
    mockedOnSajuPostOnServer.mockResolvedValue({
      success: true,
      data: { weakElement: "water" },
    });
    const formValues = {
      birthYear: "1992",
      birthDate: "03/14",
      city: "서울",
      calendarType: "SOLAR",
      birthTime: "",
      gender: "MALE",
      timeUnknown: "",
    };

    const response = await POST(createJsonRequest(formValues));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      data: { weakElement: "water" },
      error: null,
      message: "사주 정보를 저장했습니다.",
    });
    expect(mockedOnSajuPostOnServer).toHaveBeenCalledWith(formValues);
  });

  it("recovers pending draft form when body is missing", async () => {
    const formValues = {
      birthYear: "1992",
      birthDate: "03/14",
      city: "서울",
      calendarType: "SOLAR",
      birthTime: "",
      gender: "MALE",
      timeUnknown: "",
    };
    const pending = encodeCookiePayload({
      formValues,
      exp: Date.now() + 60_000,
    });
    mockedCookies.mockResolvedValue(
      createCookieStore({
        saju_access_token: "token",
        saju_pending_form: pending,
      }),
    );
    mockedOnSajuPostOnServer.mockResolvedValue({
      success: true,
      data: { weakElement: "water" },
    });

    const response = await POST(createEmptyRequest());

    expect(response.status).toBe(200);
    expect(mockedOnSajuPostOnServer).toHaveBeenCalledWith(formValues);
  });

  it("returns 400 when body and pending draft are missing", async () => {
    mockedCookies.mockResolvedValue(
      createCookieStore({
        saju_access_token: "token",
      }),
    );

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
