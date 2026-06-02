import type { TraditionalFortuneResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";

export async function fetchTraditionalFortuneOnClient(): Promise<
  ApiEnvelope<TraditionalFortuneResponse | undefined>
> {
  const response = await fetch("/api/saju/traditional-fortune", {
    method: "GET",
  });

  const result = (await response.json()) as ApiEnvelope<
    TraditionalFortuneResponse | undefined
  >;

  if (!response.ok) {
    throw new Error(
      result.success
        ? "Failed to fetch traditional fortune."
        : result.error.message,
    );
  }

  return result;
}
