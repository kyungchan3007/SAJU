---
domain: admin-ui-shell
root: apps/admin
status: active
---

# Admin UI Shell Ontology

## Entity

- **AdminLayout**: authenticated admin layout and navigation shell.
- **AuthLayout**: login route layout.
- **DashboardPage**: high-level analytics overview.
- **MonitoringPage**: operational metrics view.
- **NotificationPage**: admin notification creation.
- **CommunityPage**: community cohort list/create management.

## Location

- **Route pages**: `apps/admin/src/app/(admin)` and `apps/admin/src/app/(auth)`
- **Layout feature**: `apps/admin/src/features/admin-layout/ui`
- **Widgets**: `apps/admin/src/widgets/*-section/ui`
- **Feature UI**: `apps/admin/src/features/*/ui`
- **Client hooks**: `apps/admin/src/features/*/hooks`
- **Client API functions**: `apps/admin/src/entities/*/client`

## Relationship

- **Page** composes **Widget**.
- **Widget** composes **Feature UI**.
- **Feature hook** calls **Entity client function**.
- **Entity client function** calls admin BFF endpoint constants.
- **Server and cookie logic** stay outside UI components.

## Invariant

- UI/UX work should not modify backend server functions unless API contract changes.
- Client components must not read server env values or cookies directly.
- New admin client fetch paths should use constants from `endPoint.ts`.
- Login UI should submit to `POST /api/auth/admin/login`.
- Do not reintroduce Kakao/OAuth login UI.

## Validation

- Run `npm run typecheck -w @saju/admin`.
- Run `npm run lint -w @saju/admin` after UI changes.
