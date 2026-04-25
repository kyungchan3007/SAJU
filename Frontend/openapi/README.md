# OpenAPI 스펙 디렉토리

- 이 폴더는 백엔드에서 CI로 내려받은 `openapi.yaml`을 보관합니다.
- 모노레포 기준으로 GitHub Actions 워크플로우 파일은 `/.github/workflows/update-api-client.yml`에 있습니다.
- 백엔드 OpenAPI 파일(`Backend/**/openapi*.y*ml`, `Backend/**/swagger*.y*ml`)이 `main`에 반영되면 워크플로우가 자동 실행됩니다.
- `src/generated/api` 아래 생성 파일은 직접 수정하지 마세요.
- 생성 시 주요 결과물 예시:
  - `Frontend/src/generated/api/sdk.gen.ts` (`@hey-api/sdk`가 생성한 API 호출 함수)
  - `Frontend/src/generated/api/zod.gen.ts` (`zod` 스키마)
  - `Frontend/src/generated/api/types.gen.ts` (TypeScript 타입)
- `openapi-ts.config.ts`에서 `validator: true`를 사용하므로, 생성된 SDK 함수는 검증 로직과 연결된 형태로 생성됩니다.
- 로컬에서 생성하려면:
  - `openapi/openapi.yaml` 파일을 준비하거나 최신으로 교체합니다.
  - `npx @hey-api/openapi-ts -c openapi-ts.config.ts`를 실행합니다.
