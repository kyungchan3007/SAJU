---
name: saju-frontend-ref-zodiac-compatibility
description: /mypage/zodiac-compatibility 띠별 궁합 조회 화면과 배열 응답 매핑 규칙
---

# /mypage/zodiac-compatibility 작업 참고

## 읽는 조건

`/mypage/zodiac-compatibility`, 띠별 궁합 점수, 궁합 카드, `zodiacCompatibility` 응답 매핑을 수정할 때 읽는다.

## 관련 경로

- `src/app/(main)/mypage/zodiac-compatibility`
- `src/app/api/saju/zodiac-compatibility`
- `src/widgets/mypage/ui/zodiac-compatibility-section.tsx`
- `src/features/mypage/hooks/useZodiacCompatibility.ts`
- `src/features/mypage/model/zodiacCompatibility.ts`
- `src/features/mypage/ui/zodiac-compatibility/*`
- `src/entities/saju/client/fetchZodiacCompatibilityOnClient.ts`
- `src/entities/saju/server/getZodiacCompatibilityOnServer.ts`
- `src/shared/config/endPoint.ts`

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
- 매핑 로직 변경 시 `src/features/mypage/model/test/zodiacCompatibility.test.ts`를 함께 갱신한다.
