import type { UserResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";
import { SAJU_USERS_ME_PATH } from "@/shared/config/endPoint";

export async function fetchMyProfileOnClient(): Promise<
  ApiEnvelope<UserResponse | undefined>
> {
  const response = await fetch(SAJU_USERS_ME_PATH, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = (await response.json()) as ApiEnvelope<
    UserResponse | undefined
  >;

  if (!response.ok) {
    throw new Error(
      result.success ? "Failed to fetch user profile." : result.error.message,
    );
  }

  return result;
}
