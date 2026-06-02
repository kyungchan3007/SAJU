import { DELETE, GET } from "@/app/api/users/me/route";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockedGetMyProfileOnServer = vi.hoisted(() => vi.fn());
const mockedDeleteMyAccountOnServer = vi.hoisted(() => vi.fn());

vi.mock("@/entities/user/server/getMyProfileOnServer", () => ({
  getMyProfileOnServer: mockedGetMyProfileOnServer,
}));

vi.mock("@/entities/user/server/deleteMyAccountOnServer", () => ({
  deleteMyAccountOnServer: mockedDeleteMyAccountOnServer,
}));

describe("/api/users/me route handlers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("GET returns success envelope on profile success", async () => {
    mockedGetMyProfileOnServer.mockResolvedValue({
      success: true,
      data: { nickname: "chan" },
    });

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      data: { nickname: "chan" },
      error: null,
    });
  });

  it("GET returns mapped error on profile failure", async () => {
    mockedGetMyProfileOnServer.mockResolvedValue({
      success: false,
      status: 401,
      message: "LOGIN_REQUIRED",
    });

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "USER_PROFILE_GET_FAILED",
        message: "LOGIN_REQUIRED",
      },
    });
  });

  it("DELETE returns mapped error on delete failure", async () => {
    mockedDeleteMyAccountOnServer.mockResolvedValue({
      success: false,
      status: 500,
      message: "Delete account request failed.",
    });

    const response = await DELETE();
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "USER_DELETE_FAILED",
        message: "Delete account request failed.",
      },
    });
  });

  it("DELETE clears auth cookies on success", async () => {
    mockedDeleteMyAccountOnServer.mockResolvedValue({
      success: true,
    });

    const response = await DELETE();
    const body = await response.json();
    const setCookie = response.headers.get("set-cookie") ?? "";

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      data: { deleted: true },
      error: null,
    });
    expect(setCookie).toContain("saju_access_token");
    expect(setCookie).toContain("saju_refresh_token");
  });
});
