import { GET } from "@/app/api/community/cohorts/[cohortId]/nickname-check/route";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const LOCAL_BASE_URL = "http://localhost";

const mockedCheckCommunityNicknameOnServer = vi.hoisted(() => vi.fn());

vi.mock("@/entities/community/server/checkCommunityNicknameOnServer", () => ({
  checkCommunityNicknameOnServer: mockedCheckCommunityNicknameOnServer,
}));

describe("/api/community/cohorts/[cohortId]/nickname-check route handler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns invalid cohort id for non-numeric params", async () => {
    const request = new Request(
      new URL("/api/community/cohorts/abc/nickname-check?nickname=햇살", LOCAL_BASE_URL),
      { method: "GET" },
    );

    const response = await GET(request, {
      params: Promise.resolve({ cohortId: "abc" }),
    });
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "INVALID_COHORT_ID",
        message: "대상 정보를 다시 확인해주세요.",
      },
    });
  });

  it("returns invalid nickname when the query is missing", async () => {
    const request = new Request(
      new URL("/api/community/cohorts/1/nickname-check", LOCAL_BASE_URL),
      { method: "GET" },
    );

    const response = await GET(request, {
      params: Promise.resolve({ cohortId: "1" }),
    });
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "INVALID_NICKNAME",
        message: "닉네임을 다시 확인해주세요.",
      },
    });
  });

  it("returns nickname availability payload", async () => {
    mockedCheckCommunityNicknameOnServer.mockResolvedValue({
      success: true,
      data: { available: true },
    });

    const request = new Request(
      new URL("/api/community/cohorts/1/nickname-check?nickname=햇살", LOCAL_BASE_URL),
      { method: "GET" },
    );

    const response = await GET(request, {
      params: Promise.resolve({ cohortId: "1" }),
    });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      data: { available: true },
      error: null,
    });
    expect(mockedCheckCommunityNicknameOnServer).toHaveBeenCalledWith(
      1,
      "햇살",
    );
  });
});
