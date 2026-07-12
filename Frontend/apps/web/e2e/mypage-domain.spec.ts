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
    await expect(page.getByText("임인")).toBeVisible();
    await expect(page.getByText("신약(身弱)")).toBeVisible();
    await expect(page.getByText("정관격")).toBeVisible();
    await expect(page.getByText("금 (金)")).toBeVisible();
    await expect(page.getByText("수 (水)")).toBeVisible();
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

  test("shows zodiac compatibility with shared progress UI", async ({
    page,
  }) => {
    await page.goto("/mypage/zodiac-compatibility");

    await expect(page.getByText("나의 띠", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("원숭이띠", { exact: true }).first()).toBeVisible();
    await expect(page.getByRole("progressbar").first()).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test("shows my community application with a cancel CTA when the membership is cancelable", async ({
    context,
    page,
    baseURL,
  }) => {
    await page.unrouteAll({ behavior: "ignoreErrors" });
    await addAuthCookies(context, baseURL);
    await mockCurrentProjectApis(page, {
      communityMemberships: [
        {
          memberId: 41,
          cohortId: 1,
          status: "APPLIED",
          feeAmount: 50000,
        },
      ],
    });

    await page.goto("/mypage");

    await expect(page.getByText("내 신청")).toBeVisible();
    await expect(page.getByText("입금 대기")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "참가 취소 요청" }),
    ).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test("updates the mypage application state after a successful cancel request", async ({
    context,
    page,
    baseURL,
  }) => {
    await page.unrouteAll({ behavior: "ignoreErrors" });
    await addAuthCookies(context, baseURL);
    await mockCurrentProjectApis(page, {
      communityMemberships: [
        {
          memberId: 42,
          cohortId: 1,
          status: "APPLIED",
          feeAmount: 50000,
        },
      ],
    });

    await page.goto("/mypage");

    await page.getByRole("button", { name: "참가 취소 요청" }).click();
    await expect(
      page.getByRole("heading", { name: "참가 취소 요청" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "취소 요청하기" }).click();

    await expect(page.getByText("취소됨")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "참가 취소 요청" }),
    ).toHaveCount(0);
  });

  test("redirects to verify with the mypage return path when turnstile validation is required on cancel", async ({
    context,
    page,
    baseURL,
  }) => {
    await page.unrouteAll({ behavior: "ignoreErrors" });
    await addAuthCookies(context, baseURL);
    await mockCurrentProjectApis(page, {
      communityMemberships: [
        {
          memberId: 43,
          cohortId: 1,
          status: "DEPOSIT_CONFIRMED",
          feeAmount: 50000,
        },
      ],
      communityCancelStatus: 403,
    });

    await page.goto("/mypage");

    await page.getByRole("button", { name: "참가 취소 요청" }).click();
    await page.getByRole("button", { name: "취소 요청하기" }).click();

    await expect(page).toHaveURL(/\/verify\?returnTo=%2Fmypage$/);
  });
});
