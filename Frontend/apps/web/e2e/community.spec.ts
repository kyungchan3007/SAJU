import { expect, test, type Page } from "@playwright/test";

import {
  addAuthCookies,
  expectNoHorizontalOverflow,
  mockCurrentProjectApis,
} from "./support";

async function openCommunity(page: Page) {
  await page.goto("/community");
  await expect(
    page.getByRole("heading", { name: /나와 비슷한/i }),
  ).toBeVisible();
  await expect(page.getByLabel("사용할 닉네임")).toBeVisible();
}

async function completeNicknameCheck(page: Page, nickname = "민재") {
  await page.getByLabel("사용할 닉네임").fill(nickname);
  await page.getByRole("button", { name: "중복 확인" }).click();
  await expect(page.getByText("사용 가능한 닉네임이에요")).toBeVisible();
}

async function fillApplicationForm(page: Page) {
  await page.getByLabel("이름 *입금자명과 동일하게").fill("홍길동");
  await page.getByLabel("환불받을 은행 *환불 시에만 사용").fill("토스뱅크");
  await page.getByLabel("환불받을 계좌번호").fill("1002-123-456789");
  await page.getByLabel("환불 계좌 예금주").fill("홍길동");
  await page.getByLabel(/안전 규칙과 환불 정책/).check();
  await page.getByLabel(/개인정보 수집·이용에 동의합니다/).check();
}

test.describe("community application flow", () => {
  test.beforeEach(async ({ context, page, baseURL }) => {
    await addAuthCookies(context, baseURL);
    await mockCurrentProjectApis(page);
  });

  test("keeps the entry flow blocked until nickname check succeeds", async ({
    page,
  }) => {
    await openCommunity(page);

    await expect(
      page.getByRole("button", { name: "신청하기" }).last(),
    ).toBeDisabled();
    await page.getByLabel("사용할 닉네임").fill("민재");
    await expect(
      page.getByText("닉네임 중복 확인을 완료하면 신청할 수 있어요."),
    ).toBeVisible();

    await page.getByRole("button", { name: "중복 확인" }).click();
    await expect(page.getByText("사용 가능한 닉네임이에요")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "신청하기" }).last(),
    ).toBeEnabled();
  });

  test("disables nickname input while duplicate check is pending", async ({
    context,
    page,
    baseURL,
  }) => {
    await page.unrouteAll({ behavior: "ignoreErrors" });
    await addAuthCookies(context, baseURL);
    await mockCurrentProjectApis(page);
    await page.unroute("**/api/community/cohorts/*/nickname-check*");
    await page.route("**/api/community/cohorts/*/nickname-check*", async (route) => {
      await page.waitForTimeout(300);
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: { available: true },
          error: null,
        }),
      });
    });

    await openCommunity(page);
    const nicknameInput = page.getByLabel("사용할 닉네임");
    await nicknameInput.fill("민재");
    await page.getByRole("button", { name: "중복 확인" }).click();

    await expect(nicknameInput).toBeDisabled();
    await expect(page.getByText("닉네임 확인 중...")).toBeVisible();
    await expect(page.getByText("사용 가능한 닉네임이에요")).toBeVisible();
    await expect(nicknameInput).toBeEnabled();
  });

  test("shows unavailable cohort state when no open cohort exists", async ({
    context,
    page,
    baseURL,
  }) => {
    await page.unrouteAll({ behavior: "ignoreErrors" });
    await addAuthCookies(context, baseURL);
    await mockCurrentProjectApis(page, {
      communityCurrentCohort: null,
    });

    await openCommunity(page);

    await expect(page.getByText("아직 신청 가능한 회차가 열리지 않았어요")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "신청기간이 아니에요!" }),
    ).toBeDisabled();
    await expect(page.getByLabel("사용할 닉네임")).toBeDisabled();
    await expect(page.getByRole("button", { name: "중복 확인" })).toBeDisabled();
  });

  test("submits the join form with consent fields and shows completion", async ({
    context,
    page,
    baseURL,
  }) => {
    let joinPayload: unknown = null;

    await page.unrouteAll({ behavior: "ignoreErrors" });
    await addAuthCookies(context, baseURL);
    await mockCurrentProjectApis(page, {
      onCommunityJoin: (payload) => {
        joinPayload = payload;
      },
    });

    await openCommunity(page);
    await completeNicknameCheck(page);
    await page.getByRole("button", { name: "신청하기" }).last().click();

    await expect(page.getByText("신청 정보")).toBeVisible();
    await fillApplicationForm(page);
    await page.getByRole("button", { name: "신청 접수하기" }).click();

    await expect(page.getByText("신청이 접수됐어요")).toBeVisible();
    await expect(page.getByText("카카오뱅크 3333-12-1234567")).toBeVisible();
    expect(joinPayload).toMatchObject({
      cohortId: 1,
      nickname: "민재",
      depositorName: "홍길동",
      refundBankName: "토스뱅크",
      refundAccountNumber: "1002123456789",
      refundAccountHolder: "홍길동",
      refundPolicyAgreed: true,
      privacyAgreed: true,
    });
    await expectNoHorizontalOverflow(page);
  });

  test("redirects to verify when turnstile validation is required on submit", async ({
    context,
    page,
    baseURL,
  }) => {
    await page.unrouteAll({ behavior: "ignoreErrors" });
    await addAuthCookies(context, baseURL);
    await mockCurrentProjectApis(page);
    await page.route("**/api/community/join", async (route) => {
      await route.fulfill({
        status: 403,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          data: null,
          error: {
            code: "TURNSTILE_REQUIRED",
            message: "보안 인증이 필요합니다.",
          },
        }),
      });
    });

    await openCommunity(page);
    await completeNicknameCheck(page);
    await page.getByRole("button", { name: "신청하기" }).last().click();

    await fillApplicationForm(page);
    await page.getByRole("button", { name: "신청 접수하기" }).click();

    await expect(page).toHaveURL(/\/verify\?returnTo=%2Fcommunity$/);
  });
});
