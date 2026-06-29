---
name: saju-frontend-ref-saju-result
description: /saju/result 관련 경로, 결과 조회/캐시 정책, 작업 규칙, 체크리스트
---

# /saju/result 결과 조회 참고

## 읽는 조건

`/saju/result`, `features/saju-result`, `widgets/saju-result`, 결과 조회 API, 결과 캐시 정책을 수정할 때 읽는다.

## 관련 경로

- `apps/web/src/app/(main)/saju/result`
- `apps/web/src/features/saju-result`
- `apps/web/src/widgets/saju-result`
- `apps/web/src/entities/saju`
- `apps/web/src/shared/lib/react-query`

## 작업 규칙

- 페이지 파일에는 결과 화면 조립 로직만 둔다.
- 결과 조회, 캐시, 재시도 정책은 `features/saju-result` 쪽에 둔다.
- API 응답 매핑은 feature/entity model 쪽에 둔다.
- `/saju` 입력 폼 상태 로직을 복사하지 않는다.
- 로그인/미로그인 draft 흐름을 바꾸면 `/saju`, `/saju/result`, `/mypage` 영향을 같이 확인한다.

## 관계 규칙

- `SajuResultPage`는 결과 화면 조립만 담당하고 조회·캐시 정책은 feature 경계에 둔다.
- `SajuResultQuery`는 서버 결과 또는 로컬 draft 결과 중 하나를 해석한다.
- `SajuResultViewModel`은 API 응답에서 파생되며 UI 컴포넌트가 직접 응답을 가공하지 않는다.
- `/saju/result`는 `/saju` 입력 완료 흐름과 보호 서비스 `next` 복귀 흐름에 연결된다.

## 불변조건

- 서버 결과와 로컬 draft 결과를 같은 전제로 처리하지 않는다.
- React Query cache key와 stale/cache 정책은 한 곳에서 일관되게 관리한다.
- 결과 조회 실패 시 raw 서버 메시지를 사용자에게 직접 노출하지 않는다.
- `/saju` 입력 폼 상태 로직을 결과 화면으로 복사하지 않는다.

## 명령 해석 규칙

- “사주 결과”, “분석 결과”, “결과 조회” 요청은 `features/saju-result`와 `widgets/saju-result`를 우선 확인한다.
- “결과가 안 나옴” 요청은 서버 결과인지 로컬 draft 결과인지 먼저 구분한다.
- “결과 캐시/재조회” 요청은 React Query key, stale/cache 정책, retry 조건을 우선 확인한다.
- “입력 후 원래 페이지 복귀” 요청은 `/saju`와 `/saju/result`의 `next` 소비 흐름을 함께 확인한다.

## 체크리스트

- 서버 결과인지 로컬 draft 결과인지 먼저 구분한다.
- React Query cache key가 기존 정책과 맞는지 확인한다.
- 결과 재조회 조건과 stale/cache 정책을 명확히 둔다.
- 오류, 로딩, 빈 상태 UI가 있는지 확인한다.
