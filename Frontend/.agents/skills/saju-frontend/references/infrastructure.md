---
name: saju-frontend-ref-infrastructure
description: Cloudflare Workers/OpenNext 기반 프론트 배포 구조, wrangler 설정, runtime 변수 관리 기준
---

# 프론트 인프라 참고

## 현재 배포 구조

- 프론트 앱은 `apps/web` Next.js App Router 앱이다.
- 배포 런타임은 `@opennextjs/cloudflare` 기반 Cloudflare Workers SSR이다.
- 운영 도메인은 `https://saju-me.com`이다.
- 백엔드 엔드포인트는 `https://api.saju-me.com`이다.
- `api.saju-me.com`는 Cloudflare 뒤의 Nginx HTTPS 종단점이고, 그 뒤에서 백엔드 앱이 HTTP로 동작한다.

## 주요 파일

- `apps/web/open-next.config.ts`: OpenNext Cloudflare 설정 진입점
- `apps/web/wrangler.jsonc`: Worker 이름, custom domain, observability, public runtime vars
- `apps/web/package.json`: `cf:build`, `cf:deploy`, `deploy` 스크립트
- `apps/web/.env.local`: 로컬 개발용 env
- `apps/web/.open-next/**`: OpenNext 빌드 산출물 (직접 수정 금지)

## 배포 명령

```bash
npm run cf:build -w @saju/web
npm run cf:deploy -w @saju/web
npm run deploy -w @saju/web
```

- `cf:build`: `.open-next/worker.js`, assets 산출물 생성
- `cf:deploy`: `wrangler deploy`
- `deploy`: build 후 deploy

## wrangler 설정 원칙

- `wrangler.jsonc`를 배포 source of truth로 본다.
- custom domain, `preview_urls`, observability, public vars는 대시보드에서만 수정하지 말고 `wrangler.jsonc`에도 반영한다.
- 그렇지 않으면 다음 `wrangler deploy` 때 원격 설정이 로컬 설정으로 덮어써질 수 있다.
- `routes`에는 현재 운영 custom domain `saju-me.com`만 유지한다.

## env / secret 책임 분리

- public runtime 값은 `wrangler.jsonc`의 `vars`에 둔다.
- 예:
  - `NEXT_PUBLIC_APP_URL`
  - `NEXT_PUBLIC_APP_NAME`
  - `NEXT_PUBLIC_APP_DES`
- 민감한 값은 Cloudflare Dashboard `Variables and Secrets`에서 secret으로 관리한다.
- 예:
  - `BACKEND_API_BASE_URL`
  - 인증/결제용 secret
- `CLOUDFLARE_API_TOKEN`은 앱 env가 아니라 로컬 셸 또는 GitHub Actions secret에서 관리한다.

## Cloudflare 운영 확인 포인트

- `Workers & Pages > saju-me`
- `Custom Domain`: `saju-me.com`
- `Variables and Secrets`: runtime secret 반영 여부
- `Observability`: 로그 활성화 여부
- `workers.dev` / preview URL은 운영 필수 아님

## SSL/TLS 메모

- `saju-me.com` Worker custom domain 인증서는 Cloudflare가 관리한다.
- `api.saju-me.com`는 Cloudflare와 Nginx 사이 HTTPS가 필요하다.
- 현재 `Full` 모드 기준으로 origin HTTPS가 필요하며, 추후 origin 인증서 검증까지 포함하려면 `Full (strict)` 전환을 검토한다.

## 주의사항

- 대시보드에서 custom domain을 다시 붙였으면 이후 배포 전에 `wrangler.jsonc`와 정합성을 먼저 확인한다.
- `apps/web/.open-next/**`는 생성 결과이므로 수정하지 않는다.
- 백엔드 인프라 자체 변경은 이 문서 범위가 아니라 백엔드/인프라 문서 범위다.
