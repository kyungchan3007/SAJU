---
name: saju-frontend-ref-ads
description: AdSense 심사/노출 구조, 광고 슬롯 배치 규칙, 결과 공개 게이트 구현, Rewarded Ads 부채, 피해야 할 패턴
---

# 광고 및 결과 공개 게이트 참고

## 읽는 조건

AdSense, 광고 슬롯, Rewarded Ads, 결과 공개 대기 광고 게이트, 심사 대응 작업을 할 때 읽는다.

## 심사와 노출 구조 (판단의 전제)

이 절을 먼저 읽고 우선순위를 정한다. 근거 없는 통설로 판단하지 않는다.

- **로그인 뒤 광고는 심사 차단 사유가 아니다.** Google은 "계정 활성화 **후에** crawler login을 만들어 로그인 뒤 페이지에 광고를 게재한다"고 공식 규정한다. (`support.google.com/adsense/answer/161351`)
- **crawler login이 없으면 로그인 뒤 광고는 타겟팅이 안 되거나 아예 안 나온다.** 크롤러가 페이지를 못 읽기 때문이다.
- 따라서 **공개 + 크롤러 접근 가능 + 게시자 콘텐츠 있음**을 동시에 만족하는 페이지가 유일하게 유효한 광고 지면이다. 현재 그런 지면은 블로그뿐이다.
- **광고는 게시자 콘텐츠가 없는 화면에 두지 않는다.** Publisher Policies 원문: *"Ads should not be placed on 'dead end' or no content screens (e.g., Thank You, Log in, Exit, Error pages, etc.)"* (`support.google.com/publisherpolicies/answer/11112688`)
- **자동 생성 콘텐츠에 광고를 두지 않는다.** 원문: *"Don't place ads on automatically generated content without manual review or curation."* AI 사용 자체는 금지가 아니지만, 사람 검수 없는 자동 생성물에 광고를 붙이는 것은 금지다.
- **글 개수 기준은 공식적으로 존재하지 않는다.** "N개 이상이면 승인" 류의 커뮤니티 체감담을 기준으로 삼지 않는다.

## 현재 정책 기준

- 일반 AdSense display 광고와 Rewarded Ads를 문구/동작상 섞지 않는다.
- Rewarded Ads 연동 전에는 결과 공개 버튼에 광고 시청을 조건처럼 쓰지 않는다.
- 일반 AdSense 영역 라벨은 `Advertisements`처럼 중립적으로 둔다.
- 광고 영역을 서비스 카드/버튼/콘텐츠처럼 보이게 꾸미지 않는다.
- 광고 클릭, 광고 시청, 광고 완료를 유도하는 문구는 Rewarded Ads가 실제 연동되고 준비된 경우에만 사용한다.
- Google 광고의 닫기, 소리, 건너뛰기, 컨트롤을 가리거나 직접 대체하지 않는다.

## 현재 구현

- 스크립트 로드: `apps/web/src/app/layout.tsx`
- 슬롯 컴포넌트: `apps/web/src/shared/ui/ad-slot.client.tsx` (`AdSlot`)
  - env 미설정 시 개발용 placeholder를 렌더한다.
- 블로그 본문 슬롯: `apps/web/src/shared/ui/blog-article-ad-slot.client.tsx` (`BlogArticleAdSlot`)
  - 블로그 글 7편 본문 하단에 게재된다. 공개 + 크롤러 접근 가능 + 게시자 콘텐츠 있음을 만족하는 유일한 지면이다.
  - `NEXT_PUBLIC_ADSENSE_BLOG_SLOT`이 없으면 `NEXT_PUBLIC_ADSENSE_SAJU_LOADING_SLOT`으로 fallback한다.
- 게이트 컴포넌트: `apps/web/src/shared/ui/ad-progress-gate.client.tsx` (`AdProgressGate`)
  - 내부에 `SajuQuizGame` + `AdSlot` + 진행 노트를 렌더한다.
  - 진행률은 `use-ad-progress-gate.ts`에서 `isComplete` 전까지 95%로 묶인다(fake progress).
  - 기본 버튼 문구는 `사주결과 보기`.
- `AdProgressGate` 사용처(전부 로그인 보호 영역):
  `saju/result`, `saju-hub`, `protected-saju-service-gate`, `auth-refresh-retry`,
  `compatibility`, `food`, `personality`, `year-fortune`, `traditional-fortune`
- 콘텐츠 메타: `apps/web/src/app/(main)/blog/_data/articles.ts`가 글별 발행/수정일의 단일 출처다.
  화면 표기(`ArticleTrustNote`), JSON-LD(`createArticleStructuredData`), `sitemap.ts`가 모두 이 값을 쓴다.
  글을 고치면 여기 `updatedAt`을 실제 수정일로 갱신한다. 세 곳이 다른 날짜를 말하면 신뢰 신호가 깨진다.
- AdSense 환경변수:
  - `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
  - `NEXT_PUBLIC_ADSENSE_BLOG_SLOT` (블로그 본문용)
  - `NEXT_PUBLIC_ADSENSE_SAJU_LOADING_SLOT` (로그인 뒤 로딩 게이트용)

## 알려진 부채
- **`RewardedResultGate`는 이름과 달리 Rewarded Ads를 쓰지 않는다.** (`features/saju-result/ui/rewarded-result-gate.client.tsx`)
  `progress={100} isComplete`로 즉시 완료 상태의 display 광고 인터스티셜을 띄울 뿐이다.
  `isRewardedReady` / `onRewardedRevealResult`를 넘기는 곳이 없어 rewarded 경로는 dead code다.
- **`rewardedRevealButtonLabel` 기본값이 `"짧은 광고를 보고 사주결과 열기"`다.** 아래 "피해야 할 것"이 금지하는 문구인데, `isRewardedReady`가 항상 false라 노출만 안 되는 상태다. rewarded 실연동 전까지 이 기본값에 의존하지 않는다.
- 로딩 게이트는 게시자 콘텐츠가 없는 화면이라 crawler login 설정 시점부터 정책 대상이 된다. 그 전에 슬롯을 콘텐츠 지면으로 옮기거나 게이트에 실제 콘텐츠를 넣어야 한다.

## Rewarded Ads 연동 후 바꿀 부분

- `apps/web/src/shared/ui/ad-progress-gate.client.tsx`
  - `isRewardedReady`가 실제로 true일 때만 rewarded 문구/동작을 켠다.
  - 로드 실패·미준비 시 `사주결과 보기` display fallback을 유지한다.
- `apps/web/src/features/saju-result/ui/rewarded-result-gate.client.tsx`
  - 현재 버튼 클릭 즉시 공개를 Rewarded 완료 이벤트 기반으로 교체한다.
  - 예: `rewardedSlotGranted` 수신 후 `setIsResultRevealed(true)`.
  - 이름과 실제 동작이 일치하게 되는 시점이므로, 그 전까지는 이 컴포넌트명을 근거로 rewarded가 있다고 판단하지 않는다.

## 피해야 할 것

- 일반 AdSense display 슬롯 옆에 `광고 보고`, `광고 시청 후`, `광고 완료 후` 문구를 노출하지 않는다.
- 자체 타이머로 `15초 후 스킵`, `30초 후 스킵` UI를 만들지 않는다.
- 광고 위에 CTA, 화살표, 오버레이, 클릭 유도 문구를 올리지 않는다.
- 로그인 보호 페이지에만 의존해 AdSense 심사를 준비하지 않는다. 공개 페이지의 콘텐츠와 탐색성을 함께 확인한다.
- 게시자 콘텐츠가 없는 로딩/완료/에러 화면을 새 광고 지면으로 늘리지 않는다.

## 갱신 규칙

- 이 문서의 "현재 구현"은 실제 파일 경로·컴포넌트명·기본 문구와 일치해야 한다.
  광고 관련 코드를 옮기거나 이름을 바꾸면 이 절을 같이 고친다.
- 정책 서술에는 공식 출처(support.google.com / developers.google.com)만 근거로 쓴다.
  커뮤니티 체감담은 근거로 인용하지 않는다.
