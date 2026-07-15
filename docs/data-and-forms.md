# Data and Form Patterns

## `useApi`

`src/core/data/useApi.ts` is the standard read hook for GET data. It wraps SWR, applies `headerConfig`, runs authentication checks, normalizes errors, and reports sanitized API errors to the monitoring layer.

Return shape:

```ts
{
  data,
  response,
  isLoading,
  isError,
  error,
  isEmpty,
  mutate,
}
```

Usage:

```tsx
const { data, isLoading, isError, isEmpty, mutate } = useApi<UserResponse>(
  "/v1/users/admin/profiles?page=1&size=10",
);
```

Use `isLoading`, `isError`, and `isEmpty` to render visible UI states. Do not swallow errors. `useApi` reports sanitized errors through `window.__ESGC_API_ERROR__` when a runtime sink is present, but screens still need to render an error state.

Existing service adapters preserve legacy names:
- `GetUsersService` returns `users`
- `GetDocumentService` returns `documents`
- `GetPaymentService` returns `payments`

Prefer new direct `useApi` usage for newly typed code. Keep adapters where changing call sites would add risk.

## `useAppForm`

`src/ui-components/Form/useAppForm.ts` standardizes Formik setup over existing dynamic form helpers:
- `createInitialValues`
- `createSchema`
- `updateForm`

The hook can generate initial values and Yup validation from a form template, or accept explicit `initialValues` and `validationSchema`.

Usage:

```tsx
const formik = useAppForm({
  formTemplate,
  onSubmit: async (values) => {
    const payload = formik.buildTemplatePayload(values);
    await save(payload);
  },
});
```

`buildTemplatePayload()` returns the form template with current values applied. Use it when submitting dynamic application/license forms.

## `AppFormField`

`src/ui-components/Form/AppFormField.tsx` renders accessible `input`, `select`, and `textarea` fields bound to a Formik instance.

It handles:
- `id` / `htmlFor`
- `aria-invalid`
- `aria-describedby`
- touched/error display

Use it for migrated forms when the existing visual contract allows the shared field shell.
