# 게이트 매트릭스

`codex-review-workflow` 실행 시 변경 유형을 먼저 4단계로 분류하고, 단계별 필수 스킬부터 적용한다.

## 4단계 검증 기준

| 단계 | 유형 | 필수 스킬 | 기본 검증 | 추가 검증 조건 | 추가 스킬 |
| --- | --- | --- | --- | --- | --- |
| 1단계 | 계산/순수 로직 변경 | `code-review-guard` | 관련 unit test | 계산 결과가 여러 화면 재사용 / API 매핑 영향 / 캐시 키 연결 | `vercel-react-best-practices` |
| 2단계 | 계산 결과 → 렌더링 연결 변경 | `code-review-guard`, `vercel-react-best-practices` | unit test, 필요 시 화면 smoke | CTA 노출/숨김 영향 / 사용자 흐름 변경 / 접근성·반응형 리스크 | `web-design-guidelines`, `caveman-review` |
| 3단계 | API/캐시/인증 정책 변경 | `code-review-guard`, `next-best-practices` | `typecheck`, unit test, route/auth 분기 확인 | RQ key/invalidation 변경 / refresh·redirect·cookie 처리 변경 / client/server 경계 변경 | `vercel-react-best-practices`, `caveman-review` |
| 4단계 | UI/UX만 수정 | `web-design-guidelines` | 화면 smoke, 접근성 기본 확인 | 조건부 렌더 포함 / 클라이언트 렌더 비용 증가 / metadata·layout·route 영향 | `vercel-react-best-practices`, `next-best-practices`, `code-review-guard` |

## 단계 승격 규칙

- 작업이 여러 단계에 걸치면 가장 위험한 단계를 기준으로 잡는다.
- UI만 수정이라고 판단했더라도 상태 연결, 조건부 렌더, 라우트 연관이 발견되면 2단계 또는 3단계로 즉시 승격한다.
- 3단계는 기본적으로 가장 보수적으로 검증한다.
- 검증을 생략한 경우 생략 사유와 잔여 리스크를 결과에 반드시 남긴다.

## 스킬별 역할

| 스킬 | 역할 |
| --- | --- |
| `code-review-guard` | 비즈니스 로직, API 계약, 인증/보안, 캐시, 회귀 위험 검증의 기본 스킬 |
| `caveman-review` | 검증 결과를 한 줄 리뷰 포맷으로 압축할 때 쓰는 보조 스킬 |
| `next-best-practices` | App Router, route handler, RSC 경계, metadata, async API, client/server 경계 검증 스킬 |
| `vercel-react-best-practices` | React 렌더링, 리렌더, 데이터 페칭, 번들, 성능 검증 스킬 |
| `web-design-guidelines` | UI/UX, 접근성, 인터랙션 품질 검증 스킬 |

## 세부 작업 유형 매핑

| 작업 유형 | 분류 단계 | 필수 스킬 | 기본 검증 |
| --- | --- | --- | --- |
| 순수 유틸/모델 계산 변경 | 1단계 | `code-review-guard` | 관련 unit test |
| 기능 구현/리팩터 (렌더 연결) | 2단계 | `code-review-guard`, `vercel-react-best-practices` | unit test, `typecheck` |
| `/saju` 입력 흐름 변경 | 2단계 | `code-review-guard`, `vercel-react-best-practices` | 입력/제출 unit, pending form 흐름 확인 |
| `/saju/result` 결과 조회 변경 | 2~3단계 | `code-review-guard`, `vercel-react-best-practices` | result route/client query unit, `typecheck` |
| React Query 캐시/무효화 변경 | 3단계 | `code-review-guard`, `next-best-practices` | query key/invalidation unit, `typecheck` |
| BFF/API route 변경 | 3단계 | `code-review-guard`, `next-best-practices` | route handler unit, 실패 응답/쿠키 분기 확인 |
| 인증/권한/로그인 흐름 변경 | 3단계 | `code-review-guard`, `next-best-practices` | `typecheck`, 인증/refresh 관련 unit |
| 쿠키/세션/민감정보 처리 변경 | 3단계 | `code-review-guard`, `next-best-practices` | cookie 옵션, console/localStorage 노출 확인 |
| UI/디자인 수정 | 4단계 | `web-design-guidelines` | 화면 smoke, 접근성 기본 확인 |
| 디자인 시스템/토큰 변경 | 4단계 (승격 가능) | `web-design-guidelines`, `code-review-guard` | Storybook build, `typecheck` |
| 성능 개선 | 2단계 | `code-review-guard`, `vercel-react-best-practices` | `typecheck`, 변경 지점 성능 근거 |
| 릴리즈 직전 통합 점검 | 전 단계 | `code-review-guard`, `next-best-practices`, `vercel-react-best-practices`, `web-design-guidelines` | `typecheck`, 핵심 unit/e2e, Storybook |

## 운영 체크리스트

- [ ] 변경 유형을 4단계 중 하나로 분류했는가
- [ ] 해당 단계의 필수 스킬을 적용했는가
- [ ] 추가 검증 조건을 확인했는가
- [ ] 추가 조건 해당 시 추가 스킬을 적용했는가
- [ ] 검증 생략 항목이 있으면 사유와 잔여 리스크를 기록했는가
- [ ] 결과를 `MERGE: PASS` 또는 `MERGE: HOLD`로 반환했는가
