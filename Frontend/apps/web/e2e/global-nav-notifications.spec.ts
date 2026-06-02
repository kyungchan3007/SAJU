import { expect, test } from "@playwright/test";

import { addAuthCookies, mockCurrentProjectApis } from "./support";

test.describe("global nav notifications", () => {
  test("shows unread count and notification list on bell hover", async ({
    context,
    page,
    baseURL,
  }) => {
    await addAuthCookies(context, baseURL);
    await mockCurrentProjectApis(page);

    await page.goto("/home");

    const bell = page.getByRole("button", { name: "알림" });
    await expect(bell).toBeVisible();
    await expect(bell.locator("span", { hasText: "1" })).toBeVisible();

    await bell.hover();

    await expect(page.getByText("알림").last()).toBeVisible();
    await expect(page.getByText("안읽음 1")).toBeVisible();
    await expect(page.getByText("새 기능이 열렸어요")).toBeVisible();
    await expect(page.getByText("서비스 점검 안내")).toBeVisible();
    await expect(page.getByText("안읽음", { exact: true })).toBeVisible();
    await expect(page.getByText("읽음", { exact: true })).toBeVisible();
  });

  test("marks an unread notification as read from the list", async ({
    context,
    page,
    baseURL,
  }) => {
    const readRequests: number[] = [];

    await addAuthCookies(context, baseURL);
    await mockCurrentProjectApis(page, {
      onNotificationRead: (notificationId) => readRequests.push(notificationId),
    });

    await page.goto("/home");

    const bell = page.getByRole("button", { name: "알림" });
    await bell.hover();

    await page.getByRole("button", { name: /새 기능이 열렸어요/ }).click();

    await expect.poll(() => readRequests).toEqual([301]);
    await expect(page.getByText("안읽음 1")).toHaveCount(0);
    await expect(page.getByRole("button", { name: /새 기능이 열렸어요/ })).toBeDisabled();
  });
});
