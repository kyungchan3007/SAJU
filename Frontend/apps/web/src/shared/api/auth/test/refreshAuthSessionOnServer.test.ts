import { refreshAuthSessionOnServer } from "@/shared/api/auth/refreshAuthSessionOnServer";
import { describe, expect, it, vi } from "vitest";

const mockedRefreshTokenOnServer = vi.hoisted(() => vi.fn());

vi.mock("@/entities/auth/server/refreshTokenOnServer", () => ({
  refreshTokenOnServer: mockedRefreshTokenOnServer,
}));

function createCookieStore(refreshToken: string) {
  return {
    get: vi.fn((key: string) =>
      key === "saju_refresh_token" ? { value: refreshToken } : undefined,
    ),
    set: vi.fn(),
    delete: vi.fn(),
  };
}

describe("refreshAuthSessionOnServer", () => {
  it("shares one refresh request for concurrent calls with the same token", async () => {
    let resolveRefresh:
      | ((value: {
          success: true;
          data: { accessToken: string; refreshToken: string };
        }) => void)
      | undefined;
    mockedRefreshTokenOnServer.mockReturnValue(
      new Promise((resolve) => {
        resolveRefresh = resolve;
      }),
    );
    const firstCookieStore = createCookieStore("refresh-1");
    const secondCookieStore = createCookieStore("refresh-1");

    const first = refreshAuthSessionOnServer(firstCookieStore as never);
    const second = refreshAuthSessionOnServer(secondCookieStore as never);

    expect(mockedRefreshTokenOnServer).toHaveBeenCalledTimes(1);

    resolveRefresh?.({
      success: true,
      data: { accessToken: "access-2", refreshToken: "refresh-2" },
    });

    await expect(first).resolves.toMatchObject({
      success: true,
      accessToken: "access-2",
      refreshToken: "refresh-2",
    });
    await expect(second).resolves.toMatchObject({
      success: true,
      accessToken: "access-2",
      refreshToken: "refresh-2",
    });
    expect(firstCookieStore.set).toHaveBeenCalledTimes(2);
    expect(secondCookieStore.set).toHaveBeenCalledTimes(2);
  });
});
