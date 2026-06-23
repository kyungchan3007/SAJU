# `shared` Layer

도메인에 종속되지 않는 공용 기반 코드다. 앱 전역에서 재사용되는 UI, API 유틸, 설정, provider, hook, util을 둔다.

## Ontology

- `api`: BFF와 API 호출 공통 유틸, 인증/백엔드 fetch helper.
- `app-infra`: provider, navigation bridge, query provider 같은 앱 인프라.
- `config`: 환경 변수와 런타임 설정.
- `design-tokens`: 앱 내부 디자인 토큰 연결부.
- `hooks`: 도메인 없는 공용 React hook.
- `lib`: 외부 라이브러리 어댑터와 공용 로직.
- `model`: 전역 룩업 데이터와 순수 모델.
- `ui`: 도메인 없는 공용 UI 컴포넌트.
- `utils`: 범용 함수.
- `test`: 테스트 헬퍼.

## Allowed

- 여러 feature/domain/widget에서 반복되는 범용 코드를 둔다.
- 도메인 언어가 없는 버튼, 카드, 입력, 상태 표시 UI를 둔다.
- API 공통 응답 처리, 인증 쿠키 bridge, backend fetch helper를 둔다.
- 앱 provider와 React Query 공통 설정을 관리한다.

## Forbidden

- 특정 도메인 정책이나 화면 전용 로직을 넣지 않는다.
- `features`, `entities`, `widgets`, `app`을 import하지 않는다.
- 재사용 가능성이 검증되지 않은 코드를 성급히 올리지 않는다.
- `packages/ui`로 가야 할 완전 범용 primitive에 앱 도메인 의존성을 섞지 않는다.

## Dependency Direction

`shared`는 가장 낮은 앱 레이어다.

`shared` → 외부 라이브러리 또는 패키지. 앱 내부 상위 레이어로 역참조하지 않는다.

## Placement Guide

- 공용 API base client: `shared/api`
- React Query provider: `shared/app-infra/query-provider`
- 범용 UI: `shared/ui`
- 범용 hook: `shared/hooks`
- 범용 변환 함수: `shared/utils`
- 도메인 의미가 있는 룩업: 재사용 범위에 따라 `domain` 또는 `entities/model`을 먼저 검토한다.
