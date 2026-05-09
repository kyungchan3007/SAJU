---
name: saju-frontend-ref-jeongtongsaju
description: /mypage/jeongtongsaju 정통사주 상세 조회 화면과 BFF 작업 규칙
---

# /mypage/jeongtongsaju 작업 참고

## 읽는 조건

`/mypage/jeongtongsaju`, 정통사주 상세 조회, 사주 4기둥·오행·12운성·대운 표시를 수정할 때 읽는다.

## 관련 경로

- `src/app/(main)/mypage/jeongtongsaju`
- `src/app/api/saju/traditional`
- `src/widgets/mypage/ui/jeongtongsaju-section.tsx`
- `src/features/mypage/hooks/useJeongtongsaju.ts`
- `src/features/mypage/ui/jeongtongsaju-*`
- `src/entities/saju/server/onSajuTraditionalGetOnServer.ts`
- `src/entities/saju/client/fetchSajuTraditionalOnClient.ts`

## 작업 규칙

- 클라이언트 조회는 `useJeongtongsaju` React Query 훅을 통한다.
- 클라이언트에서 백엔드를 직접 호출하지 않고 `/api/saju/traditional` BFF를 통한다.
- BFF는 `onSajuTraditionalGetOnServer`로 위임하고, 백엔드 호출은 `authenticatedBackendFetch`를 사용한다.
- 정통사주 응답 가공과 타입 좁히기는 UI 컴포넌트에 과하게 두지 말고 feature/entity model 분리를 검토한다.
- API route를 바꾸면 `src/app/api/saju/traditional/test/route.test.ts`를 함께 갱신한다.
