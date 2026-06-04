import { rejectCrossOriginRequest } from "@/shared/api/auth/rejectCrossOriginRequest";
import { describe, expect, it } from "vitest";

describe("rejectCrossOriginRequest", () => {
  it("allows same-origin browser requests", () => {
    const request = new Request("https://saju.example/api/auth/logout", {
      method: "POST",
      headers: { Origin: "https://saju.example" },
    });

    expect(rejectCrossOriginRequest(request)).toBeNull();
  });

  it("rejects requests without an origin header", async () => {
    const request = new Request("https://saju.example/api/auth/logout", {
      method: "POST",
    });

    const response = rejectCrossOriginRequest(request);

    expect(response?.status).toBe(403);
    await expect(response?.json()).resolves.toEqual({
      success: false,
      data: null,
      error: {
        code: "CSRF_ORIGIN_REQUIRED",
        message: "Origin header is required for state-changing requests.",
      },
    });
  });

  it("rejects cross-origin browser requests", async () => {
    const request = new Request("https://saju.example/api/auth/logout", {
      method: "POST",
      headers: { Origin: "https://attacker.example" },
    });

    const response = rejectCrossOriginRequest(request);

    expect(response?.status).toBe(403);
    await expect(response?.json()).resolves.toEqual({
      success: false,
      data: null,
      error: {
        code: "CSRF_ORIGIN_MISMATCH",
        message: "Cross-origin request denied.",
      },
    });
  });
});
