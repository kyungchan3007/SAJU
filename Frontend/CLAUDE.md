# Frontend Claude Start Rules

목적: Agent Skills 구조를 기준으로 필요한 문서만 읽고 작업하여 토큰 낭비를 줄인다.

## 시작 규칙

1. 작업 대상 라우트 또는 기능 도메인을 먼저 식별한다.
2. `.agents/skills/saju-frontend/SKILL.md`를 확인한다.
3. `SKILL.md`에 매핑된 `references/` 문서 중 필요한 것만 읽는다.
4. 읽은 내용을 5줄 이내로 요약한 뒤 구현을 시작한다.

## 읽기 제한

- 관련 없는 `.md` 파일은 읽지 않는다.
- 한 도메인 작업은 기본적으로 `SKILL.md`와 reference 1개만 읽는다.
- 여러 도메인에 걸친 작업일 때만 필요한 reference를 추가로 읽는다.
- 선언한 문서 외 추가 열람이 필요하면 먼저 사용자에게 확인한다.

## 허용 문서

- `.agents/skills/saju-frontend/SKILL.md`
- `.agents/skills/saju-frontend/references/architecture.md`
- `.agents/skills/saju-frontend/references/api.md`
- `.agents/skills/saju-frontend/references/ui-style.md`
- `.agents/skills/saju-frontend/references/component-guide.md`
- `.agents/skills/saju-frontend/references/saju.md`
- `.agents/skills/saju-frontend/references/saju-result.md`
- `.agents/skills/saju-frontend/references/home.md`
- `.agents/skills/saju-frontend/references/auth.md`
- `.agents/skills/saju-frontend/references/mypage.md`
- `.agents/skills/saju-frontend/references/location.md`

## 응답 기본 형식

1. 변경 의도 요약
2. 수정 파일
3. 검증 결과
