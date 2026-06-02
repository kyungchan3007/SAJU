import { POST } from "@/app/api/auth/logout/route";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockedLogoutOnServer = vi.hoisted(() => vi.fn());

vi.mock("@/entities/auth/server/logoutOnServer", () => ({
  logoutOnServer: mockedLogoutOnServer,
}));

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

    const response = await POST();
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "AUTH_LOGOUT_FAILED",
        message: "TOKEN_REFRESH_FAILED",
      },
    });
  });

  it("returns success and clears auth cookies when logout succeeds", async () => {
    mockedLogoutOnServer.mockResolvedValue({
      success: true,
    });

    const response = await POST();
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
});
