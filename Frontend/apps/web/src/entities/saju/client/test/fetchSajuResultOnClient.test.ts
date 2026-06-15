import { fetchSajuResultOnClient } from "@/entities/saju/client/fetchSajuResultOnClient";
import { SajuResultClientError } from "@/entities/saju/client/sajuResultClientError";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("fetchSajuResultOnClient", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("maps pending-form errors to a user-facing korean message", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          success: false,
          data: null,
          error: {
            code: "PENDING_FORM_NOT_FOUND",
            message: "First-time post requires pending saju form.",
          },
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      ),
    );

    await expect(fetchSajuResultOnClient()).rejects.toMatchObject({
      name: "SajuResultClientError",
      code: "PENDING_FORM_NOT_FOUND",
      message: "사주 정보를 입력해주세요.",
    } satisfies Partial<SajuResultClientError>);
  });

  it("maps saju daily failures to a user-facing korean message", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          success: false,
          data: null,
          error: {
            code: "SAJU_DAILY_GET_FAILED",
            message: "Daily saju request failed.",
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

    await expect(fetchSajuResultOnClient()).rejects.toMatchObject({
      name: "SajuResultClientError",
      code: "SAJU_DAILY_GET_FAILED",
      message: "오늘의 사주를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
    } satisfies Partial<SajuResultClientError>);
  });
});
