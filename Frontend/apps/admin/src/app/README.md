# `app` Layer

관리자 Next.js App Router의 실행 진입점이다. 관리자 라우트, 로그인 라우트, BFF API, 서버 경계를 선언하고 하위 레이어를 조립한다.

## Ontology

- `(admin)`: 로그인 이후 접근하는 관리자 화면 라우트 그룹.
- `(auth)`: 관리자 로그인과 인증 진입 라우트 그룹.
- `api/**/route.ts`: 관리자 프론트와 백엔드 사이의 BFF 경계.
- `layout.tsx`: 관리자 앱 껍데기와 provider 배치.
- `page.tsx`: 라우트 엔트리. 화면 조립은 가능하면 widget에 위임한다.

## Allowed

- `widgets`, `features`, `entities`, `shared`를 import해 라우트를 조립한다.
- 관리자 인증 쿠키 확인, 서버 리다이렉트, route metadata를 처리한다.
- 백엔드 admin API 호출은 BFF/server 경계를 통해 처리한다.
- Cloudflare analytics처럼 외부 API 경계가 필요한 요청은 명확한 route handler로 격리한다.

## Forbidden

- 페이지 파일에 복잡한 폼 상태, API 응답 가공, 대시보드 계산을 직접 넣지 않는다.
- 관리자 클라이언트 컴포넌트에서 백엔드 admin API를 직접 호출하지 않는다.
- 카카오/OAuth 사용자 인증 흐름을 추가하지 않는다.
- `apps/web` 코드를 import하거나 수정하지 않는다.

## Dependency Direction

`app` → `widgets` → `features` → `entities` → `shared`

필요하면 `app`에서 `entities`와 `shared`를 직접 사용할 수 있지만, 로직이 커지면 낮은 레이어로 내린다.

## Placement Guide

- 관리자 화면 라우트: `app/(admin)/**/page.tsx`
- 관리자 로그인 라우트: `app/(auth)/**/page.tsx`
- 관리자 BFF: `app/api/admin/**/route.ts`
- 관리자 인증 BFF: `app/api/auth/admin/**/route.ts`
- 화면 섹션 구현: `widgets/<section>`
