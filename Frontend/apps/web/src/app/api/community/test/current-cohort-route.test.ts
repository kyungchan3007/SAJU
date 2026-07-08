import { GET } from "@/app/api/community/cohorts/current/route";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockedGetCurrentOpenCohortOnServer = vi.hoisted(() => vi.fn());

vi.mock("@/entities/community/server/getCurrentOpenCohortOnServer", () => ({
  getCurrentOpenCohortOnServer: mockedGetCurrentOpenCohortOnServer,
}));

describe("/api/community/cohorts/current route handler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns current cohort payload", async () => {
    mockedGetCurrentOpenCohortOnServer.mockResolvedValue({
      success: true,
      data: { cohortId: 1, feeAmount: 50000, location: "강남" },
    });

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      data: { cohortId: 1, feeAmount: 50000, location: "강남" },
      error: null,
    });
  });

  it("returns mapped error when current cohort fetch fails", async () => {
    mockedGetCurrentOpenCohortOnServer.mockResolvedValue({
      success: false,
      status: 500,
      message: "boom",
    });

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "COMMUNITY_CURRENT_COHORT_GET_FAILED",
        message: "현재 모집 중인 기수를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
      },
    });
  });
});
