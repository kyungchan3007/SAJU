import { expect, test, type Page } from "@playwright/test";

const APP_URL = process.env.E2E_BASE_URL ?? "http://localhost:3100";

async function waitForTurnstileToken(page: Page) {
  await expect
    .poll(
      async () =>
        page
          .locator('input[name="cf-turnstile-response"]')
          .evaluate((element) => (element as HTMLInputElement).value)
          .catch(() => ""),
      { timeout: 15_000 },
    )
    .not.toBe("");
}

test.describe("turnstile UI flow", () => {
  test("redirects from verify page after real turnstile validation", async ({
    context,
    page,
  }) => {
    await page.goto("/verify?returnTo=%2Fhome");

    await expect(page).toHaveURL(/\/home$/, { timeout: 15_000 });
    await expect
      .poll(async () => {
        const cookies = await context.cookies(APP_URL);
        return cookies.find((cookie) => cookie.name === "saju_turnstile_verified")
          ?.value;
      })
      .toBe("1");
  });

  test("verifies turnstile before moving to kakao login", async ({
    context,
    page,
  }) => {
    await page.route("**/api/auth/kakao**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "text/html",
        body: "<html><body>mock kakao login</body></html>",
      });
    });

    await page.goto("/login?next=%2Fcommunity");
    await waitForTurnstileToken(page);

    await page
      .getByRole("button", { name: "카카오 계정으로 사주이야기 로그인" })
      .click();

    await expect(page).toHaveURL(/\/api\/auth\/kakao\?next=%2Fcommunity$/, {
      timeout: 15_000,
    });
    await expect(page.getByText("mock kakao login")).toBeVisible();
    await expect
      .poll(async () => {
        const cookies = await context.cookies(APP_URL);
        return cookies.find((cookie) => cookie.name === "saju_turnstile_verified")
          ?.value;
      })
      .toBe("1");
  });
});
