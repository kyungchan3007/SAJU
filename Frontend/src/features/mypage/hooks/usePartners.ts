"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPartnersOnClient } from "@/entities/partner/client/fetchPartnersOnClient";
import { createPartnerOnClient } from "@/entities/partner/client/createPartnerOnClient";
import { updatePartnerOnClient } from "@/entities/partner/client/updatePartnerOnClient";
import { deletePartnerOnClient } from "@/entities/partner/client/deletePartnerOnClient";
import type { PartnerRequest } from "@/generated/api";

export const PARTNERS_QUERY_KEY = ["partners"] as const;

type PartnerCreateResult = {
  id: number | null;
  errorMessage: string | null;
};

type PartnerMutationResult = {
  success: boolean;
  errorMessage: string | null;
};

export function usePartners() {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const query = useQuery({
    queryKey: PARTNERS_QUERY_KEY,
    queryFn: fetchPartnersOnClient,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });

  const createMutation = useMutation({
    mutationFn: (payload: PartnerRequest) => createPartnerOnClient(payload),
    onSuccess: () =>
      void queryClient.invalidateQueries({ queryKey: PARTNERS_QUERY_KEY }),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      partnerId,
      payload,
    }: {
      partnerId: number;
      payload: PartnerRequest;
    }) => updatePartnerOnClient(partnerId, payload),
    onSuccess: () =>
      void queryClient.invalidateQueries({ queryKey: PARTNERS_QUERY_KEY }),
  });

  const deleteMutation = useMutation({
    mutationFn: (partnerId: number) => deletePartnerOnClient(partnerId),
    onSuccess: () =>
      void queryClient.invalidateQueries({ queryKey: PARTNERS_QUERY_KEY }),
  });

  const partners = query.data?.success ? (query.data.data?.partners ?? []) : [];

  async function handleCreate(
    payload: PartnerRequest,
  ): Promise<PartnerCreateResult> {
    setErrorMessage(null);
    try {
      const result = await createMutation.mutateAsync(payload);
      return {
        id: result.success ? (result.data?.id ?? null) : null,
        errorMessage: null,
      };
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "파트너 추가에 실패했습니다.";
      setErrorMessage(message);
      return { id: null, errorMessage: message };
    }
  }

  async function handleUpdate(
    partnerId: number,
    payload: PartnerRequest,
  ): Promise<PartnerMutationResult> {
    setErrorMessage(null);
    try {
      await updateMutation.mutateAsync({ partnerId, payload });
      return { success: true, errorMessage: null };
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "파트너 수정에 실패했습니다.";
      setErrorMessage(message);
      return { success: false, errorMessage: message };
    }
  }

  async function handleDelete(
    partnerId: number,
  ): Promise<PartnerMutationResult> {
    setErrorMessage(null);
    try {
      await deleteMutation.mutateAsync(partnerId);
      return { success: true, errorMessage: null };
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "파트너 삭제에 실패했습니다.";
      setErrorMessage(message);
      return { success: false, errorMessage: message };
    }
  }

  return {
    isLoading: query.isLoading,
    partners,
    errorMessage,
    isPendingCreate: createMutation.isPending,
    isPendingUpdate: updateMutation.isPending,
    isPendingDelete: deleteMutation.isPending,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
}
