import "server-only";

import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { ADMIN_PAYMENT_CONFIRM_DEPOSIT_ENDPOINT_PATH } from "@/shared/config/endPoint";

type Result =
  | { success: true }
  | { success: false; status: number; message: string };

export async function confirmDepositOnServer(paymentId: number): Promise<Result> {
  const result = await authenticatedBackendFetch(
    ADMIN_PAYMENT_CONFIRM_DEPOSIT_ENDPOINT_PATH(paymentId),
    { method: "POST" },
  );

  const parsed = await parseBackendApiResponse<void>(
    result.response,
    "Confirm deposit request failed.",
  );
  if (!parsed.success) return parsed;

  return { success: true };
}

