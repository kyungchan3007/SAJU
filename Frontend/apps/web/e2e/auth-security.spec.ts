import { expect, test } from "@playwright/test";

const APP_URL = process.env.E2E_BASE_URL ?? "http://localhost:3100";

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

  test("blocks protected compatibility requests without a turnstile cookie", async ({
    context,
  }) => {
    const response = await context.request.post(`${APP_URL}/api/compatibility`, {
      headers: {
        Origin: APP_URL,
      },
    });

    expect(response.status()).toBe(403);
    await expect(response.json()).resolves.toMatchObject({
      success: false,
      error: {
        code: "TURNSTILE_REQUIRED",
      },
    });
  });

  test("allows protected compatibility requests with a turnstile cookie", async ({
    context,
  }) => {
    await context.addCookies([
      { name: "saju_turnstile_verified", value: "1", url: APP_URL },
    ]);

    const response = await context.request.post(`${APP_URL}/api/compatibility`, {
      headers: {
        Origin: APP_URL,
      },
    });

    expect(response.status()).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      success: true,
      data: {
        feature: "compatibility",
        detailLocked: true,
      },
      error: null,
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
