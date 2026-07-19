import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@saju/ui";
import { confirmDepositOnClient } from "@/entities/payment/client/confirmDepositOnClient";
import { confirmMemberOnClient } from "@/entities/payment/client/confirmMemberOnClient";
import { completeRefundOnClient } from "@/entities/payment/client/completeRefundOnClient";
import { COHORT_QUERY_KEY } from "@/features/community-cohort/model/queryKey";

export function usePaymentActions() {
  const queryClient = useQueryClient();

  function invalidateAdminCommunityQueries() {
    void queryClient.invalidateQueries({
      predicate: (query) =>
        Array.isArray(query.queryKey) &&
        query.queryKey[0] === "admin" &&
        query.queryKey[1] === "community",
    });
    void queryClient.invalidateQueries({ queryKey: COHORT_QUERY_KEY });
  }

  const confirmDeposit = useMutation({
    mutationFn: confirmDepositOnClient,
    onSuccess: () => {
      invalidateAdminCommunityQueries();
      toast.success("입금 확인 처리되었습니다.");
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "입금 확인에 실패했습니다.");
    },
  });

  const confirmMember = useMutation({
    mutationFn: confirmMemberOnClient,
    onSuccess: () => {
      invalidateAdminCommunityQueries();
      toast.success("참여 확정 처리되었습니다.");
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "참여 확정에 실패했습니다.");
    },
  });

  const completeRefund = useMutation({
    mutationFn: completeRefundOnClient,
    onSuccess: () => {
      invalidateAdminCommunityQueries();
      toast.success("환불 완료 처리되었습니다.");
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "환불 완료 처리에 실패했습니다.");
    },
  });

  return { confirmDeposit, confirmMember, completeRefund };
}

