---
domain: admin-auth
root: apps/admin
status: active
---

# Admin Auth Ontology

## Entity

- **AdminSession**: 관리자 앱의 인증 상태. `accessToken`, `tokenType`, `expiresIn`으로 구성한다.
- **AdminCredentials**: 관리자 로그인 입력값. `username`, `password`만 포함한다.
- **AdminCookiePolicy**: 관리자 앱 쿠키 저장 규칙. 일반 서비스 앱 쿠키 정책과 공유하지 않는다.

## Location

- **Login BFF**: `apps/admin/src/app/api/auth/admin/login/route.ts`
- **Login server action boundary**: `apps/admin/src/entities/auth/server/loginAdminOnServer.ts`
- **Cookie helper**: `apps/admin/src/entities/auth/server/adminAuthCookies.ts`
- **Cookie constants**: `apps/admin/src/shared/config/authToken.ts`
- **Route protection**: `apps/admin/src/middleware.ts`
- **Login UI**: `apps/admin/src/features/auth/ui`

## Relationship

- **Login UI** calls **Login BFF**.
- **Login BFF** validates request body and calls **loginAdminOnServer**.
- **loginAdminOnServer** calls backend `ADMIN_LOGIN_ENDPOINT_PATH`.
- **Login BFF** stores **AdminSession** through **setAdminAuthCookies**.
- **middleware** protects admin routes by reading `ACCESS_TOKEN_COOKIE_KEY`.

## Invariant

- `apps/web/**` must not be touched for admin auth work.
- 카카오/OAuth 인증은 admin 앱에서 사용하지 않는다.
- 백엔드가 내려준 `tokenType`과 `expiresIn`을 우선 사용한다.
- `expiresIn`이 없거나 비정상이면 fallback max age만 사용한다.
- 로그인 BFF는 UI 로직을 포함하지 않는다.

## Validation

- Run `npm run typecheck -w @saju/admin`.
- Run `npm run lint -w @saju/admin` when auth files changed.
