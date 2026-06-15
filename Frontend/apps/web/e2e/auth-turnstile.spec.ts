import { expect, test, type Page } from "@playwright/test";

const APP_URL = process.env.E2E_BASE_URL ?? "http://localhost:3100";

// Cloudflare가 interactive challenge를 요구하는 경우에만 체크박스를 클릭
async function completeTurnstileChallenge(page: Page) {
  const challengeFrame = page.frameLocator(
    'iframe[title*="Cloudflare security challenge"], iframe[title*="Widget containing a Cloudflare security challenge"]',
  );
  const checkbox = challengeFrame.getByRole("checkbox").first();

  if (await checkbox.isVisible().catch(() => false)) {
    await checkbox.click();
  }
}

test.describe("turnstile UI flow", () => {
  test("redirects from verify page after real turnstile validation", async ({
    context,
    page,
  }) => {
    await page.goto("/verify?returnTo=%2Fhome");
    await completeTurnstileChallenge(page);

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

    // 페이지 로드 시 자동으로 인증이 시작됨
    // interactive challenge가 나타나면 클릭, 아니면 no-op
    await completeTurnstileChallenge(page);

    // BFF 인증 완료 후 버튼이 활성화될 때까지 대기
    await expect(
      page.getByRole("button", { name: "카카오 계정으로 사주이야기 로그인" }),
    ).toBeEnabled({ timeout: 15_000 });

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
