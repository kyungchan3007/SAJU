import type { ApiEnvelope } from "@/shared/api";
import type { DailySajuResult } from "@/domain/saju/guid-card/preview-card/model/type";

export async function fetchSajuResultOnClient(): Promise<
  ApiEnvelope<DailySajuResult>
> {
  const response = await fetch("/api/saju/result", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = (await response.json()) as ApiEnvelope<DailySajuResult>;

  if (!response.ok) {
    throw new Error(
      result.success ? "Failed to fetch saju result." : result.error.message,
    );
  }

  return result;
}
