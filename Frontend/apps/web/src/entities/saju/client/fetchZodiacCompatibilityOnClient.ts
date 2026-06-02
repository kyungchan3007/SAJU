import type { ZodiacCompatibilityResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";

export async function fetchZodiacCompatibilityOnClient(): Promise<
  ApiEnvelope<ZodiacCompatibilityResponse | undefined>
> {
  const response = await fetch("/api/saju/zodiac-compatibility", {
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
