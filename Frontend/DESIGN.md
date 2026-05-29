# Saju Frontend Design System

이 문서는 사주 프론트엔드의 확정 디자인 기준을 정리한 최상위 문서다. 구현 중 Agent가 바로 따라야 하는 짧은 규칙은 `.agents/skills/saju-frontend/references/ui-style.md`에 둔다.

## 1. 목적

- 화면마다 다른 색상, radius, shadow, 카드/버튼 패턴을 하나의 기준으로 수렴한다.
- `src/shared` 내부 디자인 시스템 레이어에서 시작하고, 안정화 이후 `packages/design-tokens`, `packages/ui` 분리를 검토한다.
- FSD 구조(`app`, `widgets`, `features`, `entities`, `shared`)를 유지한다.

## 2. Visual Direction

- Bright product UI: `#FAFAFA` 배경, 화이트 카드, 보라색 브랜드 포인트.
- Calm and trustworthy: 결과/결제/입력 화면은 장식보다 가독성과 신뢰를 우선한다.
- Soft premium: 얇은 border, 부드러운 radius, 가벼운 shadow, 제한된 gradient를 사용한다.
- Korean fortune context: 히어로 이미지, 사주/운세 도메인 카피, 오행/궁합 시각 요소로 정체성을 표현한다.

신규 UI에서 사용하지 않는 방향:

- 두꺼운 검은 보더와 오프셋 그림자 중심의 paper/sketch 스타일
- 네온, 과한 글로우, 유리질감, 강한 단색 테마
- 목적 없는 장식 배경, 텍스트를 가리는 이미지

## 3. Token Draft

### Color

| Token | Value | Usage |
| --- | --- | --- |
| `saju.primary` | `#5956E9` | primary CTA, active, focus ring, brand icon |
| `saju.purple` | `#7C3AED` | primary gradient end |
| `saju.accent` | `#A5A3F7` | text on dark purple surface |
| `saju.border` | `#E0DAFF` | purple border, selected state |
| `saju.light` | `#F0EEFF` | badge/icon background |
| `saju.soft` | `#F5F3FF` | hover/soft selected background |
| `saju.bg` | `#FAFAFA` | app background |
| `surface.card` | `#FFFFFF` | card/modal/sheet surface |
| `text.primary` | `#111827` | main text |
| `text.secondary` | `#374151` | body text |
| `text.muted` | `#6B7280` | helper text |
| `text.subtle` | `#9CA3AF` | labels/placeholders |
| `border.default` | `#E5E7EB` | neutral border |
| `danger` | `#EF4444` | destructive action/error |
| `success` | `#16A34A` | success/done |
| `warning` | `#F59E0B` | warning/medium score |
| `info` | `#06B6D4` | informational score/status |

### Typography

- Main title in content panels: `18px` to `22px`, `font-black` or `font-extrabold`.
- Section title: `15px`, `font-extrabold`.
- Body text: `13px`, `leading-[1.8]` to `leading-[1.85]`.
- Labels/badges: `10px` to `12px`, `font-bold`.
- Do not scale font size with viewport width.

### Radius

| Token | Value | Usage |
| --- | --- | --- |
| `radius.sm` | `8px` | compact controls, small badges |
| `radius.md` | `12px` | buttons, inputs |
| `radius.lg` | `14px` | default token radius |
| `radius.xl` | `16px` | cards |
| `radius.2xl` | `20px` | large cards |
| `radius.3xl` | `24px` | result cards, panels |
| `radius.modal` | `24px` to `28px` | dialogs |
| `radius.full` | `999px` | pills, avatars |

### Shadow

| Token | Value | Usage |
| --- | --- | --- |
| `shadow.saju-sm` | `0 1px 4px rgba(89,86,233,0.10)` | subtle brand elevation |
| `shadow.saju-md` | `0 2px 12px rgba(89,86,233,0.12)` | panels |
| `shadow.saju-lg` | `0 8px 32px rgba(89,86,233,0.20)` | hero/important cards |
| `shadow.card` | `0 2px 8px rgba(0,0,0,0.06)` | default white card |
| `shadow.button` | `0 4px 14px rgba(89,86,233,0.35)` | primary CTA |
| `shadow.modal` | `0 24px 64px rgba(0,0,0,0.18)` | confirm/dialog |

### Layout

- App background: `#FAFAFA`.
- General content width: `1152px`.
- Result/reading detail width: `720px`.
- Mobile base: `390px`.
- Minimum stable mobile: `360px`.
- Tablet: `768px`.
- Desktop start: `1024px`.
- Workbench desktop: `1280px`.

## 4. Current UI Inventory

### Shared / Global

- Global navigation: desktop menu, mobile navigation, profile entry.
- Page content layout: white full-width band + centered content.
- Buttons: primary gradient, secondary outline, ghost, danger.
- Modal: confirmation dialog for account/logout/destructive actions.
- State cards: loading, empty, error.
- Status message: success, error, info, warning.
- Ad gate: progress card, status notes, reveal CTA.

### Domain Patterns

- Home: hero, today fortune card, marketing/service cards.
- Saju input: form steps, validation, CTA.
- Saju result: pending gate, rewarded reveal, result cards.
- Compatibility: partner match cards, result header, score card, section bars, detail tabs, summary.
- Mypage: dashboard cards, menu, account modal, saju manage form, partner list.
- Year fortune / traditional fortune: 720px result reading layout, tabs, monthly/section cards.
- Location: keyword tabs, search panel, place list, map panel.
- Community/Taro: staged form and coming-soon/notify states.

## 5. Shared UI Candidate Classification

공용 컴포넌트는 "반복되는 공용 UI + 도메인 지식 없음 + props 안정적" 기준을 모두 만족할 때 `shared/ui` 라이브러리화 대상으로 본다.

### 5.1 Promote Now

이미 공용성이 높거나 실제 사용처가 여러 도메인에 걸쳐 있는 항목이다. 신규/수정 UI부터 우선 사용하고, 중복 구현은 점진 제거한다.

| Candidate | Current Location | Used / Repeated In | Action |
| --- | --- | --- | --- |
| `Button` | `src/shared/ui/button/button.tsx` | payment, welcome CTA, auth/home button patterns | variant를 현재 디자인 토큰 기준으로 안정화 |
| `ConfirmModal` | `src/shared/ui/confirm-modal/confirm-modal.tsx`, `src/shared/ui/confirm-modal.tsx` | account logout/withdraw, saju-manage delete | 중복 구현 2개를 하나로 합치기 |
| `StatusMessage` | `src/shared/ui/status-message/status-message.tsx` | saju-manage feedback, future form feedback | success/error/info/warning 기준 유지 |
| `PageContentLayout` | `src/shared/ui/page-content-layout.tsx` | compatibility, traditional fortune flow | general `1152px` 컨테이너로 유지 |
| `PageContainer` | not created | result/detail pages need `720px` | `general`, `reading`, `modal` width variant 설계 |
| `Card` | not created | compatibility, mypage, traditional/year fortune cards | default/interactive/selected/result variants 설계 |
| `Badge` | not created | compatibility tags, zodiac score labels, hero labels | neutral/primary/status/score variants 설계 |
| `FormMessage` | `src/shared/ui/form-message/form-message.tsx` | saju manage, auth restore, future forms | error/warning/info helper text 통일 |
| `ProgressBar` | `src/shared/ui/progress-bar/progress-bar.tsx` | compatibility score sections, zodiac score, home today card, jeongtongsaju hero | `value`, `max`, `tone` primitive부터 시작 |
| `IconBadge` | `src/shared/ui/icon-badge/icon-badge.tsx` | section headers, hero stat chips, empty states | icon container 색상/radius/size만 공용화 |
| `Input` | `src/shared/ui/input/input.tsx` | saju input, community contact, taro notify, saju manage form, partner add modal | native input primitive부터 시작, 기존 화면은 점진 치환 |
| `Select` | `src/shared/ui/select/select.tsx` | saju input, saju manage form | native select primitive부터 시작, radix 전환은 추후 판단 |

### 5.2 Promote After Pattern Stabilizes

반복은 보이지만 화면별 요구가 아직 다르거나 props API를 더 지켜볼 항목이다.

| Candidate | Current Locations | Why Wait |
| --- | --- | --- |
| `FormField` / `FieldLabel` | saju input, saju manage form, partner add modal, community contact | required marker, helper, error 배치 API 합의 필요 |
| `Textarea` | community/contact류 확장 가능 | 현재 반복 사용이 충분하지 않음 |
| `SegmentedControl` | saju manage calendar/gender, partner add modal gender | 단일 선택 버튼 그룹으로 안정화 가능하지만 폼 제어 API 확인 필요 |
| `PillTabs` | compatibility detail tabs, year fortune tabs, location keyword tabs | horizontal scroll, icon, legacy location style variants 정리 필요 |
| `Switch` / `Checkbox` | saju input time unknown, saju manage time unknown | switch와 checkbox 의미가 섞여 있어 역할 분리 필요 |
| `CircularScore` | compatibility score | 점수 스케일/API 계약 확인 후 분리 |
| `Skeleton` | loading states in location, traditional fortune, zodiac | 기존 skeleton 톤 통일 필요 |
| `EmptyState` / `ErrorState` | `StateCard`, feature-specific empty/loading components | legacy paper 스타일 제거 후 재정의 |
| `SectionHeader` | compatibility result cards, year/traditional fortune cards, mypage cards | title + icon 패턴은 반복되지만 도메인별 밀도가 다름 |
| `ActionRow` | account rows, mypage menu rows, manage rows | row action 패턴은 반복되지만 navigation/action 타입 분리 필요 |
| `Toast` | saju validation toast/local feedback | 전역 toast 정책 확정 필요 |
| `Dropdown` | profile/global navigation future needs | 현재 공용 API 미확정 |

### 5.3 Keep Domain-Specific

반복되더라도 사주, 궁합, 파트너, 운세, 위치 같은 도메인 데이터를 직접 알고 있으므로 `features` 또는 `widgets`에 남긴다.

| Component / Pattern | Reason |
| --- | --- |
| Compatibility result header | `PartnerResponse`, `SajuProfileResponse`, 궁합 이미지 매핑에 의존 |
| Compatibility partner match cards | 파트너 선택 상태와 궁합 도메인 이미지에 의존 |
| Compatibility result score/sections/detail cards | 궁합 응답 스키마와 점수 정책에 의존 |
| Saju result interpretation blocks | 사주 결과 도메인 모델에 의존 |
| Saju five-elements animation/card | 오행 도메인 표현에 의존 |
| Year fortune monthly/domain cards | 신년운세 응답과 월별 운세 구조에 의존 |
| Traditional fortune domain cards | 정통사주 해석 구조에 의존 |
| Location map/search panels | 카카오 지도, 장소 검색, 위치 도메인에 의존 |
| Home hero/marketing sections | 랜딩 카피와 마케팅 이미지에 의존 |
| Community step form | 커뮤니티 단계 흐름과 입력 정책에 의존 |
| Taro coming-soon notify section | 타로 런칭/알림 도메인에 의존 |

### 5.4 First Cleanup Targets

1. `ConfirmModal` 중복 제거
   - `src/shared/ui/confirm-modal/confirm-modal.tsx`를 canonical로 삼을지 결정
   - `src/shared/ui/confirm-modal.tsx` 직접 import 사용처 제거
   - account, saju-manage delete modal을 같은 API로 통일
2. `PageContainer` 추가
   - `variant="content"` -> `max-w-saju-content`
   - `variant="reading"` -> `max-w-saju-reading`
   - 기존 `PageContentLayout`과 역할 병합 또는 wrapper로 유지
3. `Card` / `Badge` 추가
   - 반복되는 `rounded-2xl/3xl border bg-white shadow-sm` 조합을 신규 UI부터 대체
   - 도메인 데이터를 받지 않고 `children`, `variant`, `interactive`, `selected` 정도만 받기
4. `Input` / `Select` / `FormMessage` / `ProgressBar` / `IconBadge` 추가
   - 현재 여러 화면에서 동일한 시각 규칙이 반복됨
   - 도메인 데이터 없이 닫힌 primitive API를 만들 수 있음
5. `FormField`, `SegmentedControl`, `PillTabs`는 바로 전면 공용화하지 않기
   - 폼 검증, 접근성, active state, mobile overflow 요구가 화면마다 다름
   - 먼저 2개 이상 화면에서 같은 props 형태로 쓸 수 있을 때 구현

## 6. Structure Plan

Initial internal structure:

```txt
src/shared/design-tokens/
src/shared/ui/primitives/
src/shared/ui/components/
src/shared/ui/patterns/
```

Current practical mapping:

- `tailwind.config.ts`: Tailwind theme tokens.
- `src/app/globals.css`: CSS variables and compatibility utility classes.
- `src/shared/ui`: shared React UI components.
- `.agents/skills/saju-frontend/references/ui-style.md`: Agent execution rules.

Implemented token groups:

- `colors.saju`: brand colors used by CTA, active states, badges, selected cards.
- `colors.surface`: page/card/panel surfaces and neutral borders.
- `colors.content`: primary, secondary, muted, subtle, inverse text colors.
- `colors.status`: danger, success, warning, info state colors.
- `borderRadius.saju-*`: card, panel, modal radius presets.
- `boxShadow.saju-*`: card, button, panel, modal elevation.
- `maxWidth.saju-*`: content, reading/result, modal widths.
- `fontSize.saju-*`: title, section, body, label, badge text sizes.
- `zIndex`: nav, overlay, modal, toast layers.

Future package split:

```txt
packages/design-tokens/
packages/ui/
```

Do not start package extraction until shared components stabilize across multiple domains.

## 7. Import Rules

- Domain code imports reusable UI from `@/shared/ui`.
- `shared/ui` must not import from `features`, `widgets`, or `app`.
- `shared/ui` may import `shared/lib`, `shared/config`, and external UI libraries.
- API/query/domain-specific logic stays in `features` or `entities`.
- Data transformation for display stays in feature `model` unless reused across domains.

## 8. Implementation Rules

- Prefer tokens from `tailwind.config.ts` and `globals.css` over new hardcoded values.
- Add `focus-visible` states to interactive elements.
- Keep touch targets at least `44px` where practical.
- Use `transition-colors`, `transition-shadow`, `transition-[width]` instead of `transition-all`.
- `next/image` with `fill` must include `sizes`.
- Avoid card-in-card page sections. Cards are for repeated items, modals, and framed tools.
- Use lucide icons for UI controls when available.
- Text must not overlap or overflow buttons/cards at 360px mobile width.

## 9. Legacy Policy

- Existing `sketch-*`, black-border, paper-style UI may remain while old screens are migrated.
- Do not expand legacy sketch styling into new UI.
- When touching legacy UI for feature work, prefer gradual migration to the current token direction.
- Remove duplicate modal/button/card implementations only after usage and behavior are confirmed.

## 10. QA Checklist

- Check 360 / 390 / 768 / 1024 / 1280 widths.
- Check login and logout states.
- Check loading, empty, error, success states.
- Check keyboard focus on buttons, tabs, modals, links.
- Check image 404 and `next/image` warnings.
- Check no horizontal scroll on mobile.
- Check result pages align to 720px where applicable.
