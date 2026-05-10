---
name: saju-frontend
description: >-
  이 저장소의 사주 프론트엔드 구현 또는 변경 요청에 사용한다. Next.js App Router
  페이지와 흐름(/saju, /saju/result, /home, /mypage, /mypage/jeongtongsaju, /location, /login),
  인증 인식 UX, 사주 입력 임시저장 동작, React Query 사용/캐싱,
  OpenAPI 생성 프론트엔드 클라이언트 연동, UI 상태 및 컴포넌트 레이어 결정 작업이
  해당된다. 사용자가 라우트나 기술명을 명시하지 않아도 해당 영역이면 사용한다.
  백엔드 전용 변경, 인프라 전용 작업, 프론트엔드 동작 변경 없는 생성 클라이언트
  재생성에는 사용하지 않는다.
---

# 사주 프론트엔드 스킬

작업 시작 전 대상 라우트 또는 기능 도메인을 먼저 식별한다.

## 읽기 규칙

- 기본으로 이 파일만 읽는다.
- 전체 구조, 라우트 설계, 레이어 경계 작업이면 `references/architecture.md`를 읽는다.
- API 연동, OpenAPI, 생성 클라이언트, 백엔드 호출 위치, 쿠키 브리지, 인증 refresh/redirect 작업이면 반드시 `references/api.md`를 읽고 그 BFF 경계를 우선한다.
- 전역 UX/UI, 테마, 반응형 작업이면 `references/ui-style.md`를 읽는다.
- AdSense, 광고 슬롯, Rewarded Ads, 결과 공개 광고 게이트 작업이면 `references/ads.md`를 읽는다.
- 기능 추가/수정 이후 unit test(Vitest) 작성/갱신 작업이면 `references/testing.md`를 읽는다.
- `.tsx` 컴포넌트의 비즈니스 로직, 플로우 로직, 역할 분리 작업이면 `references/component-guide.md`를 읽는다.
- `/saju` 입력 흐름 작업이면 `references/saju.md`를 읽는다.
- `/saju/result` 결과 조회 작업이면 `references/saju-result.md`를 읽는다.
- `/mypage/jeongtongsaju` 또는 정통사주 상세 조회 작업이면 `references/jeongtongsaju.md`를 읽는다.
- `/mypage/saju-manage` 또는 내 사주 기본 정보 조회·수정 작업이면 `references/saju-manage.md`를 읽는다.
- `/mypage/zodiac-compatibility` 또는 띠별 궁합 조회·점수 매핑 작업이면 `references/zodiac-compatibility.md`를 읽는다.
- `/home` 작업이면 `references/home.md`를 읽는다.
- `/login` 또는 인증 UI 작업이면 `references/auth.md`를 읽는다.
- `/mypage` 작업이면 `references/mypage.md`를 읽는다.
- `/location` 작업이면 `references/location.md`를 읽는다.
- 여러 도메인에 걸친 작업일 때만 필요한 reference를 추가로 읽는다.

## 공통 규칙

- `src/generated/api` 아래 파일은 직접 수정하지 않는다.
- API 관련 판단에서는 Next.js 일반론보다 `references/api.md`의 프로젝트 기조를 우선한다.
- 백엔드 직접 호출, 인증 쿠키 처리, token refresh, 서버 전용 환경변수 사용은 먼저 `src/app/api/**/route.ts` BFF 경계를 통과하는 구조로 판단한다.
- 페이지 파일은 라우트 엔트리와 조립 역할에 가깝게 유지한다.
- 재사용되거나 복잡한 상태, 검증, 제출, 조회 흐름은 커스텀 훅으로 만들고 `features/*/hooks`에 둔다.
- `useQuery`와 `useMutation`은 widget/domain 컴포넌트에 직접 두지 말고 feature 커스텀 훅으로 감싼다.
- API 응답 가공은 UI 컴포넌트에서 직접 처리하지 않는다.
- 기존 `app`, `widgets`, `features`, `entities`, `shared` 구조를 먼저 따른다.
- 관련 없는 `.md` 파일은 읽지 않는다.

## 갱신 규칙

- 새 라우트, 새 도메인, 반복되는 실수, 중요한 규칙이 생기면 이 스킬 또는 관련 `references/` 문서를 함께 갱신한다.
- 문서는 토큰 절약을 위해 짧게 유지하고, 구현에 직접 필요한 규칙만 남긴다.
