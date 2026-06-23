# `generated` Layer

도구가 생성한 관리자 앱 코드를 보관하는 영역이다. 사람이 직접 편집하지 않고 재생성 절차로만 갱신한다.

## Ontology

- 생성 API 클라이언트, 타입, SDK가 생길 경우 이 디렉터리에 둔다.
- 생성물은 백엔드 계약의 결과물이며 앱 도메인 로직의 소유자가 아니다.

## Allowed

- `entities`에서 생성 타입과 클라이언트를 감싸 관리자 앱 친화 API로 노출한다.
- 백엔드 admin API 계약이 바뀌면 생성 스크립트로 갱신한다.
- 생성 결과는 계약 변경 diff 중심으로 검토한다.

## Forbidden

- 이 디렉터리의 파일을 직접 수정하지 않는다.
- UI, feature hook, 관리자 인증 정책을 추가하지 않는다.
- 생성 타입을 앱 전체에 무분별하게 노출하지 않는다.
- `apps/web/src/generated`와 섞어 쓰지 않는다.

## Dependency Direction

`generated`는 의존 대상이 아니라 입력 계약이다.

허용되는 일반 흐름은 `features` → `entities` → `generated`다.

## Placement Guide

- 생성물: `generated/**`
- 생성물 래핑: `entities/<domain>`
- 관리자 기능 훅/상태: `features/<feature>`
- BFF route handler: `app/api/**/route.ts`
