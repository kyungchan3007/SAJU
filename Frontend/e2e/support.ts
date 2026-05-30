import { expect, type BrowserContext, type Page } from "@playwright/test";

type Partner = {
  id: number;
  name: string;
  birthDate: string;
  birthTime: string | null;
  gender: "MALE" | "FEMALE";
  calendarType: "SOLAR" | "LUNAR";
  city: string | null;
};

type ApiMockOptions = {
  partners?: Partner[];
  onMySajuUpdate?: (payload: unknown) => void;
  onPartnerCreate?: (payload: unknown) => void;
  onPartnerUpdate?: (partnerId: number, payload: unknown) => void;
  onPartnerDelete?: (partnerId: number) => void;
};

export const mySajuProfile = {
  email: "e2e@example.com",
  nickname: "이투이",
  birthDate: "1992-03-14",
  birthTime: "09:30",
  gender: "MALE",
  calendarType: "SOLAR",
  city: "서울특별시",
};

export const defaultPartners: Partner[] = [
  {
    id: 101,
    name: "영희",
    birthDate: "1993-04-15",
    birthTime: "13:00",
    gender: "FEMALE",
    calendarType: "SOLAR",
    city: "부산광역시",
  },
];

export async function addAuthCookies(
  context: BrowserContext,
  baseURL?: string,
) {
  const url = baseURL ?? "http://127.0.0.1:3100";

  await context.addCookies([
    { name: "saju_access_token", value: "e2e-access-token", url },
    { name: "saju_user_email", value: "e2e@example.com", url },
  ]);
}

export async function mockCurrentProjectApis(
  page: Page,
  options: ApiMockOptions = {},
) {
  let partners = options.partners ?? [...defaultPartners];

  await page.route("**/api/users/me", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: {
          id: 1,
          email: "e2e@example.com",
          nickname: "이투이",
          status: "ACTIVE",
        },
        error: null,
      }),
    });
  });

  await page.route("**/api/saju/result", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: {
          todayScore: 82,
          mood: "차분한 집중",
          goodTime: "오전",
          weakElement: "water",
          fiveElements: { 목: 20, 화: 25, 토: 30, 금: 15, 수: 10 },
        },
        error: null,
      }),
    });
  });

  await page.route("**/api/saju/me", async (route) => {
    const method = route.request().method();

    if (method === "GET") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: mySajuProfile,
          error: null,
        }),
      });
      return;
    }

    if (method === "PUT") {
      const payload = route.request().postDataJSON();
      options.onMySajuUpdate?.(payload);
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: { sajuId: 1, traits: traditionalSaju.data.traits },
          error: null,
        }),
      });
      return;
    }

    await route.fallback();
  });

  await page.route("**/api/saju/traditional", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(traditionalSaju),
    });
  });

  await page.route("**/api/saju/zodiac-compatibility", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(zodiacCompatibility),
    });
  });

  await page.route("**/api/saju/me/compatibility/*", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(compatibilityResult),
    });
  });

  await page.route("**/api/partners**", async (route) => {
    const request = route.request();
    const method = request.method();
    const url = new URL(request.url());
    const idMatch = url.pathname.match(/\/api\/partners\/(\d+)$/);

    if (method === "GET" && url.pathname === "/api/partners") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: { partners },
          error: null,
        }),
      });
      return;
    }

    if (method === "POST" && url.pathname === "/api/partners") {
      const payload = request.postDataJSON() as Omit<Partner, "id">;
      options.onPartnerCreate?.(payload);
      const created = { ...payload, id: 202 };
      partners = [...partners, created];
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, data: created, error: null }),
      });
      return;
    }

    if (method === "PATCH" && idMatch) {
      const partnerId = Number(idMatch[1]);
      const payload = request.postDataJSON() as Partial<Partner>;
      options.onPartnerUpdate?.(partnerId, payload);
      partners = partners.map((partner) =>
        partner.id === partnerId ? { ...partner, ...payload } : partner,
      );
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: partners.find((partner) => partner.id === partnerId),
          error: null,
        }),
      });
      return;
    }

    if (method === "DELETE" && idMatch) {
      const partnerId = Number(idMatch[1]);
      options.onPartnerDelete?.(partnerId);
      partners = partners.filter((partner) => partner.id !== partnerId);
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: { deleted: true },
          error: null,
        }),
      });
      return;
    }

    await route.fallback();
  });
}

export async function expectNoHorizontalOverflow(page: Page) {
  const hasNoOverflow = await page.evaluate(() => {
    const root = document.documentElement;
    return root.scrollWidth <= root.clientWidth;
  });

  expect(hasNoOverflow).toBe(true);
}

export async function clickVisibleLink(page: Page, href: string) {
  const clicked = await page.locator(`a[href="${href}"]`).evaluateAll((links) => {
    const link = links.find((candidate) => {
      const style = window.getComputedStyle(candidate);
      const rect = candidate.getBoundingClientRect();
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        rect.width > 0 &&
        rect.height > 0
      );
    });

    if (!(link instanceof HTMLElement)) {
      return false;
    }

    link.click();
    return true;
  });

  expect(clicked).toBe(true);
}

export async function expectVisibleLink(page: Page, href: string) {
  const visibleCount = await page.locator(`a[href="${href}"]`).evaluateAll(
    (links) =>
      links.filter((candidate) => {
        const style = window.getComputedStyle(candidate);
        const rect = candidate.getBoundingClientRect();
        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          rect.width > 0 &&
          rect.height > 0
        );
      }).length,
  );

  expect(visibleCount).toBeGreaterThan(0);
}

const traditionalSaju = {
  success: true,
  data: {
    sajuId: 1,
    traits: {
      summaryZodiac: "원숭이띠",
      summaryStrength: "신약",
      geokguk: "정관격",
      yongshinPrimary: "수",
      yongshinSecondary: "목",
      summaryPillars: "일주를 중심으로 차분하게 균형을 잡는 명식입니다.",
    },
    pillars: [
      { type: "year", stem: "갑", branch: "자", twelveGrowth: "장생" },
      { type: "month", stem: "병", branch: "인", twelveGrowth: "건록" },
      { type: "day", stem: "무", branch: "진", twelveGrowth: "관대" },
      { type: "hour", stem: "경", branch: "신", twelveGrowth: "제왕" },
    ],
    fiveElements: {
      elements: { 목: 20, 화: 25, 토: 30, 금: 15, 수: 10 },
      yongshinPrimary: "수",
      yongshinSecondary: "목",
    },
    twelveGrowthInfo: {
      year: {
        hanja: "長生",
        meaning: "장생",
        description: "시작과 성장의 기운",
      },
      month: {
        hanja: "建祿",
        meaning: "건록",
        description: "기반을 세우는 기운",
      },
      day: {
        hanja: "冠帶",
        meaning: "관대",
        description: "책임과 성숙의 기운",
      },
      hour: { hanja: "帝旺", meaning: "제왕", description: "강한 추진의 기운" },
    },
    bigLuck: [
      {
        pillar: "갑자",
        pillar_kor: "갑자",
        year_range: "2024-2033",
        age_range: "33-42세",
        isCurrentDaeun: true,
      },
    ],
  },
  error: null,
};

const zodiacCompatibility = {
  success: true,
  data: {
    zodiacCompatibility: {
      monkey: {
        score: 95,
        grade: "best",
        relation: "동띠",
        description: "같은 기운을 공유하는 관계입니다.",
      },
      rat: {
        score: 92,
        grade: "best",
        relation: "삼합",
        description: "함께 움직일 때 성과가 커집니다.",
      },
      tiger: {
        score: 35,
        grade: "caution",
        relation: "충",
        description: "속도 차이를 조율해야 합니다.",
      },
    },
  },
  error: null,
};

const compatibilityResult = {
  success: true,
  data: {
    status: "COMPLETE",
    summary: {
      overallScore: 86,
      keyword: "따뜻한 균형",
      description: "서로의 속도를 존중하면 안정적으로 깊어지는 궁합입니다.",
    },
    sections: [
      {
        key: "love",
        title: "연인궁합",
        score: 88,
        keyword: "설렘",
        content: "감정 표현의 온도가 잘 맞습니다.",
      },
      {
        key: "communication",
        title: "소통궁합",
        score: 82,
        keyword: "대화",
        content: "중요한 이야기를 차분히 풀어가기 좋습니다.",
      },
    ],
  },
  error: null,
};
