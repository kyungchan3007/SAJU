# `types` Layer

앱 전역에서 반드시 공유해야 하는 TypeScript 선언만 둔다. 기본 원칙은 전역 타입을 최소화하는 것이다.

## Ontology

- 전역 ambient declaration.
- 빌드/런타임 환경 보강 타입.
- 여러 레이어가 공통으로 알아야 하지만 특정 도메인에 속하지 않는 타입.

## Allowed

- Next.js, Cloudflare, 런타임 환경처럼 앱 전체에 필요한 선언을 둔다.
- 타입 전용 파일만 둔다.
- 특정 구현에 의존하지 않는 전역 보강 선언을 둔다.

## Forbidden

- 도메인 모델 타입을 전역화하지 않는다. 도메인 타입은 `entities/<domain>/model` 또는 `features/<feature>/type`에 둔다.
- API 생성 타입을 복사하지 않는다. `generated/api`를 원천으로 두고 `entities`에서 감싼다.
- UI 컴포넌트 props 타입을 전역에 모으지 않는다.
- 런타임 코드와 비즈니스 로직을 넣지 않는다.

## Dependency Direction

`types`는 타입 선언의 보조 레이어다.

상위 레이어가 필요할 때 type import만 사용한다. `types`에서 앱 레이어를 import하지 않는다.

## Placement Guide

- 전역 환경 선언: `types/*.d.ts`
- 도메인 리소스 타입: `entities/<domain>/model`
- feature 전용 타입: `features/<feature>/type`
- 컴포넌트 props: 해당 컴포넌트 파일 또는 가까운 `type` 파일
