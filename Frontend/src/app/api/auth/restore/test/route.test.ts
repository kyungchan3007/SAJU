import { POST } from "@/app/api/auth/restore/route";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockedRestoreMyAccountOnServer = vi.hoisted(() => vi.fn());

vi.mock("@/entities/auth/server/restoreMyAccountOnServer", () => ({
  restoreMyAccountOnServer: mockedRestoreMyAccountOnServer,
}));

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

    const response = await POST();
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({
      success: false,
      data: null,
      error: {
        code: "AUTH_RESTORE_FAILED",
        message: "ACCOUNT_RESTORE_FAILED",
      },
    });
  });

  it("returns success when restore succeeds", async () => {
    mockedRestoreMyAccountOnServer.mockResolvedValue({
      success: true,
    });

    const response = await POST();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      data: { restored: true },
      error: null,
    });
  });
});
