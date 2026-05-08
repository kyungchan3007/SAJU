---
name: saju-frontend-ref-location
description: /location 관련 경로, 위치 추천/지도 작업 규칙
---

# /location 작업 참고

## 읽는 조건

`/location`, 위치 추천, 지도, 오늘의 방향, 사주 기반 장소 추천 UI/API를 수정할 때 읽는다.

## 관련 경로

- `src/app/(main)/location`
- `src/features/location-search`
- `src/widgets/location-map`
- `src/entities/location`
- `src/app/api/location/route.ts`

## 작업 규칙

- 위치 검색 UI와 지도 표시 UI의 책임을 분리한다.
- 추천 결과 데이터 매핑은 UI 컴포넌트 안에 직접 흩뿌리지 않는다.
- 지도 키와 외부 SDK 설정은 public/server 환경변수 경계를 확인한다.
- 위치 추천이 사주 결과나 사용자 정보에 의존하면 `/saju/result`와 `/mypage` 영향도 확인한다.
- 로딩, 권한 거부, 검색 결과 없음 상태를 함께 고려한다.
