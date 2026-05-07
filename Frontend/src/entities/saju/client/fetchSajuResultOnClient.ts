import type { ApiEnvelope } from "@/shared/api";
import type { DailyEnergyResponse } from "@/generated/api";

export async function fetchSajuResultOnClient(): Promise<
  ApiEnvelope<DailyEnergyResponse | undefined>
> {
  const response = await fetch("/api/saju/result", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = (await response.json()) as ApiEnvelope<
    DailyEnergyResponse | undefined
  >;

  if (!response.ok) {
    throw new Error(
      result.success ? "Failed to fetch saju result." : result.error.message,
    );
  }

  return result;
}
