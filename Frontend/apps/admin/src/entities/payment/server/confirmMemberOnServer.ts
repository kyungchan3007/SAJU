import "server-only";

import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { ADMIN_COMMUNITY_MEMBER_CONFIRM_ENDPOINT_PATH } from "@/shared/config/endPoint";

type Result =
  | { success: true }
  | { success: false; status: number; message: string };

export async function confirmMemberOnServer(memberId: number): Promise<Result> {
  const result = await authenticatedBackendFetch(
    ADMIN_COMMUNITY_MEMBER_CONFIRM_ENDPOINT_PATH(memberId),
    { method: "POST" },
  );

  const parsed = await parseBackendApiResponse<void>(
    result.response,
    "Confirm member request failed.",
  );
  if (!parsed.success) return parsed;

  return { success: true };
}

