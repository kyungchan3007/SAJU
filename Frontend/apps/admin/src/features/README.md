# `features` Layer

관리자 사용자가 수행하는 행동 단위 기능을 둔다. 로그인, 대시보드 조회, 모니터링, 알림 관리, 커뮤니티 기수 관리처럼 인터랙션과 상태가 중심이다.

## Ontology

- `auth`: 관리자 로그인 폼과 인증 흐름.
- `admin-layout`: 관리자 shell과 레이아웃 상호작용.
- `dashboard`: 대시보드 표시와 조회 흐름.
- `monitoring`: 모니터링/analytics 표시 흐름.
- `notification`: 알림 목록과 관리 흐름.
- `community-cohort`: 커뮤니티 기수 등록/목록 흐름.
- `ui`: props 기반 feature UI.

## Allowed

- `entities`의 서버/BFF 경계 함수를 사용해 관리자 기능을 구성한다.
- 폼 상태, 제출 흐름, 로딩/에러 상태, 캐시 갱신을 관리한다.
- 관리자 전용 UI 상호작용을 feature 내부에 둔다.
- `shared`의 공용 config, api util, lib를 사용할 수 있다.

## Forbidden

- 라우트 엔트리, metadata, BFF route handler를 넣지 않는다.
- 백엔드 admin API URL과 인증 헤더 조립을 UI 컴포넌트에 직접 넣지 않는다.
- 페이지 전체 섹션 조립을 과도하게 맡기지 않는다. 조립은 `widgets`가 우선이다.
- `apps/web` feature나 사용자용 인증 흐름을 가져오지 않는다.

## Dependency Direction

`features` → `entities` → `shared`

`features`는 `app`과 `widgets`를 import하지 않는다.

## Placement Guide

- 관리자 로그인 UI/상태: `features/auth`
- 대시보드 기능 단위: `features/dashboard`
- 커뮤니티 기수 등록/조회: `features/community-cohort`
- 알림 관리 기능: `features/notification`
- 페이지 섹션 조립: `widgets/<section>`
