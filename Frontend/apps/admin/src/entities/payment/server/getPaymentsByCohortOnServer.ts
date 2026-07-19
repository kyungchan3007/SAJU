import "server-only";

import type { PaymentListItem, PaymentStatus } from "@/features/payment/type/types";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { ADMIN_COMMUNITY_COHORT_PAYMENTS_ENDPOINT_PATH } from "@/shared/config/endPoint";

type Result =
  | { success: true; data: PaymentListItem[] | undefined }
  | { success: false; status: number; message: string };

export async function getPaymentsByCohortOnServer(
  cohortId: number,
  status?: PaymentStatus,
): Promise<Result> {
  const path = ADMIN_COMMUNITY_COHORT_PAYMENTS_ENDPOINT_PATH(cohortId);
  const searchParams = new URLSearchParams();
  if (status) searchParams.set("status", status);
  const queryString = searchParams.toString();

  const result = await authenticatedBackendFetch(
    queryString ? `${path}?${queryString}` : path,
    { method: "GET" },
  );

  return parseBackendApiResponse<PaymentListItem[]>(
    result.response,
    "Get payments by cohort request failed.",
  );
}

