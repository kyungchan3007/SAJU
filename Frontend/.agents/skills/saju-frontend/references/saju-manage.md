---
name: saju-frontend-ref-saju-manage
description: /mypage/saju-manage 내 사주·파트너 사주 CRUD 화면과 BFF 작업 규칙
---

# /mypage/saju-manage 작업 참고

## 읽는 조건

`/mypage/saju-manage`, 내 사주 기본 정보 조회·수정, 파트너 사주 추가·수정·삭제, 생년월일·시간·성별·달력·도시 수정, 사주 재계산 안내를 수정할 때 읽는다.

## 관련 경로

- `apps/web/src/app/(main)/mypage/saju-manage`
- `apps/web/src/app/api/saju/me`
- `apps/web/src/app/api/partners`
- `apps/web/src/app/api/partners/[partnerId]`
- `apps/web/src/widgets/mypage/ui/saju-manage-section.tsx`
- `apps/web/src/features/mypage/hooks/useSajuManage.ts`
- `apps/web/src/features/mypage/hooks/usePartners.ts`
- `apps/web/src/features/mypage/model/sajuManage.ts`
- `apps/web/src/features/mypage/model/partner.ts`
- `apps/web/src/features/mypage/ui/manage/*`
- `apps/web/src/entities/saju/client/fetchSajuProfileOnClient.ts`
- `apps/web/src/entities/saju/client/updateSajuProfileOnClient.ts`
- `apps/web/src/entities/saju/server/getSajuProfileOnServer.ts`
- `apps/web/src/entities/saju/server/updateSajuOnServer.ts`
- `apps/web/src/entities/partner/client/*`
- `apps/web/src/entities/partner/server/*`
- `apps/web/src/shared/model/saju-calendar/*`
- `apps/web/src/shared/utils/BirthDate.ts`

## 작업 규칙

- 클라이언트 조회·수정 흐름은 `useSajuManage` 훅을 통한다.
- 파트너 목록·추가·수정·삭제 흐름은 `usePartners` 훅을 통한다.
- 클라이언트에서 백엔드를 직접 호출하지 않고 `/api/saju/me` BFF를 통한다.
- 파트너 CRUD는 `/api/partners`, `/api/partners/[partnerId]` BFF를 통한다.
- BFF는 `getSajuProfileOnServer`, `updateSajuOnServer`로 위임하고 백엔드 호출은 `authenticatedBackendFetch`를 사용한다.
- 파트너 BFF는 `entities/partner/server` 함수로 위임하고, 성공 시 `PARTNERS_QUERY_KEY` 캐시를 무효화한다.
- `widgets`는 섹션 조립에 집중하고, 응답 변환·요약 변환·저장 상태는 feature hook/model에 둔다.
- 새 파트너 추가는 이름을 먼저 받은 뒤 임시 선택 상태로 사주 입력 폼을 열고, 저장 시 `toPartnerRequest`로 `PartnerRequest`를 만든다.
- 파트너 수정은 선택된 파트너의 기존 값을 `toPartnerFormValues`로 폼 초기값에 반영한다.
- 파트너 삭제 후 삭제 대상이 선택 중이면 선택을 내 사주로 되돌린다.
- 파트너 수 제한 정책은 `MAX_PARTNERS`를 우선 사용한다.
- 달력 타입 정책은 `apps/web/src/shared/model/saju-calendar`를 사용한다. UI의 `LUNAR-LEAP`는 백엔드 전송 시 `LUNAR`로 변환한다.
- 백엔드 날짜 문자열을 select 값으로 나눌 때는 `parseBackendBirthDateParts`를 사용한다.
- 저장 문구는 기존 사주 분석이 새 사주 정보 기준으로 재계산된다는 점을 명확히 알려야 한다.
- 저장 성공 시 사주 기본 정보와 정통사주 요약 캐시를 함께 갱신한다.
- API route를 바꾸면 `/api/saju/me`, `/api/partners`, `/api/partners/[partnerId]` route 테스트 추가·갱신을 검토한다.

## 관계 규칙

- `SajuManageFlow`는 내 사주 조회·수정과 파트너 CRUD를 함께 다루는 관리 흐름이다.
- `MySajuProfileQuery`는 `/api/saju/me` BFF를 통해 `getSajuProfileOnServer`로 위임된다.
- `MySajuProfileMutation`은 `/api/saju/me` BFF를 통해 `updateSajuOnServer`로 위임된다.
- `PartnerCrudFlow`는 `/api/partners`, `/api/partners/[partnerId]` BFF와 `entities/partner/server` 함수에 연결된다.
- `SajuCalendarForm`은 UI 달력 타입과 백엔드 전송 타입 사이의 변환 경계다.

## 불변조건

- 사용자 프로필 변경과 사주 정보 변경의 API/상태 경계를 섞지 않는다.
- 파트너 CRUD 성공 시 `PARTNERS_QUERY_KEY` 캐시를 무효화한다.
- `LUNAR-LEAP`는 백엔드 전송 시 `LUNAR`로 변환한다.
- 파트너 수 제한은 `MAX_PARTNERS`를 우선 사용한다.
- 저장 성공 시 사주 기본 정보와 정통사주 요약 캐시를 함께 갱신한다.

## 명령 해석 규칙

- “내 사주 정보 수정” 요청은 `useSajuManage`, `/api/saju/me`, `features/mypage/model/sajuManage.ts`를 우선 확인한다.
- “파트너 추가/수정/삭제” 요청은 `usePartners`, `/api/partners`, `features/mypage/model/partner.ts`를 우선 확인한다.
- “윤달/음력/생년월일” 요청은 `shared/model/saju-calendar`와 `BirthDate` 변환 경계를 먼저 확인한다.
- “저장 후 결과 갱신” 요청은 사주 기본 정보 캐시와 정통사주 요약 캐시 갱신을 함께 확인한다.
