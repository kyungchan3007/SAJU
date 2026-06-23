# `domain` Layer

여러 feature나 widget에서 공유되는 도메인 지식, 룩업 데이터, 도메인 전용 UI를 둔다. 특정 사용자 액션보다 도메인 개념 자체가 중심이다.

## Ontology

- `model`: 도메인 상수, 룩업 테이블, 순수 변환 규칙.
- `ui`: 특정 도메인 의미를 가진 표시 컴포넌트.
- 도메인 하위 폴더: `saju`, `navigation`처럼 비즈니스 언어로 나눈다.

## Allowed

- 사주, 오행, 띠, 내비게이션 같은 앱 도메인 개념을 표현한다.
- 여러 feature/widget에서 반복되는 도메인 전용 표시 규칙을 모은다.
- API 호출이 필요 없는 순수 데이터와 순수 함수를 둔다.
- `shared`의 UI, util, config를 사용할 수 있다.

## Forbidden

- React Query, mutation, 제출 흐름, 페이지 이동 같은 사용자 액션 로직을 넣지 않는다.
- 서버/클라이언트 API 호출을 직접 두지 않는다.
- 특정 페이지 하나에서만 쓰는 섹션 조립 코드를 넣지 않는다.
- 도메인 없는 범용 UI를 넣지 않는다. 범용이면 `shared/ui` 또는 `packages/ui`를 검토한다.

## Dependency Direction

`domain` → `shared`

`domain`은 `app`, `widgets`, `features`, `entities`를 import하지 않는다.

## Placement Guide

- 여러 화면에서 쓰는 사주 가이드 카드: `domain/saju/**`
- 도메인 내비게이션 모델: `domain/navigation/model`
- 도메인 전용 표시 UI: `domain/<domain>/ui`
- API 타입 기반 정규화: `entities/<domain>/model`에 둔다.
