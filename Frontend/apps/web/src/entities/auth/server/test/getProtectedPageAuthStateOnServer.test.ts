import { getProtectedPageAuthStateOnServer } from "@/entities/auth/server/getProtectedPageAuthStateOnServer";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockedCookies = vi.hoisted(() => vi.fn());

vi.mock("next/headers", () => ({
  cookies: mockedCookies,
}));

function createCookieStore(values: Record<string, string>) {
  return {
    get: vi.fn((key: string) => {
      const value = values[key];
      return value ? { value } : undefined;
    }),
  };
}

describe("getProtectedPageAuthStateOnServer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("allows authenticated sessions", async () => {
    mockedCookies.mockResolvedValue(
      createCookieStore({
        saju_access_token: "access-token",
      }),
    );

    await expect(
      getProtectedPageAuthStateOnServer("/compatibility"),
    ).resolves.toEqual({ kind: "allow" });
  });

  it("requests refresh when only refresh token exists", async () => {
    mockedCookies.mockResolvedValue(
      createCookieStore({
        saju_refresh_token: "refresh-token",
      }),
    );

    await expect(
      getProtectedPageAuthStateOnServer("/compatibility"),
    ).resolves.toEqual({
      kind: "refresh",
      loginPath: "/login?next=%2Fcompatibility",
    });
  });

  it("redirects guests to login with next path", async () => {
    mockedCookies.mockResolvedValue(createCookieStore({}));

    await expect(
      getProtectedPageAuthStateOnServer("/mypage/traditional-fortune"),
    ).resolves.toEqual({
      kind: "redirect",
      loginPath: "/login?next=%2Fmypage%2Ftraditional-fortune",
    });
  });
});
