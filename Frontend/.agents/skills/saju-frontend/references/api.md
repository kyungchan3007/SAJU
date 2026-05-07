# API 및 OpenAPI 참고

## BFF 경계

- 프론트 라우트 API는 `src/app/api/**/route.ts`에 둔다.
- 백엔드 직접 호출, 쿠키 브리지, 인증 리다이렉트는 BFF 경계를 먼저 확인한다.
- 클라이언트 UI에서 백엔드 서버 전용 환경변수나 secret을 직접 사용하지 않는다.

## 현재 주요 API 흐름

- `GET/POST /api/saju`: 사주 입력/조회 관련 BFF
- `GET/POST /api/compatibility`: 궁합 preview/lock 흐름
- `GET/POST /api/location`: 지도/추천 흐름
- `POST /api/payment/verify`: 결제 검증 흐름
- `GET /api/auth/kakao`: 백엔드 카카오 인증 시작점으로 프록시
- `GET /api/auth/kakao/callback`: code 교환 후 토큰 쿠키 저장
- `GET/POST /api/auth/[...nextauth]`: NextAuth 핸들러

## OpenAPI 규칙

- `openapi/openapi.yaml`은 백엔드에서 내려받은 OpenAPI 스펙 보관 위치다.
- `src/generated/api` 아래 생성 파일은 직접 수정하지 않는다.
- 생성 클라이언트가 필요하면 `openapi-ts.config.ts` 기준으로 재생성한다.
- 로컬 생성 명령은 `npx @hey-api/openapi-ts -c openapi-ts.config.ts`다.
- 생성 결과 예시는 `sdk.gen.ts`, `zod.gen.ts`, `types.gen.ts`다.

## 작업 체크

- 새 API 연동 전 기존 BFF가 있는지 먼저 확인한다.
- 인증이 필요한 API는 `saju_access_token` 쿠키 처리와 로그인 리다이렉트 영향을 확인한다.
- React Query 훅은 해당 feature 하위 `hooks/`에 둔다.
- API 응답 변환은 UI 컴포넌트보다 feature/entity model 쪽에 둔다.
