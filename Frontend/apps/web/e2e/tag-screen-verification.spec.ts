import { expect, test } from "@playwright/test";

import {
  addAuthCookies,
  expectNoHorizontalOverflow,
  mockCurrentProjectApis,
} from "./support";

test.describe("tag accessibility screen verification", () => {
  test("renders public routes touched by the accessibility tag updates", async ({
    page,
  }) => {
    await mockCurrentProjectApis(page);

    await page.goto("/home");
    await expect(
      page.getByRole("link", { name: "본문으로 바로가기" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /커뮤니티 참가하기/i }),
    ).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.goto("/saju");
    await expect(
      page.getByRole("button", { name: /입력 전 확인하세요/i }),
    ).toBeVisible();
    await expect(page.getByText("출생 시간을 모르시나요?")).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.goto("/preview/traditional-saju");
    await expect(
      page.getByRole("heading", { name: "정통사주 풀이" }),
    ).toBeVisible();
    await expect(page.getByText("명식 리포트")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "대운 흐름" }),
    ).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.goto("/preview/year-fortune");
    await expect(
      page.getByRole("heading", { name: "2026년 신년운세" }),
    ).toBeVisible();
    await expect(page.getByText("영역별 운세")).toBeVisible();
    await expect(page.getByText("월별 운세")).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.goto("/preview/compatibility");
    await expect(
      page.getByRole("heading", { name: "사주 궁합" }),
    ).toBeVisible();
    await expect(page.getByText("분야별 상세 풀이")).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test("renders authenticated routes touched by the accessibility tag updates", async ({
    context,
    page,
    baseURL,
  }) => {
    await addAuthCookies(context, baseURL);
    await mockCurrentProjectApis(page);
    await context.route("**/api/saju/me/year**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: {
            status: "COMPLETE",
            targetYear: 2026,
            yearLabel: "2026년",
            userInfo: {
              manse: "양력",
              gender: "MALE",
              birthYear: 1992,
              daeun: "갑자대운",
            },
            general: {
              title: "총운",
              content: "흐름을 정리하면 하반기에 성과가 드러납니다.",
            },
            wealth: {
              title: "재물운",
              content: "지출을 통제하면 안정적으로 쌓입니다.",
            },
            relationship: {
              title: "애정운",
              content: "대화를 먼저 여는 편이 좋습니다.",
            },
            careerBusiness: {
              title: "직업운",
              content: "정리된 실행이 성과로 이어집니다.",
            },
            familyHealth: {
              title: "건강운",
              content: "무리하지 않는 루틴이 중요합니다.",
            },
            monthlyFortunes: [
              {
                month: 1,
                label: "길",
                fortune: "연초에는 정리한 계획을 실행하기 좋습니다.",
              },
            ],
          },
          error: null,
          meta: {
            backendStatus: 200,
            backendMessage: "success",
            backendErrorCode: null,
          },
        }),
      });
    });

    await page.goto("/community");
    await expect(
      page.getByRole("heading", { name: /나와 비슷한/i }),
    ).toBeVisible();
    await expect(page.getByLabel("사용할 닉네임")).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.goto("/food");
    await expect(
      page.getByRole("button", { name: "오늘의 메뉴 보기" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "오늘의 메뉴 보기" }).click();
    await expect(page.getByText("오늘의 메뉴 추천")).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.goto("/mypage");
    await expect(page.getByText("전체 메뉴")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "관리", exact: true }),
    ).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.goto("/mypage/saju-manage");
    await expect(
      page.getByRole("heading", { name: /사주 정보 관리/ }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: /편집|완료/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /1993년생/ })).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.goto("/mypage/traditional-fortune");
    await expect(page.getByText("대운 흐름")).toBeVisible();
    await expect(page.getByText("명식 리포트")).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.goto("/mypage/year-fortune");
    await expect(page.getByRole("progressbar")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "사주결과 보기" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "사주결과 보기" }).click();
    await expect(page.getByText("2026년")).toBeVisible();
    await expect(page.getByText("월별 운세")).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.goto("/mypage/personality");
    await expect(
      page.getByRole("button", { name: "상세 성향 리포트 보기" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "상세 성향 리포트 보기" }).click();
    await expect(page.getByText("연애 성향")).toBeVisible();
    await expect(page.getByText("직업 성향")).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });
});
