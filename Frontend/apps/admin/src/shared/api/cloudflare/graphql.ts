import "server-only";

import { CLOUDFLARE_GRAPHQL_ENDPOINT } from "@/shared/config/endPoint";
import { getServerEnv } from "@/shared/config/env";

export async function cloudflareGraphQL<T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<T> {
  const { CLOUDFLARE_API_TOKEN } = getServerEnv();

  const res = await fetch(CLOUDFLARE_GRAPHQL_ENDPOINT, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`Cloudflare API error: ${res.status}`);
  }

  const json = (await res.json()) as {
    data: T;
    errors?: { message: string }[];
  };

  if (json.errors?.length) {
    throw new Error(JSON.stringify(json.errors));
  }

  return json.data;
}
