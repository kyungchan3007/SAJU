# `shared` Layer

관리자 앱 전역에서 재사용되는 공용 기반 코드다. API 유틸, 설정, provider, 라이브러리 어댑터처럼 도메인에 종속되지 않는 코드를 둔다.

## Ontology

- `api`: 관리자 BFF와 백엔드 호출 공통 유틸.
- `app-infra`: provider, 앱 초기화, shell infra.
- `config`: endpoint와 환경 설정.
- `lib`: 외부 라이브러리 어댑터와 공용 로직.

## Allowed

- 관리자 백엔드 endpoint는 `shared/config/endPoint.ts`에서 관리한다.
- `authenticatedBackendFetch`처럼 관리자 인증 공통 fetch wrapper를 둔다.
- 여러 feature/entity에서 반복되는 범용 코드를 둔다.
- Cloudflare GraphQL endpoint 같은 외부 서비스 URL을 config에서 관리한다.

## Forbidden

- 특정 관리자 화면 전용 로직을 넣지 않는다.
- `features`, `entities`, `widgets`, `app`을 import하지 않는다.
- 카카오/OAuth 사용자 인증 공통 코드를 추가하지 않는다.
- `apps/web` shared 코드를 직접 가져오지 않는다.

## Dependency Direction

`shared`는 관리자 앱의 가장 낮은 레이어다.

`shared` → 외부 라이브러리. 앱 내부 상위 레이어로 역참조하지 않는다.

## Placement Guide

- 관리자 API base 유틸: `shared/api`
- endpoint 정의: `shared/config/endPoint.ts`
- 앱 provider: `shared/app-infra`
- 범용 library adapter: `shared/lib`
- 도메인별 서버 호출: `entities/<domain>/server`
