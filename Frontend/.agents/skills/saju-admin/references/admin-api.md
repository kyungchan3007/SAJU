---
domain: admin-backend-api
root: apps/admin
status: active
---

# Admin Backend API Ontology

## Entity

- **AdminEndpoint**: 백엔드 admin API path. `endPoint.ts`에서만 정의한다.
- **AdminBffRoute**: admin 앱의 Next route handler. HTTP 입출력과 body parsing을 담당한다.
- **AdminServerFunction**: backend admin API 호출 함수. `entities/*/server` 아래에 둔다.
- **AuthenticatedBackendFetch**: admin backend API 전용 fetch wrapper.

## Current Backend Admin Endpoints

- **AdminLogin**: `/api/auth/admin/login`
- **AdminNotificationCreate**: `/api/admin/notifications`
- **AdminCommunityCohortCreate**: `POST /api/admin/community/cohort`
- **AdminCommunityCohortList**: `GET /api/admin/community/cohorts`

## Location

- **Endpoint constants**: `apps/admin/src/shared/config/endPoint.ts`
- **Fetch wrapper**: `apps/admin/src/shared/api/auth/authenticatedBackendFetch.ts`
- **Notification server**: `apps/admin/src/entities/notification/server/createNotificationOnServer.ts`
- **Community server**: `apps/admin/src/entities/community/server`
- **Notification BFF**: `apps/admin/src/app/api/admin/notifications/route.ts`
- **Community create BFF**: `apps/admin/src/app/api/admin/community/cohort/route.ts`
- **Community list BFF**: `apps/admin/src/app/api/admin/community/cohorts/route.ts`

## Relationship

- **AdminBffRoute** calls **AdminServerFunction**.
- **AdminServerFunction** calls **AuthenticatedBackendFetch**.
- **AuthenticatedBackendFetch** reads admin cookies and injects `Authorization: {tokenType} {accessToken}`.
- **AdminEndpoint** constants are consumed by both BFF client callers and backend server functions when paths match.

## Invariant

- Hardcoded admin URL strings are allowed only in `apps/admin/src/shared/config/endPoint.ts`.
- New backend admin APIs must be added to `endPoint.ts` before use.
- Cloudflare API must not use `AuthenticatedBackendFetch`.
- `apps/web/src/generated/api` and `apps/web/**` are out of scope.
- `route.ts` files should stay thin: parse request, call server function, return response.

## Validation

- Search for hardcoded paths: `rg '"/api/admin|"/api/auth/admin' apps/admin/src`.
- Expected matches should be in `endPoint.ts` only unless a route segment path itself requires it.
- Run `npm run typecheck -w @saju/admin`.
