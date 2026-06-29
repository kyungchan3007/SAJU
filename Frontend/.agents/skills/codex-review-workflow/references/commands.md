# 검증 명령 예시

## 트리거 문장

아래 문장이 오면 `codex-review-workflow`를 실행한다.

- 검증해줘
- 리뷰해줘
- 최종 검토해줘
- 머지 전 확인해줘
- 배포 전에 봐줘
- 이번 변경분 문제 없는지 확인해줘

---

## 단계별 검증 명령

### 1단계: 계산/순수 로직 변경

```
$code-review-guard 이번 변경분 검증해줘. 계산 로직/유틸 변경 기준으로 Critical/High 우선, 파일:라인 근거, MERGE: PASS/HOLD로.
```

추가 조건(캐시 키 연결, 여러 화면 재사용)이 발견되면:

```
$vercel-react-best-practices 이번 변경 추가 점검. 데이터 페칭/캐시 사이클 영향 중심으로 보고.
```

---

### 2단계: 계산 결과 → 렌더링 연결 변경

```
$code-review-guard + $vercel-react-best-practices 이번 변경분 검증해줘. 렌더링 연결 로직, 리렌더 위험 중심으로. MERGE: PASS/HOLD로.
```

추가 조건(CTA 노출 영향, 접근성 리스크)이 발견되면:

```
$web-design-guidelines 이번 변경 추가 점검. 접근성, 레이아웃, 반응형 위반 항목을 파일:라인으로 보고.
```

---

### 3단계: API/캐시/인증 정책 변경

```
$code-review-guard + $next-best-practices 이번 변경분 검증해줘. API route, 인증 흐름, 캐시 정책 중심으로. typecheck 결과도 포함. MERGE: PASS/HOLD로.
```

추가 조건(RQ key 변경, client/server 경계 변경)이 발견되면:

```
$vercel-react-best-practices 이번 변경 추가 점검. React Query 캐시/무효화, 렌더 성능 영향 중심으로 보고.
```

---

### 4단계: UI/UX만 수정

```
$web-design-guidelines 이번 변경분 검증해줘. 접근성, 시맨틱, 인터랙션 UX 위반 항목을 파일:라인으로 보고. MERGE: PASS/HOLD로.
```

추가 조건(조건부 렌더 포함, 라우트 영향)이 발견되면 2단계 또는 3단계로 승격:

```
$code-review-guard + $vercel-react-best-practices 단계 승격 검증. 조건부 렌더/상태 연결 포함 변경 기준으로. MERGE: PASS/HOLD로.
```

---

### 통합 검증 (릴리즈 직전)

```
$code-review-guard + $next-best-practices + $vercel-react-best-practices + $web-design-guidelines 릴리즈 전 통합 검증. 전 단계 기준 적용. MERGE: PASS/HOLD로.
```

---

## 재검증 (수정 후)

```
$code-review-guard 방금 수정본 delta-only 재검증. 이전 Critical/High 미해결 여부도 같이 확인. MERGE: PASS/HOLD로.
```

---

## 운영 규칙

- 기본은 해당 단계의 필수 스킬 명령만 사용한다.
- 추가 조건이 발견되면 추가 스킬 명령으로 승격한다.
- 수정 후 재검증은 delta-only로 짧게 확인한다.
- 최종 결과 보고는 `EVAL.md` 형식(`Verdict / Failed Gates / Score / Findings / Next Action`)을 강제한다.
- 작업 시작 전 `gate-matrix.md`에서 단계와 스킬 조합을 먼저 확정한다.
