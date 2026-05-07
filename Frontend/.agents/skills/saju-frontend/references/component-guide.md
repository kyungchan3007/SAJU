# 컴포넌트 작성 가이드

## 읽는 조건

API 전용 `.ts` 파일을 제외한 `.tsx` 컴포넌트 작업에서 비즈니스 로직, 플로우 로직, 상태 위치를 판단해야 할 때 읽는다.

## 레이어 역할

- `features`: 사용자 행동과 client 흐름을 담당한다. 상태, 검증, 제출, 조회, 게이트 로직은 이 레이어에 둔다.
- `features/*/hooks`: 재사용되거나 복잡한 상태/플로우 로직을 둔다.
- `features/*/ui`: feature 전용 화면 조각을 둔다. 가능하면 props 기반 렌더링에 집중한다.
- `features/*/model`: query key, 상수, 화면 모델, 순수 유틸을 둔다.
- `widgets`: 페이지에서 여러 feature/domain UI를 조합하는 큰 블록을 둔다.
- `domain`: 도메인 고유 UI, 정적 룩업, 결과 카드 같은 표현 중심 컴포넌트를 둔다.
- `entities`: 도메인 타입, 서버/클라이언트 API 유틸, 데이터 경계 코드를 둔다.
- `shared`: 여러 도메인에서 재사용되는 UI, utils, config, infra를 둔다.

## 기본 분리 원칙

- 컴포넌트에서 비즈니스 규칙이 길어지면 hook 또는 model로 옮긴다.
- submit, fetch, cache, redirect, step 이동, validation toast, gate 처리는 반드시 커스텀 훅으로 만들고 `features/*/hooks` 아래에 둔다.
- 컴포넌트 안에서 `useState`, `useEffect`, `useQuery`, router 제어가 비즈니스/플로우를 담당하기 시작하면 즉시 `useFeatureName...` 형태의 커스텀 훅으로 분리한다.
- UI 컴포넌트는 props를 받아 렌더링하고 이벤트를 callback으로 올린다.
- `useQuery`와 `useMutation`은 widget/domain 컴포넌트에 직접 두지 말고 feature 커스텀 훅으로 감싼다.
- API 응답을 화면 데이터로 바꾸는 로직은 UI JSX 안에 직접 넣지 않는다.
- 여러 feature에서 재사용되는 순수 함수만 `shared/utils` 승격을 검토한다.

## 권장 패턴

container 컴포넌트가 커스텀 훅을 호출하고, presentational 컴포넌트에 필요한 값과 이벤트만 넘긴다.

```tsx
export function SajuInputFieldsContainer({ steps }: Props) {
  const form = useSajuInputForm({ steps });

  return (
    <SajuInputFields
      formValues={form.formValues}
      stepStates={form.stepStates}
      onChangeField={form.updateField}
      onSubmitSaju={form.submitSaju}
    />
  );
}
```

presentational 컴포넌트는 렌더링과 얕은 UI 이벤트 처리만 담당한다.

```tsx
export function SajuInputFields({
  formValues,
  onChangeField,
  onSubmitSaju,
}: Props) {
  return (
    <form onSubmit={onSubmitSaju}>
      <input
        value={formValues.birthDate}
        onChange={(event) => onChangeField("birthDate", event.target.value)}
      />
    </form>
  );
}
```

## 피해야 할 패턴

- `widgets/*`에서 직접 API 호출 또는 React Query 정책을 정의한다.
- `domain/*` 정적 UI 컴포넌트가 router, queryClient, mutation을 직접 가진다.
- `.tsx` 컴포넌트 안에 제출, 검증, 조회, 캐시, redirect 흐름을 직접 작성한다.
- UI JSX 안에서 API 응답을 깊게 파싱하거나 비즈니스 규칙을 계산한다.
- 한 컴포넌트가 form state, validation, submit, redirect, layout을 모두 담당한다.
- 단일 화면에서만 쓰는 상태를 성급하게 `shared`로 올린다.

## 파일 배치 판단

- 화면 조립만 한다: `src/app` 또는 `src/widgets`
- 사용자 행동 흐름이 있다: `src/features/<feature>`
- 도메인 카드/정적 표현이다: `src/domain/<domain>`
- API 타입/통신 경계다: `src/entities/<entity>`
- 여러 도메인에서 반복된다: `src/shared`

## 작업 전 체크리스트

- 이 컴포넌트가 렌더링만 하는지, 흐름을 제어하는지 구분한다.
- 커스텀 훅으로 빼야 할 상태/효과/비즈니스 규칙이 있는지 확인한다.
- 데이터 조회가 있다면 feature hook과 query model 위치를 먼저 정한다.
- widget/domain에 API 정책이 새로 들어가지 않는지 확인한다.
- 기존 feature의 `hooks`, `model`, `ui` 패턴을 먼저 따른다.
