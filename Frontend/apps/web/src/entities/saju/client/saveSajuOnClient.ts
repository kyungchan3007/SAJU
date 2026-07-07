import type { SajuFormValues } from "@/features/saju-input/type/type";
import type { ApiEnvelope } from "@/shared/api";
import { SajuSaveClientError } from "@/entities/saju/client/sajuSaveClientError";
import { SAJU_ENDPOINT_PATH } from "@/shared/config/endPoint";

export async function saveSajuOnClient(
  formValues?: SajuFormValues,
): Promise<ApiEnvelope<unknown>> {
  const response = await fetch(SAJU_ENDPOINT_PATH, {
    method: "POST",
    cache: "no-store",
    credentials: "include",
    ...(formValues
      ? {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValues),
        }
      : {}),
  });
  const result = (await response.json()) as ApiEnvelope<unknown>;

  if (!response.ok) {
    if (!result.success) {
      throw new SajuSaveClientError(result.error.code, result.error.message);
    }

    throw new Error("Failed to save saju.");
  }

  return result;
}
