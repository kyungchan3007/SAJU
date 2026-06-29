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

## 관계 규칙

- `MypagePage`는 사용자 정보 확인, 사주 관리, 서비스별 결과 진입을 묶는 허브다.
- `MypageMenu`는 하위 서비스 라우트와 보호 정책을 연결한다.
- `UserProfileState`와 `SajuProfileState`는 서로 다른 API/상태 경계를 가진다.
- `MypageManagementSection`은 반복 카드·메뉴 데이터를 기반으로 렌더링한다.

## 불변조건

- 미로그인 사용자의 처리와 리다이렉트 영향을 먼저 확인한다.
- 사용자 프로필 변경과 사주 정보 변경을 같은 mutation/state로 섞지 않는다.
- 하위 메뉴 링크는 실제 존재하는 route와 일치해야 한다.
- 반복 카드와 메뉴는 가능하면 데이터 배열 기반으로 유지한다.

## 명령 해석 규칙

- “마이페이지”, “내 정보”, “관리 메뉴” 요청은 `features/mypage`, `widgets/mypage`, `entities/user`, `entities/saju`를 우선 확인한다.
- “사주 정보 관리” 요청은 이 문서보다 `references/saju-manage.md`를 추가로 확인한다.
- “신년운세/성향/띠별 궁합 메뉴” 요청은 각 하위 도메인 reference를 함께 확인한다.
- “미로그인 리다이렉트” 요청은 마이페이지 보호 정책과 인증 상태 판정을 먼저 확인한다.
