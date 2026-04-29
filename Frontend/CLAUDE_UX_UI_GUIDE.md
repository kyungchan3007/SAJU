# Claude UX/UI 작업 지침 (Saju Frontend)

이 문서는 `saju-frontend` 프로젝트에서 Claude가 UX/UI를 작업할 때 반드시 따를 기준이다.  
목표는 "현재 톤앤매너 유지 + 빠른 반복 수정 + 토큰 중심 확장"이다.

## 0) 최우선 컨셉 고정 규칙 (신규 UX/UI 공통)

- 새로운 UX/UI가 추가될 때마다 현재 적용된 `Notion 같은 핸드드로우(sketch)` 컨셉을 유지한다.
- 구조/기능을 확장하더라도 아래 스타일 언어는 고정한다:
  - 검은 선 중심의 명확한 테두리
  - 오프셋 그림자(손그림 같은 입체감)
  - 아이보리 종이톤 배경 + 흑백 대비
  - 과한 글로우/그라디언트 대신 담백한 정보 가독성
- 다른 레퍼런스 사이트를 참고하더라도, 색감/질감/컴포넌트 마감은 현재 프로젝트의 sketch 규칙을 우선한다.

## 1) 프로젝트 디자인 방향

- 키워드: `Notion-like`, `Hand-drawn Sketch`, `Paper`, `Editorial`, `Korean fortune-telling mood`
- 시각 톤:
  - 아이보리 종이 배경 + 블랙 중심 타이포/보더 + 절제된 포인트
  - 작은 라운드(`rounded-sm`) + 오프셋 그림자 + 손그림 느낌 보더
  - 텍스트는 과장보다 "읽기 쉬운 정보 전달"을 우선
- UX 톤:
  - 첫 화면은 직관/가독성
  - 입력/결제/결과 화면은 명확성/신뢰 우선

## 2) 필수 토큰/스타일 소스

색상/반경/그림자 변경은 컴포넌트 하드코딩이 아니라 아래 소스를 먼저 수정한다.

- `src/app/globals.css` (`:root` CSS 변수)
- `tailwind.config.ts` (`colors`, `boxShadow`, `backgroundImage`, `borderRadius`)

핵심 토큰:

- 기본 컬러: `--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--border`
- 사주 전용 컬러: `--saju-pink`, `--saju-blue`, `--saju-text`, `--saju-secondary-*`
- 반경: `--radius` (현재 1.25rem)
- 그림자: `shadow-glow`, `shadow-saju-primary`
- 배경 그라디언트: `bg-aura`, `bg-saju-primary`, `bg-saju-primary-hover`, `bg-saju-primary-card`

## 3) 컴포넌트 사용 우선순위

새 UI를 만들 때는 아래 순서를 우선한다.

1. 기존 공용 클래스 재사용 (`page-shell`, `page-grid`, `hero-panel`, `btn-saju-*`, `card-saju-primary`)
2. `shared/ui/button.tsx`의 `Button` 변형 사용
3. 그래도 부족하면 토큰 기반 Tailwind 클래스 추가
4. 마지막 수단으로만 인라인 스타일 사용

금지:

- 같은 의미의 색/그림자 값을 여러 파일에 복붙 하드코딩
- 포커스 링 제거 (`focus-visible` 삭제 금지)
- 배경/텍스트 대비가 약한 조합

## 4) 레이아웃/반응형 규칙

- 컨테이너: Tailwind container, `2xl = 1280px`, 기본 패딩 `1.5rem`
- 기본 페이지 래퍼: `page-shell`
- 2단 레이아웃: `page-grid` (`lg` 이상에서 2열)
- 모바일 우선:
  - 모바일: 단일 컬럼, 버튼 세로 스택 허용
  - 데스크탑: 입력/결과 분리, 시선 흐름이 좌 -> 우
- 여백 기준:
  - 카드 패딩: `p-6` 또는 `p-7/p-8`
  - 섹션 간격: `gap-3`, `gap-4`, `gap-6`을 일관 사용

## 5) 타이포그래피 규칙

- 폰트:
  - 본문: `Noto Sans KR` (`--font-sans`)
  - 디스플레이: `Jua` (`--font-display`)
- 사용 원칙:
  - 제목은 짧고 강하게, 본문은 2~3문장 내
  - 한국어 가독성 우선 (행간 여유)
  - 영문 대문자 라벨(`tracking-[0.3em]`)은 보조 정보에만 제한적으로 사용

## 6) 모션/애니메이션 규칙

현재 애니메이션 기준:

- `twinkle`, `twinkleBright`, `pulseGlow`, `shimmer`, `float-up`

원칙:

- 분위기 연출용 모션은 유지하되, 기능 UI에서는 과한 모션 금지
- 기본 인터랙션은 `transition` + `focus-visible:ring` 중심
- 같은 화면에서 강한 반복 애니메이션은 1~2종으로 제한
- 새로운 keyframe 추가 시:
  - 목적을 한 줄 주석으로 명시
  - 지속시간 1.5s~8s 범위에서 자연스럽게 설정

## 7) 접근성/품질 기준

- 텍스트 대비: WCAG AA 수준 지향
- 모든 클릭 요소:
  - hover + focus-visible 상태 둘 다 제공
  - 키보드 탐색 가능해야 함
- 버튼/입력:
  - 최소 터치 영역 40px 이상
- 로딩/빈 상태/오류 상태 UI를 반드시 포함

## 8) 색상 변경이 자주 일어날 때의 처리 순서

1. `globals.css` 변수 변경
2. `tailwind.config.ts` 확장 토큰 확인/수정
3. 공용 클래스(`btn-saju-*`, `card-saju-primary`) 반영
4. 개별 페이지의 인라인 스타일 정리/최소화

즉, "컴포넌트 수정"보다 "토큰 수정"을 먼저 한다.

## 9) Claude 작업 출력 형식 (요구 템플릿)

Claude는 매 작업에서 아래 포맷으로 답한다.

1. 변경 의도 요약 (3줄 이내)
2. 수정 파일 목록
3. 디자인 결정 근거
4. 접근성 체크 결과
5. 반응형 체크 결과 (모바일/데스크탑)

## 10) Claude에게 바로 붙여넣는 프롬프트

```txt
너는 saju-frontend의 전담 UX/UI 디자이너다.
아래 규칙을 반드시 지켜서 디자인/코드 제안을 해라.

[프로젝트 톤]
- Notion-like, Hand-drawn Sketch, Paper, Editorial
- 신규 UX/UI 추가 시 현재 sketch 컨셉(검은 보더/오프셋 그림자/아이보리 배경)을 유지
- 기능 화면에서는 명확성과 신뢰를 우선

[기술 제약]
- Next.js(App Router) + Tailwind + shadcn 스타일
- 색/반경/그림자 변경은 토큰 우선 (globals.css, tailwind.config.ts)
- 하드코딩 최소화, 공용 클래스/컴포넌트 재사용 우선

[필수 규칙]
- page-shell/page-grid 레이아웃 패턴 유지
- 버튼은 Button 또는 btn-saju 계열 우선 사용
- focus-visible 상태 제거 금지
- 모바일 우선 반응형
- 모션은 과하지 않게, 의미 있는 곳에만 사용

[출력 형식]
1) 변경 의도 요약
2) 수정 파일
3) 디자인 근거
4) 접근성 점검
5) 반응형 점검
```

