---
name: codex-review-workflow
description: >-
  사용자가 구현 완료 후 변경 검증을 요청할 때 트리거되는 운영 워크플로우.
  "검증해줘", "리뷰해줘", "최종 검토해줘", "머지 전 확인해줘",
  "배포 전에 봐줘", "이번 변경분 문제 없는지 확인해줘" 요청에 트리거된다.
  변경 유형을 4단계로 분류하고 단계별 필수 스킬부터 시작한다.
  추가 리스크가 발견되면 상위 단계로 승격하고, 결과는 MERGE: PASS/HOLD로 반환한다.
---

# codex-review-workflow

구현과 검증을 분리해 회귀/보안/비즈니스 리스크를 줄이는 운영 워크플로우다.
검증 주체는 Codex다.

## 목표

- 변경 유형에 맞는 최소 검증부터 시작한다.
- 추가 리스크가 발견되면 상위 단계로 승격한다.
- 결과는 항상 `MERGE: PASS` 또는 `MERGE: HOLD`로 끝낸다.

## 검증 절차

1. Claude가 구현을 완료한다.
2. 사용자가 Codex에 검증을 요청한다.
3. Codex는 `references/gate-matrix.md`에서 변경 유형을 4단계 중 하나로 분류한다.
4. 해당 단계의 필수 스킬을 순서대로 적용한다.
5. 추가 검증 조건에 해당하면 추가 스킬로 승격한다.
6. `references/EVAL.md` 기준으로 `MERGE: PASS` 또는 `MERGE: HOLD`를 반환한다.
7. HOLD면 Claude가 수정하고, Codex가 delta-only 재검증한다.
8. PASS면 병합한다.

## 단계 분류 요약

| 단계 | 유형 | 필수 스킬 |
| --- | --- | --- |
| 1단계 | 계산/순수 로직 변경 | `code-review-guard` |
| 2단계 | 계산 결과 → 렌더링 연결 변경 | `code-review-guard`, `vercel-react-best-practices` |
| 3단계 | API/캐시/인증 정책 변경 | `code-review-guard`, `next-best-practices` |
| 4단계 | UI/UX만 수정 | `web-design-guidelines` |

단계별 추가 검증 조건과 추가 스킬은 `references/gate-matrix.md`를 따른다.

## 운영 규칙

- `src/generated/api` 직접 수정 금지
- 검증을 생략한 경우 생략 사유와 잔여 리스크를 결과에 명시한다
- 최종 판정/출력 형식은 반드시 `references/EVAL.md`를 따른다
- 명령 예시는 `references/commands.md`를 참고한다
