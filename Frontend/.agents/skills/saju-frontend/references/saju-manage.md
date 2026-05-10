---
name: saju-frontend-ref-saju-manage
description: /mypage/saju-manage 사주 기본 정보 조회·수정 화면과 BFF 작업 규칙
---

# /mypage/saju-manage 작업 참고

## 읽는 조건

`/mypage/saju-manage`, 내 사주 기본 정보 조회, 생년월일·시간·성별·달력·도시 수정, 사주 재계산 안내를 수정할 때 읽는다.

## 관련 경로

- `src/app/(main)/mypage/saju-manage`
- `src/app/api/saju/me`
- `src/widgets/mypage/ui/saju-manage-section.tsx`
- `src/features/mypage/hooks/useSajuManage.ts`
- `src/features/mypage/model/sajuManage.ts`
- `src/features/mypage/ui/manage/*`
- `src/entities/saju/client/fetchSajuProfileOnClient.ts`
- `src/entities/saju/client/updateSajuProfileOnClient.ts`
- `src/entities/saju/server/getSajuProfileOnServer.ts`
- `src/entities/saju/server/updateSajuOnServer.ts`
- `src/shared/model/saju-calendar/*`
- `src/shared/utils/BirthDate.ts`

## 작업 규칙

- 클라이언트 조회·수정 흐름은 `useSajuManage` 훅을 통한다.
- 클라이언트에서 백엔드를 직접 호출하지 않고 `/api/saju/me` BFF를 통한다.
- BFF는 `getSajuProfileOnServer`, `updateSajuOnServer`로 위임하고 백엔드 호출은 `authenticatedBackendFetch`를 사용한다.
- `widgets`는 섹션 조립에 집중하고, 응답 변환·요약 변환·저장 상태는 feature hook/model에 둔다.
- 달력 타입 정책은 `src/shared/model/saju-calendar`를 사용한다. UI의 `LUNAR-LEAP`는 백엔드 전송 시 `LUNAR`로 변환한다.
- 백엔드 날짜 문자열을 select 값으로 나눌 때는 `parseBackendBirthDateParts`를 사용한다.
- 저장 문구는 기존 사주 분석이 새 사주 정보 기준으로 재계산된다는 점을 명확히 알려야 한다.
- 저장 성공 시 사주 기본 정보와 정통사주 요약 캐시를 함께 갱신한다.
- API route를 바꾸면 `/api/saju/me` route 테스트 추가·갱신을 검토한다.
