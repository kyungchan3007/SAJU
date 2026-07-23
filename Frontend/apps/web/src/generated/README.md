# `generated` Layer

도구가 생성한 코드를 보관한다. 사람이 직접 편집하지 않고 재생성 절차로만 갱신한다.

## Ontology

- `api`: OpenAPI 기반 생성 클라이언트와 타입.
- `api/client`: 생성된 클라이언트 어댑터.
- `api/core`: 생성 런타임 코어.
- `api/sdk.gen.ts`, `api/types.gen.ts`: 백엔드 계약에서 파생된 생성물.

## Allowed

- `entities`에서 생성 타입과 클라이언트를 import해 얇게 감싼다.
- 백엔드 API 계약이 바뀌면 프로젝트의 OpenAPI 생성 스크립트로 갱신한다.
- 생성 결과의 diff는 API 계약 변경 여부 중심으로 검토한다.

## Forbidden

- 이 디렉터리의 파일을 직접 수정하지 않는다.
- UI, feature hook, 도메인 로직을 추가하지 않는다.
- 생성 타입을 앱 전체에 무분별하게 노출하지 않는다. `entities`에서 필요한 모델로 감싼다.
- 수동 hotfix로 백엔드 계약 불일치를 숨기지 않는다.

## Dependency Direction

`generated`는 의존 대상이 아니라 입력 계약이다.

허용되는 일반 흐름은 `features` → `entities` → `generated/api`다.

## Placement Guide

- OpenAPI 생성물: `generated/api/**`
- 생성물을 감싼 클라이언트 함수: `entities/<domain>/client`
- 서버 전용 호출 래퍼: `entities/<domain>/server`
- UI 친화 타입/모델: `entities/<domain>/model` 또는 `features/<feature>/type`
