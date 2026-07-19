import type { PaymentListItem, PaymentStatus } from "@/features/payment/type/types";
import { ADMIN_COMMUNITY_COHORT_PAYMENTS_ENDPOINT_PATH } from "@/shared/config/endPoint";

export async function fetchPaymentsByCohortOnClient(
  cohortId: number,
  status?: PaymentStatus | "",
): Promise<PaymentListItem[]> {
  const path = ADMIN_COMMUNITY_COHORT_PAYMENTS_ENDPOINT_PATH(cohortId);
  const searchParams = new URLSearchParams();
  if (status) searchParams.set("status", status);
  const queryString = searchParams.toString();
  const res = await fetch(queryString ? `${path}?${queryString}` : path);
  const body = (await res.json()) as {
    success: boolean;
    data?: PaymentListItem[];
    message?: string;
  };

  if (!res.ok || !body.success) {
    throw new Error(body.message ?? "결제 목록 조회 실패");
  }

  return body.data ?? [];
}

