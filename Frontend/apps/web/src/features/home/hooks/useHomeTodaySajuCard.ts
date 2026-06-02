"use client";

import { useMemo } from "react";

import { useHomeTodaySaju } from "@/features/home/hooks/useHomeTodaySaju";
import { getHomeFiveElementBalanceRows } from "@/features/home/model/model";

export function useHomeTodaySajuCard() {
  const query = useHomeTodaySaju();
  const daily = query.data?.data;
  const fiveElementRows = useMemo(
    () => getHomeFiveElementBalanceRows(daily?.fiveElements ?? {}),
    [daily?.fiveElements],
  );

  return {
    daily,
    error: query.error,
    fiveElementRows,
    isLoading: query.isLoading,
  };
}
