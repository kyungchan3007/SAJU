import { POST } from "@/app/api/auth/restore/route";
import { SAJU_AUTH_RESTORE_PATH } from "@/shared/config/endPoint";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const SAME_ORIGIN_BASE_URL = "https://www.saju-me.com";

const mockedRestoreMyAccountOnServer = vi.hoisted(() => vi.fn());

vi.mock("@/entities/auth/server/restoreMyAccountOnServer", () => ({
  restoreMyAccountOnServer: mockedRestoreMyAccountOnServer,
}));

function createSameOriginRequest() {
  return new Request(new URL(SAJU_AUTH_RESTORE_PATH, SAME_ORIGIN_BASE_URL), {
    method: "POST",
    headers: {
      Origin: SAME_ORIGIN_BASE_URL,
    },
  });
}

describe("/api/auth/restore POST", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns mapped error when restore fails", async () => {
    mockedRestoreMyAccountOnServer.mockResolvedValue({
      success: false,
      status: 400,
      message: "ACCOUNT_RESTORE_FAILED",
    });

    const response = await POST(createSameOriginRequest());
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "AUTH_RESTORE_FAILED",
        message: "계정 복구를 처리하지 못했습니다. 잠시 후 다시 시도해주세요.",
      },
    });
  });

  it("returns success when restore succeeds", async () => {
    mockedRestoreMyAccountOnServer.mockResolvedValue({
      success: true,
    });

    const response = await POST(createSameOriginRequest());
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      data: { restored: true },
      error: null,
    });
  });

  it("rejects requests without an origin header", async () => {
    const response = await POST(
      new Request(new URL(SAJU_AUTH_RESTORE_PATH, SAME_ORIGIN_BASE_URL), {
        method: "POST",
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(403);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "CSRF_ORIGIN_REQUIRED",
        message: "요청을 확인할 수 없습니다. 다시 시도해주세요.",
      },
    });
  });
});
