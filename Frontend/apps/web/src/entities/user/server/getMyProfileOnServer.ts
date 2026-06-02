import "server-only";

import type { UserResponse } from "@/generated/api";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { SAJU_USERS_ME_PATH } from "@/shared/config/endPoint";

type GetMyProfileSuccess = {
  success: true;
  data: UserResponse | undefined;
};

type GetMyProfileFailure = {
  success: false;
  status: number;
  message: string;
};

type GetMyProfileResult = GetMyProfileSuccess | GetMyProfileFailure;

export async function getMyProfileOnServer(): Promise<GetMyProfileResult> {
  const result = await authenticatedBackendFetch(SAJU_USERS_ME_PATH, {
    method: "GET",
  });

  const parsed = await parseBackendApiResponse<UserResponse>(
    result.response,
    "User profile request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return {
    success: true,
    data: parsed.data,
  };
}
