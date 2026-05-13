---
name: saju-frontend-ref-year-fortune
description: /mypage/year-fortune 신년운세 생성형 풀이 조회 화면과 BFF 상태 처리 규칙
---

# /mypage/year-fortune 작업 참고

## 읽는 조건

`/mypage/year-fortune`, 신년운세, 올해운세, `YearFortuneResponse`, 생성형 풀이의 `PENDING/COMPLETE` 상태, 신년운세 화면·hook·BFF를 수정할 때 읽는다.

## 관련 경로

- `src/app/(main)/mypage/year-fortune`
- `src/app/api/saju/me/year`
- `src/widgets/year-fortune/ui/year-fortune-section.tsx`
- `src/features/year-fortune/hooks/useYearFortune.ts`
- `src/features/year-fortune/model/yearFortune.ts`
- `src/features/year-fortune/ui/*`
- `src/entities/saju/client/fetchYearFortuneOnClient.ts`
- `src/entities/saju/server/getMyYearFortuneOnServer.ts`
- `src/shared/api/backend/parseGeneratedInterpretationResponse.ts`
- `src/shared/config/endPoint.ts`

## 작업 규칙

- 클라이언트 조회는 `useYearFortune` React Query 훅을 통한다.
- 클라이언트에서 백엔드를 직접 호출하지 않고 `/api/saju/me/year` BFF를 통한다.
- BFF는 `getMyYearFortuneOnServer`로 위임하고, 백엔드 호출은 `authenticatedBackendFetch`를 사용한다.
- 생성형 풀이 응답의 `status/message/errorCode`는 버리지 말고 `meta.backendStatus`, `meta.backendMessage`, `meta.backendErrorCode`로 보존한다.
- `PENDING/COMPLETE` 판단은 `meta.backendStatus`를 우선 사용한다.
- `PENDING` 재조회가 필요하면 무한 polling을 피하고 최대 횟수·시간 제한을 둔다.
- `YearFortuneResponse`를 화면 모델로 바꾸는 로직은 `features/year-fortune/model/yearFortune.ts`에 둔다.
- UI 컴포넌트에는 로딩·에러·대기·완료 렌더링만 남기고 응답 파싱을 직접 넣지 않는다.
- `/mypage` 하위 페이지이므로 `page-shell`은 `mypage/layout.tsx`의 공통 shell을 우선 사용하고 하위 페이지에서 중복 적용하지 않는다.
- 마이페이지 메뉴의 신년운세 링크는 `/mypage/year-fortune`로 유지한다.
- BFF나 parser 변경 시 route/server/parser unit test를 함께 갱신한다.
