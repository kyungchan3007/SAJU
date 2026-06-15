import { expect, test } from "@playwright/test";

import {
  addAuthCookies,
  expectNoHorizontalOverflow,
  mockCurrentProjectApis,
} from "./support";

test.describe("food recommend current flow", () => {
  test.beforeEach(async ({ context, page, baseURL }) => {
    await addAuthCookies(context, baseURL);
    await mockCurrentProjectApis(page);
  });

  test("shows today's menu recommendation from BFF data", async ({
    page,
  }) => {
    await page.goto("/food");

    await expect(page.getByText("분석 중")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "오늘의 메뉴 보기" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "오늘의 메뉴 보기" }).click();

    await expect(page.getByText("오늘의 메뉴 추천")).toBeVisible();
    await expect(page.getByText("토(土) 기운이 강한 날")).toBeVisible();
    await expect(page.getByText("오늘의 추천 메뉴")).toBeVisible();
    await expect(page.getByText("비빔밥")).toBeVisible();

    await page.getByRole("button", { name: /우동/ }).click();
    await expectNoHorizontalOverflow(page);
  });

  test("exposes today's menu entry from global navigation", async ({ page }) => {
    await page.goto("/home");

    // 모바일에서는 nav 링크가 숨김 처리되므로 DOM 존재 여부만 확인
    await expect(page.locator('a[href="/food"]').first()).toBeAttached();
  });
});
