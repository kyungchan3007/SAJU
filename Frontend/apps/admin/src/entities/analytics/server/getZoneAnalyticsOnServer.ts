import "server-only";

import { cloudflareGraphQL } from "@/shared/api/cloudflare/graphql";
import { getServerEnv } from "@/shared/config/env";
import type { HourlyRequest, ZoneAnalyticsSummary } from "@/features/dashboard/type/types";

const QUERY = `
  query ZoneAnalytics($zoneId: string!, $start: Time!, $end: Time!) {
    viewer {
      zones(filter: { zoneTag: $zoneId }) {
        httpRequests1hGroups(
          filter: { datetime_geq: $start, datetime_leq: $end }
          limit: 25
          orderBy: [datetime_ASC]
        ) {
          dimensions { datetime }
          sum { requests bytes }
          uniq { uniques }
        }
      }
    }
  }
`;

type CfZoneResponse = {
  viewer: {
    zones: {
      httpRequests1hGroups: {
        dimensions: { datetime: string };
        sum: { requests: number; bytes: number };
        uniq: { uniques: number };
      }[];
    }[];
  };
};

export async function getZoneAnalyticsOnServer(): Promise<{
  hourly: HourlyRequest[];
  summary: ZoneAnalyticsSummary;
}> {
  const { CLOUDFLARE_ZONE_ID } = getServerEnv();

  const end = new Date();
  const start = new Date(end.getTime() - 24 * 60 * 60 * 1000);

  const data = await cloudflareGraphQL<CfZoneResponse>(QUERY, {
    zoneId: CLOUDFLARE_ZONE_ID,
    start: start.toISOString(),
    end: end.toISOString(),
  });

  const groups = data.viewer.zones[0]?.httpRequests1hGroups ?? [];

  const hourly: HourlyRequest[] = groups.map((g) => ({
    hour: new Date(g.dimensions.datetime).getHours(),
    datetime: g.dimensions.datetime,
    requests: g.sum.requests,
    visits: g.uniq.uniques,
  }));

  const summary: ZoneAnalyticsSummary = groups.reduce(
    (acc, g) => ({
      totalRequests: acc.totalRequests + g.sum.requests,
      totalVisits: acc.totalVisits + g.uniq.uniques,
      totalBytes: acc.totalBytes + g.sum.bytes,
    }),
    { totalRequests: 0, totalVisits: 0, totalBytes: 0 },
  );

  return { hourly, summary };
}
