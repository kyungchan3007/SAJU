# `widgets` Layer

관리자 페이지를 구성하는 큰 섹션 단위 조립 레이어다. `app`의 page는 widget을 배치하고, widget은 feature/entity/shared 코드를 조합해 화면 블록을 만든다.

## Ontology

- `dashboard-section`: 관리자 대시보드 섹션.
- `monitoring-section`: 모니터링/analytics 섹션.
- `notification-section`: 알림 관리 섹션.
- `community-cohort-section`: 커뮤니티 기수 관리 섹션.
- `landing-page`: 관리자 진입/랜딩 화면 섹션.

## Allowed

- 여러 feature UI를 조합해 관리자 페이지 섹션을 만든다.
- `features`, `entities`, `shared`를 import해 표시 흐름을 구성한다.
- route page의 JSX 복잡도를 줄인다.
- widget 내부에만 의미 있는 정적 표시 데이터를 둘 수 있다.

## Forbidden

- 백엔드 admin API 인증 헤더, 쿠키 처리, 서버 환경변수 접근을 직접 처리하지 않는다.
- API 응답 정규화를 widget에서 직접 하지 않는다.
- 라우트 metadata, BFF route handler, 서버 인증 정책을 넣지 않는다.
- 사용자용 `apps/web` widget이나 UI 흐름을 가져오지 않는다.

## Dependency Direction

`widgets` → `features` → `entities` → `shared`

`widgets`는 `app`을 import하지 않는다.

## Placement Guide

- 대시보드 페이지 섹션: `widgets/dashboard-section`
- 모니터링 페이지 섹션: `widgets/monitoring-section`
- 알림 페이지 섹션: `widgets/notification-section`
- 커뮤니티 기수 페이지 섹션: `widgets/community-cohort-section`
- 사용자 액션 로직: `features/<feature>`
