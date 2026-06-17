import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@saju/ui";

import { createCommunityCohortOnClient } from "@/entities/community/client/createCommunityCohortOnClient";
import { COHORT_QUERY_KEY } from "@/features/community-cohort/model/queryKey";

export function useCohortCreate(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCommunityCohortOnClient,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: COHORT_QUERY_KEY });
      toast.success("기수가 등록되었습니다.");
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "등록에 실패했습니다.");
    },
  });
}
