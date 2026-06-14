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

type SajuProfileMock = {
  email: string;
  nickname: string;
  birthDate: string;
  birthTime: string | null;
  gender: "MALE" | "FEMALE";
  calendarType: "SOLAR" | "LUNAR";
  city: string | null;
  sajuAnalysis:
    | {
        ilju: string;
        strength: string;
        geokguk: string;
        yongshin: string;
        assistYongshin: string;
      }
    | null;
};

type ApiMockOptions = {
  sajuProfile?: SajuProfileMock;
  partners?: Partner[];
  notifications?: NotificationMock[];
  communityInterests?: CommunityInterestMock[];
  communityInterestsStatus?: number;
  communityInterestsErrorMessage?: string;
  personalityProfileResponse?: {
    status?: number;
    body: unknown;
    headers?: Record<string, string>;
  };
  onMySajuUpdate?: (payload: unknown) => void;
  onPartnerCreate?: (payload: unknown) => void;
  onPartnerUpdate?: (partnerId: number, payload: unknown) => void;
  onPartnerDelete?: (partnerId: number) => void;
  onNotificationRead?: (notificationId: number) => void;
  onCommunityJoin?: (payload: unknown) => void;
};

export type NotificationMock = {
  id: number;
  title: string;
  content: string;
  type: "ANNOUNCEMENT" | "NEW_SERVICE";
  createdAt: string;
  read: boolean;
};

export type CommunityInterestMock = {
  type: string;
  options: Array<{
    name: string;
    element?: string;
  }>;
};

export const mySajuProfile: SajuProfileMock = {
  email: "e2e@example.com",
  nickname: "이투이",
  birthDate: "1992-03-14",
  birthTime: "09:30",
  gender: "MALE",
  calendarType: "SOLAR",
  city: "서울특별시",
  sajuAnalysis: {
    ilju: "\uC784\uC778",
    strength: "\uC2E0\uC57D(\u8EAB\u5F31)",
    geokguk: "\uC815\uAD00\uACA9",
    yongshin: "metal",
    assistYongshin: "water",
  },
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

export const defaultNotifications: NotificationMock[] = [
  {
    id: 301,
    title: "새 기능이 열렸어요",
    content: "오늘의 음식 추천을 확인해보세요.",
    type: "NEW_SERVICE",
    createdAt: "2026-06-01T09:00:00.000Z",
    read: false,
  },
  {
    id: 302,
    title: "서비스 점검 안내",
    content: "안정적인 이용을 위해 새벽 점검이 예정되어 있어요.",
    type: "ANNOUNCEMENT",
    createdAt: "2026-05-31T12:00:00.000Z",
    read: true,
  },
];

export const defaultCommunityInterests: CommunityInterestMock[] = [
  {
    type: "친구모임",
    options: [
      { name: "한강 산책", element: "수" },
      { name: "연애 고민", element: "목" },
      { name: "운동하기", element: "화" },
    ],
  },
  {
    type: "소개팅",
    options: [
      { name: "카페에서 가볍게 대화", element: "금" },
      { name: "취향으로 가까워지는 소개팅", element: "목" },
      { name: "밸런스 게임 대화 소개팅", element: "화" },
    ],
  },
];

export async function addAuthCookies(
  context: BrowserContext,
  baseURL?: string,
) {
  const url = baseURL ?? "http://127.0.0.1:3100";

  await context.addCookies([
    { name: "saju_access_token", value: "e2e-access-token", url },
    { name: "saju_turnstile_verified", value: "1", url },
    { name: "saju_user_email", value: "e2e@example.com", url },
  ]);
}

export async function mockCurrentProjectApis(
  page: Page,
  options: ApiMockOptions = {},
) {
  const sajuProfile = options.sajuProfile ?? mySajuProfile;
  let partners = options.partners ?? [...defaultPartners];
  let notifications = options.notifications ?? [...defaultNotifications];
  const communityInterests =
    options.communityInterests ?? defaultCommunityInterests;
  const personalityResponse = options.personalityProfileResponse ?? {
    status: 200,
    headers: {
      "Cache-Control": "private, max-age=300, stale-while-revalidate=600",
    },
    body: personalityProfile,
  };

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
          data: sajuProfile,
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

  await page.route("**/api/saju/traditional-fortune", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(traditionalFortune),
    });
  });

  await page.route("**/api/saju/me/personality", async (route) => {
    await route.fulfill({
      status: personalityResponse.status ?? 200,
      headers: personalityResponse.headers,
      contentType: "application/json",
      body: JSON.stringify(personalityResponse.body),
    });
  });

  await page.route("**/api/saju/zodiac-compatibility", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(zodiacCompatibility),
    });
  });

  await page.route("**/api/food/recommend", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(foodRecommend),
    });
  });

  await page.route("**/api/community/interests", async (route) => {
    const status = options.communityInterestsStatus ?? 200;

    if (status >= 400) {
      await route.fulfill({
        status,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          data: null,
          error: {
            code: "COMMUNITY_INTERESTS_GET_FAILED",
            message:
              options.communityInterestsErrorMessage ??
              "관심 주제 목록을 불러오지 못했어요.",
          },
        }),
      });
      return;
    }

    await route.fulfill({
      status,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: communityInterests,
        error: null,
      }),
    });
  });

  await page.route("**/api/community/join", async (route) => {
    const payload = route.request().postDataJSON();
    options.onCommunityJoin?.(payload);

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

  await page.route("**/api/notifications/unread-count", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: notifications.filter((notification) => !notification.read).length,
        error: null,
      }),
    });
  });

  await page.route("**/api/notifications/*/read", async (route) => {
    const url = new URL(route.request().url());
    const idMatch = url.pathname.match(/\/api\/notifications\/(\d+)\/read$/);
    const notificationId = idMatch ? Number(idMatch[1]) : null;

    if (!notificationId) {
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          data: null,
          error: {
            code: "INVALID_NOTIFICATION_ID",
            message: "Notification id must be a number.",
          },
        }),
      });
      return;
    }

    options.onNotificationRead?.(notificationId);
    notifications = notifications.map((notification) =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification,
    );

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: { read: true },
        error: null,
      }),
    });
  });

  await page.route("**/api/notifications", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: notifications,
        error: null,
      }),
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
  await expect(page.locator(`a[href="${href}"]`).first()).toBeVisible();
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

const traditionalFortune = {
  success: true,
  data: {
    description: "2026년은 흐름을 다듬고 기반을 정리하는 해입니다.",
    fiveElementsSummary: "금과 수의 기운을 보완하면 전체 흐름이 더 안정됩니다.",
    totalScore: 87,
    topPercentage: "15%",
    overallFortune:
      "상반기에는 기반을 정리하고 하반기에는 그 결과가 드러나는 흐름입니다.",
    favorablePeriods: "3월, 8월, 11월",
    cautiousPeriods: "5월, 9월",
    wealth: {
      flow: "수입보다 지출 관리가 더 중요한 해입니다.",
      firstHalf: "고정비를 정리하면 재정 흐름이 안정됩니다.",
      secondHalf: "작은 기회가 누적되어 실속 있는 결과로 이어집니다.",
      advice: "무리한 확장보다 현금 흐름 점검이 우선입니다.",
      score: 81,
    },
    love: {
      flow: "감정 표현을 분명히 할수록 관계가 안정됩니다.",
      inRelationship: "대화의 빈도를 유지하면 오해를 줄일 수 있습니다.",
      single: "가까운 인연에서 자연스럽게 기회가 생깁니다.",
      caution: "감정이 쌓이기 전에 먼저 말로 정리하는 편이 좋습니다.",
      keyPoint: "타이밍보다 태도가 중요합니다.",
      score: 84,
    },
    career: {
      flow: "변화보다 정교한 실행이 성과를 만드는 시기입니다.",
      firstHalf: "기존 업무를 정리하면서 신뢰를 쌓게 됩니다.",
      secondHalf: "성과가 수치로 드러나며 역할이 넓어질 수 있습니다.",
      advice: "급한 선택보다 기준을 명확히 두고 움직이는 편이 유리합니다.",
      keyPoint: "정리된 실행력이 경쟁력입니다.",
      score: 89,
    },
    health: {
      flow: "컨디션 기복은 크지 않지만 누적 피로 관리가 중요합니다.",
      seasonal: "환절기에는 수면 리듬과 체온 관리에 신경 써야 합니다.",
      stressManagement: "짧더라도 규칙적인 회복 시간이 필요합니다.",
      stressHabits: "과로 신호를 무시하지 않는 습관이 중요합니다.",
      keyPoint: "무리하지 않는 루틴이 핵심입니다.",
      score: 78,
    },
    yearCautions: "성과를 서두르기보다 일정과 체력을 함께 관리해야 합니다.",
  },
  error: null,
};

const personalityProfile = {
  success: true,
  data: {
    personalityType: "임수(壬水) 감성형",
    personalityDescription:
      "임수의 기질은 깊이 있는 감정을 지니고 있으며, 유연하고 적응력이 뛰어납니다.",
    romanticStyle:
      "감정을 솔직하게 표현하지만 때때로 내향적인 면이 있습니다.",
    romanticCompatibility:
      "목(木)이나 수(水)의 기운을 가진 사람과 잘 어울립니다.",
    careerTypes: ["컨설턴트", "작가", "심리상담사", "교육자"],
    careerStyle:
      "창의적이고 직관적인 스타일로 업무를 수행하며 소통을 중시합니다.",
    strengths: [
      "감정적 지능이 뛰어나다",
      "유연한 사고방식",
      "혼자서도 잘 소화하며 발전할 수 있다",
    ],
    weaknesses: [
      "자기주장이 약할 수 있음",
      "감정적 기복이 심할 수 있음",
      "냉정함을 잃는 경향",
    ],
  },
  error: null,
  meta: {
    backendStatus: 200,
    backendMessage: "success",
  },
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
        score: 4,
        scoreLabel: "좋은 흐름의 단계",
        keyword: "설렘",
        content: "감정 표현의 온도가 잘 맞습니다.",
      },
      {
        key: "communication",
        title: "소통궁합",
        score: 5,
        scoreLabel: "매우 잘 맞는 단계",
        keyword: "대화",
        content: "중요한 이야기를 차분히 풀어가기 좋습니다.",
      },
    ],
  },
  error: null,
};

const foodRecommend = {
  success: true,
  data: {
    rankedFoods: [
      {
        rank: 1,
        name: "비빔밥",
        reason: "다양한 재료가 오늘의 토 기운을 안정적으로 채워줘요.",
        category: "한식",
        fiveElement: "토",
      },
      {
        rank: 2,
        name: "우동",
        reason: "따뜻한 국물이 수 기운의 차분함을 보완해줘요.",
        category: "일식",
        fiveElement: "수",
      },
      {
        rank: 3,
        name: "토마토 파스타",
        reason: "가벼운 산미가 화 기운을 부드럽게 살려줘요.",
        category: "양식",
        fiveElement: "화",
      },
    ],
    avoidFoods: ["튀김", "찬 음료"],
    groceryList: ["나물", "달걀", "토마토"],
    dailyFiveElements: { 목: 12, 화: 18, 토: 30, 금: 10, 수: 16 },
  },
  error: null,
};
