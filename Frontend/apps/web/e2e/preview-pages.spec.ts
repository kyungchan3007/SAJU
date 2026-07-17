import { expect, test } from "@playwright/test";

import {
  clickVisibleLink,
  expectNoHorizontalOverflow,
  mockCurrentProjectApis,
} from "./support";

test.describe("public preview pages", () => {
  test.beforeEach(async ({ page }) => {
    await mockCurrentProjectApis(page);
  });

  test("opens preview CTAs from the public root page", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "정통사주 분석" }),
    ).toBeVisible();

    await clickVisibleLink(page, "/preview/traditional-saju");
    await expect(page).toHaveURL(/\/preview\/traditional-saju$/);

    await page.goto("/");
    await clickVisibleLink(page, "/preview/year-fortune");
    await expect(page).toHaveURL(/\/preview\/year-fortune$/);

    await page.goto("/");
    await clickVisibleLink(page, "/preview/compatibility");
    await expect(page).toHaveURL(/\/preview\/compatibility$/);
  });

  test("renders the traditional saju preview with its main SSR content", async ({
    page,
  }) => {
    await page.goto("/preview/traditional-saju");

    await expect(
      page.getByText("정통사주 공개 예시", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "정통사주 풀이" }),
    ).toBeVisible();
    await expect(page.getByText("명식 리포트")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "오행 분포도" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "정통사주 풀이 보러가기" }),
    ).toHaveAttribute("href", "/mypage/traditional-fortune");
    await expectNoHorizontalOverflow(page);
  });

  test("renders the year fortune preview and switches domain tabs", async ({
    page,
  }) => {
    await page.goto("/preview/year-fortune");

    await expect(
      page.getByText("신년운세 공개 예시", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "2026년 신년운세" }),
    ).toBeVisible();
    await expect(page.getByText("2026년 병오년", { exact: true })).toBeVisible();
    await expect(page.getByText("영역별 운세", { exact: true })).toBeVisible();

    await page
      .locator("button")
      .filter({ hasText: "재물운" })
      .first()
      .click();
    await expect(
      page.getByText("기존 자산을 안정적으로 관리하는 흐름이 좋고"),
    ).toBeVisible();

    await expect(
      page.getByRole("link", { name: "신년운세 보러가기" }),
    ).toHaveAttribute("href", "/mypage/year-fortune");
    await expectNoHorizontalOverflow(page);
  });

  test("renders the compatibility preview and updates detail tabs", async ({
    page,
  }) => {
    await page.goto("/preview/compatibility");

    await expect(page.getByText("궁합 공개 예시", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "사주 궁합" })).toBeVisible();
    await expect(page.getByText("궁합 대상")).toBeVisible();
    await expect(page.getByText("종합 궁합 점수")).toBeVisible();

    await page
      .locator("button")
      .filter({ hasText: "갈등요인" })
      .last()
      .click();
    await expect(page.getByText("결정 속도 차이 주의").last()).toBeVisible();
    await expect(
      page.getByText("갈등의 핵심은 의견 차이보다 속도 차이인 경우가 많으므로"),
    ).toBeVisible();

    await expect(
      page.getByRole("link", { name: "무료 궁합 보러가기" }),
    ).toHaveAttribute("href", "/compatibility");
    await expectNoHorizontalOverflow(page);
  });
});
