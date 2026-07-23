import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

import {
  addAuthCookies,
  mockCurrentProjectApis,
} from "./support";

const publicRoutes = [
  "/home",
  "/preview/traditional-saju",
  "/preview/year-fortune",
  "/preview/compatibility",
] as const;

const authenticatedRoutes = [
  "/mypage",
  "/mypage/traditional-fortune",
  "/mypage/year-fortune",
  "/mypage/personality",
] as const;

test.describe("accessibility audit", () => {
  for (const route of publicRoutes) {
    test(`has no critical axe violations on ${route}`, async ({ page }) => {
      await mockCurrentProjectApis(page);
      await page.goto(route);
      await assertNoAxeViolations(page, route);
    });
  }

  for (const route of authenticatedRoutes) {
    test(`has no critical axe violations on ${route}`, async ({
      context,
      page,
      baseURL,
    }) => {
      await addAuthCookies(context, baseURL);
      await mockCurrentProjectApis(page);
      await page.goto(route);
      await assertNoAxeViolations(page, route);
    });
  }
});

async function assertNoAxeViolations(page: Page, route: string) {
  const results = await new AxeBuilder({ page }).analyze();

  const formattedViolations = results.violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    description: violation.description,
    help: violation.help,
    nodes: violation.nodes.map((node) => ({
      target: node.target,
      failureSummary: node.failureSummary,
    })),
  }));

  expect(
    formattedViolations,
    `${route} accessibility violations:\n${JSON.stringify(formattedViolations, null, 2)}`,
  ).toEqual([]);
}
