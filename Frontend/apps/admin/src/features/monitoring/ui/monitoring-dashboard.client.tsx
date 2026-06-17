"use client";

import { ErrorStateCard, LoadingStateCard } from "@saju/ui";

import { useHttpStatusAnalytics } from "../hooks/useMonitoring";
import { useWorkersAnalytics } from "@/features/dashboard/hooks/useDashboard";
import { HttpStatusChart } from "./http-status-chart";
import { WorkersErrorRate } from "./workers-error-rate";

export function MonitoringDashboardContainer() {
  const status = useHttpStatusAnalytics();
  const workers = useWorkersAnalytics();

  const isLoading = status.isLoading || workers.isLoading;
  const isError = status.isError || workers.isError;

  if (isLoading) return <LoadingStateCard message="모니터링 데이터를 불러오는 중..." />;
  if (isError) return <ErrorStateCard title="오류" description="데이터를 불러오지 못했습니다." />;

  return (
    <div className="flex flex-col gap-6">
      <HttpStatusChart data={status.data!} />
      <WorkersErrorRate
        totalInvocations={workers.data!.totalInvocations}
        totalErrors={workers.data!.totalErrors}
      />
    </div>
  );
}
