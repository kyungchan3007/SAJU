import { expect, test } from "@playwright/test";

import {
  addAuthCookies,
  addSajuDailyCacheCookie,
  mockCurrentProjectApis,
} from "./support";

test.describe("saju result flow", () => {
  test("reveals the daily saju result after the progress gate", async ({
    context,
    page,
    baseURL,
  }) => {
    await addAuthCookies(context, baseURL);
    await addSajuDailyCacheCookie(context, baseURL);
    await mockCurrentProjectApis(page);

    await page.goto("/saju/result");

    await expect(page.getByRole("button", { name: "사주결과 보기" })).toBeVisible();
    await page.getByRole("button", { name: "사주결과 보기" }).click();

    await expect(
      page.getByRole("heading", { name: "오늘의 운세" }),
    ).toBeVisible();
    await expect(page.getByText("82점")).toBeVisible();
    await expect(page.getByText("좋은 시간")).toBeVisible();
  });
});
