# `entities` Layer

백엔드 리소스와 프론트 도메인 모델의 경계다. API 호출, 서버 유틸, 응답 정규화, 리소스 타입을 도메인별로 관리한다.

## Ontology

- `client`: 브라우저에서 호출 가능한 API 클라이언트 함수.
- `server`: 서버 컴포넌트, route handler, BFF에서 쓰는 서버 전용 함수.
- `model`: 응답 정규화, 리소스 타입, 파생 데이터 계산.
- 도메인 폴더: `auth`, `user`, `saju`, `compatibility`, `community` 등 백엔드 리소스 단위.

## Allowed

- `generated/api` 타입과 클라이언트를 감싸 프로젝트 친화 API로 노출한다.
- 백엔드 응답을 UI가 쓰기 좋은 모델로 정규화한다.
- 인증 쿠키 기반 서버 호출은 `server`에 둔다.
- 공통 API 유틸은 `shared/api`에서 가져와 사용한다.

## Forbidden

- React 컴포넌트와 화면 레이아웃을 넣지 않는다.
- `useQuery`, `useMutation` 같은 React Query 훅을 직접 노출하지 않는다. 훅은 `features/*/hooks`에 둔다.
- 사용자 액션 플로우, 폼 상태, 단계 진행 로직을 넣지 않는다.
- `generated/api` 파일을 직접 수정하지 않는다.

## Dependency Direction

`entities` → `shared`, `generated/api`

`entities`는 `app`, `widgets`, `features`, `domain`을 import하지 않는다.

## Placement Guide

- 백엔드 리소스 호출: `entities/<domain>/client` 또는 `entities/<domain>/server`
- 응답 매핑/정규화: `entities/<domain>/model`
- 서버 전용 인증 호출: `entities/auth/server`
- UI에서 쓰는 query/mutation 훅: `features/<feature>/hooks`
