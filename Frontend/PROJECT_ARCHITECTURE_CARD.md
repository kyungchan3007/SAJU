# Project Architecture Card (Token-Slim)

목적: Claude가 프로젝트 전체 구조/로직 플로우를 짧게 파악하고 바로 구현하도록 돕는 기준 문서.

## 1) 기술 스택 요약
- Framework: Next.js App Router (`next@16`)
- Language: TypeScript (`strict`)
- UI: Tailwind CSS + shadcn-style 공용 Button
- Auth: NextAuth + Kakao OAuth + BFF 쿠키 브리지
- State: React local state + Zustand (일부 준비 상태)
- Data Fetch: `fetch` 중심, React Query 클라이언트 준비됨

## 2) 아키텍처 레이어 (FSD Hybrid)
- `src/app`
  - 라우트 엔트리(`page.tsx`), API BFF(`api/**/route.ts`), SEO 메타 정의
- `src/widgets`
  - 페이지 단위 조합 블록 (`SajuResult`, `CompatibilityResultCard`, `LocationMapPanel`, `WelcomSection`)
- `src/features`
  - 사용자 인터랙션 단위 (`saju-input`, `auth`, `payment`, `location-search`)
- `src/domain`
  - 도메인 UI/룩업 데이터 (`12zodiac`, `saju preview card`)
- `src/entities`
  - 도메인 타입 + 서버 유틸 (`exchangeOAuthCodeOnServer`)
- `src/shared`
  - 공용 API 응답 포맷, 설정(env/auth), UI, 유틸, 인프라 프로바이더

## 3) 라우트 구성
- `/` -> `WelcomSection` 랜딩
- `/login` -> `LoginPanel` (카카오 로그인 시작점)
- `/saju` -> `SajuInputForm` (입력 전용)
- `/saju/result` -> `SajuPreviewCard` (로그인 후 결과 전용)
- `/compatibility` -> `CompatibilityResultCard` + `PaymentCallout`
- `/location` -> `LocationSearchPanel` + `LocationMapPanel`

## 4) BFF API 구성
- `GET/POST /api/saju`
  - 현재 `GET`은 placeholder 성공 응답
  - `POST`는 `saju_access_token` 쿠키 없으면 `401 LOGIN_REQUIRED`, 있으면 preview 흐름용 placeholder 성공 응답
- `GET/POST /api/compatibility`
  - preview/lock 상태 placeholder 응답
- `GET/POST /api/location`
  - 지도/추천 placeholder 응답
- `POST /api/payment/verify`
  - 결제 검증 placeholder 응답
- `GET /api/auth/kakao`
  - 백엔드 `/api/auth/kakao`로 프록시 후 302 Location 전달
- `GET /api/auth/kakao/callback`
  - code 교환 후 `saju_access_token`, `saju_refresh_token` 쿠키 세팅 -> `/saju/result` 리다이렉트
- `GET/POST /api/auth/[...nextauth]`
  - NextAuth 핸들러

## 5) 핵심 로직 플로우
1. 랜딩 진입
2. CTA로 `/saju` 또는 `/compatibility` 이동
3. `/saju`에서 폼 제출
4. `features/saju-input/hooks/useSajuHooks.ts`가 `/api/saju` POST 호출
5. `401`이면 `/login`으로 이동
6. 로그인에서 카카오 시작 버튼 클릭
7. `/api/auth/kakao` -> 백엔드 -> 카카오 인증 -> `/api/auth/kakao/callback?code=...`
8. callback에서 code 교환 성공 시 토큰 쿠키 저장 후 `/saju/result` 복귀

## 6) 상태 관리 현황
- `saju-input`: 컨테이너에서 `useState`로 폼 상태/step 상태 관리
- `auth/payment`: Zustand store 정의됨 (`useAuthStore`, `usePaymentStore`) but 현재 사용 지점 제한적
- React Query:
  - `getQueryClient`와 `Providers`는 구현됨
  - 현재 `RootLayout`에 `Providers`가 연결되어 있지 않음

## 7) 환경변수 경계
- Public: `NEXT_PUBLIC_*` (앱명, 앱 URL, 설명, 카카오맵 키, 결제 키 등)
- Server: `NEXTAUTH_*`, `KAKAO_CLIENT_*`, `BACKEND_API_BASE_URL`, 결제 secret
- 검증: `src/shared/config/env.ts`에서 zod 기반 parse

## 8) 현재 구현 상태 메모
- 다수 BFF 라우트는 placeholder 단계
- 이메일 로그인(`useAuthHooks`)은 TODO 상태
- OpenAPI 설정 파일은 존재하나 `src/generated/api` 산출물은 현재 리포에 없음

## 9) Claude 작업 규칙 (전체 작업용)
- 전체 구조 질문/리팩터링/신규 기능 설계 요청이면 이 문서를 먼저 읽는다.
- 이후 해당 도메인 카드 1개만 추가로 읽는다.
- 문서 요약은 5줄 이내로 제한하고 바로 구현한다.

## 10) Claude 시작 프롬프트 (복붙용)
```txt
이번 요청은 프로젝트 전체 구조/로직과 관련 있습니다.
먼저 PROJECT_ARCHITECTURE_CARD.md의 2~6번 섹션만 읽고 5줄 이내로 요약하세요.
그 다음 작업 대상 도메인 카드 1개만 추가로 읽고 구현을 시작하세요.
관련 없는 .md 파일은 읽지 마세요.
```
