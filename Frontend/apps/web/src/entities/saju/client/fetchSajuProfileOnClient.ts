import type { SajuProfileResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";
import { SajuProfileClientError } from "@/entities/saju/client/sajuProfileClientError";
import { SAJU_ME_ENDPOINT_PATH } from "@/shared/config/endPoint";

export async function fetchSajuProfileOnClient(): Promise<
  ApiEnvelope<SajuProfileResponse | undefined>
> {
  const response = await fetch(SAJU_ME_ENDPOINT_PATH, { method: "GET" });
  const result = (await response.json()) as ApiEnvelope<
    SajuProfileResponse | undefined
  >;

  if (!response.ok) {
    if (!result.success) {
      throw new SajuProfileClientError(result.error.code, result.error.message);
    }

    throw new Error("Failed to fetch saju profile.");
  }

  return result;
}
