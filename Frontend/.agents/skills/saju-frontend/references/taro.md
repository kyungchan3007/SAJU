---
name: saju-frontend-ref-taro
description: /taro 준비중 화면과 향후 기능 확장 시 구조 규칙
---

# /taro 작업 참고

## 읽는 조건

`/taro` 준비중 화면, 타로 마케팅 카피, 추후 타로 기능 확장용 구조를 수정할 때 읽는다.

## 관련 경로

- `apps/web/src/app/(main)/taro/page.tsx`
- `apps/web/src/widgets/taro-coming-soon/ui/taro-coming-soon-section.tsx`
- `apps/web/src/features/taro-coming-soon`이 아직 없다는 점을 함께 확인한다.

## 작업 규칙

- 현재 `/taro`는 단일 widget만 렌더링하는 준비중 페이지다. 아직 전용 BFF나 feature hook을 두지 않는다.
- page는 메타데이터와 widget 조립에만 집중한다.
- 현재 페이지는 `robots: { index: false, follow: false }` 정책을 사용하므로, 공개 노출 정책을 바꾸면 메타데이터를 함께 검토한다.
- 단순 카피/스타일 수정은 widget 범위에서 끝내고, 실제 타로 조회/상담 기능이 생기면 그 시점에 `features`, `entities`, `app/api` 레이어를 새로 분리한다.

## 관계 규칙

- `TaroPage`는 현재 준비중 widget을 렌더링하는 라우트 엔트리다.
- `TaroComingSoonWidget`은 카피와 스타일 표현만 담당한다.
- 실제 타로 기능이 생기기 전까지 `TaroFeature`, `TaroEntity`, `TaroBFF`는 존재하지 않는 개념으로 본다.
- 공개 노출 정책은 page metadata의 robots 설정과 연결된다.

## 불변조건

- 준비중 페이지에 실제 조회/상담 기능이 있는 것처럼 표현하지 않는다.
- 단순 카피·스타일 수정에서 feature/entity/API 레이어를 새로 만들지 않는다.
- 공개 노출 정책 변경 시 metadata를 함께 검토한다.
- 홈/마케팅 링크 문구는 준비중 상태와 충돌하지 않아야 한다.

## 명령 해석 규칙

- “타로 페이지 문구/스타일” 요청은 widget 범위에서 처리한다.
- “타로 기능 오픈/조회/상담” 요청은 새 `features`, `entities`, `app/api` 경계 설계부터 시작한다.
- “검색 노출/SEO” 요청은 `/taro` metadata의 robots 정책을 먼저 확인한다.
- “홈에서 타로 연결” 요청은 현재 준비중 정책과 CTA 톤을 함께 확인한다.

## 체크리스트

- 준비중 상태와 실제 서비스 오픈 상태가 섞이지 않도록 CTA 문구를 확인한다.
- 홈/마케팅 영역에서 `/taro`로 연결되는 링크가 있다면 현재 준비중 정책과 톤이 맞는지 확인한다.
