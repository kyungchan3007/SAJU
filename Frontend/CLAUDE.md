# Frontend Claude Start Rules

목적: Agent Skills 구조를 기준으로 필요한 문서만 읽고 작업하여 토큰 낭비를 줄인다.

## 필수 시작 규칙

- 첫 번째 액션은 반드시 `.agents/skills/saju-frontend/SKILL.md` 읽기여야 한다.
- SKILL.md를 읽지 않은 상태에서는 코드 검색·파일 수정·구현 계획 수립을 시작하지 않는다.
- 작업 도메인을 식별한 뒤 SKILL.md에 매핑된 `references/` 문서만 읽는다.
- 한 도메인은 SKILL.md + reference 1개만 읽는다. 여러 도메인일 때만 추가로 읽는다.
- 선언한 문서 외 추가 열람이 필요하면 먼저 사용자에게 확인한다.

## 구현 전 필수 출력 (출력 없이 코드 작성 금지)

문서를 읽은 뒤 아래 형식을 반드시 출력하고 구현을 시작한다.

```
읽은 문서: SKILL.md, references/XXX.md
요약 (5줄 이내): ...
파일 레이어 계획:
  - model/: 상수, 순수 유틸, 화면 모델 변환
  - hooks/: useQuery, useMutation, 상태·플로우 로직
  - ui/: props 받아 렌더링만
  - entities/: API 타입, 서버/클라이언트 통신 경계
  - app/api/: BFF route
```

이 출력을 작성하는 과정에서 레이어 배치를 강제로 검토한다.
규칙과 다른 판단이 필요하면 출력 후 사용자에게 먼저 확인한다.

## 허용 문서

허용 문서 목록은 `.agents/skills/saju-frontend/SKILL.md`의 읽기 규칙을 따른다.
SKILL.md에 명시되지 않은 문서는 사용자 확인 없이 열람하지 않는다.

## UI/UX 작업 규칙

UI 컴포넌트 설계·구현·리뷰·수정 작업 시 반드시 아래 스킬을 참조한다.

- 스킬 위치: `.claude/skills/ui-ux-pro-max/SKILL.md`
- 트리거 조건: 컴포넌트 신규 작성, 스타일 선택, 색상/폰트 결정, 접근성 검토, 레이아웃 구성, 애니메이션 추가, UI 리뷰 요청
- 작업 전 `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<키워드>" --design-system` 으로 디자인 시스템 조회를 먼저 실행한다.
- 스킬의 Pre-Delivery Checklist를 반드시 확인 후 코드를 제출한다.

## 응답 기본 형식

1. 변경 의도 요약
2. 수정 파일
3. 검증 결과
