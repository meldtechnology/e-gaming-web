# UI Redesign QA, Release, and Reuse Notes

Date: 2026-07-02
Scope: `prompts/v1/tasks-ui.md` Phase 7 task 1 through Phase 10 task 3.

## Verification Summary

Automated checks run:

- `npm test` - passed: 26 test files, 64 tests.
- `npm run typecheck` - passed.
- `npm run build` - passed.
- `npm run lint` - passed with existing warnings only.

Build warnings observed:

- Vite CJS Node API deprecation warning.
- Tailwind `purge`/`content` migration warning.
- Bundle chunk-size warning for large generated chunks.

Lint warnings observed:

- Existing unused-argument / hook-dependency warnings in unrelated files such as `ResizableFrame.js`, `TopNav.js`, `Main.js`, `EmailVerify`, modal components, and report form components.
- No lint errors.

Route availability checked against the running Vite dev server:

- `/apply` -> `200`
- `/apply/operator/Proprietor` -> `200`
- `/apply/operator/verification` -> `200`
- `/apply/payment/invoice` -> `200`
- `/document/license/verification` -> `200`

## Feature QA Notes

### F1 Tables and Pagination

Verified by existing table/list tests and full suite:

- Pagination boundary behavior remains covered by `Pagination.test.tsx`.
- `LicenseList`, `UsersList`, and `ApplicationList` still construct the expected page query strings.
- Page-size state uses the same `size` query parameter and resets page state to 1.
- Loading states expose `role="status"` and render skeleton table rows through `TableShell`.
- `FileDatatable` and `TypeDatatable` now use `TableShell`; legacy hardcoded table colors were removed.

### F2 Apply Page

Verified by code review and route availability:

- `Products.js` and `LatestProducts.js` use the shared `ProductCard`.
- `storeItem('permit', JSON.stringify(selectedPermit))` and navigation to `/apply/operator/verification` are preserved.
- `LatestProducts.js` still fetches through `GetPublicFileService` and filters `publicVisibility === true`.
- Show/sort/favorite are client-side only and do not introduce endpoints.

Production handoff check:

- After deployment, choose any visible permit from `/apply` or `/apply/operator/:operatorType`.
- Confirm local storage key `permit` is populated and the app lands on `/apply/operator/verification`.

### F3 Operator Verification

Verified by code review and route availability:

- Formik field names are unchanged: `regNumber`, `firstname`, `lastname`, `address`.
- `OPERATOR_TYPE`, `bizType` RC/BN logic, `configRegNumber`, `UserVerificationService`, `storeItem('operator', ...)`, and `/apply/operator/form` navigation are unchanged.
- Form presentation now uses shared primitives with labeled controls and inline errors.

### F4 Payment Invoice

Verified by code review and route availability:

- Formik validation is unchanged: email, confirm-email match, phone length 10-14.
- `CreatePublicPayment` payload shape is unchanged.
- `formatAmount()` remains the amount formatter.
- Submit remains hidden when `amountPayable` is zero or undefined.
- `applicationForm` remains the localStorage source.

### F5 License Verification

Verified by full suite and route availability:

- New public route: `/document/license/verification`.
- User input is trimmed before submit.
- The submitted number is URL-encoded with `encodeURIComponent()` before constructing the SWR endpoint.
- Empty/whitespace submit sets local validation and does not set a fetch endpoint.
- `GetLicenseService` now supports a real null SWR key.
- Loading uses `role="status"` and `Skeleton`.
- Result rendering uses `LicenseResultCard`; error/not-found uses `EmptyState` with retry.
- `LicenseDetails` now also uses `LicenseResultCard`.

## Component Contracts

### `TableShell`

Path: `src/ui-components/Datatable/TableShell/index.jsx`

Existing props preserved:

- `columnHeader`
- `children`
- `isEmpty`
- `emptyText`
- `emptyDescription`
- `pageInfo`
- `nextPage`
- `previousPage`
- `refresh`
- `showPagination`

Additive props:

- `loading`
- `skeletonRows`
- `pageSize`
- `pageSizeOptions`
- `onPageSize`
- `onPageChange`
- `totalEntries`
- `currentPageCount`

Exports:

- `TableShell`
- `Row`
- `Td`
- `IconAction`
- `AvatarCell`

### `Pagination`

Path: `src/ui-components/primitives/Pagination.tsx`

Existing props preserved:

- `pageInfo`
- `onNext`
- `onPrevious`
- `onRefresh`
- `refreshLabel`
- `className`

Additive props:

- `onPageChange?: (page: number) => void`
- `onPageSize?: (size: number) => void`
- `pageSize?: number`
- `pageSizeOptions?: number[]`
- `totalEntries?: number`
- `currentPageCount?: number`

Behavior:

- Shows numbered pages from `pageInfo.page` and `pageInfo.totalPages`.
- Marks active page with `aria-current="page"`.
- Shows an optional page-size selector only when `onPageSize` and `pageSize` are provided.
- Shows entry summary when count data is available, otherwise falls back to `Page X of Y`.

### `StatusBadge`

Path: `src/ui-components/primitives/StatusBadge.tsx`

Props:

- `status?: string`
- `fallback?: string`
- `variant?: "soft" | "solid"`
- `className?: string`

Status mappings include:

- `PENDING -> warning`
- `REVIEW -> brand`
- `APPROVE`, `APPROVED`, `ACTIVE`, `VALID`, `PAID`, `COMPLETED -> success`
- `ISSUED -> info`
- `DECLINE`, `DECLINED`, `FAILED`, `EXPIRED -> danger`
- `INACTIVE`, `CANCELED`, `CANCELLED`, `UNKNOWN -> neutral`

### `ProductCard`

Path: `src/pages/public/Application/components/ProductCard/index.jsx`

Props:

- `permit`
- `imageSrc`
- `fallbackImageSrc`
- `title`
- `description`
- `chips`
- `feeLabel`
- `featured`
- `favorite`
- `onFavorite`
- `onApply`
- `onViewDetails`

Behavior:

- Renders accessible favorite toggle with `aria-pressed`.
- Uses real image alt text from the permit title.
- Calls `onApply(permit)` for the primary CTA.

### `LicenseResultCard`

Path: `src/pages/Documents/License/LicenseResultCard/index.jsx`

Props:

- `license`

Expected license fields:

- `fileName`
- `applicant.name`
- `validity`
- `issuedOn`
- `expiresOn`
- `status`, `validityStatus`, or `licenseStatus`

Behavior:

- Uses `getLicenseValidity(license)` for status.
- Uses `formatLicenseDate()` for dates.
- Announces the rendered result with `role="status"` and `aria-live="polite"`.

## New Route and SWR Pattern

Route:

```txt
/document/license/verification
```

Route registration:

```js
{
  path: '/document/license/verification',
  element: <LicenseVerification />
}
```

State-gated lookup pattern:

```jsx
const endpoint = submittedNumber
  ? `${env.DOCUMENTS_LICENSE_NUMBER_URL}${encodeURIComponent(submittedNumber)}`
  : null;

const { license, isLoading, isError, mutate } = GetLicenseService(endpoint);
```

`GetLicenseService` now passes `null` to SWR when `endpoint` is falsy. This prevents requests before submit.

## Monitoring and Operations

Post-release checks:

- Watch browser console and existing API error reporting for table render errors around `TableShell`, `Pagination`, and list wrappers.
- Verify apply handoff in production by confirming `permit` is stored after selecting a card and the user lands on `/apply/operator/verification`.
- Track license verification success/error rates through existing API error reporting for `GetLicenseService` and backend access logs for `DOCUMENTS_LICENSE_NUMBER_URL`.

No new monitoring endpoints, telemetry providers, secrets, or environment variables were introduced.

## Preservation Note

This was a visual/UX redesign with functionality preserved:

- Existing services are reused.
- Existing backend endpoints and payload shapes are unchanged.
- Existing form field names and Formik schemas are preserved.
- Existing navigation targets are preserved, except the intentionally added public route `/document/license/verification`.
- Existing localStorage keys remain unchanged: `permit`, `operator`, and `applicationForm`.
