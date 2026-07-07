import type { ZodiacCompatibilityResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";
import { SAJU_ZODIAC_COMPATIBILITY_BFF_PATH } from "@/shared/config/endPoint";

export async function fetchZodiacCompatibilityOnClient(): Promise<
  ApiEnvelope<ZodiacCompatibilityResponse | undefined>
> {
  const response = await fetch(SAJU_ZODIAC_COMPATIBILITY_BFF_PATH, {
    method: "GET",
  });
  const result = (await response.json()) as ApiEnvelope<
    ZodiacCompatibilityResponse | undefined
  >;

  if (!response.ok) {
    throw new Error(
      result.success
        ? "Failed to fetch zodiac compatibility."
        : result.error.message,
    );
  }

  return result;
}
