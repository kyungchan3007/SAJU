import { POST } from "@/app/api/community/cancel/route";
import { COMMUNITY_CANCEL_ENDPOINT_PATH } from "@/shared/config/endPoint";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const LOCAL_BASE_URL = "http://localhost";

const mockedCancelCommunityMembershipOnServer = vi.hoisted(() => vi.fn());

vi.mock("@/entities/community/server/cancelCommunityMembershipOnServer", () => ({
  cancelCommunityMembershipOnServer: mockedCancelCommunityMembershipOnServer,
}));

vi.mock("@/shared/api/auth/withApiGuards", () => ({
  withApiGuards: (_options: unknown, handler: (request: Request) => Response) =>
    handler,
}));

describe("/api/community/cancel route handler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("rejects requests without a valid member id", async () => {
    const request = new Request(
      new URL(COMMUNITY_CANCEL_ENDPOINT_PATH, LOCAL_BASE_URL),
      {
        method: "POST",
        body: JSON.stringify({ memberId: "1" }),
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
    expect(mockedCancelCommunityMembershipOnServer).not.toHaveBeenCalled();
  });

  it("passes the cancel payload through to the server layer", async () => {
    mockedCancelCommunityMembershipOnServer.mockResolvedValue({
      success: true,
      data: null,
    });

    const request = new Request(
      new URL(COMMUNITY_CANCEL_ENDPOINT_PATH, LOCAL_BASE_URL),
      {
        method: "POST",
        body: JSON.stringify({ memberId: 12 }),
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost",
        },
      },
    );

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      data: null,
      error: null,
    });
    expect(mockedCancelCommunityMembershipOnServer).toHaveBeenCalledWith({
      memberId: 12,
    });
  });
});
