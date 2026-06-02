---
name: saju-frontend-ref-testing
description: >-
  Use when adding or updating frontend unit tests with Vitest after feature
  implementation or modification.
---

# 테스트 작업 참고

## 읽는 조건

`Frontend` 코드에서 기능이 추가/수정된 뒤 unit test를 작성하거나 기존 테스트를 갱신할 때 읽는다.

## 에이전트 실행 규칙

- 기능 구현/수정이 끝나면 즉시 테스트 단계로 전환한다.
- 테스트는 변경 대상 코드 폴더 아래 `test/` 하위에 `*.test.ts` 또는 `*.test.tsx`로 둔다.
- 테스트 시작선은 정상 케이스 1개 + 실패/예외 케이스 1개이며, 실제 분기 수에 맞춰 확장한다.
- 순수 로직(`shared/utils`, `features/*/model`, `features/*/hooks`, `entities/*/model`)을 우선 테스트한다.
- `apps/web/src/generated/api` 아래 파일은 직접 수정하거나 테스트 대상으로 확장하지 않는다.

## 검증 규칙

- 테스트 작성/수정 후 `npm run test:unit`을 실행한다.
- E2E를 갱신했거나 주요 플로우가 바뀌면 `npm run test:e2e -- <spec> --project=chromium`을 실행한다.
- 실패하면 테스트 또는 대상 로직을 의도에 맞게 수정한 뒤 재실행한다.
- PR 전에는 변경된 핵심 로직에 대응하는 unit test가 포함되어야 한다.
