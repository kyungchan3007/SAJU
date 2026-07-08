import "server-only";

import type { NicknameCheckResponse } from "@/generated/api";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { getCommunityNicknameCheckEndpointPath } from "@/shared/config/endPoint";

type CheckCommunityNicknameOnServerSuccess = {
  success: true;
  data: NicknameCheckResponse | undefined;
};

type CheckCommunityNicknameOnServerFailure = {
  success: false;
  status: number;
  message: string;
};

type CheckCommunityNicknameOnServerResult =
  | CheckCommunityNicknameOnServerSuccess
  | CheckCommunityNicknameOnServerFailure;

export async function checkCommunityNicknameOnServer(
  cohortId: number,
  nickname: string,
): Promise<CheckCommunityNicknameOnServerResult> {
  const result = await authenticatedBackendFetch(
    getCommunityNicknameCheckEndpointPath(cohortId, nickname),
    { method: "GET" },
  );

  const parsed = await parseBackendApiResponse<NicknameCheckResponse>(
    result.response,
    "Check community nickname request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true, data: parsed.data };
}
