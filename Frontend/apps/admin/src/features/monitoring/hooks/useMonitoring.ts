"use client";

import { useQuery } from "@tanstack/react-query";

import type { HttpStatusGroup } from "../type/types";
import { MONITORING_QUERY_KEY } from "../model/queryKey";
import { ADMIN_ANALYTICS_STATUS_ENDPOINT_PATH } from "@/shared/config/endPoint";

async function fetchStatusAnalytics(): Promise<HttpStatusGroup[]> {
  const res = await fetch(ADMIN_ANALYTICS_STATUS_ENDPOINT_PATH);
  if (!res.ok) throw new Error("Failed to fetch status analytics");
  return res.json() as Promise<HttpStatusGroup[]>;
}

export function useHttpStatusAnalytics() {
  return useQuery({
    queryKey: MONITORING_QUERY_KEY.status,
    queryFn: fetchStatusAnalytics,
    staleTime: 5 * 60 * 1000,
  });
}
