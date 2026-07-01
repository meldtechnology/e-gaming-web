# ESGC E‑Gaming Platform — Enterprise Production‑Grade Refactor

## Context

`egaming-app` is the Enugu State Gaming Commission (ESGC) licensing platform: a React 18.3.1 app bootstrapped with **Create React App + Craco**, written in **JavaScript (JSX)**, no TypeScript. It has an authenticated admin area (`/app/*`: dashboard, users, documents, applications, licenses, reports) behind an OAuth2 5‑step redirect flow, plus a public application funnel (`/apply/...`) and a public license‑lookup page.

The codebase works but carries production‑grade debt: **two coexisting design systems** (Tailwind v3 as primary + MUI v5 *and* legacy `@material-ui/core` v4), a **fragile router** (`PagesRoute` dispatches via `location.pathname.substring(...)` and encrypted ids like `F_322f9837`), **151 `hidden`‑class ternaries** instead of conditional rendering, weak accessibility (~27 aria attributes total), oversized components (`FileForm` 375, `PaymentInvoice` 336, `AddUserForm` 319 lines), inconsistent form validation, no standardized loading/empty/error states, a pagination bug (buttons don't disable at bounds), and client‑side license date math.

**Goal:** a sleek, modern, professional UX/UI and an enterprise‑grade foundation, while **preserving every existing hex color, font, layout proportion, URL, and user flow exactly**. This is a **full platform upgrade** (CRA→Vite, TypeScript, tests, CI) rolled out **incrementally per module**, with a **first‑class unified light/dark theme**.

### Guiding invariants (every phase honors these)
- **Colors never change value.** `src/styles/tailwind.css` `:root` (~95 CSS custom properties) is the single source of truth. We add semantic indirection *around* these vars; we never edit the hex literals.
- **URLs and flows are frozen.** Public funnel, OAuth 5‑step redirect, license lookup `/documents/licenses/:number`, and all `/app/*` screens keep identical paths (old encrypted‑id URLs preserved via redirects).
- **Ship continuously.** After Phases 0–3 the app builds on Vite+TS; each module phase is independently deployable.
- **Visual parity is a gate.** Every phase ends with a manual visual diff of affected screens in **both** light and dark; any pixel delta must be an intentional polish item, never a color/font/proportion change.

---

## Pre‑existing traps to handle explicitly (found during exploration)

1. **`public/index.html` loads the Tailwind CDN JIT script** (`cdn.tailwindcss.com`) *in addition to* compiled `src/styles/tailwind.css`, plus a `flatpickr` CDN CSS. Some utilities may resolve at runtime via CDN, not the local build — a real parity risk under Vite.
2. **`%PUBLIC_URL%` tokens** in `public/index.html` are CRA‑specific → must become root‑absolute `/` paths for Vite.
3. **`checkPermission()`** (`src/services/autorization/checkPermission/`) returns the literal string `'hidden'` (a Tailwind class) applied to nav `className`s — authorization is coupled to CSS visibility. Archetype of the "151 hidden ternaries" a11y problem.
4. **`console.clear()`** is called in `HttpClientConnector.js` on nearly every request — wipes console output; remove during the data‑layer phase.
5. **~49 `process.env.REACT_APP_*` references** (env + code) must flip to `import.meta.env.VITE_*` together in Phase 0.
6. **The admin router is a passthrough:** `ProtectedRoutes.js` registers ~20 routes that all render `<AppLayout/>`, which re‑parses `location.pathname` and dispatches via a switch in `PagesRoute/index.jsx`. Phase 2 target.
7. **Dual MUI** (`@material-ui/core` v4 + `@mui/material` v5) forces `--legacy-peer-deps`; removing v4 lets us drop that flag.

---

## Phase 0 — Foundation & Tooling (CRA+Craco → Vite + TypeScript + tests + CI)

**Goal:** identical‑looking app, now built by Vite, type‑checkable, testable, with CI. Zero visual change.

**0.1 Vite migration**
- Add `vite`, `@vitejs/plugin-react`, `vite-tsconfig-paths`; remove `react-scripts`, `@craco/craco`, delete `craco.config.js`.
- Move `public/index.html` → root `index.html`: rewrite `%PUBLIC_URL%/…` → `/…`; add `<script type="module" src="/src/index.js">`.
- **Tailwind CDN link:** remove it (non‑deterministic). Before removal, build with it gone and visually audit every module in both themes; add a Tailwind `safelist` for any dynamically‑composed class families (e.g. `Button` `variants[variant]?.[color]`) rather than reintroducing the CDN. Keep `flatpickr` CDN CSS until Phase 5.
- Vite auto‑reads `postcss.config.js`; keep `postcss.config.js` and `tailwind.config.js` **unchanged** (do not touch the `var(--...)` color mappings).
- `vite.config.ts`: `plugins: [react(), tsconfigPaths()]`, `build.outDir: 'build'` (keeps Dockerfile/CI paths valid).
- **Env vars:** rename all `REACT_APP_*` → `VITE_*` in `.env`; flip all code refs to `import.meta.env.VITE_*`. Centralize in a typed `src/config/env.ts`. Update `Dockerfile` and `.github/workflows/*` to the `VITE_*` names.
- Scripts become `dev`/`build`/`preview`/`test`/`typecheck`/`lint`.

**0.2 Incremental TypeScript**
- `jsconfig.json` → `tsconfig.json` with `allowJs: true`, `checkJs: false`, `strict: false` (initially), `jsx: "react-jsx"`, `noEmit: true`, `paths` mirroring `baseUrl: ./src`.
- **Leaf‑first rename:** convert pure utilities first (`src/services/formatAmount`, `datePartExtraxt`, `unitTens`, `secureLocalStorage`), then `src/core/ApiAdapter/*` + `HttpClientConnector` (add typed API envelope `ApiResponse<T> = { data?: T; error?: … }`).
- Primitives (Phase 1) authored in `.tsx` from the start; modules convert to `.tsx` as modernized. No big‑bang `strict` flip — tighten per‑directory. Keep `prop-types` on not‑yet‑converted `.jsx`.

**0.3 ESLint / Prettier / testing / CI**
- Flat ESLint config: `@typescript-eslint`, `react`, `react-hooks`, **`jsx-a11y`**, `import`. Set explicit `.prettierrc` matching the current dominant style to avoid churn.
- **Vitest + RTL + `@testing-library/jest-dom` + MSW**; `vitest.config.ts` with `jsdom`, `setupFiles: src/setupTests.js`.
- Seed: a render smoke test per top‑level route + unit tests for converted leaf utilities.
- CI: add `ci.yml` (PR trigger) → `install → typecheck → lint → test → build`. Update existing deploy workflows for Vite output + `VITE_*`.

**Verify:** `npm run build` works; `npm run typecheck` passes; smoke tests green; manual click‑through of every route in light+dark confirms pixel parity (watch CDN‑dependent screens).

---

## Phase 1 — Design‑System Foundation: Tokens + Unified Light/Dark

**Goal:** formalize tokens and wire a real app‑wide theme without changing any hex value.

**1.1 Semantic tokens** — treat `src/styles/tailwind.css` `:root` as the raw palette (unchanged). Add a *new* semantic layer referencing raw vars: `--color-surface: var(--white_a700)`, `--color-text-primary: var(--gray_900_01)`, `--color-brand: var(--indigo_a700)`, `--color-border: var(--gray_300)`, etc. Map these into `tailwind.config.js` under semantic names (`surface`, `border`, `brand`, `muted`) *alongside* the existing raw scale so old classes keep working.

**1.2 Unified light/dark (first‑class)**
- Single mechanism: keep `darkMode: "class"`; toggle `dark` (or `data-theme`) on `<html>`. Define semantic tokens twice — light in `:root`, dark in `.dark` — each pointing at the appropriate raw vars. Instant switching, no color re‑render.
- `src/theme/ThemeProvider.tsx`: holds mode state, persists via `secureLocalStorage`, toggles the `<html>` class, AND feeds `mode` to MUI's `ThemeProvider` (reuse `src/mui/theme` `getTheme`). Wrap `App.js`. This is the missing wiring today.
- **Do not reconcile** MUI palette hexes vs Tailwind raw vars — each keeps its palette (preserve‑every‑hex rule). The provider syncs *mode only*, not colors.

**1.3 Consolidate MUI v4 → v5** — replace `@material-ui/core` imports with `@mui/material` equivalents (mostly mechanical); remove v4 from `package.json`; drop `--legacy-peer-deps`. **Ownership boundary:** Tailwind + primitives own all `/app/*` admin screens; MUI v5 owns public marketing pages, date pickers, chips, OAuth pages. No element mixes both.

**1.4 Primitives layer** — `src/ui-components/primitives/` (`.tsx`) reproducing the *current look* via semantic tokens + polish (focus rings, transitions, elevation) + a11y: `Button` (refactor existing size/variant/shape maps, keep exact class strings), `Input`, `Card`, `Table` (backs `Datatable/*`), `Modal`, `Badge`/`Tag`, `Tabs`, **`Pagination`** (fixes bound‑disable centrally), **`EmptyState`**, **`Skeleton`**, `Loader` (wrap existing). Each: `forwardRef`, typed props, keyboard + ARIA, CSS‑transition motion.

**Verify:** scratch route rendering each primitive in both themes, diffed against current components; app‑wide theme toggle flips every existing screen (MUI via provider, Tailwind via `.dark`).

---

## Phase 2 — Routing Refactor (remove `PagesRoute` + encrypted ids)

**Goal:** real nested React Router routes; identical URLs and behavior.

- Replace the 20 `<AppLayout/>` clones in `ProtectedRoutes.js` with a nested tree: `/app` → `<SecuredRoute><AppLayout/></SecuredRoute>` where `AppLayout` renders `<LeftSidebar/>` + `<Outlet/>` (not `<PagesRoute/>`).
- Map each `PagesRoute` switch case to a real child route; give readable paths to encrypted‑id screens (`documents/files`, `licenses/form`, …) and add `<Navigate>` **redirects from the old encrypted ids** so bookmarks/deep links keep working. **First grep the ids across `src/`** and update any nav/URL builders to the new paths.
- Delete `src/layout/PagesRoute/index.jsx` and the pathname‑substring logic in `AppLayout/index.js`. `SecuredRoute` becomes a real guard (auth check + `<Outlet/>`).
- **Decouple authorization from CSS:** `checkPermission` returns a **boolean**; sidebar renders links via conditional render (not the `'hidden'` class); route guards redirect unauthorized deep‑links. First major strike against the hidden‑ternary/a11y debt.

**Verify:** every old URL (incl. encrypted ids) resolves to the same screen; gated nav hides via non‑render; back/forward works; gated deep‑links redirect. Add route‑level RTL tests.

---

## Phase 3 — Cross‑Cutting Abstractions (build before modules)

**3.1 Data layer** — `src/core/data/useApi.ts` generalizing the SWR + `headerConfig` + `useAuthenticateCheck` pattern into one typed hook: `{ data, isLoading, isError, error, isEmpty, mutate }` with `onErrorRetry`, dedup, normalized errors. Re‑implement `GetUsersService`/`GetDocumentService`/`GetPaymentService` on top, preserving signatures. **Remove `console.clear()`** from `HttpClientConnector.js`; add typed error normalization.

**3.2 Form abstraction** — `src/ui-components/form/useAppForm.ts` + `<AppFormField>` standardizing Formik+Yup, consuming existing `createSchema`/`createInitialValues`/`updateFormValues`. Large forms refactor onto this in their module phases.

**3.3 Accessibility baseline** — focus‑visible in primitives, skip‑link in `AppLayout`, landmark roles, `jsx-a11y` lint gate on. Convert `hidden`‑ternary toggles → conditional render module‑by‑module (eliminate the 151 occurrences over time).

**3.4 License date‑math → trusted util** — move client‑side validity math from `LicenseDetails`/`LicenseTemplate` into `src/services/license/validity.ts` (typed, unit‑tested); prefer server‑provided validity/status, client math only as display fallback.

**Verify:** unit tests for `useApi` (MSW), `useAppForm`, `validity.ts` (edge dates, timezones). No visual change expected.

---

## Phase 4 — Per‑Module Modernization (repeatable pattern)

**Per‑module checklist (each module ships independently):**
1. Convert files `.jsx`→`.tsx`; type props + data shapes.
2. Swap raw data hook → `useApi`‑based typed hook.
3. Decompose oversized components (target <~150 lines): `FileForm` (375), `PaymentInvoice` (336), `AddUserForm` (319), `Selector` (304), `EditUserForm` (279).
4. Replace `hidden`‑ternary toggles with conditional render.
5. Add loading (Skeleton), empty (EmptyState), error states via the standard hook return.
6. Fix pagination via the `Pagination` primitive (disable at bounds; keep `size=10`).
7. Swap ad‑hoc buttons/inputs/tables/modals for primitives (identical look, better a11y).
8. Replace inline styles / hardcoded hex with semantic token classes (values unchanged); replace `h-[700px]` fixed table heights with responsive/flex layout.
9. a11y pass (aria, keyboard, focus order) + responsive check at `sm/md/lg`.
10. Tests: hook (MSW), render + empty/error/loading, key interaction.

**Module order (risk‑driven):** 4a **Dashboard** (`pages/Dashboard`, `Header` cards, `DashBoardReport/*` chart.js) → 4b **Users** (`pages/Users/*`, `UsersList`, `AddUserForm`, `EditUserForm`, `UserProfile`; validates `useAppForm`) → 4c **Applications** (`pages/Documents`, `ApplicationList`, `DocumentReviewForm`) → 4d **Licenses** (core: `pages/Documents/License/*`, `LicenseForm`, `LicenseTemplate`, `QRCodeMaker`, `html2pdf.js`; depends on 3.4; verify QR + PDF unchanged) → 4e **Reports** (`pages/report`, `ReportApplication`, `ReportPayment`, `ReportNavBar`).

---

## Phase 5 — Public / Apply Funnel

Modernize `pages/public/Application/*` (General → Operators → Form → Verification → Invoice) and OAuth pages with the same checklist but **MUI v5 primitives** (MUI‑owned per 1.3). Migrate `flatpickr` CDN CSS → npm import here. Preserve the 5‑step redirect flow and `/apply/...` URLs exactly.

---

## Ordering & Dependencies

```
Phase 0 (Vite+TS+CI) ─► Phase 1 (tokens+theme+primitives+MUI v5) ─► Phase 2 (routing) ─► Phase 3 (data/form/a11y/date)
                                                                                              │
                                              4a Dashboard ► 4b Users ► 4c Applications ► 4d Licenses ► 4e Reports ─► Phase 5 Public/Apply
```
Phase 1 hard‑depends on 0; Phase 3 must precede all of 4/5; modules in 4 are mutually independent (parallelizable) but ordered by risk.

---

## Critical files
- `src/styles/tailwind.css` — ~95 raw color vars (single source of truth; add semantic + dark tokens, never edit hexes)
- `tailwind.config.js` — `var(--...)` mappings (add semantic names, keep `darkMode: "class"`)
- `public/index.html` → root `index.html` (CDN removal, `%PUBLIC_URL%`, module script)
- `src/layout/PagesRoute/index.jsx` (delete in Phase 2) + `src/routes/ProtectedRoutes.js` + `src/layout/AppLayout/index.js` (rebuild as nested routes)
- `src/core/HttpClientConnector/HttpClientConnector.js` + `src/core/ApiAdapter/*.js` (env flip, remove `console.clear`, typed envelope, base for `useApi`)
- `src/mui/theme/{index.js,palette.js}` + `src/services/autorization/checkPermission/` (theme mode sync; boolean permission decoupling from `'hidden'`)

## Things that WILL shift pixels unless guarded
- Removing the Tailwind CDN link → pre‑removal audit + `safelist`.
- PostCSS/autoprefixer drift under Vite → pin versions, diff computed styles.
- MUI v4→v5 swaps → v5 defaults differ; verify each against v4 render using existing `src/mui/theme` overrides.
- `hidden` class → conditional render → removing an element (vs hiding) can collapse flex `gap`/`space-y`; adjust containers.
- Font loading (`src/styles/font.css`, local Inter TTF) → keep `@font-face` untouched; ensure Vite copies the TTF asset.
- Semantic token mapping → must resolve to the identical raw hex.

## Verification strategy (gate for every phase)
1. `npm run typecheck` (tighten `strict` per fully‑typed directory).
2. `npm run test` (Vitest + RTL + MSW); coverage grows per module.
3. `npm run build` → same `build/` output path (Docker/CI unchanged).
4. ESLint incl. `jsx-a11y` as CI gate.
5. Manual flow checks in **both light and dark**: preserved URLs, permission gating, pagination bounds, PDF/QR output, full OAuth + apply funnel.
6. Visual parity diff vs previous deploy for touched screens.
