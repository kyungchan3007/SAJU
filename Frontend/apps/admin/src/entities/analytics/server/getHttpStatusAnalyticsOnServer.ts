import "server-only";

import { cloudflareGraphQL } from "@/shared/api/cloudflare/graphql";
import { getServerEnv } from "@/shared/config/env";

export type HttpStatusGroup = {
  status: number;
  requests: number;
};

const QUERY = `
  query HttpStatusAnalytics($zoneId: string!, $start: Time!, $end: Time!) {
    viewer {
      zones(filter: { zoneTag: $zoneId }) {
        httpRequests1hGroups(
          filter: { datetime_geq: $start, datetime_leq: $end }
          limit: 25
        ) {
          sum {
            responseStatusMap { edgeResponseStatus requests }
          }
        }
      }
    }
  }
`;

type CfStatusResponse = {
  viewer: {
    zones: {
      httpRequests1hGroups: {
        sum: {
          responseStatusMap: { edgeResponseStatus: number; requests: number }[];
        };
      }[];
    }[];
  };
};

export async function getHttpStatusAnalyticsOnServer(): Promise<HttpStatusGroup[]> {
  const { CLOUDFLARE_ZONE_ID } = getServerEnv();

  const end = new Date();
  const start = new Date(end.getTime() - 24 * 60 * 60 * 1000);

  const data = await cloudflareGraphQL<CfStatusResponse>(QUERY, {
    zoneId: CLOUDFLARE_ZONE_ID,
    start: start.toISOString(),
    end: end.toISOString(),
  });

  const groups = data.viewer.zones[0]?.httpRequests1hGroups ?? [];

  const merged = new Map<number, number>();
  for (const group of groups) {
    for (const entry of group.sum.responseStatusMap) {
      merged.set(entry.edgeResponseStatus, (merged.get(entry.edgeResponseStatus) ?? 0) + entry.requests);
    }
  }

  return Array.from(merged.entries())
    .map(([status, requests]) => ({ status, requests }))
    .sort((a, b) => a.status - b.status);
}
