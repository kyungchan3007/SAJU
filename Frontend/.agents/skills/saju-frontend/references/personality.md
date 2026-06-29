---
name: saju-frontend-ref-personality
description: /mypage/personality 성향 리포트 조회 화면과 PENDING 상태 처리 규칙
---

# /mypage/personality 작업 참고

## 읽는 조건

`/mypage/personality`, 성향/성격 리포트, 생성형 풀이의 `PENDING/COMPLETE` 상태, 화면·hook·BFF를 수정할 때 읽는다.

## 관련 경로

- `apps/web/src/app/(main)/mypage/(fullscreen)/personality/page.tsx`
- `apps/web/src/features/personality`
- `apps/web/src/entities/saju/client/fetchPersonalityProfileOnClient.ts`
- `apps/web/src/entities/saju/server/getMyPersonalityProfileOnServer.ts`
- `apps/web/src/app/api/saju/me/personality/route.ts`

## 작업 규칙

- `/mypage/personality`는 로그인과 사주 기본정보가 필요한 보호 화면이다. `getProtectedPageAuthStateOnServer`, `AuthRefreshRetry`, `ProtectedSajuServiceGate` 조합을 유지한다.
- 조회 상태는 `usePersonalityProfile`에서 관리하고, UI는 해당 hook의 `isLoading`, `isError`, `isPending`, `data`를 소비한다.
- 클라이언트는 `/api/saju/me/personality` BFF만 호출한다.
- 생성형 풀이 응답의 `meta.backendStatus`와 `meta`는 유지한다. `PENDING` 판단을 UI 내부 임의 규칙으로 다시 만들지 않는다.
- 성향 카드/영역 렌더링은 `features/personality/ui`에서 처리하고, 응답 해석 규칙은 hook 또는 entity 경계에 둔다.

## 관계 규칙

- `PersonalityPage`는 `AuthState`와 `SajuProfile`이 필요한 보호 화면이다.
- `PersonalityProfileQuery`는 `/api/saju/me/personality` BFF를 통해 조회한다.
- `PersonalityPendingState`는 생성형 풀이 응답의 `meta.backendStatus`에서 파생된다.
- `PersonalityUI`는 hook이 제공한 상태와 view data만 렌더링한다.

## 불변조건

- `PENDING` 상태를 빈 성공 화면으로 처리하지 않는다.
- 생성형 풀이 응답의 `meta` 정보를 버리지 않는다.
- refresh 필요 상태와 일반 오류 상태를 같은 문구로 뭉개지 않는다.
- 클라이언트에서 성향 백엔드를 직접 호출하지 않는다.

## 명령 해석 규칙

- “성향”, “성격 리포트”, “personality” 요청은 `features/personality`와 `/api/saju/me/personality`를 우선 확인한다.
- “대기중/생성중” 요청은 UI 조건보다 `meta.backendStatus` 보존과 해석 경계를 먼저 확인한다.
- “성향 카드 표시” 요청은 `features/personality/ui`와 hook의 data shape을 우선 확인한다.
- “마이페이지 성향 링크” 요청은 `/mypage` 진입 링크와 보호 정책을 함께 확인한다.

## 체크리스트

- `PENDING` 상태에서 빈 성공 화면이 아니라 대기 UI가 유지되는지 확인한다.
- refresh 필요 상태와 일반 오류 상태를 같은 문구로 뭉개지 않는지 확인한다.
- 마이페이지 진입 링크와 `/mypage/personality` 보호 정책이 맞물리는지 확인한다.
