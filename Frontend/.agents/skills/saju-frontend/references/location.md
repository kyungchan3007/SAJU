---
name: saju-frontend-ref-location
description: /location 관련 경로와 위치 추천/지도 작업 규칙
---

# /location 작업 참고

## 쓰는 조건

`/location`, 위치 추천, 지도 표시/상호작용, 사주 기반 장소 추천 UI/API를 수정할 때 사용한다.

## 관련 경로

- `src/app/(main)/location`
- `src/features/location-search`
- `src/widgets/location-map`
- `src/entities/location`
- `src/app/api/location/route.ts`
- `src/app/api/location/search/route.ts`

## 작업 규칙

- 위치 검색 UI와 지도 표시 UI 책임을 분리한다.
- 추천 결과 데이터 매핑을 UI 컴포넌트 내부에서 직접 처리하지 않는다.
- 지도 SDK 설정은 public/server 환경변수 경계를 확인한다.
- 위치 추천이 `/saju/result`, `/mypage`의 저장/조회 흐름에 연결되면 영향 범위를 함께 검증한다.
- 로딩, 권한 거부, 검색 결과 없음 상태를 기본 상태로 고려한다.

## 테스트 규칙

- `/location` 기능 추가/수정 시 `features/location-search/model` 또는 `hooks` 단위의 Vitest unit test를 함께 추가한다.
- 테스트 파일은 변경 코드와 같은 도메인 하위 `test/` 디렉터리에 `*.test.ts(x)`로 둔다.
- 최소 1개의 정상 케이스와 1개의 실패/예외 케이스를 포함한다.

## 문서 갱신 규칙

- `/location` 도메인에 새 하위 모듈(예: `features/location-search/*`, `widgets/location-map/*`, `entities/location/*`)이 추가되면 이 문서의 관련 경로와 규칙을 같은 PR에서 갱신한다.
- 새 라우트/도메인이 생기면 `references/`에 해당 도메인 문서를 추가하고, `SKILL.md`의 라우트 매핑 목록에도 연결 항목을 추가한다.
