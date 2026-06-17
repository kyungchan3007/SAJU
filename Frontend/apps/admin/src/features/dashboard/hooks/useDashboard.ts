"use client";

import { useQuery } from "@tanstack/react-query";

import type { HourlyRequest, WorkersSummary, ZoneAnalyticsSummary } from "../type/types";
import { DASHBOARD_QUERY_KEY } from "../model/queryKey";

async function fetchZoneAnalytics(): Promise<{ hourly: HourlyRequest[]; summary: ZoneAnalyticsSummary }> {
  const res = await fetch("/api/admin/analytics/zone");
  if (!res.ok) throw new Error("Failed to fetch zone analytics");
  return res.json() as Promise<{ hourly: HourlyRequest[]; summary: ZoneAnalyticsSummary }>;
}

async function fetchWorkersAnalytics(): Promise<WorkersSummary> {
  const res = await fetch("/api/admin/analytics/workers");
  if (!res.ok) throw new Error("Failed to fetch workers analytics");
  return res.json() as Promise<WorkersSummary>;
}

export function useZoneAnalytics() {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEY.zone,
    queryFn: fetchZoneAnalytics,
    staleTime: 5 * 60 * 1000,
  });
}

export function useWorkersAnalytics() {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEY.workers,
    queryFn: fetchWorkersAnalytics,
    staleTime: 5 * 60 * 1000,
  });
}
