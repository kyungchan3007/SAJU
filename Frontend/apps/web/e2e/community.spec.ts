import { expect, test, type Page } from "@playwright/test";
import {
  addAuthCookies,
  expectNoHorizontalOverflow,
  mockCurrentProjectApis,
} from "./support";

async function goToTopicsStep(page: Page) {
  await page.goto("/community");

  await page.getByRole("button", { name: /친구 모임/ }).click();
  await page.getByRole("button", { name: /다음으로/ }).click();
  await page.getByRole("textbox").first().fill("민재");
  await page.getByRole("combobox").first().selectOption("20대");
  await page.getByRole("textbox").nth(1).fill("010-1234-5678");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: /다음으로/ }).click();

  await expect(page.getByRole("heading", { name: /관심 주제 선택/ })).toBeVisible();
}

test.describe("community join flow", () => {
  test.beforeEach(async ({ context, page, baseURL }) => {
    await addAuthCookies(context, baseURL);
    await mockCurrentProjectApis(page);
  });

  test("locks the topic group that does not match selected meeting type", async ({
    page,
  }) => {
    await goToTopicsStep(page);

    await expect(page.getByText("친구 만들기 선택 주제")).toBeVisible();
    await expect(page.getByText("소개팅 선택 주제")).toBeVisible();
    await expect(page.getByText("친구 만들기 유형을 선택했어요.")).toBeVisible();
    await expect(
      page.getByRole("button", { name: /카페에서가볍게대화/ }),
    ).toBeDisabled();

    await page.getByRole("button", { name: /이전/ }).click();
    await page.getByRole("button", { name: /이전/ }).click();
    await page.getByRole("button", { name: /로테이션 소개팅/ }).click();
    await page.getByRole("button", { name: /다음으로/ }).click();
    await page.getByRole("button", { name: /다음으로/ }).click();

    await expect(page.getByText("소개팅 유형을 선택했어요.")).toBeVisible();
    await expect(
      page.getByRole("button", { name: /한강산책/ }),
    ).toBeDisabled();
  });

  test("shows selected topic summary and selection count", async ({ page }) => {
    await goToTopicsStep(page);

    await expect(page.getByText("선택한 주제", { exact: true })).toBeVisible();
    await expect(page.getByText("0/2 선택")).toBeVisible();
    await expect(page.getByText("아직 선택한 주제가 없습니다.")).toBeVisible();

    await page.getByRole("button", { name: /한강산책/ }).click();
    await expect(page.getByText("1/2 선택")).toBeVisible();
    await expect(
      page.locator("span", { hasText: "한강 산책" }).or(page.getByText("한강 산책")),
    ).toBeVisible();

    const friendTopicButtons = page
      .getByText("친구 만들기 선택 주제")
      .locator("..").locator("button");

    await friendTopicButtons.nth(1).click();
    await expect(page.getByText("2/2 선택")).toBeVisible();

    await friendTopicButtons.nth(2).click();
    await expect(
      page.getByText("관심 주제는 최대 2개까지 선택할 수 있어요."),
    ).toBeVisible();

    await page.getByRole("button", { name: /한강산책/ }).click();
    await expect(page.getByText("1/2 선택")).toBeVisible();
  });

  test("submits interest and shows joined count after completion", async ({
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

    await goToTopicsStep(page);

    await page.getByRole("button", { name: /한강산책/ }).click();
    await page
      .getByRole("button", { name: /커뮤니티 열리고 알림 받기/ })
      .click();

    await expect(page.getByText("관심 신청 완료!")).toBeVisible();
    await expect(page.getByText(/현재 23명이 관심 신청했어요/)).toBeVisible();
    expect(joinPayload).toMatchObject({
      cohortId: 1,
      nickname: "민재",
      ageGroup: "20대",
      phoneNumber: "01012345678",
      privacyConsent: true,
      interestType: "친구모임",
      interestOptions: ["한강 산책"],
    });
    await expectNoHorizontalOverflow(page);
  });

  test("shows topic loading failure when interests API fails", async ({
    context,
    page,
    baseURL,
  }) => {
    await page.unrouteAll({ behavior: "ignoreErrors" });
    await addAuthCookies(context, baseURL);
    await mockCurrentProjectApis(page, { communityInterestsStatus: 500 });

    await goToTopicsStep(page);

    await expect(
      page.getByText("관심 주제 목록을 불러오지 못했어요."),
    ).toBeVisible();
  });
});




