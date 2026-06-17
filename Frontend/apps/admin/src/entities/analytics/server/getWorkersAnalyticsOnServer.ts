import "server-only";

import { cloudflareGraphQL } from "@/shared/api/cloudflare/graphql";
import { getServerEnv } from "@/shared/config/env";
import type { WorkersSummary } from "@/features/dashboard/type/types";

const QUERY = `
  query WorkersAnalytics($accountId: string!, $start: Time!, $end: Time!) {
    viewer {
      accounts(filter: { accountTag: $accountId }) {
        workersInvocationsAdaptive(
          filter: { datetime_geq: $start, datetime_leq: $end }
          limit: 10000
        ) {
          sum { requests errors }
        }
      }
    }
  }
`;

type CfWorkersResponse = {
  viewer: {
    accounts: {
      workersInvocationsAdaptive: {
        sum: { requests: number; errors: number };
      }[];
    }[];
  };
};

export async function getWorkersAnalyticsOnServer(): Promise<WorkersSummary> {
  const { CLOUDFLARE_ACCOUNT_ID } = getServerEnv();

  const end = new Date();
  const start = new Date(end.getTime() - 24 * 60 * 60 * 1000);

  const data = await cloudflareGraphQL<CfWorkersResponse>(QUERY, {
    accountId: CLOUDFLARE_ACCOUNT_ID,
    start: start.toISOString(),
    end: end.toISOString(),
  });

  const groups = data.viewer.accounts[0]?.workersInvocationsAdaptive ?? [];

  return groups.reduce(
    (acc, g) => ({
      totalInvocations: acc.totalInvocations + g.sum.requests,
      totalErrors: acc.totalErrors + g.sum.errors,
    }),
    { totalInvocations: 0, totalErrors: 0 },
  );
}
