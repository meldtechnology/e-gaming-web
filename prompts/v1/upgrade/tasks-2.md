# Public Routes — Light-Theme Lock — Task List

## Overview

- **Source Plan:** `prompts/v1/upgrade/plan.md` + approved plan "Force light theme on all public routes"
- **Requirements:** `prompts/v1/upgrade/requirements.md`; new ask — public route subtree must always render in light theme regardless of the global light/dark preference, while protected app pages keep the toggle.
- **Generated On:** 2026-07-03
- **Methodology:** Phased decomposition (Discovery → Design → Implementation → Hardening → QA → Release → Docs); each task single-objective, verb-led, independently verifiable.
- **Granularity:** Fine-grained, one-engineer/one-agent tasks with acceptance criteria.
- **Scope note:** Frontend theming only. Force light on the public route subtree via a single choke point (`PublicLayout`). No backend, data, or infrastructure work. Reuses the existing `getTheme` and semantic-token system — no new theme engine.

## Execution Notes: 1.1-2.10

- `src/routes/PublicRoutes.js` is the public-route choke point: `element: <PublicLayout />` is defined once at the root, and all 16 configured public children descend from it (`/`, `/sign-in`, `/auth/login`, `/process/auth/login`, `/auth/login/redirect`, `/logout`, `/complete/login`, `/authorizing/login`, `/verify/email/otp`, `/apply`, `/apply/operator/:operatorType`, `/documents/licenses/:number`, `/document/license/verification`, `/apply/operator/form`, `/apply/operator/verification`, `/apply/payment/invoice`).
- Public page theme inventory:
  - Tailwind semantic tokens only: `/sign-in`, `/apply`, `/apply/operator/:operatorType`, `/apply/operator/verification`, `/document/license/verification`, `/documents/licenses/:number`, plus shared application/license cards and summaries.
  - MUI `useTheme()` consumers: `src/pages/public/EmailVerify/index.jsx`, `src/pages/public/Application/Form/components/Hero/Hero.js`, `src/pages/public/Application/Invoice/components/Hero/index.js`; `src/pages/public/NotFound/index.jsx` also consumes MUI theme but is wired through `UnavailableRoutes`, not `PublicRoutes`.
  - No visible theme styling: `/` redirects to `/auth/login`; `/auth/login`, `/process/auth/login`, `/auth/login/redirect`, `/logout`, `/complete/login`, `/authorizing/login` mostly use MUI layout/loading states and token-colored status text.
  - Explicit `dark:` variants: only `src/pages/public/EmailVerify/components/Form/Form.js`.
- Exact public `dark:` occurrences are the six OTP inputs at `src/pages/public/EmailVerify/components/Form/Form.js:160`, `:173`, `:185`, `:197`, `:209`, `:220` (`dark:bg-surface-raised`, `dark:border-border`, `dark:placeholder-text-muted`, `dark:text-text-primary`, `dark:focus:ring-primary-500`, `dark:focus:border-primary-500`) and the helper text at `:227` (`dark:text-text-secondary`).
- `useThemeMode()` is not consumed by public pages or `PublicLayout`; only `src/ui-components/ThemeToggle/index.jsx` imports it.
- No `[data-theme="dark"]` selectors or hardcoded `.dark` descendant rules were found under `src/`; the only `.dark` selector is the semantic-token block in `src/styles/tailwind.css`.
- `index.html` can add `<html class="dark" data-theme="dark">` before React mounts, but `#root` is empty until mount; once `PublicLayout` renders a `.theme-light` scope, descendants can resolve light tokens without mutating the global preference.
- Design decision: implement the lock at `PublicLayout` with a scoped `.theme-light` CSS class and a nested light MUI `ThemeProvider`. This preserves the stored global preference, avoids attempting an impossible subtree removal of `<html>.dark`, and keeps protected app pages controlled by the existing toggle.
- CSS design: change the light-token selector from `:root {` to `:root,\n.theme-light {` in `src/styles/tailwind.css`; the existing `.dark` block stays unchanged. Because CSS custom properties inherit from the nearest ancestor, `.theme-light` overrides `<html>.dark` for the public subtree.
- MUI design: reuse `getTheme("light", () => {})` from `src/mui/theme/index.js`; no MUI theme module changes are required.
- Acceptance target for forced light: on public routes, computed `--color-surface` is `#ffffff`, `useTheme().palette.mode` is `light`, and no dark-token values apply even when `<html>` has `.dark`.

## Execution Notes: 5.13-8.26

- Implemented the public light lock at `src/layout/PublicLayout/index.js` with a nested `MuiThemeProvider` using `getTheme("light", () => {})` and a `.theme-light` / `data-theme="light"` wrapper.
- Updated `src/styles/tailwind.css` so `.theme-light` shares the light token declarations with `:root`; also added inherited `color`, `background-color`, and `color-scheme: light` on `.theme-light` to prevent MUI/body inherited dark text from leaking into public pages.
- Removed all public `dark:` variants from `src/pages/public/EmailVerify/components/Form/Form.js`. Follow-up grep under public routes and public document verification files returned no `dark:` classes.
- Added `src/layout/PublicLayout/PublicLayout.theme.test.jsx` to assert public descendants receive MUI `palette.mode === "light"` while the global root remains `data-theme="dark"`.
- WCAG AA token contrast checks under forced light passed: text-primary/surface `17.85:1`, text-secondary/surface `7.58:1`, text-muted/surface `5.12:1`, text-muted/surface-muted `4.89:1`, on-brand/brand `6.70:1`, on-brand/brand-strong `9.05:1`.
- Browser route probe passed for all 16 requested public routes with Chrome emulating OS dark and encrypted stored `themeMode=dark`; results are in `prompts/v1/artifacts/light-theme-lock/public-route-light-check.json`.
- OTP focus visibility remains intact: the focused first OTP input computed `borderColor: rgb(37, 99, 235)` and a blue focus box-shadow in the browser probe.
- Screenshots captured:
  - `prompts/v1/artifacts/light-theme-lock/sign-in-global-dark-forced-light.png`
  - `prompts/v1/artifacts/light-theme-lock/apply-global-dark-forced-light.png`
  - `prompts/v1/artifacts/light-theme-lock/verify-email-otp-global-dark-forced-light.png`
- Verification commands:
  - `npm run typecheck` passed.
  - `npm run lint` passed with 0 errors and 23 existing warnings.
  - `npm test` passed: 30 files, 76 tests.
  - `npm run build` passed, with existing Vite/Tailwind/chunk-size warnings.
  - `NODE_PATH=/Users/josleke/.npm/_npx/a4d0c66fe73b166b/node_modules node prompts/v1/artifacts/light-theme-lock/public-light-check.runner.cjs` passed for 16 routes.
- PR creation is still open: `gh` is not installed, and the branch has broad unrelated uncommitted changes. A PR summary was prepared at `prompts/v1/artifacts/light-theme-lock/pr-summary.md`.

---

# Phase 1 — Discovery and Analysis

1. [x] Confirm `src/layout/PublicLayout/index.js` is the sole choke point every public route renders through by cross-checking `src/routes/PublicRoutes.js` (`element: <PublicLayout />` with all pages as `children`). Acceptance: all 16 public routes verified to descend from `PublicLayout`.
2. [x] Inventory how each public page consumes the theme — classify pages as (a) Tailwind semantic tokens only, (b) explicit `dark:` variants, (c) MUI `useTheme().palette.mode` branching. Deliverable: short list mapping page → mechanism.
3. [x] Confirm `src/pages/public/EmailVerify/components/Form/Form.js` is the only public file using `dark:` variants (grep `dark:` under `src/pages/public/`); record the exact occurrences (OTP inputs + helper text + focus-ring/border variants).
4. [x] Confirm no public page consumes `useThemeMode()` from `src/theme/ThemeProvider.tsx` (grep `useThemeMode` under `src/pages/public/` and public layouts). Acceptance: only the protected sidebar `ThemeToggle` consumes it, so `ThemeContext` need not be exported.
5. [x] Grep the codebase (`src/`) for any CSS selectors keyed on `[data-theme="dark"]` or hardcoded `.dark` descendant rules that public pages rely on. Acceptance: none found, or list them as additional override targets.
6. [x] Confirm the `index.html` pre-paint script cannot cause a public dark flash (React `#root` is empty until mount, which renders `PublicLayout` with the light scope). Record the conclusion.

---

# Phase 2 — Architecture and Design

7. [x] Decide the light-lock mechanism: a scoped `.theme-light` CSS class that re-declares the light semantic tokens + a nested light `MuiThemeProvider`, both applied at `PublicLayout`. Document why this beats mutating global `setMode` (would overwrite the user's stored preference) or removing `.dark` from `<html>` (impossible for a subtree).
8. [x] Design the `.theme-light` selector change in `src/styles/tailwind.css`: extend the existing light-token selector from `:root {` to `:root,\n.theme-light {` (DRY — no third copy of the token list; mirrors the `:root` / `.dark` structure). Confirm CSS-variable cascade-by-proximity makes a `.theme-light` element override `<html>.dark` for its descendants.
9. [x] Confirm reuse of `getTheme(mode, toggler)` from `src/mui/theme/index.js` with `mode = "light"` and a no-op toggler; no changes to the MUI theme module required.
10. [x] Define acceptance criteria for "forced light": on any public route, computed `--color-surface` resolves to `#ffffff`, MUI `theme.palette.mode === "light"`, and no dark token values appear, even when `<html>` carries `.dark`.

---

# Phase 3 — Data and Infrastructure

11. [ ] (N/A) No schema, migration, storage, or infrastructure changes required — confirm and record. This is a pure client-side theming scope.

---

# Phase 4 — Backend Implementation

12. [ ] (N/A) No backend/API changes required — confirm and record.

---

# Phase 5 — Frontend Implementation

## 5.1 CSS token scope

13. [x] Add `.theme-light` to the light-token selector in `src/styles/tailwind.css` by changing `:root {` (the `@layer base` light semantic block, ~line 6) to `:root,\n.theme-light {`. Acceptance: `.theme-light` sets all `--color-*` and `--shadow-*` light values; the `.dark` block is unchanged.

## 5.2 PublicLayout light lock

14. [x] Wrap `src/layout/PublicLayout/index.js` output in a nested light MUI provider and a `.theme-light` scope div:
    - Import `ThemeProvider as MuiThemeProvider` from `@mui/material/styles` and `getTheme` from `../../mui/theme`.
    - Build `const publicLightTheme = getTheme("light", () => {});` at module scope.
    - Render `<MuiThemeProvider theme={publicLightTheme}><div className="theme-light" data-theme="light"><Outlet /></div></MuiThemeProvider>`.
    - Acceptance: public pages render light regardless of global mode; no visual regression in light mode.

## 5.3 Residual dark-variant cleanup

15. [x] Remove the residual `dark:` variants in `src/pages/public/EmailVerify/components/Form/Form.js` (the six OTP inputs' `dark:*` classes at lines ~160/173/185/197/209/220 and the helper `<p>` `dark:text-text-secondary` at ~227, plus `dark:focus:ring-primary-500` / `dark:focus:border-primary-500`). These fixed-palette focus variants still fire under `<html>.dark`; dropping them lets the light focus styles win cleanly. Acceptance: no `dark:` classes remain in the file; OTP inputs styled correctly in forced light.

---

# Phase 6 — Security and Hardening

16. [x] Re-verify WCAG AA contrast on public pages under forced light (text on `--color-surface`/`--color-surface-muted`/`--color-brand`), since dark-mode fallbacks no longer apply. Acceptance: all public text/background pairs meet ≥4.5:1 (≥3:1 for large text).
17. [x] Confirm no component in the public subtree depends on the removed `dark:` styles for legibility or focus visibility (keyboard focus ring still visible on OTP inputs and interactive controls).

---

# Phase 7 — Testing and Quality Assurance

18. [x] With global theme set to dark (both OS `prefers-color-scheme: dark` and an explicit stored dark choice), visit each public route and confirm it renders light: `/`, `/sign-in`, `/apply`, `/apply/operator/:operatorType`, `/apply/operator/form`, `/apply/operator/verification`, `/apply/payment/invoice`, `/verify/email/otp`, `/document/license/verification`, `/documents/licenses/:number`, `/logout`, `/complete/login`, `/authorizing/login`, `/auth/login`, `/process/auth/login`, `/auth/login/redirect`.
19. [x] Confirm protected app pages still honor the global light/dark toggle (spot-check a protected route + the sidebar `ThemeToggle`), proving the lock is scoped to public routes only.
20. [x] Verify the MUI channel: on a public page in global dark mode, assert `useTheme().palette.mode === "light"` (e.g. `EmailVerify/index.jsx`, `NotFound/index.jsx`, Hero components render their light branch).
21. [x] Run `npm run typecheck` — no new type errors.
22. [x] Run `npm run lint` — no new lint errors in changed files.
23. [x] Run `npm test` — existing tests pass (including `LeftSidebar.permissions.test.jsx`).
24. [x] Run `npm run build` — production build succeeds.

---

# Phase 8 — Deployment and Release

25. [x] Capture before/after screenshots showing public pages rendering light while the global preference is dark (at minimum `/sign-in`, `/apply`, `/verify/email/otp`).
26. [ ] Open a PR from `feature/v2-upgrade` to `main` with the screenshots and a summary of the light-lock mechanism (`.theme-light` scope + nested light MUI provider at `PublicLayout`). Blocked: `gh` is not installed, and the branch contains broad unrelated uncommitted changes; PR summary prepared in `prompts/v1/artifacts/light-theme-lock/pr-summary.md`.

---

# Phase 9 — Monitoring and Operations

27. [ ] (N/A) No runtime monitoring/alerting changes — client-side theming only. Confirm and record.

---

# Phase 10 — Documentation and Knowledge Transfer

28. [ ] Update `docs/theming.md` with a "Public routes are locked to light" subsection documenting the `.theme-light` scoped-class + nested light `MuiThemeProvider` mechanism at `src/layout/PublicLayout/index.js`, and note that new public pages inherit the lock automatically (no per-page work) but must avoid `dark:` variants.
