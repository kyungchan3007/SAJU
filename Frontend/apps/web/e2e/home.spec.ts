import { expect, test } from "@playwright/test";
import {
  addAuthCookies,
  addRefreshOnlyCookie,
  clickVisibleLink,
  expectNoHorizontalOverflow,
  expectVisibleLink,
  mockCurrentProjectApis,
} from "./support";

test.describe("home and auth entry smoke", () => {
  test.beforeEach(async ({ page }) => {
    await mockCurrentProjectApis(page);
  });

  test("shows current home sections and public CTAs", async ({ page }) => {
    await page.goto("/home");

    await expect(
      page.getByRole("heading", {
        name: "정통사주 분석",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /무료 사주 풀이/ }).first(),
    ).toBeVisible();
    await expectVisibleLink(page, "/compatibility");
    await expect(page.getByText("나의 오행 분석")).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test("routes public CTA links to saju input and compatibility", async ({
    page,
  }) => {
    await page.goto("/home");

    await page
      .getByRole("link", { name: /무료 사주 풀이/ })
      .first()
      .click();
    await expect(page).toHaveURL(/\/saju$/);

    await page.goto("/home");
    await clickVisibleLink(page, "/compatibility");
    await expect(page).toHaveURL(/\/login\?next=%2Fcompatibility$/);

    await page.goto("/home");
    await clickVisibleLink(page, "/mypage/traditional-fortune");
    await expect(page).toHaveURL(/\/login\?next=\/mypage$/);

    await page.goto("/home");
    await clickVisibleLink(page, "/community");
    await expect(page).toHaveURL(/\/login\?next=%2Fcommunity$/);
  });

  test("shows guest and authenticated global navigation states", async ({
    context,
    page,
    baseURL,
  }) => {
    await page.goto("/home");
    await clickVisibleLink(page, "/login");
    await expect(page).toHaveURL(/\/login$/);

    await addAuthCookies(context, baseURL);
    await page.goto("/home");

    await expect(page.getByRole("link", { name: "로그인" })).toHaveCount(0);
    // 모바일에서는 nav 링크가 숨김 처리되므로 DOM 존재 여부만 확인
    await expect(page.locator('a[href="/mypage"]').first()).toBeAttached();
  });

  test("falls back to root when refresh-only recovery fails on home", async ({
    context,
    page,
    baseURL,
  }) => {
    await addRefreshOnlyCookie(context, baseURL);
    await page.route("**/api/auth/refresh", async (route) => {
      await route.fulfill({
        status: 401,
        contentType: "application/json",
        headers: {
          "Set-Cookie":
            "saju_refresh_token=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax",
        },
        body: JSON.stringify({
          success: false,
          data: null,
          error: {
            code: "TOKEN_REFRESH_FAILED",
            message: "재로그인이 필요합니다.",
          },
        }),
      });
    });

    await page.goto("/home");

    await expect(page).toHaveURL(/\/$/);
  });

  test("shows a saju input prompt instead of backend pending-form english error", async ({
    context,
    page,
    baseURL,
  }) => {
    await addAuthCookies(context, baseURL);
    await page.route("**/api/saju/result", async (route) => {
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          data: null,
          error: {
            code: "PENDING_FORM_NOT_FOUND",
            message: "First-time post requires pending saju form.",
          },
        }),
      });
    });

    await page.goto("/home");

    await expect(page.getByText("사주 정보를 입력해주세요.")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "사주 입력하기" }),
    ).toHaveAttribute("href", "/saju");
    await expect(
      page.getByText("First-time post requires pending saju form."),
    ).toHaveCount(0);
  });
});
