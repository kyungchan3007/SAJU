---
name: saju-frontend-ref-year-fortune
description: /mypage/year-fortune 신년운세 생성형 풀이 조회 화면과 BFF 상태 처리 규칙
---

# /mypage/year-fortune 작업 참고

## 읽는 조건

`/mypage/year-fortune`, 신년운세, 올해운세, `YearFortuneResponse`, 생성형 풀이의 `PENDING/COMPLETE` 상태, 신년운세 화면·hook·BFF를 수정할 때 읽는다.

## 관련 경로

- `apps/web/src/app/(main)/mypage/year-fortune`
- `apps/web/src/app/api/saju/me/year`
- `apps/web/src/widgets/year-fortune/ui/year-fortune-section.tsx`
- `apps/web/src/features/year-fortune/hooks/useYearFortune.ts`
- `apps/web/src/features/year-fortune/model/yearFortune.ts`
- `apps/web/src/features/year-fortune/ui/*`
- `apps/web/src/entities/saju/client/fetchYearFortuneOnClient.ts`
- `apps/web/src/entities/saju/server/getMyYearFortuneOnServer.ts`
- `apps/web/src/shared/api/backend/parseGeneratedInterpretationResponse.ts`
- `apps/web/src/shared/config/endPoint.ts`

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

## 관계 규칙

- `YearFortunePage`는 `/mypage` 하위 보호 조회 화면이다.
- `YearFortuneQuery`는 `/api/saju/me/year` BFF를 통해 `getMyYearFortuneOnServer`로 위임된다.
- `YearFortuneViewModel`은 `YearFortuneResponse`와 생성형 풀이 meta에서 파생된다.
- `PendingState`는 `meta.backendStatus`를 우선 근거로 판단한다.
- 생성형 풀이 parser 변경은 route/server/parser test와 연결된다.

## 불변조건

- 생성형 풀이 응답의 `status/message/errorCode`를 버리지 않는다.
- `PENDING` 재조회는 최대 횟수·시간 제한 없이 무한 polling하지 않는다.
- `/mypage` 공통 shell을 하위 페이지에서 중복 적용하지 않는다.
- 클라이언트에서 신년운세 백엔드를 직접 호출하지 않는다.

## 명령 해석 규칙

- “신년운세”, “올해 운세”, “year fortune” 요청은 `features/year-fortune`과 `/api/saju/me/year`를 우선 확인한다.
- “생성중/대기중” 요청은 `meta.backendStatus` 보존과 polling 제한을 먼저 확인한다.
- “신년운세 표시 오류” 요청은 `features/year-fortune/model/yearFortune.ts`의 view model 변환을 우선 확인한다.
- “마이페이지 메뉴 링크” 요청은 `/mypage/year-fortune` 경로 유지 여부를 확인한다.
