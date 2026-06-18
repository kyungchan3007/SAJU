"use client";

import { Activity, AlertTriangle, Database, Globe, MousePointerClick, Users } from "lucide-react";
import { ErrorStateCard, LoadingStateCard } from "@saju/ui";

import { useWorkersAnalytics, useZoneAnalytics } from "../hooks/useDashboard";
import { RequestsChart } from "./requests-chart";
import { StatCard } from "./stat-card";

const MOCK_REGISTERED_USERS = 128;

function formatBytes(bytes: number): string {
  if (bytes >= 1_073_741_824) return `${(bytes / 1_073_741_824).toFixed(1)} GB`;
  if (bytes >= 1_048_576) return `${(bytes / 1_048_576).toFixed(1)} MB`;
  if (bytes >= 1_024) return `${(bytes / 1_024).toFixed(1)} KB`;
  return `${bytes} B`;
}

export function DashboardStatsContainer() {
  const zone = useZoneAnalytics();
  const workers = useWorkersAnalytics();

  const isLoading = zone.isLoading || workers.isLoading;
  const isError = zone.isError || workers.isError;

  if (isLoading) return <LoadingStateCard message="분석 데이터를 불러오는 중..." />;
  if (isError) return <ErrorStateCard title="오류" description="데이터를 불러오지 못했습니다." />;

  const { hourly, summary } = zone.data!;
  const { totalInvocations, totalErrors } = workers.data!;
  const errorRate =
    totalInvocations > 0 ? ((totalErrors / totalInvocations) * 100).toFixed(2) : "0.00";

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard
          icon={Users}
          label="등록된 유저"
          value={MOCK_REGISTERED_USERS.toLocaleString()}
          sub="목데이터"
        />
        <StatCard
          icon={Globe}
          label="총 요청수 (24h)"
          value={summary.totalRequests.toLocaleString()}
          sub="Cloudflare Zone"
        />
        <StatCard
          icon={MousePointerClick}
          label="총 방문수 (24h)"
          value={summary.totalVisits.toLocaleString()}
          sub="Cloudflare Zone"
        />
        <StatCard
          icon={Database}
          label="응답 바이트 (24h)"
          value={formatBytes(summary.totalBytes)}
          sub="Cloudflare Zone"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <StatCard
          icon={Activity}
          label="Workers 호출수 (24h)"
          value={totalInvocations.toLocaleString()}
          sub="Cloudflare Workers"
        />
        <StatCard
          icon={AlertTriangle}
          label="Workers 에러율 (24h)"
          value={`${errorRate}%`}
          sub={`${totalErrors.toLocaleString()} 건 에러`}
        />
      </div>

      <RequestsChart data={hourly} />
    </div>
  );
}
