---
name: saju-frontend-ref-ui-style
description: 최신 사주 프론트엔드 디자인 실행 규칙, 레이아웃/토큰/QA 기준
---

# UX/UI 및 테마 참고

## 기준 문서

- 최상위 디자인 시스템 기준은 repo root `DESIGN.md`를 따른다.
- 이 문서는 Agent가 구현 중 즉시 참고하는 실행 규칙만 유지한다.
- `paper/sketch`, 검은 보더, 오프셋 그림자는 legacy 호환 영역으로만 본다. 신규 UI에는 적용하지 않는다.

## 현재 디자인 방향

- 밝은 오프화이트 배경 위에 화이트 카드와 보라색 브랜드 포인트를 사용한다.
- 핵심 컬러는 `#5956E9`, `#7C3AED`, `#F0EEFF`, `#E0DAFF`, `#FAFAFA`, `#111827`, `#6B7280`이다.
- 카드, 모달, 결과 화면은 부드러운 radius, 얇은 border, 가벼운 shadow를 사용한다.
- 과한 글로우, 네온, 유리질감, 진한 단색 테마, 검은 두꺼운 보더 신규 사용을 피한다.
- 입력, 결제, 결과 화면은 장식보다 명확성, 신뢰, 모바일 가독성을 우선한다.

## 스타일 소스 우선순위

- 색상, 반경, 그림자는 `tailwind.config.ts`와 `src/app/globals.css` 토큰을 먼저 확인한다.
- 공용 UI는 `src/shared/ui`를 먼저 확인한다.
- 공용 버튼은 `@/shared/ui`의 `Button` 사용을 우선 검토한다.
- 확인 모달은 `@/shared/ui`의 `ConfirmModal` 사용을 우선 검토한다.
- 같은 의미의 색상, shadow, radius 값을 여러 컴포넌트에 새로 복붙하지 않는다.

## 페이지 레이아웃

- 일반 콘텐츠 페이지 기본 폭은 `PageContentLayout` 기준 `max-w-[1152px]`이다.
- 결과/리딩형 상세 화면은 `max-w-[720px]`를 우선한다.
- 루트 `/`와 `/home`처럼 별도 히어로/랜딩 구조가 있는 화면은 도메인 레이아웃을 따른다.
- 도메인 위젯/피처에서 새 max-width를 만들기 전 `PageContentLayout` 또는 기존 결과형 720px 패턴을 검토한다.

```tsx
import { PageContentLayout } from "@/shared/ui";

return (
  <PageContentLayout>
    <div className="flex flex-col gap-8">
      {/* page content */}
    </div>
  </PageContentLayout>
);
```

## 컴포넌트 규칙

- 클릭 가능한 요소에는 `hover`와 `focus-visible` 상태를 제공한다.
- 버튼과 입력의 최소 터치 영역은 44px 이상을 지향한다.
- `transition-all`보다 `transition-colors`, `transition-shadow`, `transition-[width]`처럼 필요한 속성만 전환한다.
- `next/image`에서 `fill`을 쓰면 실제 렌더 폭에 맞는 `sizes`를 함께 지정한다.
- 장식 이미지는 텍스트와 CTA를 덮지 않아야 하며 모바일에서는 crop 위치와 opacity를 별도로 확인한다.
- 로딩, 빈 상태, 오류 상태 UI를 함께 고려한다.

## 반응형 / QA

- 필수 확인 뷰포트: 360 / 390 / 768 / 1024 / 1280
- 기준 모바일 폭은 390px, 최소 안정 폭은 360px이다.
- 태블릿 기준 폭은 768px이다.
- 데스크탑 시작 기준은 1024px, 기본 작업 폭은 1280px이다.
- 모바일에서 가로 스크롤, 텍스트 잘림, 버튼/입력 겹침이 없어야 한다.
- 홈 히어로는 로그인/비로그인 상태를 모두 확인한다.

## Legacy 호환

- `page-shell`, `btn-saju-*`, `card-saju-primary`, `sketch-*` 클래스는 기존 화면 호환을 위해 남아 있을 수 있다.
- 신규 UI에서 `sketch-*` 패턴을 확장하지 않는다.
- legacy 화면 수정 시에도 신규 디자인 토큰으로 점진 전환한다.
