---
name: saju-frontend-ref-auth
description: 카카오/이메일 로그인 흐름, /login 관련 경로, 로그인 UI 규칙
---

# 인증 및 로그인 UI 참고

## 읽는 조건

`/login`, `features/auth`, `LoginPanel`, 카카오 로그인, 이메일 로그인 전환 UI를 수정할 때 읽는다.

## 관련 경로

- `apps/web/src/app/(auth)/login`
- `apps/web/src/features/auth`
- `apps/web/src/entities/auth`
- `apps/web/src/app/api/auth`

## 로그인 흐름

- 카카오 로그인은 `/api/auth/kakao` 흐름을 통해 시작한다.
- 카카오 callback은 OAuth `state`를 검증한 뒤 code 교환, 토큰 쿠키 저장, 결과 화면 복귀를 수행한다.
- 인증 세션의 주체는 백엔드이며 프론트 BFF는 access/refresh token을 HttpOnly 쿠키로 브리지한다.
- 이메일 로그인은 준비 또는 확장 영역으로 보고, API 연결 전 UI 상태와 에러 공간을 명확히 둔다.

## UI 규칙

- 로그인 카드의 전환은 같은 카드 안에서 이어지는 느낌을 우선한다.
- 이메일 로그인 전환은 `default`와 `email` 같은 명확한 view state로 관리한다.
- 과한 bounce, scale, flashy motion은 피한다.
- input focus, 버튼 비활성화, 에러 메시지 영역을 고려한다.
- 카카오 로그인 URL과 이메일 로그인 submit 핸들러는 교체하기 쉬운 위치에 둔다.
