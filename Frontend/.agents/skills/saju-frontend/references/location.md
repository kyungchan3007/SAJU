---
name: saju-frontend-ref-location
description: /location 관련 경로와 위치 추천/지도 작업 규칙
---

# /location 작업 참고

## 쓰는 조건

`/location`, 위치 추천, 지도 표시/상호작용, 사주 기반 장소 추천 UI/API를 수정할 때 사용한다.

## 관련 경로

- `apps/web/src/app/(main)/location`
- `apps/web/src/features/location-search`
- `apps/web/src/widgets/location-map`
- `apps/web/src/entities/location`
- `apps/web/src/app/api/location/route.ts`
- `apps/web/src/app/api/location/search/route.ts`

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

## 관계 규칙

- `LocationPage`는 위치 검색 UI와 지도 표시 UI를 조립한다.
- `LocationSearchFlow`는 검색어, 검색 결과, 선택 상태, 추천 결과로 구성된다.
- `LocationMapWidget`은 지도 표시 책임을 갖고 추천 데이터 가공을 직접 담당하지 않는다.
- `LocationApi`는 `/api/location`, `/api/location/search` BFF 경계를 통해 호출된다.
- 위치 추천이 사주 결과나 마이페이지 흐름과 연결되면 해당 도메인 상태와 영향을 공유한다.

## 불변조건

- 위치 검색 UI와 지도 표시 UI 책임을 섞지 않는다.
- 추천 결과 데이터 매핑을 UI 컴포넌트 내부에서 직접 처리하지 않는다.
- 지도 SDK 환경변수는 public/server 경계를 확인한다.
- 로딩, 권한 거부, 검색 결과 없음 상태를 기본 상태로 고려한다.
- 기능 추가/수정 시 model 또는 hook 단위 테스트를 함께 추가한다.

## 명령 해석 규칙

- “위치”, “장소 검색”, “지도” 요청은 `features/location-search`, `widgets/location-map`, `entities/location`을 우선 확인한다.
- “지도 SDK/env” 요청은 public/server 환경변수 경계를 먼저 확인한다.
- “추천 결과 표시” 요청은 UI보다 model/hook의 데이터 매핑 경계를 우선 확인한다.
- “사주 결과와 위치 연결” 요청은 `/saju/result`, `/mypage` 저장·조회 흐름 영향을 함께 확인한다.
