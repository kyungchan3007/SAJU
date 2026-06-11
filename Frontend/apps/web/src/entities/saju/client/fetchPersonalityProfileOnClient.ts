import type { PersonalityProfileResponse } from "@/generated/api";
import type { GeneratedInterpretationMeta } from "@/shared/api/backend/parseGeneratedInterpretationResponse";
import type { ApiEnvelope } from "@/shared/api";

export async function fetchPersonalityProfileOnClient(): Promise<
  ApiEnvelope<PersonalityProfileResponse | undefined, GeneratedInterpretationMeta>
> {
  const response = await fetch("/api/saju/me/personality", {
    method: "GET",
    cache: "force-cache",
  });

  const result = (await response.json()) as ApiEnvelope<
    PersonalityProfileResponse | undefined,
    GeneratedInterpretationMeta
  >;

  if (!response.ok) {
    throw new Error(
      result.success
        ? "Failed to fetch personality profile."
        : result.error.message,
    );
  }

  return result;
}
