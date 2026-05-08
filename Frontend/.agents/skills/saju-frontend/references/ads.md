---
name: saju-frontend-ref-ads
description: AdSense/Rewarded Ads 정책, 결과 공개 게이트 구현, 광고 슬롯 환경변수, 피해야 할 패턴
---

# 광고 및 결과 공개 게이트 참고

## 읽는 조건

AdSense, 광고 슬롯, Rewarded Ads, `/saju/result` 분석 대기 광고, 결과 공개 광고 게이트를 수정할 때 읽는다.

## 현재 정책 기준

- 일반 AdSense display 광고와 Rewarded Ads를 문구/동작상 섞지 않는다.
- Rewarded Ads 연동 전에는 결과 공개 버튼에 광고 시청을 조건처럼 쓰지 않는다.
- 일반 AdSense 영역 라벨은 `Advertisements`처럼 중립적으로 둔다.
- 광고 영역을 서비스 카드/버튼/콘텐츠처럼 보이게 꾸미지 않는다.
- 광고 클릭, 광고 시청, 광고 완료를 유도하는 문구는 Rewarded Ads가 실제 연동되고 준비된 경우에만 사용한다.
- Google 광고의 닫기, 소리, 건너뛰기, 컨트롤을 가리거나 직접 대체하지 않는다.

## 현재 구현

- `/saju/result` 로딩 중 `AnalysisProgressScreen`이 fake progress와 AdSense display 슬롯을 보여준다.
- API 응답 완료 후 같은 화면에서 progress를 100%로 고정한다.
- Rewarded Ads 연동 전 완료 버튼 문구는 `사주풀이 보기`로 둔다.
- AdSense 환경변수:
  - `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
  - `NEXT_PUBLIC_ADSENSE_SAJU_LOADING_SLOT`

## Rewarded Ads 연동 후 바꿀 부분

- `src/features/saju-result/ui/analysis-progress-screen.client.tsx`
  - Rewarded 광고가 준비된 경우에만 버튼 문구를 `광고 보고 사주풀이 보기`로 바꾼다.
  - 완료 안내 문구를 `광고를 시청하면 사주풀이를 확인할 수 있어요.`처럼 명확히 바꾼다.
- `src/widgets/saju-result/ui/saju-result.tsx`
  - 현재 버튼 클릭 즉시 결과 공개를 Rewarded Ads 완료 이벤트 기반으로 교체한다.
  - 예: `rewardedSlotGranted` 수신 후 `setIsResultRevealed(true)`.
- Rewarded 광고가 준비되지 않았거나 로드 실패한 경우에는 일반 `사주풀이 보기` fallback을 유지한다.

## 피해야 할 것

- 일반 AdSense display 슬롯 옆에 `광고 보고`, `광고 시청 후`, `광고 완료 후` 문구를 노출하지 않는다.
- 자체 타이머로 `15초 후 스킵`, `30초 후 스킵` UI를 만들지 않는다.
- 광고 위에 CTA, 화살표, 오버레이, 클릭 유도 문구를 올리지 않는다.
- `/saju/result`처럼 로그인 보호 페이지에만 의존해 AdSense 심사를 준비하지 않는다. 공개 페이지의 콘텐츠와 탐색성을 함께 확인한다.
