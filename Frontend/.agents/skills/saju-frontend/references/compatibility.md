---
name: saju-frontend-ref-compatibility
description: /compatibility 파트너 궁합 생성형 풀이 조회 화면과 PENDING 상태 처리 규칙
---

# /compatibility 작업 참고

## 읽는 조건

`/compatibility`, 파트너 선택 궁합, `CompatibilityResponse`, 궁합 생성형 풀이의 `PENDING/COMPLETE` 상태, 궁합 결과 화면·hook·BFF를 수정할 때 읽는다.

## 관련 경로

- `apps/web/src/app/(main)/compatibility`
- `apps/web/src/app/api/saju/me/compatibility/[partnerId]`
- `apps/web/src/widgets/compatibility/ui/compatibility-section.tsx`
- `apps/web/src/features/compatibility/hooks/useCompatibility.ts`
- `apps/web/src/features/compatibility/model/compatibility.ts`
- `apps/web/src/features/compatibility/ui/*`
- `apps/web/src/entities/compatibility/client/fetchCompatibilityOnClient.ts`
- `apps/web/src/entities/compatibility/server/getCompatibilityOnServer.ts`
- `apps/web/src/entities/partner/client/fetchPartnersOnClient.ts`
- `apps/web/src/entities/saju/client/fetchSajuProfileOnClient.ts`
- `apps/web/src/shared/api/backend/parseGeneratedInterpretationResponse.ts`

## 작업 규칙

- 궁합 조회는 `useCompatibility` 훅을 통하고, partner/profile 조회와 결과 조회 상태를 훅에서 관리한다.
- 클라이언트에서 백엔드를 직접 호출하지 않고 `/api/saju/me/compatibility/[partnerId]` BFF를 통한다.
- BFF는 `getCompatibilityOnServer`로 위임하고, 백엔드 호출은 `authenticatedBackendFetch`를 사용한다.
- 결과 조회 전 내 사주 프로필과 파트너 목록을 먼저 조회하고, 사용자가 선택한 `partnerId`가 있을 때만 궁합 조회를 활성화한다.
- 생성형 풀이 응답의 `status/message/errorCode`는 `meta`로 보존한다.
- `CompatibilityResponse.status`와 `meta.backendStatus`가 모두 있을 수 있으므로, 상태 판단 정책을 한 곳에서 정하고 UI에 흩뿌리지 않는다.
- `PENDING` 재조회가 필요하면 무한 polling을 피하고 최대 횟수·시간 제한을 둔다.
- 결과 표시 모델 변환은 `features/compatibility/model/compatibility.ts`에 둔다.
- UI 컴포넌트에는 파트너 선택, 결과 카드 렌더링, 재선택 이벤트만 남긴다.
- 파트너 목록 캐시는 `PARTNERS_QUERY_KEY`, 내 사주 캐시는 `SAJU_PROFILE_QUERY_KEY`를 재사용한다.
- BFF나 parser 변경 시 route/server/parser unit test를 함께 갱신한다.
