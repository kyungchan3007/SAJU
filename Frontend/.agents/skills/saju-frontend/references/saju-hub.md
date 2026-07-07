---
name: saju-frontend-ref-saju-hub
description: /saju?step=hub 진입 정책, 로그인 선가드, pending form 복구, 입력 복귀 규칙
---

# /saju 허브 참고

## 읽는 조건

`/saju?step=hub`, `SajuHub`, 허브 진입 시 로그인/refresh 처리, 허브에서 입력 화면 복귀 흐름을 수정할 때 읽는다.

## 관련 경로

- `apps/web/src/app/(main)/saju/page.tsx`
- `apps/web/src/widgets/saju-hub`
- `apps/web/src/features/saju-hub`
- `apps/web/src/entities/auth/server/getProtectedPageAuthStateOnServer.ts`
- `apps/web/src/entities/saju/server/getSajuEntryRouteOnServer.ts`

## 작업 규칙

- `/saju?step=hub`는 입력 화면이 아니라 보호된 허브 진입점으로 본다.
- 비로그인 사용자는 허브 클라이언트에서 401을 받은 뒤 처리하지 말고, 서버 진입 단계에서 로그인으로 보낸다.
- refresh token만 있는 사용자는 다른 보호 페이지와 같은 방식으로 `AuthRefreshRetry`를 사용한다.
- 로그인 이후 사주 분석 정보가 없으면 허브에 머무르게 하지 말고 `/saju?forceInput=1...` 입력 흐름으로 복귀시킨다.
- pending form이 있으면 허브에서 분석 생성 복구를 먼저 시도할 수 있다.

## 관계 규칙

- `SajuPage(step=hub)`는 로그인 선가드 역할을 가진다.
- `useSajuHub`는 허브 표시 여부와 pending form 복구, 입력 복귀 흐름에 집중한다.
- 보호 서비스에서 온 `next`는 로그인, 허브, 입력, 결과 흐름을 거쳐도 유지되어야 한다.

## 불변조건

- 비로그인 직접 진입 시 프로그레스 UI를 먼저 보여주지 않는다.
- 허브는 사주가 없는 사용자의 최종 정착 화면이 아니다.
- `next`와 `forceInput` 검색 파라미터를 허브 전환 과정에서 유실하지 않는다.
