import type { UserResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";

export async function fetchMyProfileOnClient(): Promise<
  ApiEnvelope<UserResponse | undefined>
> {
  const response = await fetch("/api/users/me", {
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
