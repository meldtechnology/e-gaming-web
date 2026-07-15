# Primitives and UI Ownership

The shared primitive layer lives in `src/ui-components/primitives/`.

Exports:
- `Badge`
- `Button`
- `Card`
- `EmptyState`
- `Input`
- `Loader`
- `Modal`
- `Pagination`
- `Skeleton`
- `Table`
- `Tabs`
- `Tag`

Each primitive exports its props type from `src/ui-components/primitives/index.ts`.

## Usage

Import primitives from the barrel:

```tsx
import { Button, EmptyState, Pagination } from "../ui-components/primitives";
```

Use primitives for repeated admin UI controls and states. Keep existing class strings when replacing legacy controls unless a visual change is intentionally approved and logged.

## Ownership Boundary

Tailwind plus primitives own authenticated admin screens under `/app/*`:
- Dashboard
- Users
- Applications/documents
- Licenses
- Reports

MUI owns public and integration-heavy surfaces:
- Public marketing/apply funnel
- OAuth/login pages
- Date pickers
- MUI chips and controls already tied to MUI internals

Do not mix MUI and Tailwind primitives inside the same small control unless there is an existing dependency that makes the boundary unavoidable.

## Pagination

Use the `Pagination` primitive for module tables. It centralizes disabled-at-bounds behavior:
- previous is disabled when `previous` is missing or `<= 0`
- next is disabled when `next` is missing or `<= 0`

Module table requests should use `size=10` unless the screen is not a module table, such as public product browsing or role/type selector lookups.

## Fallback States

Use:
- `Skeleton` for loading placeholders
- `EmptyState` for empty result sets
- existing `MeldAlert` or a local visible error state for errors

Do not swallow API errors. `useApi` reports sanitized errors through the monitoring layer while still returning `isError` and `error` for UI handling.
