---
name: saju-frontend-ref-testing
description: >-
  사주 프론트엔드에서 테스트를 작성하거나 검증 기준을 확인할 때 사용한다.
  기능 추가/수정 후 unit test 작성, 검증 단계 판단, e2e 승격 기준 확인 요청에 트리거된다.
---

# 테스트 철학 및 검증 기준

## 기본 원칙

- 단위 테스트(unit)를 먼저 작성한다. 화면 smoke와 e2e는 그 다음이다.
- 모든 변경에 풀 검증하지 않는다. 변경 유형에 맞는 최소 검증부터 시작한다.
- 검증을 생략한 경우 생략 사유와 잔여 리스크를 결과에 명시한다.

---

## 4단계별 테스트 기준

### 1단계: 계산/순수 로직 변경

**기본 검증**
- 관련 unit test 확인 및 통과

**추가 검증이 필요한 조건**
- 계산 결과가 여러 화면에서 재사용되는 경우
- 계산 결과가 API payload/response 매핑에 영향을 주는 경우
- 계산 결과가 React Query 캐시 키/분기 조건에 연결된 경우

**추가 검증**
- 영향 받는 화면의 unit test 추가 확인

**생략 가능 기준**
- 변경이 단일 유틸 함수이고 기존 unit test가 커버하는 경우

---

### 2단계: 계산 결과 → 렌더링 연결 변경

**기본 검증**
- 관련 unit test 확인 및 통과
- 필요 시 화면 smoke (렌더 결과 직접 확인)

**추가 검증이 필요한 조건**
- 렌더링 결과가 CTA 노출/숨김에 영향을 주는 경우
- 렌더링 결과가 사용자 행동 흐름을 바꾸는 경우
- 접근성/레이아웃/반응형 리스크가 있는 경우

**추가 검증**
- 영향 받는 사용자 흐름 e2e smoke 확인
- Storybook 컴포넌트 확인 (접근성 리스크 있을 때)

**생략 가능 기준**
- 렌더링 변경이 스타일 조정 수준이고 상태/조건 분기가 없는 경우

---

### 3단계: API, 캐시 정책, 인증/로그인 정책 변경

**기본 검증**
- `typecheck` 통과
- 관련 unit test 확인 및 통과
- route/auth 분기 확인

**추가 검증이 필요한 조건**
- React Query key/invalidation이 바뀐 경우
- refresh/redirect/cookie/session 처리가 바뀐 경우
- client/server 경계가 바뀐 경우

**추가 검증**
- 관련 e2e 시나리오 확인 (`npm run test:e2e -- <spec> --project=chromium`)
- 인증 흐름 e2e 확인 (auth-protection, auth-security, auth-turnstile)

**생략 불가**
- 3단계는 typecheck와 관련 unit test를 반드시 통과해야 한다.

---

### 4단계: UI/UX만 수정

**기본 검증**
- 화면 smoke (직접 확인 또는 Storybook)
- 접근성 기본 확인

**추가 검증이 필요한 조건**
- 상태 변화/조건부 렌더가 함께 바뀐 경우 → 2단계로 승격
- Next.js metadata/layout 변경이 포함된 경우 → 3단계로 승격

**생략 가능 기준**
- 변경이 색상, 여백, 폰트 크기 조정 수준이고 마크업 구조 변화가 없는 경우

---

## 테스트 파일 위치 규칙

- 테스트 파일은 변경 대상 코드 폴더 아래 `test/` 하위에 둔다.
- 파일명: `*.test.ts` 또는 `*.test.tsx`
- 순수 로직 우선 테스트 대상: `shared/utils`, `features/*/model`, `features/*/hooks`, `entities/*/model`
- `apps/web/src/generated/api` 아래 파일은 테스트 대상으로 확장하지 않는다.

## 테스트 최소 기준

- 정상 케이스 1개 + 실패/예외 케이스 1개를 시작선으로 한다.
- 실제 분기 수에 맞춰 확장한다.

## 실행 명령

```bash
# 단위 테스트
npm run test:unit

# E2E (특정 시나리오)
npm run test:e2e -- <spec> --project=chromium

# E2E (모바일 환경)
npm run test:e2e -- <spec> --project=mobile-chrome
```

## e2e 승격 기준

아래 중 하나라도 해당하면 unit test만으로는 부족하고 e2e를 추가한다.

- 인증 흐름(로그인, 리프레시, 리다이렉트)이 바뀐 경우
- 사주 입력 → 결과 조회 핵심 흐름이 바뀐 경우
- Cloudflare Turnstile 검증 흐름이 바뀐 경우
- 사용자가 직접 겪는 에러 처리 흐름이 바뀐 경우
