---
domain: cloudflare-analytics
root: apps/admin
status: active
---

# Cloudflare Analytics Ontology

## Entity

- **CloudflareGraphQLClient**: Cloudflare GraphQL API 호출 전용 client.
- **ZoneAnalytics**: zone traffic, requests, visits, bytes summary.
- **WorkersAnalytics**: Workers invocation/error summary.
- **HttpStatusAnalytics**: HTTP status distribution.
- **CloudflareCredential**: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ZONE_ID`, `CLOUDFLARE_ACCOUNT_ID`.

## Location

- **GraphQL endpoint constant**: `apps/admin/src/shared/config/endPoint.ts`
- **GraphQL client**: `apps/admin/src/shared/api/cloudflare/graphql.ts`
- **Server functions**: `apps/admin/src/entities/analytics/server`
- **BFF routes**: `apps/admin/src/app/api/admin/analytics`
- **Dashboard hooks/UI**: `apps/admin/src/features/dashboard`
- **Monitoring hooks/UI**: `apps/admin/src/features/monitoring`

## Relationship

- **Dashboard/Monitoring UI** calls admin analytics BFF routes.
- **Analytics BFF route** calls **Analytics server function**.
- **Analytics server function** calls **CloudflareGraphQLClient**.
- **CloudflareGraphQLClient** uses Cloudflare env tokens, not admin auth cookies.

## Invariant

- Cloudflare calls are not backend admin API calls.
- Do not route Cloudflare calls through `authenticatedBackendFetch`.
- Keep GraphQL URL in `endPoint.ts`.
- Keep Cloudflare credentials in `apps/admin/src/shared/config/env.ts`.
- Never expose Cloudflare server env values to client components.

## Validation

- Run `npm run typecheck -w @saju/admin`.
- For URL hygiene, search `rg 'api.cloudflare.com|/api/admin/analytics' apps/admin/src`.
