---
name: saju-frontend-ref-api
description: BFF 경계 규칙, 서버 호출 구조, 현재 API 엔드포인트 목록, OpenAPI 재생성 방법
---

# API 및 OpenAPI 참고

## BFF 경계

- 프론트 라우트 API는 `apps/web/src/app/api/**/route.ts`에 둔다.
- 백엔드 직접 호출, 쿠키 브리지, 인증 리다이렉트는 BFF 경계를 먼저 확인한다.
- 클라이언트 UI에서 백엔드 서버 전용 환경변수나 secret을 직접 사용하지 않는다.

## 서버 호출 구조

- 인증이 필요한 백엔드 호출은 `authenticatedBackendFetch`를 우선 사용한다.
- 토큰 쿠키 키는 하드코딩 문자열 대신 `apps/web/src/shared/config/authToken.ts` 상수를 사용한다.
- 백엔드 응답 파싱/에러 메시지 매핑은 `parseBackendApiResponse`로 통일한다.
- 생성형 풀이 응답처럼 `PENDING/COMPLETE` 상태 보존이 필요하면 `parseGeneratedInterpretationResponse`를 사용해 `meta.backendStatus`를 유지한다.
- `route.ts`는 HTTP 입출력과 쿠키 처리에 집중하고, 비즈니스 로직은 `entities/*/server` 등 서버 함수로 위임한다.
- 로그인/토큰 교환 경로(`auth/kakao`, `auth/kakao/callback`, refresh)는 예외적으로 인증 래퍼 없이 동작할 수 있다.
- 쿠키 인증을 사용하는 상태 변경 BFF 요청은 `rejectCrossOriginRequest`로 브라우저 Origin을 검증한다.

## 현재 API 엔드포인트

- `GET/POST /api/saju`
- `POST /api/saju/draft`
- `POST /api/saju/result`
- `GET /api/saju/traditional`
- `GET /api/saju/me/year`
- `GET /api/saju/me/compatibility/[partnerId]`
- `GET/POST /api/partners`
- `GET/PUT/DELETE /api/partners/[partnerId]`
- `GET/POST /api/compatibility`
- `GET/POST /api/location`
- `POST /api/payment/verify`
- `GET/DELETE /api/users/me`
- `GET /api/auth/kakao`
- `GET /api/auth/kakao/callback`
- `POST /api/auth/logout`

## OpenAPI 규칙

- `apps/web/openapi/openapi.yaml`은 백엔드에서 내려받은 OpenAPI 스펙 보관 위치다.
- `apps/web/src/generated/api` 아래 생성 파일은 직접 수정하지 않는다.
- 생성 클라이언트가 필요하면 `apps/web/openapi-ts.config.ts` 기준으로 재생성한다.
- 로컬 생성 명령은 `npm run openapi-ts` 또는 `npm run openapi-ts -w @saju/web`이다.
- 생성 결과 예시는 `sdk.gen.ts`, `zod.gen.ts`, `types.gen.ts`다.

## 작업 체크

- 새 API 연동 전 기존 BFF가 있는지 먼저 확인한다.
- 새 API 연동 시 `apps/web/src/generated/api`의 타입/SDK를 먼저 확인하고, 생성 파일은 직접 수정하지 않는다.
- 인증이 필요한 API는 access/refresh 쿠키 처리와 로그인 리다이렉트 영향을 확인한다.
- React Query 훅은 해당 feature 하위 `hooks/`에 둔다.
- API 응답 변환은 UI 컴포넌트보다 feature/entity model 쪽에 둔다.
- 파트너 CRUD는 `/api/partners` BFF를 통하고, 목록 캐시는 `PARTNERS_QUERY_KEY` 기준으로 무효화한다.
