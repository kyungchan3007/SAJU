---
name: saju-admin
description: >-
  이 저장소의 사주 관리자 앱(`apps/admin`) 작업에 사용한다. 관리자 로그인,
  관리자 BFF(`/api/auth/admin/login`, `/api/admin/notifications`,
  `/api/admin/community/cohort`, `/api/admin/community/cohorts`), 관리자 전용 백엔드 fetch wrapper, Cloudflare
  analytics API, 관리자 대시보드/모니터링/알림/커뮤니티 기수 관리 UI와 서버 연동
  작업이 해당된다. `apps/web` 서비스 앱 작업에는 사용하지 않는다.
---

# 사주 관리자 앱 스킬

작업 시작 전 대상이 `apps/admin`인지 먼저 식별한다.

## 읽기 규칙

- 기본으로 이 파일만 읽는다.
- 관리자 로그인 작업이면 `references/auth.md`를 읽는다.
- 관리자 백엔드 API 연동 작업이면 `references/admin-api.md`를 읽는다.
- Cloudflare analytics 작업이면 `references/cloudflare-analytics.md`를 읽는다.
- 관리자 UI/UX 또는 레이아웃 작업이면 `references/ui-shell.md`를 읽는다.
- 관련 없는 `apps/web/**` 파일과 `.md` 파일은 읽지 않는다.

## 공통 규칙

- 관리자 앱 루트는 `apps/admin`이며 workspace 이름은 `@saju/admin`이다.
- `apps/admin/**` 작업 중 `apps/web/**`는 수정하지 않는다.
- admin에 연결된 URL은 `apps/admin/src/shared/config/endPoint.ts`에서 정의한다.
- 현재 백엔드 admin API는 로그인 `/api/auth/admin/login`, 알림 `/api/admin/notifications`, 커뮤니티 기수 등록 `POST /api/admin/community/cohort`, 기수 목록 `GET /api/admin/community/cohorts`만 기준으로 한다.
- Cloudflare GraphQL URL도 `endPoint.ts`에서 관리하되, 백엔드 admin auth wrapper를 사용하지 않는다.
- 백엔드 admin API 호출은 `authenticatedBackendFetch`를 통해 쿠키의 token type과 access token으로 `Authorization`을 주입한다.
- 관리자 로그인은 백엔드 응답의 `accessToken`, `tokenType`, `expiresIn`을 쿠키 저장 정책에 사용한다.
- 카카오/OAuth 인증 코드는 관리자 앱에서 사용하지 않는다. 새로 추가하지 않는다.
- UI/UX 작업은 `features/*/ui`, `widgets/*` 쪽에 두고, 백엔드 직접 호출·쿠키 처리·서버 환경변수 접근은 BFF/server 레이어에 둔다.

## 검증 규칙

- 기능 변경 후 `npm run typecheck -w @saju/admin`을 실행한다.
- 가능하면 `npm run lint -w @saju/admin`도 실행한다.
- Next route 변경 후 stale `.next/dev/types` 때문에 타입 오류가 나면 route typegen 또는 dev type cache를 갱신한다.

## 갱신 규칙

- admin API가 추가되면 이 스킬의 현재 백엔드 admin API 목록과 `endPoint.ts` 규칙을 함께 갱신한다.
- 반복되는 실수, 앱 경계, 인증 정책이 바뀌면 이 스킬을 짧게 갱신한다.
