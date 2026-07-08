import { GET } from "@/app/api/community/members/me/route";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockedGetMyMembershipsOnServer = vi.hoisted(() => vi.fn());

vi.mock("@/entities/community/server/getMyMembershipsOnServer", () => ({
  getMyMembershipsOnServer: mockedGetMyMembershipsOnServer,
}));

describe("/api/community/members/me route handler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns membership list payload", async () => {
    mockedGetMyMembershipsOnServer.mockResolvedValue({
      success: true,
      data: [{ memberId: 1, cohortId: 2, status: "APPLIED" }],
    });

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      data: [{ memberId: 1, cohortId: 2, status: "APPLIED" }],
      error: null,
    });
  });

  it("maps server failures to the memberships error code", async () => {
    mockedGetMyMembershipsOnServer.mockResolvedValue({
      success: false,
      status: 401,
      message: "LOGIN_REQUIRED",
    });

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "COMMUNITY_MEMBERSHIPS_GET_FAILED",
        message: "커뮤니티 신청 내역을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
      },
    });
  });
});
