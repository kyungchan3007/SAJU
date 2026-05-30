import { expect, test } from "@playwright/test";
import { expectNoHorizontalOverflow } from "./support";

test.describe("community join flow", () => {
  test("locks the topic group that does not match selected meeting type", async ({
    page,
  }) => {
    await page.goto("/community");

    await page.getByRole("button", { name: /친구 모임/ }).click();
    await page.getByRole("button", { name: "다음으로 →" }).click();
    await page.getByLabel("사용할 닉네임").fill("햇살");
    await page.getByLabel("연령대", { exact: true }).selectOption("20대");
    await page.getByLabel("휴대폰 번호", { exact: true }).fill("010-1234-5678");
    await page.getByRole("checkbox", { name: /수집·이용/ }).check();
    await page.getByRole("button", { name: "다음으로 →" }).click();

    await expect(page.getByText("친구 모임을 선택하셨나요?")).toBeVisible();
    await expect(page.getByText("소개팅을 선택하셨나요?")).toBeVisible();
    await expect(page.getByText("친구 모임 유형을 선택했어요")).toBeVisible();
    await expect(
      page.getByRole("button", { name: /카페에서/ }),
    ).toBeDisabled();

    await page.getByRole("button", { name: "← 이전" }).click();
    await page.getByRole("button", { name: "← 이전" }).click();
    await page.getByRole("button", { name: /로테이션 소개팅/ }).click();
    await page.getByRole("button", { name: "다음으로 →" }).click();
    await page.getByRole("button", { name: "다음으로 →" }).click();

    await expect(page.getByText("소개팅을 선택하셨나요?")).toBeVisible();
    await expect(page.getByText("친구 모임을 선택하셨나요?")).toBeVisible();
    await expect(page.getByText("소개팅 유형을 선택했어요")).toBeVisible();
    await expect(
      page.getByRole("button", { name: /한강 산책/ }),
    ).toBeDisabled();
  });

  test("submits interest and shows joined count after completion", async ({
    page,
  }) => {
    let joinPayload: unknown = null;
    let cohortsRequestCount = 0;

    await page.route("**/api/community/join", async (route) => {
      joinPayload = route.request().postDataJSON();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: {
            memberId: 55,
            cohortId: 1,
            joinDate: "2026년 05월 30일",
            message: "커뮤니티에 참가 신청이 완료되었습니다.",
          },
          error: null,
        }),
      });
    });

    await page.route("**/api/community/cohorts", async (route) => {
      cohortsRequestCount += 1;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: [{ cohortId: 1, name: "1기", capacity: 30, currentCount: 23 }],
          error: null,
        }),
      });
    });

    await page.goto("/community");

    await expect(
      page.getByRole("heading", { name: /사람들과 연결되어보세요/ }),
    ).toBeVisible();
    expect(cohortsRequestCount).toBe(0);

    await page.getByRole("button", { name: /친구 모임/ }).click();
    await page.getByRole("button", { name: "다음으로 →" }).click();

    await page.getByLabel("사용할 닉네임").fill("햇살");
    await page.getByLabel("연령대", { exact: true }).selectOption("20대");
    await page.getByLabel("휴대폰 번호", { exact: true }).fill("010-1234-5678");
    await page.getByRole("checkbox", { name: /수집·이용/ }).check();
    await page.getByRole("button", { name: "다음으로 →" }).click();

    await page.getByRole("button", { name: /한강 산책/ }).click();
    await page
      .getByRole("button", { name: /관심 남기고 알림 받기/ })
      .click();

    await expect(page.getByText("관심 신청 완료!")).toBeVisible();
    await expect(page.getByText("현재 23명이 관심 신청했어요")).toBeVisible();
    expect(joinPayload).toMatchObject({
      cohortId: 1,
      nickname: "햇살",
      ageGroup: "20대",
      phoneNumber: "01012345678",
      privacyConsent: true,
      interestType: "친구모임",
      interestOptions: ["한강 산책"],
    });
    expect(cohortsRequestCount).toBe(1);
    await expectNoHorizontalOverflow(page);
  });
});
