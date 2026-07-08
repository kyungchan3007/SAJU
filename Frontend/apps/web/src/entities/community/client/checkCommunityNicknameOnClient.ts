import type { NicknameCheckResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";
import { ApiRequestError } from "@/shared/api/requestError";
import { getCommunityNicknameCheckBffPath } from "@/shared/config/endPoint";

export async function checkCommunityNicknameOnClient(
  cohortId: number,
  nickname: string,
): Promise<ApiEnvelope<NicknameCheckResponse | undefined>> {
  const response = await fetch(
    getCommunityNicknameCheckBffPath(cohortId, nickname),
    { method: "GET" },
  );
  const result = (await response.json()) as ApiEnvelope<
    NicknameCheckResponse | undefined
  >;

  if (!response.ok) {
    throw new ApiRequestError(
      result.success
        ? "Failed to check community nickname."
        : result.error.message,
      result.success ? "COMMUNITY_NICKNAME_CHECK_FAILED" : result.error.code,
      response.status,
    );
  }

  return result;
}
