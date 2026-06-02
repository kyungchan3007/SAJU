import "server-only";

import type { SajuRequest, SajuResponse } from "@/generated/api";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";

const SAJU_ME_PATH = "/api/saju/me";

type UpdateSajuSuccess = {
  success: true;
  data: SajuResponse | undefined;
};

type UpdateSajuFailure = {
  success: false;
  status: number;
  message: string;
};

export type UpdateSajuResult = UpdateSajuSuccess | UpdateSajuFailure;

export async function updateSajuOnServer(
  payload: SajuRequest,
): Promise<UpdateSajuResult> {
  const result = await authenticatedBackendFetch(SAJU_ME_PATH, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const parsed = await parseBackendApiResponse<SajuResponse>(
    result.response,
    "Saju update request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true, data: parsed.data };
}
