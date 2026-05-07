# UX/UI 및 테마 참고

## 기본 컨셉

- Notion-like, Hand-drawn Sketch, Paper, Editorial, Korean fortune-telling mood
- 아이보리 종이 배경, 검은 보더, 오프셋 그림자, 작은 라운드를 유지한다.
- 과한 글로우, 네온, 유리질감, 강한 그라디언트는 피한다.
- 입력, 결제, 결과 화면은 명확성과 신뢰를 우선한다.

## 스타일 소스

- 색상, 반경, 그림자 변경은 컴포넌트 하드코딩보다 `src/app/globals.css`와 `tailwind.config.ts`를 먼저 확인한다.
- 기존 공용 클래스와 패턴을 우선 사용한다: `page-shell`, `page-grid`, `hero-panel`, `btn-saju-*`, `card-saju-primary`, `sketch-border`, `sketch-highlight`, `sketch-input`.
- 공용 버튼은 `src/shared/ui/button.tsx`의 `Button` 변형을 먼저 검토한다.

## 레이아웃 규칙

- 모바일 우선으로 구성하되 데스크탑에서는 정보 구조가 자연스럽게 확장되도록 한다.
- 버튼과 입력의 최소 터치 영역은 40px 이상을 지향한다.
- 클릭 가능한 요소에는 `hover`와 `focus-visible` 상태를 제공한다.
- 텍스트 대비는 WCAG AA 수준을 지향한다.
- 로딩, 빈 상태, 오류 상태 UI를 함께 고려한다.

## 테마 변경 작업

- 기존 UX 구조를 유지해야 하는 테마 변경 작업에서는 배치, 간격, 정렬을 바꾸지 않는다.
- 시각 요소만 변경한다: 배경색, 테두리, 폰트, 아이콘, 그래픽 요소.
- 같은 의미의 색상이나 그림자 값을 여러 파일에 복붙하지 않는다.
