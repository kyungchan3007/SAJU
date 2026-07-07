import "server-only";

import type { SajuProfileResponse } from "@/generated/api";
import {
  authenticatedBackendFetch,
  type AuthenticatedBackendFetchOptions,
} from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { SAJU_ME_ENDPOINT_PATH } from "@/shared/config/endPoint";

type GetSajuProfileSuccess = {
  success: true;
  data: SajuProfileResponse | undefined;
};

type GetSajuProfileFailure = {
  success: false;
  status: number;
  message: string;
};

export type GetSajuProfileResult =
  | GetSajuProfileSuccess
  | GetSajuProfileFailure;

export async function getSajuProfileOnServer(
  authOptions?: AuthenticatedBackendFetchOptions,
): Promise<GetSajuProfileResult> {
  const result = await authenticatedBackendFetch(
    SAJU_ME_ENDPOINT_PATH,
    {
      method: "GET",
    },
    authOptions,
  );

  const parsed = await parseBackendApiResponse<SajuProfileResponse>(
    result.response,
    "Saju profile request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true, data: parsed.data };
}
