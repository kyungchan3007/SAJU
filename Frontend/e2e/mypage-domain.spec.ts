import { expect, test } from "@playwright/test";
import {
  addAuthCookies,
  expectNoHorizontalOverflow,
  mockCurrentProjectApis,
} from "./support";

test.describe("mypage domain smoke", () => {
  test.beforeEach(async ({ context, page, baseURL }) => {
    await addAuthCookies(context, baseURL);
    await mockCurrentProjectApis(page);
  });

  test("shows current mypage dashboard menus", async ({ page }) => {
    await page.goto("/mypage");

    await expect(page.getByText("전체 메뉴")).toBeVisible();
    await expect(page.getByText("사주정보 관리")).toBeVisible();
    await expect(page.getByText("띠별궁합")).toBeVisible();
    await expect(page.getByText("계정 관리")).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test("shows traditional saju sections with current terminology", async ({
    page,
  }) => {
    await page.goto("/mypage/jeongtongsaju");

    await expect(page).toHaveURL(/\/mypage\/traditional-fortune$/);
    await expect(page.getByRole("heading", { name: "명식 리포트" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "나의 사주팔자" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "오행 분포도" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "12운성 분석" })).toBeVisible();
    await expect(page.getByText("대운 흐름")).toBeVisible();
    await expect(page.getByText("만세력")).toHaveCount(0);
    await expectNoHorizontalOverflow(page);
  });

  test("shows zodiac compatibility with shared badge and progress UI", async ({
    page,
  }) => {
    await page.goto("/mypage/zodiac-compatibility");

    await expect(page.getByText("띠별궁합").first()).toBeVisible();
    await expect(page.getByText("나의 띠", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("12간지 궁합")).toBeVisible();
    await expect(page.getByText("원숭이띠", { exact: true }).first()).toBeVisible();
    await expect(page.getByRole("progressbar").first()).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });
});
