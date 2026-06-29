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

## 관계 규칙

- `SajuInputFlow`는 로그인 상태에 따라 서버 제출 또는 로컬 draft 저장으로 갈라진다.
- `ProtectedServiceEntry`는 `/saju?next=...&forceInput=1`을 통해 `SajuInputFlow`로 진입한다.
- `SajuResult`는 입력 완료 후 `next`를 소비해 원래 목적지로 복귀시킬 수 있어야 한다.
- `birthTime`은 API 계약이고, `시 / 분` 분리 선택은 화면 표현이다.
- 입력 UI는 백엔드 API를 직접 호출하지 않고 제출 hook/model 경계를 통한다.

## 불변조건

- 시간 선택은 `HH:MM`, 시간 미상은 빈 문자열 규칙을 유지한다.
- `next`, `forceInput` 같은 검색 파라미터를 입력 중 유실하지 않는다.
- 로그인 사용자의 첫 분석 생성은 pending cookie와 제출 body 복구 경로를 함께 고려한다.
- 사용자에게 raw 백엔드 영어 오류 문구를 직접 노출하지 않는다.

## 명령 해석 규칙

- “사주 입력”, “생년월일/시간 입력”, “시간 미상” 요청은 `features/saju-input`과 `widgets/saju-input`을 우선 확인한다.
- “보호 서비스에서 사주 입력으로 보냄” 요청은 `/saju`의 `next`, `forceInput`, `/saju/result` 복귀 흐름을 함께 확인한다.
- “분석 생성 실패” 요청은 서버 제출, draft 저장, pending cookie, 제출 body 복구 경로를 순서대로 확인한다.
- 단순 문구·스타일 요청은 API route보다 widget/UI 범위를 우선한다.

## 체크리스트

- 서버 제출인지 로컬 draft 저장인지 먼저 구분한다.
- `/saju/result`로 넘어가는 데이터 전달 방식을 확인한다.
- `next`, `forceInput` 같은 검색 파라미터를 보존해야 하는 흐름인지 확인한다.
- 인증 쿠키(`saju_access_token`) 요구 여부를 확인한다.
- 최초 생성 경로에서 pending cookie가 없을 때 사용자에게 raw 백엔드 영어 문구가 노출되지 않는지 확인한다.
- API 응답 가공을 UI 컴포넌트에 직접 넣지 않았는지 확인한다.
