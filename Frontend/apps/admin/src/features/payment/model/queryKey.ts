import type { PaymentStatus } from "@/features/payment/type/types";

export const paymentQueryKey = {
  list: (cohortId: number | null, status?: PaymentStatus | "") =>
    ["admin", "community", "payments", cohortId, status ?? ""] as const,
};

