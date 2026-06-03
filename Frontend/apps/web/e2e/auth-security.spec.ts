import { expect, test } from "@playwright/test";

test.describe("auth security", () => {
  test("rejects an oauth callback without a matching state", async ({ page }) => {
    await page.goto("/api/auth/kakao/callback?code=attacker-code");

    await expect(page).toHaveURL(/\/login\?error=invalid_state$/);
  });

  test("clears the one-time oauth state cookie after a mismatch", async ({
    context,
    page,
    baseURL,
  }) => {
    const url = baseURL ?? "http://127.0.0.1:3100";

    await context.addCookies([
      { name: "saju_oauth_state", value: "expected-state", url },
    ]);

    await page.goto(
      "/api/auth/kakao/callback?code=attacker-code&state=unexpected-state",
    );

    await expect(page).toHaveURL(/\/login\?error=invalid_state$/);
    await expect
      .poll(async () => {
        const cookies = await context.cookies(url);
        return cookies.some((cookie) => cookie.name === "saju_oauth_state");
      })
      .toBe(false);
  });

  test("rejects cross-origin state-changing requests", async ({
    context,
    baseURL,
  }) => {
    const url = baseURL ?? "http://127.0.0.1:3100";
    const response = await context.request.post(`${url}/api/auth/restore/decline`, {
      headers: {
        Origin: "https://attacker.example",
      },
    });

    expect(response.status()).toBe(403);
    await expect(response.json()).resolves.toMatchObject({
      success: false,
      error: {
        code: "CSRF_ORIGIN_MISMATCH",
      },
    });
  });

  test("does not expose the removed NextAuth session endpoint", async ({
    context,
    baseURL,
  }) => {
    const url = baseURL ?? "http://127.0.0.1:3100";
    const response = await context.request.get(`${url}/api/auth/session`);

    expect(response.status()).toBe(404);
  });
});
