# 프로젝트 지침: UX 구조 유지 및 스케치 테마 적용

## ⚠️ 핵심 제약 사항 (MUST READ)
- **배치 및 레이아웃 보존**: 현재 구현된 버튼, 인풋, 컨테이너의 위치(Position), 간격(Margin/Padding), 정렬(Alignment) 등 UX 구조는 절대 변경하지 않는다.
- **작업 범위**: 오직 시각적 '테마(Theme)'만 교체한다. (배경색, 테두리 스타일, 폰트, 아이콘, 그래픽 요소 등)

## 1. 테마 적용 가이드 (Visual Overhaul)

### 1.1 Border & Stroke (가장 중요)
- 모든 사각형 요소(Button, Input, Card)의 `border-radius`와 `border-width`는 유지하되, 선의 느낌을 'Rough'하게 변경한다.
- 가능하면 CSS `mask-image`나 `border-image`를 활용하여 손으로 그린 듯한 미세한 떨림을 표현한다.

### 1.2 컬러 및 배경 (Background & Color)
- **Base**: 첨부 이미지의 화이트/오프화이트 톤을 배경으로 사용한다.
- **Point**: 텍스트 강조 시 '검은색 기울어진 박스 + 흰색 글씨' 스타일을 적용한다.
- **Input/Button**: 배경색은 채우지 않거나(Transparent) 아주 연한 회색을 사용하고, 외곽선(Stroke) 위주로 디자인한다.

### 1.3 아이콘 및 그래픽 (Assets)
- 기존의 고해상도/플랫 아이콘을 **Doodle(낙서) 스타일의 SVG 아이콘**으로 전면 교체한다.
- 페이지의 빈 공간(Gutter)에만 이미지 예시와 같은 로켓, 식물 등의 핸드드로우 일러스트를 데코레이션으로 배치한다. (UX 동선 방해 금지)

## 2. 클로드(Claude) 수행 작업 지시
1. 기존 코드를 분석하여 **컴포넌트의 위치 구조(Flex/Grid/Absolute 등)는 그대로 유지**한다.
2. 각 컴포넌트에 적용된 **Tailwind 클래스나 CSS 스타일 중 'Visual'에 해당하는 부분만 수정**하여 스케치 테마를 입힌다.
3. 버튼이나 입력창에 `Wired.js` 스타일의 'Hand-drawn' 효과를 주는 CSS 클래스를 새로 생성하여 적용한다.

## 3. 코드 작성 예시 (참고용)
- **AS-IS**: `class="bg-blue-500 rounded-lg p-4"` (플랫한 파란 버튼)
- **TO-BE**: `class="bg-transparent border-2 border-black p-4 sketch-border"` (스케치 스타일의 테두리 버튼)
- *참고: 배치에 영향을 주는 `p-4`, `m-2`, `flex` 등은 건드리지 말 것.*