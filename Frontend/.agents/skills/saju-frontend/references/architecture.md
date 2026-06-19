---
name: saju-frontend-ref-architecture
description: 기술 스택, 레이어 구조(app/widgets/features/entities/shared), 주요 라우트 목록, 작업 원칙
---

# 프론트엔드 아키텍처 참고

## 기술 스택

- Framework: Next.js App Router (`next@16`)
- Runtime/Deploy: OpenNext + Cloudflare Workers, `wrangler`
- Language: TypeScript strict, React 19
- Styling/UI: Tailwind CSS, Radix UI, lucide-react, `@saju/design-tokens`, `@saju/ui`
- Auth: Backend Kakao OAuth + Next.js BFF HttpOnly 쿠키 브리지
- State: React local state + 일부 Zustand
- Data Fetch: BFF는 `fetch`/서버 유틸, 클라이언트는 `axios` 기반 `apiClient` + React Query
- API Client: `@hey-api/openapi-ts` 생성 클라이언트는 `apps/web/src/generated/api`에 위치하며 직접 수정하지 않는다.
- Validation/Test: zod, Vitest, Playwright, Storybook/Chromatic

## 레이어 구조

- 루트는 npm workspaces 모노레포다.
- `apps/web`: 사용자용 Next.js 앱. 루트 npm scripts는 기본적으로 `@saju/web` workspace로 위임된다.
- `apps/admin`: 관리자 앱 workspace. 사용자용 앱과 코드 경계를 섞지 않는다.
- `apps/docs`: Docusaurus 문서 사이트 workspace. 서비스 앱 구현과 문서 사이트 작업을 분리한다.
- `apps/web/src/app`: App Router 라우트 엔트리, route group, API BFF, SEO 메타, sitemap/robots 정의
- `apps/web/src/widgets`: 페이지 단위 조합 블록. `app` page는 가능한 한 widget 조립과 라우팅 결정에 집중한다.
- `apps/web/src/features`: 사용자 인터랙션 단위 기능. 현재 관례는 `hooks`, `model`, `ui`, 필요 시 `type`, `form`, `step` 하위 구조다.
- `apps/web/src/entities`: 도메인별 API 호출과 타입/서버 유틸. 현재 관례는 `client`, `server`, `model` 하위 구조다.
- `apps/web/src/domain`: 여러 feature/widget에서 쓰는 도메인 UI와 룩업 데이터. 도메인 없는 공용 요소는 `shared`나 패키지로 올린다.
- `apps/web/src/shared`: 공용 API 응답 포맷, 설정, UI, 유틸, hooks, test helper, app-infra provider
- `apps/web/src/generated/api`: OpenAPI 생성물. 직접 수정하지 않는다.
- `packages/design-tokens`: 도메인 없는 디자인 토큰과 `tokens.css`
- `packages/ui`: 도메인 없는 무상태 UI primitive와 Storybook stories. 앱 레이어(`app`, `widgets`, `features`, `entities`)를 import하지 않는다.

## 주요 라우트

- `/`: HOME
- `/home`: 홈 화면
- `/login`: 카카오/이메일 로그인 진입
- `/verify`: 인증 확인 화면
- `/auth/restore`: 계정 복구 화면
- `/saju`: 사주 입력 흐름
- `/saju/result`: 사주 결과 조회
- `/compatibility`: 궁합 결과와 결제 유도
- `/community`: 커뮤니티 참여/관심사 흐름
- `/food`: 음식 추천
- `/location`: 위치 추천과 지도
- `/taro`: 타로 준비 화면
- `/mypage`: 사용자 정보와 관리 화면
- `/mypage/account`: 계정 관리
- `/mypage/saju-manage`: 내 사주 기본 정보 조회/수정
- `/mypage/jeongtongsaju`: 정통사주/운세 묶음 화면
- `/mypage/traditional-fortune`: 정통사주 상세 조회
- `/mypage/year-fortune`: 신년운세 상세 조회
- `/mypage/personality`: 성향/성격 결과 조회
- `/mypage/zodiac-compatibility`: 띠 궁합 조회와 파트너 매핑
- `/blog`: 블로그 목록
- `/blog/*`: 사주/띠/운세 SEO 콘텐츠
- `/contact`: 문의
- `/privacy-policy`: 개인정보처리방침
- `/terms-of-service`: 이용약관
- `/error`: 공통 오류 화면

## API BFF 경계

- 브라우저에서 백엔드를 직접 호출하기보다 `apps/web/src/app/api/**/route.ts` BFF를 우선 통과한다.
- 인증 쿠키 처리, refresh, Turnstile 검증, cross-origin 방어, 백엔드 응답 파싱은 `apps/web/src/shared/api`의 공용 유틸을 우선 사용한다.
- 인증이 필요한 서버 호출은 `entities/*/server` 또는 `shared/api/auth` 유틸을 통해 쿠키 기반 흐름을 보존한다.
- 클라이언트 컴포넌트의 일반 API 호출은 `apps/web/src/shared/api/base.ts`의 `apiClient`와 feature hook을 통해 감싼다.
- API 응답 가공을 UI 컴포넌트에서 직접 처리하지 않는다. `entities/*/client|server|model` 또는 feature hook/model에서 정규화한다.

## 작업 원칙

- 전체 구조 질문, 리팩터링, 신규 기능 설계 요청일 때만 이 문서를 읽는다.
- 이후 실제 수정 대상 도메인의 reference를 1개만 추가로 읽는다.
- page 파일은 라우트 메타데이터, 서버 리다이렉트, widget 조립에 집중한다.
- feature 내부의 상태 관리, 파생 계산, 제출/조회 행위는 우선 `hooks/` 또는 `model/`로 분리한다.
- `ui`, `form`, `step` 컴포넌트는 props 기반 렌더링에 집중한다.
- `useQuery`/`useMutation`은 page나 저수준 UI에 직접 흩뿌리지 말고 feature hook으로 감싼다.
- React Query provider는 `apps/web/src/shared/app-infra/query-provider`에 있으며, 로그인 상태 변화는 `authScope`로 캐시 범위를 분리한다.
- 여러 도메인에서 재사용되는 포맷팅, 파싱, 변환, 가드 함수는 `apps/web/src/shared/utils` 또는 `apps/web/src/shared/lib` 배치를 검토한다.
- 전역 재사용 가능성이 애매하면 `shared`로 올리기 전에 사용자에게 확인한다.
- 패키지로 올릴 대상은 앱 경계(`features`, `entities`, `widgets`, `app`)를 import하지 않아야 한다.
- `apps/web/src/generated/api` 아래 생성 파일은 직접 수정하지 않는다.
- 루트 스크립트를 사용할 때는 `npm run lint`, `npm run typecheck`, `npm run test:unit`처럼 workspace 위임 스크립트를 우선 사용한다.
