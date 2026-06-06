import { getSajuEntryRouteOnServer } from "@/entities/saju/server/getSajuEntryRouteOnServer";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockedCookies = vi.hoisted(() => vi.fn());
const mockedGetSajuProfileOnServer = vi.hoisted(() => vi.fn());

vi.mock("next/headers", () => ({
  cookies: mockedCookies,
}));

vi.mock("@/entities/saju/server/getSajuProfileOnServer", () => ({
  getSajuProfileOnServer: mockedGetSajuProfileOnServer,
}));

function createCookieStore(values: Record<string, string>) {
  return {
    get: vi.fn((key: string) => {
      const value = values[key];
      return value ? { value } : undefined;
    }),
  };
}

describe("getSajuEntryRouteOnServer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns input for guests without auth cookies", async () => {
    mockedCookies.mockResolvedValue(createCookieStore({}));

    await expect(getSajuEntryRouteOnServer()).resolves.toBe("input");
    expect(mockedGetSajuProfileOnServer).not.toHaveBeenCalled();
  });

  it("returns result when only refresh token exists", async () => {
    mockedCookies.mockResolvedValue(
      createCookieStore({
        saju_refresh_token: "refresh-token",
      }),
    );

    await expect(getSajuEntryRouteOnServer()).resolves.toBe("result");
    expect(mockedGetSajuProfileOnServer).not.toHaveBeenCalled();
  });

  it("keeps draft recovery flow on result when pending form cookie exists", async () => {
    mockedCookies.mockResolvedValue(
      createCookieStore({
        saju_access_token: "access-token",
        saju_pending_form: "pending-cookie",
      }),
    );

    await expect(getSajuEntryRouteOnServer()).resolves.toBe("result");
    expect(mockedGetSajuProfileOnServer).not.toHaveBeenCalled();
  });

  it("returns input for logged-in users without saved saju profile", async () => {
    mockedCookies.mockResolvedValue(
      createCookieStore({
        saju_access_token: "access-token",
      }),
    );
    mockedGetSajuProfileOnServer.mockResolvedValue({
      success: true,
      data: { sajuAnalysis: null },
    });

    await expect(getSajuEntryRouteOnServer()).resolves.toBe("input");
    expect(mockedGetSajuProfileOnServer).toHaveBeenCalledWith({
      refreshOnUnauthorized: false,
    });
  });

  it("falls back to result when profile lookup fails", async () => {
    mockedCookies.mockResolvedValue(
      createCookieStore({
        saju_access_token: "access-token",
      }),
    );
    mockedGetSajuProfileOnServer.mockResolvedValue({
      success: false,
      status: 500,
      message: "Saju profile request failed.",
    });

    await expect(getSajuEntryRouteOnServer()).resolves.toBe("result");
  });
});
