export type HourlyRequest = {
  hour: number;
  datetime: string;
  requests: number;
  visits: number;
};

export type ZoneAnalyticsSummary = {
  totalRequests: number;
  totalVisits: number;
  totalBytes: number;
};

export type WorkersSummary = {
  totalInvocations: number;
  totalErrors: number;
};

export type DashboardData = {
  hourly: HourlyRequest[];
  zone: ZoneAnalyticsSummary;
  workers: WorkersSummary;
};
