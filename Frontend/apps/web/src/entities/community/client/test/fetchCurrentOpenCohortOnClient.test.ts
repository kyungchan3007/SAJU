import { fetchCurrentOpenCohortOnClient } from "@/entities/community/client/fetchCurrentOpenCohortOnClient";
import { ApiRequestError } from "@/shared/api/requestError";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("fetchCurrentOpenCohortOnClient", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the current cohort envelope when the request succeeds", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          data: {
            cohortId: 7,
            name: "7기",
            feeAmount: 45000,
          },
          error: null,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      ),
    );

    await expect(fetchCurrentOpenCohortOnClient()).resolves.toEqual({
      success: true,
      data: {
        cohortId: 7,
        name: "7기",
        feeAmount: 45000,
      },
      error: null,
    });
  });

  it("maps failed responses to ApiRequestError", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          success: false,
          data: null,
          error: {
            code: "COMMUNITY_CURRENT_COHORT_GET_FAILED",
            message: "현재 모집 중인 기수를 불러오지 못했습니다.",
          },
        }),
        {
          status: 503,
          headers: {
            "Content-Type": "application/json",
          },
        },
      ),
    );

    await expect(fetchCurrentOpenCohortOnClient()).rejects.toMatchObject({
      name: "ApiRequestError",
      code: "COMMUNITY_CURRENT_COHORT_GET_FAILED",
      message: "현재 모집 중인 기수를 불러오지 못했습니다.",
      status: 503,
    } satisfies Partial<ApiRequestError>);
  });
});
