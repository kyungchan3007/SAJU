import { useQuery } from "@tanstack/react-query";
import { fetchPaymentsByCohortOnClient } from "@/entities/payment/client/fetchPaymentsByCohortOnClient";
import { paymentQueryKey } from "@/features/payment/model/queryKey";
import type { PaymentStatus } from "@/features/payment/type/types";

export function usePaymentList(cohortId: number | null, status: PaymentStatus | "") {
  const { data, isLoading, isError } = useQuery({
    queryKey: paymentQueryKey.list(cohortId, status),
    queryFn: () => fetchPaymentsByCohortOnClient(cohortId!, status),
    enabled: typeof cohortId === "number",
  });

  return { payments: data ?? [], isLoading, isError };
}

