import { POST } from "@/app/api/auth/logout/route";
import { SAJU_AUTH_LOGOUT_PATH } from "@/shared/config/endPoint";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const SAME_ORIGIN_BASE_URL = "https://www.saju-me.com";

const mockedLogoutOnServer = vi.hoisted(() => vi.fn());

vi.mock("@/entities/auth/server/logoutOnServer", () => ({
  logoutOnServer: mockedLogoutOnServer,
}));

function createSameOriginRequest() {
  return new Request(new URL(SAJU_AUTH_LOGOUT_PATH, SAME_ORIGIN_BASE_URL), {
    method: "POST",
    headers: {
      Origin: SAME_ORIGIN_BASE_URL,
    },
  });
}

describe("/api/auth/logout POST", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns mapped error when logout fails", async () => {
    mockedLogoutOnServer.mockResolvedValue({
      success: false,
      status: 401,
      message: "TOKEN_REFRESH_FAILED",
    });

    const response = await POST(createSameOriginRequest());
    const body = await response.json();
    const setCookie = response.headers.get("set-cookie") ?? "";

    expect(response.status).toBe(401);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "AUTH_LOGOUT_FAILED",
        message: "로그아웃을 처리하지 못했습니다. 잠시 후 다시 시도해주세요.",
      },
    });
    expect(setCookie).toContain("saju_access_token");
    expect(setCookie).toContain("saju_refresh_token");
  });

  it("returns success and clears auth cookies when logout succeeds", async () => {
    mockedLogoutOnServer.mockResolvedValue({
      success: true,
    });

    const response = await POST(createSameOriginRequest());
    const body = await response.json();
    const setCookie = response.headers.get("set-cookie") ?? "";

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      data: { loggedOut: true },
      error: null,
    });
    expect(setCookie).toContain("saju_access_token");
    expect(setCookie).toContain("saju_refresh_token");
  });

  it("rejects requests without an origin header", async () => {
    const response = await POST(
      new Request(new URL(SAJU_AUTH_LOGOUT_PATH, SAME_ORIGIN_BASE_URL), {
        method: "POST",
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(403);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "CSRF_ORIGIN_REQUIRED",
        message: "요청을 확인할 수 없습니다. 다시 시도해주세요.",
      },
    });
  });
});
