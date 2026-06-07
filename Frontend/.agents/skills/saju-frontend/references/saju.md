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
- 보호 서비스에서 들어온 사용자는 `/saju?next=...&forceInput=1` 흐름을 사용한다. 입력 완료 후에는 `/saju/result`에서 `next`를 소비해 원래 서비스로 복귀시킨다.
- 로그인 사용자의 첫 분석 생성은 pending cookie만 믿지 말고 제출 body 복구 경로도 함께 확인한다.
- 출생 시간 입력 UI는 `birthTime` 계약을 유지하되 화면에서는 `시 / 분` 분리 선택을 우선한다. 시간 옵션은 `shared`의 `HOUR_OPTIONS`, `MINUTE_OPTIONS`를 재사용한다.
- `시간 미상`을 지원하는 폼에서는 시간/분 부분 선택을 허용하지 않는다. 선택 시 `HH:MM`, 미상 시 빈 문자열 규칙을 유지한다.

## 체크리스트

- 서버 제출인지 로컬 draft 저장인지 먼저 구분한다.
- `/saju/result`로 넘어가는 데이터 전달 방식을 확인한다.
- `next`, `forceInput` 같은 검색 파라미터를 보존해야 하는 흐름인지 확인한다.
- 인증 쿠키(`saju_access_token`) 요구 여부를 확인한다.
- 최초 생성 경로에서 pending cookie가 없을 때 사용자에게 raw 백엔드 영어 문구가 노출되지 않는지 확인한다.
- API 응답 가공을 UI 컴포넌트에 직접 넣지 않았는지 확인한다.
