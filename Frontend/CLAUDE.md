# Frontend Claude Start Rules (Token-Slim)

목적: 작업 전에 필요한 문서만 읽고 바로 구현에 들어가 토큰 낭비를 줄인다.

## 1) 시작 절차 (항상 적용)
1. 작업 대상 라우트/기능을 먼저 식별한다.
2. 아래 매핑의 관련 문서 1개만 먼저 읽는다.
3. 읽은 내용을 5줄 이내로 요약한 뒤 구현을 시작한다.

## 2) 문서 매핑
- 프로젝트 전체 구조/아키텍처/로직 플로우: `PROJECT_ARCHITECTURE_CARD.md`
- `/saju` 관련 작업: `src/domain/saju/saju-card.md`

## 3) 토큰 절약 규칙
- 관련 없는 `.md`는 읽지 않는다.
- `CLAUDE_UX_UI_GUIDE.md`는 "전면 UX/UI 리디자인" 요청일 때만 필요한 절만 확인한다.
- 문서 전체 낭독 대신 필요한 섹션만 읽는다.
- 전체 작업은 `PROJECT_ARCHITECTURE_CARD.md` 먼저, 도메인 카드 1개만 추가로 읽는다.

## 4) 강제 읽기 제한 (중요)
- 허용된 `.md`만 읽는다(allow-list):
  - `CLAUDE.md`
  - `PROJECT_ARCHITECTURE_CARD.md`
  - `src/domain/saju/saju-card.md`
  - `CLAUDE_UX_UI_GUIDE.md` (전면 UX/UI 리디자인일 때만)
- 작업 시작 시 반드시 먼저 `읽을 .md 목록 (최대 2개)`을 한 줄로 선언한다.
- 선언한 목록 외 `.md`가 필요해지면 즉시 중단하고, 추가 열람 허용 여부를 먼저 확인받는다.
- 허용 목록 밖 `.md`를 읽었거나 읽으려는 경우, 구현을 멈추고 위반 사실을 알린 뒤 재지시를 받는다.

## 5) 응답 기본 형식
1. 변경 의도 요약 (짧게)
2. 수정 파일
3. 검증 결과

## 6) Claude 시작 프롬프트 (복붙용)
```txt
이번 작업에서 읽을 .md 목록(최대 2개)을 먼저 선언하세요.
허용된 문서는 CLAUDE.md, PROJECT_ARCHITECTURE_CARD.md, src/domain/saju/saju-card.md 입니다.
전면 UX/UI 리디자인 요청이 아닌 경우 CLAUDE_UX_UI_GUIDE.md는 읽지 마세요.
선언한 목록 외 .md가 필요하면 작업을 중단하고 먼저 허용을 요청하세요.
```
