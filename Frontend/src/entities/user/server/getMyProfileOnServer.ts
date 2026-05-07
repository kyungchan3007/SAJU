import "server-only";

import type { ApiResponseUserResponse, UserResponse } from "@/generated/api";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
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
  const response = result.response;

  let body: ApiResponseUserResponse | null = null;

  try {
    body = (await response.json()) as ApiResponseUserResponse;
  } catch {
    body = null;
  }

  if (!response.ok) {
    return {
      success: false,
      status: response.status,
      message: body?.message ?? `User profile request failed (${response.status}).`,
    };
  }

  return {
    success: true,
    data: body?.data,
  };
}
