import { expect, test } from "@playwright/test";
import {
  addAuthCookies,
  expectNoHorizontalOverflow,
  expectVisibleLink,
  mockCurrentProjectApis,
} from "./support";

test.describe("food recommend current flow", () => {
  test.beforeEach(async ({ context, page, baseURL }) => {
    await addAuthCookies(context, baseURL);
    await mockCurrentProjectApis(page);
  });

  test("shows today's menu recommendation from BFF data", async ({ page }) => {
    await page.goto("/food");

    await expect(page.getByText("오늘의 메뉴 추천")).toBeVisible();
    await expect(page.getByText("토(土) 기운이 강한 날")).toBeVisible();
    await expect(page.getByText("오늘의 추천 메뉴")).toBeVisible();
    await expect(page.getByText("비빔밥")).toBeVisible();
    await expect(page.getByText("오늘은 이런 음식을 줄여요")).toBeVisible();
    await expect(page.getByText("튀김")).toBeVisible();
    await expect(page.getByText("오늘 장봐야 한다면")).toBeVisible();
    await expect(page.getByText("# 나물")).toBeVisible();

    await page.getByRole("button", { name: /우동/ }).click();
    await expect(
      page.getByText("💡 따뜻한 국물이 수 기운의 차분함을 보완해줘요."),
    ).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test("exposes today's menu entry from global navigation", async ({ page }) => {
    await page.goto("/home");

    await expectVisibleLink(page, "/food");
  });
});
