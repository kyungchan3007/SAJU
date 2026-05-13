"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPartnersOnClient } from "@/entities/partner/client/fetchPartnersOnClient";
import { createPartnerOnClient } from "@/entities/partner/client/createPartnerOnClient";
import { updatePartnerOnClient } from "@/entities/partner/client/updatePartnerOnClient";
import { deletePartnerOnClient } from "@/entities/partner/client/deletePartnerOnClient";
import type { PartnerRequest } from "@/generated/api";

export const PARTNERS_QUERY_KEY = ["partners"] as const;
export const MAX_PARTNERS = 4;

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

  const partners = query.data?.success
    ? (query.data.data?.partners ?? [])
    : [];

  async function handleCreate(payload: PartnerRequest): Promise<number | null> {
    setErrorMessage(null);
    try {
      const result = await createMutation.mutateAsync(payload);
      return result.success ? (result.data?.id ?? null) : null;
    } catch (e) {
      setErrorMessage(
        e instanceof Error ? e.message : "파트너 추가에 실패했습니다.",
      );
      return null;
    }
  }

  async function handleUpdate(
    partnerId: number,
    payload: PartnerRequest,
  ): Promise<boolean> {
    setErrorMessage(null);
    try {
      await updateMutation.mutateAsync({ partnerId, payload });
      return true;
    } catch (e) {
      setErrorMessage(
        e instanceof Error ? e.message : "파트너 수정에 실패했습니다.",
      );
      return false;
    }
  }

  async function handleDelete(partnerId: number): Promise<boolean> {
    setErrorMessage(null);
    try {
      await deleteMutation.mutateAsync(partnerId);
      return true;
    } catch (e) {
      setErrorMessage(
        e instanceof Error ? e.message : "파트너 삭제에 실패했습니다.",
      );
      return false;
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
