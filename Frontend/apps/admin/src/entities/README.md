# `entities` Layer

관리자 백엔드 리소스와 외부 서비스 리소스의 경계다. API 호출, 서버 유틸, 응답 정규화, 리소스 타입을 도메인별로 관리한다.

## Ontology

- `auth`: 관리자 로그인과 토큰 응답 리소스.
- `notification`: 관리자 알림 리소스.
- `community`: 커뮤니티 기수 관리 리소스.
- `analytics`: Cloudflare analytics 리소스.
- 하위 `server`: route handler와 서버 컴포넌트에서 사용하는 서버 전용 호출.

## Allowed

- `shared/api`의 관리자 fetch wrapper를 사용해 백엔드 admin API를 호출한다.
- 쿠키의 token type과 access token을 이용한 `Authorization` 주입은 서버 경계에서 처리한다.
- 백엔드 응답을 관리자 UI가 쓰기 쉬운 모델로 정규화한다.
- Cloudflare analytics는 백엔드 admin auth wrapper와 분리해 다룬다.

## Forbidden

- React 컴포넌트와 화면 레이아웃을 넣지 않는다.
- `useQuery`, `useMutation` 같은 UI 훅을 직접 노출하지 않는다. 훅은 `features/*`에 둔다.
- 관리자 로그인에 카카오/OAuth 인증 코드를 섞지 않는다.
- `apps/web`의 entity나 generated client를 사용하지 않는다.

## Dependency Direction

`entities` → `shared`

`entities`는 `app`, `widgets`, `features`를 import하지 않는다.

## Placement Guide

- 관리자 백엔드 호출: `entities/<domain>/server`
- 응답 정규화/타입: `entities/<domain>`
- BFF route handler: `app/api/**/route.ts`
- UI 조회/제출 훅: `features/<feature>`
