import { expect, test } from "@playwright/test";
import {
  addAuthCookies,
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
    await expect(page).toHaveURL(/\/compatibility$/);
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
    await expectVisibleLink(page, "/mypage");
  });
});
