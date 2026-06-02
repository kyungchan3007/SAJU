---
name: saju-frontend-ref-saju
description: /saju 관련 경로, 폼·draft 작업 규칙, 체크리스트
---

# /saju 입력 흐름 참고

## 읽는 조건

`/saju`, `features/saju-input`, 사주 입력 폼, 검증, 제출, 미로그인 draft 저장 흐름을 수정할 때 읽는다.

## 관련 경로

- `apps/web/src/app/(main)/saju`
- `apps/web/src/features/saju-input`
- `apps/web/src/widgets/saju-input`
- `apps/web/src/entities/saju`
- `apps/web/src/app/api/saju/route.ts`

## 작업 규칙

- 페이지 파일은 입력 화면 조립에 집중한다.
- 폼 상태, step 상태, 검증, 제출 흐름은 `features/saju-input/hooks` 쪽에 둔다.
- 입력 UI 컴포넌트는 props 기반 렌더링에 집중한다.
- UI 문구나 스타일만 바꾸는 작업에서는 API 코드를 건드리지 않는다.
- 제출 흐름 변경 시 로그인 상태와 미로그인 draft 저장 흐름을 함께 확인한다.

## 체크리스트

- 서버 제출인지 로컬 draft 저장인지 먼저 구분한다.
- `/saju/result`로 넘어가는 데이터 전달 방식을 확인한다.
- 인증 쿠키(`saju_access_token`) 요구 여부를 확인한다.
- API 응답 가공을 UI 컴포넌트에 직접 넣지 않았는지 확인한다.
