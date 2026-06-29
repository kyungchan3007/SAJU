---
name: saju-frontend-ref-food
description: /food 음식 추천 화면, 조회/재시도 흐름, 관련 BFF 규칙
---

# /food 작업 참고

## 읽는 조건

`/food`, 음식 추천 결과, 오행 기반 추천/비추천 음식, 재조회 UX를 수정할 때 읽는다.

## 관련 경로

- `apps/web/src/app/(main)/food/page.tsx`
- `apps/web/src/widgets/food-recommend/ui/food-recommend-widget.tsx`
- `apps/web/src/features/food-recommend`
- `apps/web/src/entities/food`
- `apps/web/src/app/api/food/recommend/route.ts`

## 작업 규칙

- `/food`는 보호 화면이다. page에서 `getProtectedPageAuthStateOnServer("/food")`와 `ProtectedSajuServiceGate` 경계를 유지한다.
- 조회 상태와 refresh 재시도는 `useFoodRecommend`와 `useFoodRecommendSection`에서 관리한다.
- 클라이언트는 `/api/food/recommend` BFF만 호출한다. 백엔드 직접 호출은 추가하지 않는다.
- 401 복구는 `/api/auth/refresh` 재시도 흐름을 유지하고, 에러 코드 분기는 `AUTH_RECOVERY_ERROR_CODES` 상수에서 관리한다.
- 음식 표시용 가공, 오행 색상/라벨 변환은 `features/food-recommend/model/food-recommend.ts`에 둔다.
- Turnstile 관련 오류는 `useTurnstileErrorRedirect("/food")`를 통해 처리한다.

## 관계 규칙

- `FoodPage`는 `AuthState`와 `SajuProfile`이 필요한 보호 화면이다.
- `FoodRecommendQuery`는 `/api/food/recommend` BFF를 통해서만 백엔드 추천을 조회한다.
- `FoodRecommendViewModel`은 추천 응답과 오행 표시 규칙에서 파생된다.
- `FoodRecommendSection`은 `useFoodRecommend`와 `useFoodRecommendSection`의 상태를 소비한다.
- 인증 복구는 `/api/auth/refresh`와 `AUTH_RECOVERY_ERROR_CODES`에 의존한다.

## 불변조건

- 클라이언트에서 음식 추천 백엔드를 직접 호출하지 않는다.
- 추천 1위 카드와 2~5위 목록은 같은 view model 기준으로 렌더링한다.
- refresh 필요 상태와 일반 오류 상태를 섞지 않는다.
- Turnstile 오류 재진입 경로는 `/food`로 유지한다.

## 명령 해석 규칙

- “음식 추천”, “오늘의 메뉴” 요청은 `features/food-recommend`와 `/api/food/recommend`를 우선 확인한다.
- “추천 카드 표시” 요청은 API보다 `features/food-recommend/model/food-recommend.ts`와 widget UI를 우선 확인한다.
- “401/인증 오류” 요청은 `/api/auth/refresh` 재시도와 `AUTH_RECOVERY_ERROR_CODES` 분기를 먼저 확인한다.
- “보호 서비스 진입” 요청은 홈 CTA, `/saju` 온보딩, `ProtectedSajuServiceGate` 정책을 함께 확인한다.

## 체크리스트

- 추천 1위 카드와 2~5위 목록이 같은 view model 기준으로 렌더링되는지 확인한다.
- 추천 실패 시 refresh 재시도 가능 여부와 일반 오류 문구가 섞이지 않는지 확인한다.
- 보호 서비스 진입 정책이 홈 CTA, `/saju` 온보딩 규칙과 어긋나지 않는지 확인한다.
