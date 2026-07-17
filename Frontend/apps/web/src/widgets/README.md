# `widgets` Layer

페이지를 구성하는 큰 섹션 단위 조립 레이어다. `app`의 page는 widget을 배치하고, widget은 feature/domain/shared UI를 조합해 화면 블록을 만든다.

## Ontology

- `ui`: 페이지 섹션 또는 화면 블록 컴포넌트.
- `model`: 해당 widget에서만 쓰는 정적 콘텐츠나 표시 모델.
- 도메인 폴더: `home-hero`, `saju-result`, `mypage`처럼 화면 섹션 언어로 나눈다.

## Allowed

- 여러 feature UI를 조합해 페이지 섹션을 만든다.
- `features`, `entities`, `domain`, `shared`를 import해 표시 흐름을 구성한다.
- route page의 JSX 복잡도를 줄인다.
- widget 내부에만 의미 있는 정적 표시 데이터를 `model`에 둘 수 있다.

## Forbidden

- React Query와 mutation을 직접 선언하지 않는다. 필요한 경우 `features/*/hooks`를 사용한다.
- API 응답 정규화를 widget에서 직접 하지 않는다.
- 라우트 metadata, BFF route handler, 서버 인증 정책을 넣지 않는다.
- 범용 UI나 도메인 공통 규칙을 widget에 가둬두지 않는다.

## Dependency Direction

`widgets` → `features` → `entities` → `shared`

`widgets`는 `domain`과 `shared`를 사용할 수 있다. `app`을 import하지 않는다.

## Placement Guide

- 페이지 큰 섹션: `widgets/<section>/ui`
- widget 전용 표시 데이터: `widgets/<section>/model`
- 사용자 액션 로직: `features/<feature>/hooks` 또는 `features/<feature>/model`
- 라우트 조립: `app/**/page.tsx`
