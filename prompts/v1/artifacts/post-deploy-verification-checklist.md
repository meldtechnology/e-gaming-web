# Post-Deploy Verification Checklist

Date: 2026-07-01

Run this checklist after each module deploy and after any rollback.

## Global Gates

- Confirm `/sign-in` loads and starts the OAuth login flow.
- Confirm `/app` redirects unauthenticated users to `/sign-in`.
- Confirm the active user sees only authorized sidebar links.
- Confirm unauthorized deep links redirect instead of rendering protected content.
- Confirm light and dark theme rendering on every touched route.
- Confirm no route, hex color, font, layout proportion, or user flow changed unintentionally.
- Confirm browser console has no new runtime exceptions.

## Dashboard

- Route: `/app/dashboard`.
- Verify dashboard metric cards render.
- Verify charts and latest report sections render.
- Verify restricted users see the expected access/welcome fallback.

## Users

- Routes: `/app/users`, `/app/users/_new`, `/app/users/_edit`, `/app/users/profile`.
- Verify user list loading, empty, error, and populated states.
- Verify pagination disables at first/last page and requests `size=10`.
- Verify create/edit/profile navigation.
- Verify user management actions remain permission-gated.

## Applications

- Routes: `/app/applications`, `/app/documents/types`, `/app/documents/files`, `/app/documents/builder`, `/app/documents/attachment`, `/app/documents/reviewer`.
- Verify old encrypted URLs redirect to the readable routes.
- Verify application metrics and status filters.
- Verify application list loading, empty, error, and populated states.
- Verify review/attachment/form-builder entry points.
- Verify pagination bounds and `size=10`.

## Licenses

- Routes: `/app/licenses`, `/app/licenses/form`, `/app/licenses/qr-code`.
- Verify old encrypted URLs redirect to the readable routes.
- Verify issued/approved status switching.
- Verify QR code payload resolves to the public license validation URL plus invoice number.
- Verify `Download License (PDF)` exports `license.pdf` from `#license-id`.
- Verify license validity display uses server status when available.

## Reports

- Routes: `/app/reports`, `/app/reports/applications`, `/app/reports/payments`.
- Verify report navigation links.
- Verify application and payment report forms validate date ranges.
- Verify generated download links render only for authorized users.
- Verify error states are visible and logged safely.

## Public Apply Funnel

- Routes: `/apply`, `/apply/operator/:type`, `/apply/operator/form`, `/apply/operator/verification`, `/apply/payment/invoice`.
- Verify the five-step application flow end to end.
- Verify public file/product selection.
- Verify OTP/identity verification and payment invoice surfaces.
- Verify OAuth callback routes still resolve.

## Monitoring

- Verify `window.__ESGC_WEB_VITALS__` receives web-vitals events when present.
- Verify `window.__ESGC_API_ERROR__` receives sanitized normalized API errors when present.
- Verify `window.__ESGC_RUNTIME_ERROR__` receives runtime render errors when present.
