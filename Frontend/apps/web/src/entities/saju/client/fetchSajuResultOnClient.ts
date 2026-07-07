import type { ApiEnvelope } from "@/shared/api";
import type { DailyEnergyResponse } from "@/generated/api";
import { SajuResultClientError } from "@/entities/saju/client/sajuResultClientError";
import { SAJU_RESULT_ENDPOINT_PATH } from "@/shared/config/endPoint";

export async function fetchSajuResultOnClient(): Promise<
  ApiEnvelope<DailyEnergyResponse | undefined>
> {
  const response = await fetch(SAJU_RESULT_ENDPOINT_PATH, {
    method: "POST",
    cache: "no-store",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = (await response.json()) as ApiEnvelope<
    DailyEnergyResponse | undefined
  >;

  if (!response.ok) {
    if (!result.success) {
      throw new SajuResultClientError(
        result.error.code,
        result.error.message,
      );
    }

    throw new Error("Failed to fetch saju result.");
  }

  return result;
}
