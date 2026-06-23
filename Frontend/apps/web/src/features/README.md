# `features` Layer

사용자가 수행하는 행동 단위의 기능을 둔다. 조회, 제출, 선택, 단계 진행, 결제 유도처럼 인터랙션과 상태가 중심이다.

## Ontology

- `hooks`: React Query, mutation, local state, feature orchestration.
- `model`: feature 내부 상태 모델, 파생 계산, validation schema.
- `ui`: props 기반 feature UI.
- `form`: 입력 폼 구성 요소.
- `step`: 다단계 흐름의 단계 컴포넌트.
- `type`: feature 전용 타입.

## Allowed

- `entities` API 함수를 React Query 훅으로 감싼다.
- 사용자 액션, 제출 흐름, optimistic update, 캐시 무효화를 관리한다.
- feature 내부 UI를 작은 props 기반 컴포넌트로 나눈다.
- `domain` 지식과 `shared` 컴포넌트를 조합한다.

## Forbidden

- 라우트 엔트리, metadata, BFF route handler를 넣지 않는다.
- 페이지 전체 레이아웃 섹션 조립을 과도하게 맡기지 않는다. 조립은 `widgets`가 우선이다.
- 백엔드 원본 API 호출을 UI 컴포넌트 안에 직접 넣지 않는다.
- 여러 도메인에서 재사용될 범용 util/UI를 feature 안에 묶어두지 않는다.

## Dependency Direction

`features` → `entities` → `shared`

`features`는 `domain`과 `shared`를 사용할 수 있다. `app`과 `widgets`는 import하지 않는다.

## Placement Guide

- 조회/제출 훅: `features/<feature>/hooks`
- 폼 검증과 상태 모델: `features/<feature>/model`
- feature 전용 컴포넌트: `features/<feature>/ui`
- 사주 입력 단계: `features/saju-input/step`
- API 응답 정규화: `entities/<domain>/model`
