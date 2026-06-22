# Frontend Agent Instructions

이 프론트엔드 프로젝트는 Agent Skills 구조를 사용한다.

## 시작 규칙

- 작업 시작 전 대상 앱을 먼저 식별한다.
- `apps/admin` 작업이면 `.agents/skills/saju-admin/SKILL.md`를 확인한다.
- `apps/web` 작업이면 `.agents/skills/saju-frontend/SKILL.md`를 확인한다.
- 작업 대상 라우트 또는 기능 도메인을 먼저 식별한다.
- `SKILL.md`에 매핑된 `references/` 문서 중 필요한 것만 읽는다.
- 관련 없는 `.md` 파일은 읽지 않는다.
- 사용자가 "오늘 작업한 거 노션에 올려줘", "이번 주 작업 정리해줘", "W7에 추가해줘"처럼 Notion 주간 작업 기록을 요청하면 `.agents/skills/notion-weekly-worklog/SKILL.md`를 기준으로 작업한다.

## 작업 범위

- 이 파일은 `Frontend` 하위 전체에 적용된다.
- 서비스 앱 코드는 `apps/web`, 관리자 앱 코드는 `apps/admin`, 문서 사이트는 `apps/docs` 아래에 있다.
- `apps/admin` 작업 중 `apps/web`을 수정하지 않는다. `apps/web` 작업 중 `apps/admin`을 수정하지 않는다.
- 루트 npm scripts는 각 workspace로 위임된다.
- 소스코드 변경 요청이 아닌 문서 정리 작업에서는 `.md` 파일만 수정한다.
- `apps/web/src/generated/api` 아래 생성 파일은 직접 수정하지 않는다.

## 응답 형식

- 변경 의도 요약
- 수정 파일
- 검증 결과
