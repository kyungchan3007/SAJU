---
name: saju-frontend-ref-community
description: /community 참여 플로우, 관련 BFF, 상태 관리 규칙
---

# /community 작업 참고

## 읽는 조건

`/community`, 커뮤니티 참여 플로우, 관심사/기수 조회, 참가 신청 UI를 수정할 때 읽는다.

## 관련 경로

- `apps/web/src/app/(main)/community/page.tsx`
- `apps/web/src/widgets/community/ui/community-section.tsx`
- `apps/web/src/features/community`
- `apps/web/src/entities/community`
- `apps/web/src/app/api/community/cohorts/current/route.ts`
- `apps/web/src/app/api/community/cohorts/[cohortId]/nickname-check/route.ts`
- `apps/web/src/app/api/community/members/me/route.ts`
- `apps/web/src/app/api/community/join/route.ts`

## 작업 규칙

- `/community`는 로그인과 사주 기본정보가 모두 필요한 보호 화면이다. `getProtectedPageAuthStateOnServer`와 `ProtectedSajuServiceGate` 흐름을 함께 유지한다.
- 화면 단계 상태, 닉네임 중복 확인 상태, 신청 가능 여부, submit 상태는 `useCommunityFlow`에 모은다.
- 현재 열린 기수 조회, 내 신청 상태 조회, 닉네임 중복 확인, 참가 요청은 `entities/community/client/*`를 통해 각 BFF를 호출한다.
- 참가 가능 여부 판단은 `fetchMyMembershipsOnClient`의 활성 membership과 `fetchCurrentOpenCohortOnClient` 결과를 함께 기준으로 처리한다.
- join payload 생성, fee/deposit fallback, 현재 기수 표시 가공은 `features/community/model/community-application.ts`에 둔다.
- Turnstile 오류 재진입은 `useTurnstileErrorRedirect("/community")` 규칙을 유지한다.

## 관계 규칙

- `CommunityPage`는 `AuthState`와 `SajuProfile`을 모두 요구한다.
- `JoinAvailability`는 `활성 membership 없음` 그리고 `현재 열린 cohort 존재` 조건에서만 열린다.
- `CommunityFlow`는 현재 기수 조회, 닉네임 확인, 신청 폼, 참가 신청 상태를 포함한다.
- `JoinRequest`는 `entities/community/client`를 거쳐 `/api/community/join` BFF로 전달된다.
- `NicknameCheckRequest`는 `/api/community/cohorts/[cohortId]/nickname-check` BFF로 전달된다.
- `CommunityWidget`은 백엔드 직접 호출 없이 hook/model 결과를 렌더링한다.

## 불변조건

- 이미 참여한 사용자는 중복 신청하지 않는다.
- 로그인 필요 상태와 사주 기본정보 필요 상태를 같은 오류로 취급하지 않는다.
- 현재 기수 조회 실패, membership 조회 실패, 닉네임 중복 확인 실패, 참가 실패는 사용자 문구로 매핑한다.
- 현재 열린 기수가 없으면 `cohortId` 없이 진입하므로 참가비는 `0원`, 신청 버튼은 `신청기간이 아니에요!`, 신청 폼은 비활성화 상태를 유지한다.
- Turnstile 오류 재진입 경로는 `/community`로 유지한다.

## 명령 해석 규칙

- “커뮤니티 참가/신청” 요청은 `useCommunityFlow`, `entities/community/client`, `/api/community/join`을 우선 확인한다.
- “닉네임 중복 확인” 요청은 `/api/community/cohorts/[cohortId]/nickname-check`, `checkCommunityNicknameOnClient`, `useCommunityFlow` 순으로 확인한다.
- “기수 조회” 요청은 `/api/community/cohorts/current`와 `resolveCommunityMeetingInfo`, `resolveCommunityDepositAccount`를 함께 확인한다.
- “이미 참여 상태” 요청은 `/api/community/members/me`와 활성 membership 판별 로직을 먼저 본다.

## 체크리스트

- 이미 참여한 사용자가 중복 신청되지 않는지 확인한다.
- 닉네임 중복 확인 전에는 신청 단계로 진행되지 않는지 확인한다.
- 현재 열린 기수가 없을 때 신청 버튼/참가비/신청 폼 비활성화가 일관되게 동작하는지 확인한다.
- 현재 기수 조회 실패, membership 조회 실패, 닉네임 확인 실패, 참가 실패 메시지가 raw 서버 문구를 직접 노출하지 않는지 확인한다.
