---
name: saju-frontend-ref-zodiac-compatibility
description: /mypage/zodiac-compatibility 띠별 궁합 조회 화면과 배열 응답 매핑 규칙
---

# /mypage/zodiac-compatibility 작업 참고

## 읽는 조건

`/mypage/zodiac-compatibility`, 띠별 궁합 점수, 궁합 카드, `zodiacCompatibility` 응답 매핑을 수정할 때 읽는다.

## 관련 경로

- `apps/web/src/app/(main)/mypage/zodiac-compatibility`
- `apps/web/src/app/api/saju/zodiac-compatibility`
- `apps/web/src/widgets/mypage/ui/zodiac-compatibility-section.tsx`
- `apps/web/src/features/mypage/hooks/useZodiacCompatibility.ts`
- `apps/web/src/features/mypage/model/zodiacCompatibility.ts`
- `apps/web/src/features/mypage/ui/zodiac-compatibility/*`
- `apps/web/src/entities/saju/client/fetchZodiacCompatibilityOnClient.ts`
- `apps/web/src/entities/saju/server/getZodiacCompatibilityOnServer.ts`
- `apps/web/src/shared/config/endPoint.ts`

## 작업 규칙

- 클라이언트 조회는 `useZodiacCompatibility` React Query 훅을 통한다.
- 클라이언트에서 백엔드를 직접 호출하지 않고 `/api/saju/zodiac-compatibility` BFF를 통한다.
- BFF는 `getZodiacCompatibilityOnServer`로 위임하고, 백엔드 호출은 `authenticatedBackendFetch`를 사용한다.
- 백엔드 실제 응답의 `data.zodiacCompatibility`는 12개 항목 배열일 수 있다.
- 배열 항목의 `score`는 화면에 그대로 표시한다. 매핑 실패 시에만 fallback `50`을 사용한다.
- 배열 항목은 `animal`, `branch`, `score`, `grade`, `desc`를 우선 읽는다.
- 객체 응답 호환이 필요하면 영문 key, 한국어 띠 이름, 띠 suffix 없는 이름, 지지 branch alias를 함께 처리한다.
- 응답 가공과 grade/style 결정은 UI JSX가 아니라 `features/mypage/model/zodiacCompatibility.ts`에 둔다.
- UI 컴포넌트에는 카드 렌더링과 얕은 이벤트만 남긴다.
- 매핑 로직 변경 시 `apps/web/src/features/mypage/model/test/zodiacCompatibility.test.ts`를 함께 갱신한다.

## 관계 규칙

- `ZodiacCompatibilityQuery`는 `/api/saju/zodiac-compatibility` BFF를 통해 `getZodiacCompatibilityOnServer`로 위임된다.
- `ZodiacCompatibilityViewModel`은 배열 또는 객체 응답 호환 매핑 결과다.
- `ScoreDisplay`는 백엔드 항목의 `score`를 우선 사용한다.
- `GradeStyle`은 `features/mypage/model/zodiacCompatibility.ts`에서 결정된다.
- 매핑 규칙 변경은 `zodiacCompatibility.test.ts`와 연결된다.

## 불변조건

- 배열 응답의 `score`를 임의 재계산하지 않는다.
- 매핑 실패 시에만 fallback `50`을 사용한다.
- 응답 가공과 grade/style 결정을 UI JSX에 직접 넣지 않는다.
- 클라이언트에서 띠별 궁합 백엔드를 직접 호출하지 않는다.

## 명령 해석 규칙

- “띠별 궁합”, “띠 궁합 점수” 요청은 `features/mypage/model/zodiacCompatibility.ts`와 `/api/saju/zodiac-compatibility`를 우선 확인한다.
- “점수가 이상함” 요청은 백엔드 `score` 사용 여부와 fallback 조건을 먼저 확인한다.
- “띠 이름 매핑” 요청은 영문 key, 한국어 띠 이름, suffix 없는 이름, branch alias 처리를 확인한다.
- “카드 스타일/등급” 요청은 UI보다 model의 grade/style 결정 규칙을 우선 확인한다.
