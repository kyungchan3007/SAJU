import { expect, test } from "@playwright/test";
import { addAuthCookies } from "./support";

test.describe("auth protected routing", () => {
  test("redirects guests away from protected mypage routes", async ({
    page,
  }) => {
    await page.goto("/mypage");
    await expect(page).toHaveURL(/\/login\?next=\/mypage$/);

    await page.goto("/mypage/jeongtongsaju");
    await expect(page).toHaveURL(/\/login\?next=\/mypage$/);

    await page.goto("/mypage/saju-manage");
    await expect(page).toHaveURL(/\/login\?next=\/mypage$/);
  });

  test("redirects guests away from protected saju result", async ({ page }) => {
    await page.goto("/saju/result");

    await expect(page).toHaveURL(/\/login$/);
  });

  test("redirects authenticated users from saju input to result", async ({
    context,
    page,
    baseURL,
  }) => {
    await addAuthCookies(context, baseURL);

    await page.goto("/saju");

    await expect(page).toHaveURL(/\/saju\/result$/);
  });
});
