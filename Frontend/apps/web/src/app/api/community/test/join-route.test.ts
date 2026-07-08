import { POST } from "@/app/api/community/join/route";
import { COMMUNITY_JOIN_ENDPOINT_PATH } from "@/shared/config/endPoint";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const LOCAL_BASE_URL = "http://localhost";

const mockedJoinCommunityOnServer = vi.hoisted(() => vi.fn());

vi.mock("@/entities/community/server/joinCommunityOnServer", () => ({
  joinCommunityOnServer: mockedJoinCommunityOnServer,
}));

vi.mock("@/shared/api/auth/withApiGuards", () => ({
  withApiGuards: (_options: unknown, handler: (request: Request) => Response) =>
    handler,
}));

describe("/api/community/join route handler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns invalid body when the new join contract is incomplete", async () => {
    const request = new Request(
      new URL(COMMUNITY_JOIN_ENDPOINT_PATH, LOCAL_BASE_URL),
      {
        method: "POST",
        body: JSON.stringify({
          cohortId: 1,
          nickname: "햇살",
          ageGroup: "20대",
        }),
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost",
        },
      },
    );

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "INVALID_REQUEST_BODY",
        message: "요청 정보를 다시 확인해주세요.",
      },
    });
    expect(mockedJoinCommunityOnServer).not.toHaveBeenCalled();
  });

  it("passes the new join contract through to the server layer", async () => {
    mockedJoinCommunityOnServer.mockResolvedValue({
      success: true,
      data: {
        memberId: 10,
        cohortId: 1,
        paymentId: 50,
        feeAmount: 30000,
      },
    });

    const request = new Request(
      new URL(COMMUNITY_JOIN_ENDPOINT_PATH, LOCAL_BASE_URL),
      {
        method: "POST",
        body: JSON.stringify({
          cohortId: 1,
          nickname: "햇살",
          depositorName: "홍길동",
          refundBankName: "카카오뱅크",
          refundAccountNumber: "3333123456789",
          refundAccountHolder: "홍길동",
          refundPolicyAgreed: true,
          privacyAgreed: true,
        }),
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost",
        },
      },
    );

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body).toEqual({
      success: true,
      data: {
        memberId: 10,
        cohortId: 1,
        paymentId: 50,
        feeAmount: 30000,
      },
      error: null,
    });
    expect(mockedJoinCommunityOnServer).toHaveBeenCalledWith({
      cohortId: 1,
      nickname: "햇살",
      depositorName: "홍길동",
      refundBankName: "카카오뱅크",
      refundAccountNumber: "3333123456789",
      refundAccountHolder: "홍길동",
      refundPolicyAgreed: true,
      privacyAgreed: true,
    });
  });
});
