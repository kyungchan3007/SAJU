# 작업 유형별 게이트 매트릭스 (운영본)

`codex-review-workflow` 실행 시 작업 유형에 따라 필수/선택 게이트를 고정한다.

## 사용 규칙

- `필수`는 반드시 검사한다.
- `선택`은 변경 범위에 해당하면 추가한다.
- 최종 판정은 `references/EVAL.md` 기준을 따른다.

## 매트릭스

| 작업 유형 | 필수 스킬 | 선택 스킬 | 필수 게이트 포커스 |
| --- | --- | --- | --- |
| 기능 구현/리팩터 | `code-review-guard` | `vercel-react-best-practices` | G1, G2, G4, G5 |
| 인증/권한/로그인 | `code-review-guard` | 없음 | G2, G3, G4, G5 |
| UI/디자인 전수 수정 | `code-review-guard` | `web-design-guidelines` | G1, G4, G5 + 접근성 |
| 성능 개선 | `code-review-guard` | `vercel-react-best-practices` | G1, G2, G4, G5 + 성능 점수 |
| 릴리즈 직전 통합 점검 | `code-review-guard` | `vercel-react-best-practices`, `web-design-guidelines` | G1~G5 전체 |

## 운영 체크리스트

- 변경 유형을 먼저 1개로 분류한다.
- 매트릭스 기준으로 스킬 조합을 선택한다.
- 결과를 `Verdict/Failed Gates/Score/Findings/Next Action`으로 보고한다.
