"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cancelCommunityMembershipOnClient } from "@/entities/community/client/cancelCommunityMembershipOnClient";
import { COMMUNITY_MEMBERSHIPS_QUERY_KEY } from "@/entities/community/model/query";
import { isCommunityMembershipCancelable } from "@/features/community/model/community-application";
import type { MyMembershipResponse } from "@/generated/api";
import { resolveApiErrorMessage } from "@/shared/api/messages";
import { ApiRequestError } from "@/shared/api/requestError";
import { useAuthScope } from "@/shared/app-infra/query-provider/auth-scope-context";
import { useTurnstileErrorRedirect } from "@/shared/hooks/useTurnstileErrorRedirect";

type UseCommunityMembershipCancelParams = {
  membership: MyMembershipResponse | null;
  returnTo: string;
  onCancelled?: () => void;
};

export function useCommunityMembershipCancel({
  membership,
  returnTo,
  onCancelled,
}: UseCommunityMembershipCancelParams) {
  const authScope = useAuthScope();
  const queryClient = useQueryClient();
  const redirectIfTurnstileRequired = useTurnstileErrorRedirect(returnTo);

  const canCancel = isCommunityMembershipCancelable(membership);

  const cancelMutation = useMutation({
    mutationFn: async () => {
      const memberId = membership?.memberId;

      if (!canCancel || typeof memberId !== "number" || !Number.isFinite(memberId)) {
        throw new ApiRequestError(
          resolveApiErrorMessage("COMMUNITY_CANCEL_FAILED"),
          "COMMUNITY_CANCEL_FAILED",
          400,
        );
      }

      return cancelCommunityMembershipOnClient({ memberId });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [...COMMUNITY_MEMBERSHIPS_QUERY_KEY, authScope],
      });
      onCancelled?.();
    },
  });

  async function cancelMembership() {
    if (!canCancel) {
      throw new ApiRequestError(
        resolveApiErrorMessage("COMMUNITY_CANCEL_FAILED"),
        "COMMUNITY_CANCEL_FAILED",
        400,
      );
    }

    try {
      await cancelMutation.mutateAsync();
    } catch (error) {
      if (redirectIfTurnstileRequired(error)) {
        throw error;
      }

      if (error instanceof ApiRequestError) {
        throw new ApiRequestError(
          resolveApiErrorMessage(error.code, error.message),
          error.code,
          error.status,
        );
      }

      throw new ApiRequestError(
        resolveApiErrorMessage("COMMUNITY_CANCEL_FAILED"),
        "COMMUNITY_CANCEL_FAILED",
        500,
      );
    }
  }

  return {
    canCancel,
    isCancelling: cancelMutation.isPending,
    cancelMembership,
  };
}
