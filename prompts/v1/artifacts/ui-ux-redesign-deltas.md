# UI/UX Modernization — Intentional Visual Deltas

Per `docs/visual-parity.md`, this records the approved, intentional visual changes made
during the `prompts/v1/ui-ux.md` redesign. **Functionality, routes, flows, permissions,
and integrations are unchanged.** The user explicitly approved: a bold cohesive redesign,
a unified refreshed palette, and a foundation-first delivery.

## Global

- **Palette**: introduced a unified modern palette. The semantic layer in
  `src/styles/tailwind.css` (`--color-*`) was re-pointed from the ad-hoc indigo/green mix to
  a refined royal-blue brand scale (`--brand-50..900`, primary `#2f6bff`), slate neutrals,
  and status soft/solid pairs, with full light + dark values. Raw palette variables are
  retained as fallbacks. MUI theme (`src/mui/theme/*`) aligned to the same palette so
  public (MUI) and admin (Tailwind) surfaces match.
- **Typography**: adopted **Inter** as the app-wide UI font (loaded via `index.html`),
  replacing the `Helvetica` body default (the previous `font.css` referenced a missing file).
- **Elevation/radius**: added `shadow-e1/e2/e3` tokens and standardized rounded corners.
- **Icons**: replaced image-file menu icons with `@heroicons/react` in the sidebar.

## Components / screens changed

| Area | Delta |
|------|-------|
| Primitives | Rebuilt Button/Card/Input/Table/Pagination/Badge/Modal/Tabs/EmptyState/Skeleton on semantic tokens; added `Select`, `Textarea`, `StatusBadge`. Fixed a broken always-visible red error box in `Input`/`AppFormField`. |
| Admin shell | New `LeftSidebar` (SPA `Link` nav, heroicons, active pill, icon-rail on ≤1050px), padded `AppLayout`, refreshed metric cards, shared `PageHeader` + `AccessDenied`. |
| Tables | Unified `TableShell` (removed `bg-[#BCDAF8]` headers), `StatusBadge` for statuses, consistent loading/empty states. |
| Dashboard | Card surfaces + brand-aligned Chart.js palettes (data unchanged). |
| Forms | Modern inputs/labels/errors; rebuilt Add/Edit user forms and User Profile layout. |
| Form Designer | Modernized builder + field previews + presentation renderer (all 14 field types kept). |
| Public shell | Enabled a modern sticky public header (was commented out); redesigned Footer. |
| Sign in | Split-screen brand panel + form card. **Native POST to `LOGIN_URL` and field names preserved.** |
| Apply funnel | Rebuilt as an e-commerce product grid (General + Operators). `publicVisibility` and `selectPermit` flow preserved. |
| Verification / Invoice | Modern alerts/buttons; brand palette. Formik validation, sessionStorage keys, and Remita `externalReference` flow preserved. |
| Reports | Modern report-builder panel + surface nav bar. Blob/`createObjectURL` download + permissions preserved. |
| License | Modernized list/details/form/QR pages. **`LicenseTemplate` certificate + `html2pdf` (`id="license-id"`) + `react-qr-code` value preserved.** |
| Copy | A few empty-state / access-denied / welcome strings were reworded (unit tests updated to match). |

## Validation

`npm run typecheck`, `typecheck:strict`, `lint` (0 errors), `test -- --run` (64/64),
`build`, and `build:check` all pass.

## Known follow-ups (not blocking)

- Some deep MUI-Grid v7 deprecation warnings remain in public pages (pre-existing).
- A few low-traffic admin components still use raw surface colors (`bg-white-a700`) which
  render correctly on the new theme but were not fully re-tokenized.
