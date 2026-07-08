import { checkCommunityNicknameOnClient } from "@/entities/community/client/checkCommunityNicknameOnClient";
import { ApiRequestError } from "@/shared/api/requestError";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("checkCommunityNicknameOnClient", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns nickname availability when the request succeeds", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          data: {
            available: true,
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

    await expect(checkCommunityNicknameOnClient(3, "햇살")).resolves.toEqual({
      success: true,
      data: {
        available: true,
      },
      error: null,
    });
  });

  it("maps duplicate-check failures to ApiRequestError", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          success: false,
          data: null,
          error: {
            code: "COMMUNITY_NICKNAME_CHECK_FAILED",
            message: "닉네임 중복 확인에 실패했습니다.",
          },
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      ),
    );

    await expect(checkCommunityNicknameOnClient(3, "햇살")).rejects.toMatchObject({
      name: "ApiRequestError",
      code: "COMMUNITY_NICKNAME_CHECK_FAILED",
      message: "닉네임 중복 확인에 실패했습니다.",
      status: 500,
    } satisfies Partial<ApiRequestError>);
  });
});
