# Frontend Testing Guide

이 문서는 `Frontend` 프로젝트의 테스트 작성/실행 기준을 정의한다.

## 범위

- Unit Test: `Vitest`
- E2E Test: 추후 `Playwright` 사용

## 기본 원칙

- 기능/로직 변경 시 테스트 코드를 함께 수정한다.
- 새 기능 추가 시 테스트 시작선으로 정상 케이스 1개와 주요 실패/예외 케이스 1개 이상을 포함하고, 실제 분기 수에 맞게 확장한다.
- 테스트는 대상 코드와 가까운 위치에 둔다(콜로케이션).

## 파일 배치 규칙

- 테스트 파일명: `*.test.ts` 또는 `*.test.tsx`
- 기본 위치: 대상 코드 폴더 아래 `test/` 하위
- 예시:
  - `src/shared/utils/BirthDate.ts` → `src/shared/utils/test/BirthDate.test.ts`
  - `src/features/saju-input/model/utils.ts` → `src/features/saju-input/model/test/utils.test.ts`

## Unit Test 실행

- 1회 실행: `npm run test:unit`
- watch 모드: `npm run test:unit:watch`

## Unit Test 작성 우선순위

1. 순수 함수(`shared/utils`, `features/*/model`, `entities/*/model`)
2. 상태/훅 로직(`features/*/hooks`)
3. UI 컴포넌트(`*.tsx`)는 복잡한 분기/상태를 가진 대상부터

## PR 전 체크

- `npm run test:unit`이 통과해야 한다.
- 변경된 핵심 로직에 대응하는 테스트가 포함되어야 한다.
