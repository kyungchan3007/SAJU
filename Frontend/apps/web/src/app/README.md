# `app` Layer

Next.js App Router의 실행 진입점이다. 라우트, 서버 경계, 메타데이터, BFF API를 선언하고 하위 레이어를 조립한다.

## Ontology

- `page.tsx`: 라우트 엔트리. 데이터/상태 로직보다 라우팅 결정과 widget 조립에 집중한다.
- `layout.tsx`: 라우트 그룹의 공통 껍데기와 provider 배치를 담당한다.
- `loading.tsx`, `error.tsx`, `not-found.tsx`: 라우트 단위 상태 화면을 정의한다.
- `api/**/route.ts`: 브라우저와 백엔드 사이의 BFF 경계다.
- `sitemap.ts`, `robots.ts`, `metadata`: SEO와 크롤러 정책을 선언한다.

## Allowed

- `widgets`, `features`, `entities`, `shared`를 import해 라우트를 조립한다.
- 서버 리다이렉트, 인증 쿠키 확인, route metadata를 처리한다.
- 인증/보안/외부 백엔드 호출이 필요한 브라우저 요청은 `api/**/route.ts`로 받는다.
- 라우트 그룹으로 공개/인증/오류 흐름을 분리한다.

## Forbidden

- 페이지 파일에 복잡한 폼 상태, API 응답 가공, 도메인 계산을 직접 넣지 않는다.
- 클라이언트 컴포넌트에서 백엔드 원본 API를 직접 호출하지 않는다.
- `generated/api` 생성물을 수정하지 않는다.
- `apps/admin` 또는 `apps/docs` 코드를 import하지 않는다.

## Dependency Direction

`app` → `widgets` → `features` → `entities` → `shared`

필요하면 `app`에서 `features`, `entities`, `shared`를 직접 사용할 수 있지만, 로직이 커지면 더 낮은 레이어로 내린다.

## Placement Guide

- 새 화면 라우트: `apps/web/src/app/(main)/<route>/page.tsx`
- 인증 관련 라우트: `apps/web/src/app/(auth)/**`
- 공통 오류 라우트: `apps/web/src/app/(error)/**`
- BFF 엔드포인트: `apps/web/src/app/api/<domain>/route.ts`
- 페이지 섹션 구현: `widgets/<domain>/ui`
