# /saju/result 결과 조회 참고

## 읽는 조건

`/saju/result`, `features/saju-result`, `widgets/saju-result`, 결과 조회 API, 결과 캐시 정책을 수정할 때 읽는다.

## 관련 경로

- `src/app/(main)/saju/result`
- `src/features/saju-result`
- `src/widgets/saju-result`
- `src/entities/saju`
- `src/shared/lib/react-query`

## 작업 규칙

- 페이지 파일에는 결과 화면 조립 로직만 둔다.
- 결과 조회, 캐시, 재시도 정책은 `features/saju-result` 쪽에 둔다.
- API 응답 매핑은 feature/entity model 쪽에 둔다.
- `/saju` 입력 폼 상태 로직을 복사하지 않는다.
- 로그인/미로그인 draft 흐름을 바꾸면 `/saju`, `/saju/result`, `/mypage` 영향을 같이 확인한다.

## 체크리스트

- 서버 결과인지 로컬 draft 결과인지 먼저 구분한다.
- React Query cache key가 기존 정책과 맞는지 확인한다.
- 결과 재조회 조건과 stale/cache 정책을 명확히 둔다.
- 오류, 로딩, 빈 상태 UI가 있는지 확인한다.
