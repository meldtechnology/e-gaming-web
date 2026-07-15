# ESGC E‑Gaming Platform — Enterprise Refactor Task List

## Overview

- **Source Plan:** `prompts/v1/plan.md`
- **Generated On:** 2026-07-01
- **Methodology:** Phased (mirrors plan Phases 0–5) + cross‑cutting hardening/QA/release/ops/docs phases
- **Granularity:** detailed
- **Target stack:** Vite + React **19** + TypeScript (incremental) + MUI **v7** + Tailwind v3 + Vitest/RTL/MSW
- **Global invariants (acceptance gate on EVERY task):**
  - Never change any hex color value, font, layout proportion, URL, or user flow.
  - `src/styles/tailwind.css` `:root` raw palette is the single source of truth; add semantic/dark tokens *around* it, never edit hex literals.
  - Each module phase is independently deployable; `build/` output path stays valid for Docker/CI.
  - Visual parity in **both light and dark** is a gate; any pixel delta must be an intentional, logged polish item.
- **Marker legend:** `[ ]` = not started, `[*]` = complete.

---

# Phase 1 – Discovery and Analysis

1. [*] Confirm the current baseline builds and runs on CRA+Craco (`npm start`, `npm run build`) and capture a reference screenshot set of every route in **both light and dark** for later parity diffing. (Plan: Verification strategy)
2. [*] Inventory all `process.env.REACT_APP_*` references (~49 files) and produce a `REACT_APP_* → VITE_*` rename map. (Plan: Phase 0.1, Trap 5)
3. [*] Locate **`PaymentInvoice`** (referenced in plan as 336 lines but not found under `src/ui-components/`); record its true path and line count, or mark it obsolete. (Delta from exploration; Plan: Phase 4)
4. [*] Catalog the ~73 files using the `hidden`‑class ternary and the oversized components (`FileForm` 375, `AddUserForm` 319, `Selector` 304, `EditUserForm` 279, + verified `PaymentInvoice`); tag each to its owning module (4a–4e / Phase 5). (Plan: Phase 4.3, Trap 3)
5. [*] Grep all encrypted‑id URLs (e.g. `F_322f9837`) and nav/URL builders across `src/`; produce an old‑id → new‑readable‑path redirect map. (Plan: Phase 2)
6. [*] Audit third‑party dependencies for **React 19** compatibility and record required actions per package: `@mui/material`/`@mui/lab`/`@mui/utils`/`@mui/x-date-pickers` (→ v7), `@material-ui/core` v4 (remove), `@material-tailwind/react`, `@headlessui/react`, `react-helmet`, `react-slick`/`slick-carousel`, `aos`, `jarallax`, `react-visibility-sensor`, `react-countup`, `react-datepicker`, `react-router-dom`, `swr`, `formik`, `@testing-library/*`, `uuidv4`, `n-krypta`. Deliverable: compatibility matrix with target versions & risks. (Plan: React 19 consideration; Trap 7)
7. [*] Identify screens that resolve utilities via the **Tailwind CDN JIT** at runtime (vs compiled `tailwind.css`) and list dynamically‑composed class families needing a `safelist` (e.g. `Button variants[variant]?.[color]`). (Plan: Phase 0.1, Trap 1)
8. [*] Document assumptions, constraints, and the per‑phase visual‑parity acceptance procedure; confirm the invariants list with stakeholders.

---

# Phase 2 – Architecture and Design

1. [*] Design the **Vite project layout**: root `index.html`, `vite.config.ts` (`plugins: [react(), tsconfigPaths()]`, `build.outDir: 'build'`), module entry `/src/index.js`. (Plan: Phase 0.1)
2. [*] Design the **incremental TypeScript strategy**: `tsconfig.json` (`allowJs`, `checkJs:false`, `strict:false` initially, `jsx:"react-jsx"`, `noEmit`, `paths` mirroring `baseUrl:./src`), leaf‑first conversion order, per‑directory `strict` tightening. (Plan: Phase 0.2)
3. [*] Design the typed **API envelope** `ApiResponse<T> = { data?: T; error?: … }` and the normalized error shape for `useApi`. (Plan: Phase 0.2, 3.1)
4. [*] Design the **semantic token layer**: new semantic CSS vars (`--color-surface`, `--color-text-primary`, `--color-brand`, `--color-border`, `--color-muted`…) each referencing existing raw vars, defined twice (light in `:root`, dark in `.dark`); map into `tailwind.config.js` alongside the raw scale. (Plan: Phase 1.1, 1.2)
5. [*] Design the **unified light/dark theme mechanism**: `darkMode:"class"` toggle on `<html>`, `src/theme/ThemeProvider.tsx` owning mode state (persisted via `secureLocalStorage`) and feeding `mode` into MUI's `ThemeProvider` via `src/mui/theme` `getTheme` — mode sync only, never color reconciliation. (Plan: Phase 1.2)
6. [*] Design the **primitives API** (`src/ui-components/primitives/`): `Button`, `Input`, `Card`, `Table`, `Modal`, `Badge/Tag`, `Tabs`, `Pagination`, `EmptyState`, `Skeleton`, `Loader` — typed props, keyboard/ARIA, CSS transitions, exact current class strings preserved. Decide React 19 **ref‑as‑prop vs `forwardRef`** convention. (Plan: Phase 1.4; React 19)
7. [*] Design the **nested router tree**: `/app` → `<SecuredRoute><AppLayout/></SecuredRoute>` with `AppLayout` rendering `<LeftSidebar/>` + `<Outlet/>`; map every `PagesRoute` switch case to a real child route + `<Navigate>` redirects from old encrypted ids. (Plan: Phase 2)
8. [*] Design the **boolean authorization** contract: `checkPermission` returns `boolean`; sidebar conditional‑renders links; route guards redirect unauthorized deep‑links. (Plan: Phase 2, 3.3, Trap 3)
9. [*] Design cross‑cutting hooks: `useApi.ts` (SWR + `headerConfig` + `useAuthenticateCheck`, `onErrorRetry`, dedup) and `useAppForm.ts` + `<AppFormField>` (Formik+Yup over existing `createSchema`/`createInitialValues`/`updateFormValues`). (Plan: Phase 3.1, 3.2)
10. [*] Design the **MUI v4→v7 migration & ownership boundary**: Tailwind+primitives own `/app/*`; MUI v7 owns public marketing, date pickers, chips, OAuth. Record v5→v7 breaking‑change checklist (Grid v2, styling engine, removed APIs). (Plan: Phase 1.3; MUI v7 decision)
11. [*] Design `src/services/license/validity.ts` typed date‑math contract; prefer server validity/status, client math as display fallback only. (Plan: Phase 3.4)

---

# Phase 3 – Data and Infrastructure (Foundation: Phase 0)

## 3.1 Vite migration
1. [*] Add `vite`, `@vitejs/plugin-react`, `vite-tsconfig-paths`; remove `react-scripts` & `@craco/craco`; delete `craco.config.js`. (Plan: Phase 0.1)
2. [*] Move `public/index.html` → root `index.html`; rewrite all `%PUBLIC_URL%/…` → `/…`; add `<script type="module" src="/src/index.js">`. (Plan: Phase 0.1, Trap 2)
3. [*] Author `vite.config.ts` with `plugins:[react(), tsconfigPaths()]` and `build.outDir:'build'`; keep `postcss.config.js` and `tailwind.config.js` unchanged (no `var(--...)` edits). (Plan: Phase 0.1)
4. [*] Pre‑removal audit of the **Tailwind CDN** link: build with CDN removed, visually audit every module in both themes, add a Tailwind `safelist` for dynamically‑composed class families, then remove `cdn.tailwindcss.com`. Keep `flatpickr` CDN CSS until Phase 5. **Acceptance:** zero pixel delta vs baseline. (Plan: Phase 0.1, Trap 1)
5. [*] Rename all `REACT_APP_*` → `VITE_*` in `.env`; flip all code refs to `import.meta.env.VITE_*`; centralize in typed `src/config/env.ts`. (Plan: Phase 0.1, Trap 5)
6. [*] Replace npm scripts with `dev`/`build`/`preview`/`test`/`typecheck`/`lint`. (Plan: Phase 0.1)
7. [*] Verify Vite copies the local Inter TTF asset; keep `src/styles/font.css` `@font-face` untouched. (Plan: Things that shift pixels)

## 3.2 React 19 upgrade (folded into foundation)
8. [*] Upgrade `react` & `react-dom` to **19.x**; confirm `createRoot` entry (not legacy `ReactDOM.render`); align `@types/react`/`@types/react-dom` to v19. (Plan: React 19)
9. [*] Apply React 19 codemods / manual fixes: remove `defaultProps` on function components (migrate to default params), migrate `forwardRef` usages to ref‑as‑prop where adopted, address string‑ref/legacy‑context and `react-dom/test-utils` `act` moves. (Plan: React 19)
10. [*] Resolve React 19 peer‑dep breakages per the Phase 1 compatibility matrix (upgrade/replace/override each flagged package); confirm no `--legacy-peer-deps` needed after MUI v7 consolidation. (Plan: React 19, Trap 7)
11. [*] Verify React 19 StrictMode double‑invoke behavior does not break effects/data fetching in dev. (Plan: React 19)

## 3.3 Incremental TypeScript
12. [*] Convert `jsconfig.json` → `tsconfig.json` per the Phase 2 design. (Plan: Phase 0.2)
13. [*] Convert leaf utilities to TS first: `formatAmount`, `datePartExtraxt`, `unitTens`, `secureLocalStorage`. (Plan: Phase 0.2)
14. [*] Convert `src/core/ApiAdapter/*` (GetCall/PostCall/PutCall/DeleteCall/PostFormCall/index) + `HttpClientConnector` to TS with the typed `ApiResponse<T>` envelope. (Plan: Phase 0.2)
15. [*] **Remove all `console.clear()` calls** from `HttpClientConnector.js` (9 occurrences) and add typed error normalization. (Plan: Phase 3.1, Trap 4)

## 3.4 Data & form abstractions (Phase 3 of plan)
16. [*] Implement `src/core/data/useApi.ts` returning `{ data, isLoading, isError, error, isEmpty, mutate }` with retry/dedup/normalized errors. (Plan: Phase 3.1)
17. [*] Re‑implement `GetUsersService`/`GetDocumentService`/`GetPaymentService` on `useApi`, preserving signatures. (Plan: Phase 3.1)
18. [*] Implement `src/ui-components/form/useAppForm.ts` + `<AppFormField>` over existing `createSchema`/`createInitialValues`/`updateFormValues`. (Plan: Phase 3.2)
19. [*] Implement `src/services/license/validity.ts` (typed, unit‑tested) and route `LicenseDetails`/`LicenseTemplate` to it (server validity preferred). (Plan: Phase 3.4)

---

# Phase 4 – Design System, Routing & Module Implementation

## 4.1 Design‑system foundation (plan Phase 1)
1. [*] Add the semantic token layer to `src/styles/tailwind.css` (light `:root` + `.dark`) and map semantic names into `tailwind.config.js` alongside the raw scale; verify each resolves to the identical raw hex. (Plan: Phase 1.1)
2. [*] Implement `src/theme/ThemeProvider.tsx` (mode state, `secureLocalStorage` persistence, `<html>` class toggle, MUI mode feed) and wrap `App.js`. (Plan: Phase 1.2)
3. [*] Consolidate MUI to **v7**: replace the 3 `@material-ui/core` v4 imports with `@mui/material`; upgrade `@mui/material`/`@mui/lab`/`@mui/utils`/`@mui/x-date-pickers` to v7; apply v5→v7 breaking‑change fixes; remove v4 from `package.json`. **Acceptance:** each swapped element diffed against prior render in both themes. (Plan: Phase 1.3; MUI v7)
4. [*] Build the primitives layer in `src/ui-components/primitives/` (`Button`, `Input`, `Card`, `Table`, `Modal`, `Badge/Tag`, `Tabs`, `Pagination`, `EmptyState`, `Skeleton`, `Loader`) preserving exact class strings; `Pagination` centrally fixes bound‑disable; `Table` backs `Datatable/*`. (Plan: Phase 1.4)

## 4.2 Routing refactor (plan Phase 2)
5. [*] Replace the 18 `<AppLayout/>` clones in `ProtectedRoutes.js` with the nested route tree; `AppLayout` renders `<LeftSidebar/>` + `<Outlet/>`. (Plan: Phase 2)
6. [*] Add readable child paths for encrypted‑id screens + `<Navigate>` redirects from old ids; update all nav/URL builders per the Phase 1 map. (Plan: Phase 2)
7. [*] Delete `src/layout/PagesRoute/index.jsx` and the pathname‑substring logic in `AppLayout/index.js`; make `SecuredRoute` a real auth guard + `<Outlet/>`. (Plan: Phase 2)
8. [*] Refactor `checkPermission` to return **boolean**; convert sidebar link visibility from the `'hidden'` class to conditional render; add route‑guard redirects for unauthorized deep‑links. (Plan: Phase 2, Trap 3)

## 4.3 Per‑module modernization (plan Phase 4 — repeatable checklist)
> For each module below apply the 10‑point checklist: (1) `.jsx`→`.tsx` + typed props/data; (2) swap to `useApi` hook; (3) decompose oversized components to <~150 lines; (4) `hidden`‑ternary → conditional render; (5) add Skeleton/EmptyState/error states; (6) fix pagination via `Pagination` primitive (`size=10`); (7) swap to primitives; (8) inline styles/hardcoded hex → semantic token classes, replace fixed `h-[700px]` with responsive/flex; (9) a11y + responsive `sm/md/lg`; (10) tests (hook MSW, render + empty/error/loading, key interaction).

9. [*] **Module 4a – Dashboard:** `pages/Dashboard`, `Header` cards, `DashBoardReport/*` (chart.js) — full checklist. (Plan: Phase 4a)
10. [*] **Module 4b – Users:** `pages/Users/*`, `UsersList`, `AddUserForm` (319), `EditUserForm` (279), `UserProfile` — full checklist; validates `useAppForm`. (Plan: Phase 4b)
11. [*] **Module 4c – Applications:** `pages/Documents`, `ApplicationList`, `DocumentReviewForm`, `FileForm` (375) — full checklist. (Plan: Phase 4c)
12. [*] **Module 4d – Licenses:** `pages/Documents/License/*`, `LicenseForm`, `LicenseTemplate`, `QRCodeMaker`, `html2pdf.js` — full checklist; depends on `validity.ts`; **verify QR + PDF output byte/visual‑unchanged**. (Plan: Phase 4d)
13. [*] **Module 4e – Reports:** `pages/report`, `ReportApplication`, `ReportPayment`, `ReportNavBar` — full checklist. (Plan: Phase 4e)

## 4.4 Public / Apply funnel (plan Phase 5)
14. [*] Modernize `pages/public/Application/*` (General → Operators → Form → Verification → Invoice) + OAuth pages with the checklist using **MUI v7 primitives**; migrate `flatpickr` CDN CSS → npm import; preserve the 5‑step redirect flow and `/apply/...` URLs exactly. (Plan: Phase 5)

---

# Phase 5 – Frontend Implementation (cross‑cutting UI hardening)

1. [*] Apply the accessibility baseline: focus‑visible in primitives, skip‑link in `AppLayout`, landmark roles, correct focus order. (Plan: Phase 3.3)
2. [*] Sweep remaining `hidden`‑ternary occurrences (~73 files) to conditional render module‑by‑module; fix any collapsed flex `gap`/`space-y` after element removal. (Plan: Phase 3.3, Things that shift pixels)
3. [*] Replace remaining ad‑hoc buttons/inputs/tables/modals across screens with primitives (identical look). (Plan: Phase 4.7)
4. [*] Responsive verification of all touched screens at `sm/md/lg`. (Plan: Phase 4.9)

---

# Phase 6 – Security and Hardening

1. [*] Verify the OAuth2 5‑step redirect flow is unchanged end‑to‑end after routing refactor; guard all `/app/*` routes with real auth checks. (Plan: Phase 2, Verification)
2. [*] Enforce authorization at the route‑guard layer (not CSS): unauthorized deep‑links redirect, not merely hide. (Plan: Phase 2, 3.3)
3. [*] Confirm no secrets leak via `VITE_*` client env vars (only public config exposed); document which vars are build‑time public. (Plan: Phase 0.1)
4. [*] Confirm `console.clear()` removal did not remove intended error logging; ensure normalized errors are logged safely (no PII/token leakage). (Plan: Phase 3.1)
5. [*] Validate form inputs via Yup schemas through `useAppForm` on all migrated forms. (Plan: Phase 3.2)
6. [*] Review `secureLocalStorage`/`n-krypta` usage for theme + auth persistence under React 19/Vite. (Plan: Phase 1.2)

---

# Phase 7 – Testing and Quality Assurance

1. [*] Set up **Vitest + RTL + `@testing-library/jest-dom` + MSW**; `vitest.config.ts` (`jsdom`, `setupFiles: src/setupTests.js`); upgrade `@testing-library/react` to **v16** and `user-event` for React 19. (Plan: Phase 0.3; React 19)
2. [*] Configure **flat ESLint** (`@typescript-eslint`, `react`, `react-hooks`, `jsx-a11y`, `import`) + `.prettierrc` matching current dominant style. (Plan: Phase 0.3)
3. [*] Seed a render smoke test per top‑level route + unit tests for converted leaf utilities. (Plan: Phase 0.3)
4. [*] Unit‑test `useApi` (MSW), `useAppForm`, and `validity.ts` (edge dates, timezones). (Plan: Phase 3 Verify)
5. [*] Add a scratch route rendering each primitive in both themes, diffed against current components. (Plan: Phase 1 Verify)
6. [*] Add route‑level RTL tests: every old URL (incl. encrypted ids) resolves to the same screen; gated nav hides via non‑render; gated deep‑links redirect; back/forward works. (Plan: Phase 2 Verify)
7. [*] Per module (4a–4e, Phase 5): hook tests (MSW) + render/empty/error/loading + key‑interaction tests; grow coverage per module. (Plan: Phase 4.10)
8. [*] **Visual parity gate per phase:** manual click‑through of affected screens in **both light and dark** vs the previous deploy; log any intentional polish deltas. (Plan: Verification 5–6)
9. [*] Verify pagination disables at bounds everywhere (`size=10`). (Plan: Phase 4.6)
10. [*] Verify License QR code + `html2pdf.js` output is unchanged. (Plan: Phase 4d)
11. [*] Verify `npm run typecheck` passes and tighten `strict` per fully‑typed directory. (Plan: Verification 1)

---

# Phase 8 – Deployment and Release

1. [*] Add `ci.yml` (PR trigger): `install → typecheck → lint → test → build`, with `jsx-a11y` as a CI gate. (Plan: Phase 0.3)
2. [*] Update `.github/workflows/deploy.yml` and `prod-deploy.yml` for Vite output (`build/`) and `VITE_*` env names. (Plan: Phase 0.1, 0.3)
3. [*] Update `Dockerfile` for the `VITE_*` build args/env and confirm it still emits to `build/`. (Plan: Phase 0.1)
4. [*] Pin PostCSS/autoprefixer versions and diff computed styles to prevent drift under Vite. (Plan: Things that shift pixels)
5. [*] Ship phases incrementally: after Phases 0–3 (foundation) the app builds on Vite+React 19+TS; release each module (4a→4e→Public) independently behind the visual‑parity gate. (Plan: Ordering & Dependencies)
6. [*] Produce a rollback plan per module deploy (previous build artifact + revert path). (Plan: Ship continuously invariant)

---

# Phase 9 – Monitoring and Operations

1. [*] Confirm `web-vitals` reporting still functions post‑migration; wire basic performance logging. (Plan: baseline dep)
2. [*] Add error‑boundary/observability for the normalized `useApi` error path (surface, don't swallow). (Plan: Phase 3.1)
3. [*] Post‑deploy verification checklist per module: preserved URLs, permission gating, pagination bounds, PDF/QR output, full OAuth + apply funnel in both themes. (Plan: Verification 5)
4. [*] Monitor bundle size / build output between CRA and Vite baselines; flag regressions. (Plan: Phase 0.1)

---

# Phase 10 – Documentation and Knowledge Transfer

1. [*] Document the semantic token + light/dark theming model (raw palette vs semantic layer; how to add a token). (Plan: Phase 1.1–1.2)
2. [*] Document the primitives library API and the Tailwind‑vs‑MUI ownership boundary. (Plan: Phase 1.3–1.4)
3. [*] Document the new routing map incl. old‑encrypted‑id → new‑path redirects. (Plan: Phase 2)
4. [*] Document `useApi` and `useAppForm` usage patterns for future modules. (Plan: Phase 3.1–3.2)
5. [*] Document the React 19 + MUI v7 upgrade (breaking changes handled, peer‑dep matrix, remaining tech debt). (Plan: React 19; MUI v7)
6. [*] Document the per‑phase visual‑parity verification procedure and the invariants contract for future contributors. (Plan: Verification strategy)
7. [*] Update `README`/developer onboarding for the Vite scripts (`dev`/`build`/`preview`/`test`/`typecheck`/`lint`). (Plan: Phase 0.1)

---

## Dependency ordering (from plan)

```
Phase 3 (Foundation: Vite+React19+TS+CI)
  └─► Phase 4.1 (tokens+theme+primitives+MUI v7)
        └─► Phase 4.2 (routing)
              └─► Phase 3.4 data/form/a11y/date  (must precede all modules)
                    └─► 4a Dashboard ► 4b Users ► 4c Applications ► 4d Licenses ► 4e Reports ► 4.4 Public/Apply
```
Phases 6–10 run continuously as gates/outputs across the above.
