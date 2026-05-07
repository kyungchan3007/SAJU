# 인증 및 로그인 UI 참고

## 읽는 조건

`/login`, `features/auth`, `LoginPanel`, 카카오 로그인, 이메일 로그인 전환 UI를 수정할 때 읽는다.

## 관련 경로

- `src/app/(auth)/login`
- `src/features/auth`
- `src/entities/auth`
- `src/app/api/auth`

## 로그인 흐름

- 카카오 로그인은 `/api/auth/kakao` 흐름을 통해 시작한다.
- 카카오 callback은 code 교환 후 토큰 쿠키를 저장하고 결과 화면으로 복귀하는 흐름을 가진다.
- 이메일 로그인은 준비 또는 확장 영역으로 보고, API 연결 전 UI 상태와 에러 공간을 명확히 둔다.

## UI 규칙

- 로그인 카드의 전환은 같은 카드 안에서 이어지는 느낌을 우선한다.
- 이메일 로그인 전환은 `default`와 `email` 같은 명확한 view state로 관리한다.
- 과한 bounce, scale, flashy motion은 피한다.
- input focus, 버튼 비활성화, 에러 메시지 영역을 고려한다.
- 카카오 로그인 URL과 이메일 로그인 submit 핸들러는 교체하기 쉬운 위치에 둔다.
