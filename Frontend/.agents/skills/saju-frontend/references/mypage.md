---
name: saju-frontend-ref-mypage
description: /mypage 관련 경로, 사용자 정보·관리 화면 작업 규칙
---

# /mypage 작업 참고

## 읽는 조건

`/mypage`, 사용자 프로필, 내 사주 관리, 메뉴, 배너, 관리 섹션을 수정할 때 읽는다.

## 관련 경로

- `apps/web/src/app/(main)/mypage`
- `apps/web/src/features/mypage`
- `apps/web/src/widgets/mypage`
- `apps/web/src/entities/user`
- `apps/web/src/entities/saju`

## 작업 규칙

- 마이페이지는 사용자 정보 확인과 관리 행동을 빠르게 찾는 구조를 우선한다.
- UI는 메뉴, 배너, 관리 섹션의 역할을 명확히 분리한다.
- 사용자 프로필 변경과 사주 정보 변경의 API/상태 경계를 섞지 않는다.
- 인증이 필요한 화면이므로 미로그인 처리와 리다이렉트 영향을 확인한다.
- 관리 섹션의 반복 카드나 메뉴는 데이터 배열 기반 렌더링을 우선한다.
