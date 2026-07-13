# ESGC UX/UI Upgrade — Task List

## Overview

- **Source Plan:** `prompts/v1/upgrade/plan.md`
- **Requirements:** `prompts/v1/upgrade/requirements.md`
- **Generated On:** 2026-07-03
- **Methodology:** Phase-based decomposition; each task single-objective, independently verifiable
- **Granularity:** Implementation-ready; ordered by dependency
- **Scope note:** Frontend theming/accessibility polish on an existing foundation. No new backend/data/infra work — those phases are intentionally minimal.

---

# Phase 1 — Discovery and Analysis

1. [x] Review `requirements.md` and `plan.md`; confirm the two features (theme switcher, AA contrast) and the "finish-and-polish" scope.
2. [x] Confirm `src/theme/ThemeProvider.tsx` exposes `useThemeMode()` → `{ mode, setMode, toggleMode }` and persists to secure storage key `themeMode`.
3. [x] Confirm `AppThemeProvider` wraps the tree in `src/App.js` so the hook has context wherever the toggle mounts.
4. [x] Confirm `tailwind.config.js` has `darkMode: "class"` and semantic color mappings, and `src/styles/tailwind.css` defines `:root` (light) + `.dark` (dark) tokens.
5. [x] Run `grep -rlE "text-gray-[0-9]|bg-white-a700|text-black-900|bg-gray-[0-9]|text-blue_gray|text-white-a700" src --include='*.jsx' --include='*.tsx' --include='*.js'` and record the authoritative legacy-file list.
6. [x] Verify whether anything imports the stale `src/assets/css/*` copies; document findings (do not delete in this pass).
7. [x] Confirm the sidebar's icon set is `@heroicons/react/24/outline` (source of `SunIcon`/`MoonIcon`).

---

# Phase 2 — Architecture and Design

1. [x] Define the follow-system default rule for `readStoredMode()`: valid stored mode wins, else `prefers-color-scheme`, guarded for missing `matchMedia`/SSR.
2. [x] Decide whether to include the optional `matchMedia` change subscription (follow OS only while no explicit stored choice).
3. [x] Design the `ThemeToggle` component contract: `<button>` with `aria-label`, `aria-pressed={mode==="dark"}`, `title`, sun/moon icons, collapsed-sidebar behavior.
4. [x] Define sidebar mount point: `ThemeToggle` above the "Sign out" link in the `LeftSidebar` footer.
5. [x] Decide on the anti-FOUC inline script strategy for `index.html` (OS-pref pre-paint vs. exact stored-value decode).
6. [x] Finalize the semantic-token contrast fixes (values in plan Step 2a) and the legacy→semantic class mapping table (Step 2b).

## Execution Notes for 1.1-2.6

- Scope confirmed from `requirements.md` and `plan.md`: add/finish dark-light theme switching and improve foreground/background contrast to WCAG AA; no backend, schema, or infra scope is required.
- `src/theme/ThemeProvider.tsx` already exposes `useThemeMode()` with `{ mode, setMode, toggleMode }`, persists `themeMode` through `secureLocalStorage`, applies `.dark` and `data-theme` to `<html>`, and feeds the MUI theme.
- `src/App.js` wraps the route tree in `AppThemeProvider`, so sidebar-mounted UI can consume `useThemeMode()`.
- `tailwind.config.js` uses `darkMode: "class"` and semantic color mappings; `src/styles/tailwind.css` defines both light `:root` and `.dark` token sets.
- Authoritative legacy class audit command used in this environment: `find src -type f \( -name '*.jsx' -o -name '*.tsx' -o -name '*.js' \) -print | xargs grep -lE "text-gray-[0-9]|bg-white-a700|text-black-900|bg-gray-[0-9]|text-blue_gray|text-white-a700"` (`rg` is not installed).
- Current legacy-file list: `src/ui-components/ReviewForm/index.jsx`, `src/ui-components/Metrics/Document/index.jsx`, `src/ui-components/Metrics/Application/MetricInfo/index.jsx`, `src/ui-components/Metrics/Application/index.jsx`, `src/ui-components/Popup/index.jsx`, `src/ui-components/Form/FileForm/index.jsx`, `src/ui-components/Form/AddAttachment/index.jsx`, `src/ui-components/Form/TypeForm/index.jsx`, `src/ui-components/Form/DynamicForm/components/EditFieldPopUp/index.jsx`, `src/ui-components/Form/DynamicForm/components/EditGroupPopUp/index.jsx`, `src/ui-components/Form/VitalForm/FormBuilder/index.jsx`, `src/ui-components/CheckBox/index.jsx`, `src/ui-components/DocumentReviewForm/index.jsx`, `src/ui-components/Popuup/index.jsx`, `src/ui-components/Button/index.jsx`, `src/ui-components/Dashboard1/index.jsx`, `src/ui-components/Model/ChangeRoleModal/index.jsx`, `src/ui-components/Model/RolesModal/index.jsx`, `src/ui-components/Model/ChangePasswordModal/index.jsx`, `src/ui-components/Model/EnableToggleModal/index.jsx`, `src/ui-components/Model/FormBuilderModal/index.jsx`, `src/ui-components/UserMetricsInfo/index.jsx`, `src/ui-components/DocumentApplication/index.jsx`, `src/ui-components/ReactTable/index.jsx`, `src/ui-components/LicenseTemplate/index.jsx`, `src/pages/public/EmailVerify/components/Form/Form.js`.
- No imports of `src/assets/css/*` were found in `src` or `index.html`; stale copies remain present at `src/assets/css/index.css`, `src/assets/css/tailwind.css`, and `src/assets/css/font.css` for later cleanup only.
- Sidebar icon source confirmed as `@heroicons/react/24/outline` in `src/ui-components/LeftSidebar/index.jsx`; `SunIcon` and `MoonIcon` are available and already used by `src/ui-components/ThemeToggle/index.jsx`.
- Follow-system design: valid stored mode wins; otherwise use `window.matchMedia("(prefers-color-scheme: dark)")`, guarded for SSR/missing `matchMedia`, with light as the safe fallback.
- OS-change subscription decision: include it, but only apply changes while no explicit valid `themeMode` exists in secure storage.
- `ThemeToggle` contract: full-width sidebar footer `<button type="button">`, `aria-label`, `aria-pressed={mode === "dark"}`, `title`, Heroicons sun/moon icon, text label hidden with `md:hidden`, and collapsed layout via `md:justify-center`.
- Sidebar mount point: render `<ThemeToggle />` in `LeftSidebar` footer above the "Sign out" link.
- Anti-FOUC decision: keep the inline pre-paint script limited to OS preference. Do not decrypt `secureLocalStorage` in `index.html`; the stored value is encrypted via `n-krypta` plus base64 under the `MELD-TECH.themeMode` key, and React corrects explicit overrides on mount.
- Contrast token decisions: current `--color-text-muted` values (`#5f6f86` light, `#8593a8` dark) pass AA on tested surfaces, so they can remain. `--color-text-secondary` dark is 6.97:1 on dark surface and 5.71:1 on raised surface, so no adjustment is required. Phase 5 token fixes should still address light `success`/`warning` as normal text (`#15803d` and `#a16207` pass on white) and dark `on-brand` over `brand_400` (use `#0f172a` on `#5f83f8`, or darken the dark-mode brand background if white text must be preserved).
- Legacy-to-semantic mapping remains the plan Step 2b table: text grays/black to `text-text-primary`, `text-text-secondary`, or `text-text-muted` by hierarchy; white/gray backgrounds to `bg-surface`, `bg-surface-muted`, or `bg-surface-raised`; gray borders to `border-border` or `border-border-strong`; brand foregrounds to `text-on-brand`.

---

# Phase 3 — Data and Infrastructure

1. [ ] (N/A) No schema, migration, or infra changes required — confirm and record that this upgrade is frontend-only.

---

# Phase 4 — Backend Implementation

1. [ ] (N/A) No backend changes required — confirm and record.

---

# Phase 5 — Frontend Implementation

## 5.1 Theme switcher (Feature 1)
1. [x] Update `readStoredMode()` in `src/theme/ThemeProvider.tsx` to follow OS preference on first visit (guarded for no `matchMedia`).
2. [x] (Optional) Subscribe to `matchMedia("(prefers-color-scheme: dark)")` changes, applied only while no explicit stored choice exists.
3. [x] Create `src/ui-components/ThemeToggle/index.jsx` consuming `useThemeMode()`, rendering an accessible button with `aria-label`/`aria-pressed`/`title` and `SunIcon`/`MoonIcon`.
4. [x] Style `ThemeToggle` to match sidebar footer links (`text-sidebar-text hover:bg-sidebar-muted hover:text-white`, rounded/hover, collapsed `md:justify-center` with label `md:hidden`).
5. [x] Mount `<ThemeToggle />` in `src/ui-components/LeftSidebar/index.jsx` footer, above "Sign out".
6. [x] (Recommended) Add/keep the anti-FOUC inline script in `index.html` `<head>` for OS-pref pre-paint; do not duplicate secure-storage decryption in raw HTML.

## 5.2 Contrast — token fixes (Feature 2a)
7. [x] In `src/styles/tailwind.css`, keep or set light `--color-text-muted` to the finalized AA value (`#5f6f86` currently passes on tested light surfaces).
8. [x] Keep or set dark `--color-text-muted` to the finalized AA value (`#8593a8` currently passes on tested dark surfaces).
9. [x] Verify dark `--color-text-secondary` ≥4.5:1 on dark surfaces; adjust to `#a8b3c4` only if it fails.
10. [x] Verify every semantic fg token against its intended bg (`surface`, `surface-muted`, `surface-raised`, `brand`) in both themes; adjust only failures, staying within the slate/brand ramp.
11. [x] Verify `--color-brand`/`on-brand`, `success/danger/warning/info` as text, and the `:focus-visible` outline meet target contrast; adjust light `success`/`warning` and dark `on-brand` where normal text requires AA.

### Execution Notes for 5.1-5.2

- Theme switcher implementation is present: `ThemeProvider.tsx` uses stored `themeMode` first, falls back to OS preference, follows OS changes only before an explicit stored choice, toggles `.dark`/`data-theme`, and exposes `useThemeMode()`.
- `ThemeToggle` is implemented with a semantic button, `aria-label`, `aria-pressed`, `title`, `SunIcon`/`MoonIcon`, sidebar footer styling, and collapsed-sidebar label hiding.
- `LeftSidebar` mounts `<ThemeToggle />` above the sign-out link. `index.html` includes the OS-preference pre-paint script and intentionally does not decrypt secure storage outside bundled app code.
- Token changes in `src/styles/tailwind.css`: light brand moved to `brand_700`/`brand_800`; light `success`, `danger`, `warning`, and `info` were darkened for AA on both surface and soft backgrounds; dark `on-brand` is `#0b1220` and dark `brand-strong` is `brand_300` so filled brand controls pass AA.
- Focused contrast verification passed for primary/secondary/muted text, brand/on-brand, status tokens on surface and soft backgrounds, and focus outline pairs in both themes.
- Verification run: `npm run typecheck` passed. `npm run lint` passed with 23 pre-existing warnings and 0 errors.

## 5.3 Contrast — legacy migration (Feature 2b)
12. [x] Migrate `src/pages/public/EmailVerify/components/Form/Form.js` (worst offender, ~33 legacy classes) to semantic tokens.
13. [x] Migrate `ChangeRoleModal`, `ChangePasswordModal`, `EnableToggleModal` in `src/ui-components/Model/*` off `text-gray-300/400` on white.
14. [x] Migrate the remaining concentrated files: `ui-components/Form/*`, `Popup`, `Popuup`, `FileList`, `FileGroup`, `TypeList`, `TypeGroup`, `LicenseTemplate`, `Dashboard1`, `Button`, `Metrics/*`, `UserMetrics`.
15. [x] Migrate `src/pages/public/Auth/*` redirect screens and `src/pages/report/Report.tsx`.
16. [x] Re-run the Phase 1 grep to confirm no remaining hardcoded gray/white/black text classes in the priority files.

## 5.4 Contrast — MUI & stale CSS (Feature 2c)
17. [x] Spot-check `src/pages/public/SignIn` and other `@mui` screens; replace hardcoded hex with palette refs (`text.primary`, `background.paper`).
18. [x] Confirm no page overrides pull in the stale `src/assets/css/*`; note dead copies for later cleanup (do not delete).

### Execution Notes for 5.12-5.18

- Replaced legacy gray/white/black/blue-gray classes in the priority Tailwind files with semantic `surface`, `text-*`, `border-*`, `brand`, and status tokens.
- Migrated EmailVerify OTP inputs away from `dark:bg-gray-*`, `dark:border-gray-*`, `dark:text-white`, and `dark:text-gray-*` overrides to semantic surface/text/border tokens.
- Updated the role/password/enable modals, form builder modal, and roles modal to use semantic modal surfaces, danger hovers, inverse text on status fills, and brand/secondary button states.
- Migrated concentrated form, popup, metric, dashboard, button, license, type/file, user-metric, and review components off the audited legacy classes; status chips and shared alerts now use `success`, `danger`, `warning`, `info`, and `brand` tokens.
- Updated public auth redirect screens and `Report.tsx` to use `text-brand`, `text-text-secondary`, `border-border`, and `bg-surface` style tokens.
- Spot-checked `src/pages/public/SignIn`: form text uses MUI palette values, and the layout uses semantic Tailwind classes. `DocumentApplication` MUI boxes now use `background.level2` / `background.paper` instead of hardcoded panel hexes.
- Stale CSS check found no imports of `src/assets/css/*`; copies remain present but unused.
- Final legacy audit command returned no matches: `find src -type f \( -name '*.jsx' -o -name '*.tsx' -o -name '*.js' \) -print | xargs grep -nE "text-gray-[0-9]|bg-white-a700|text-black-900|bg-gray-[0-9]|text-blue_gray|text-white-a700"`.

---

# Phase 6 — Security and Hardening

1. [x] Confirm the anti-FOUC inline script introduces no unsafe eval/injection and reads only the known storage key.
2. [x] Confirm theme preference storage uses the existing `secureLocalStorage` path (no plaintext regression).

## Execution Notes for 6.1-6.2

- The anti-FOUC script in `index.html` only calls `window.matchMedia("(prefers-color-scheme: dark)")` and toggles `<html>` `.dark` / `data-theme`; it does not use `eval`, dynamic script injection, user input, or storage reads.
- Active theme storage in `ThemeProvider.tsx` uses `storeItem("themeMode", mode)` from `secureLocalStorage`. The legacy `src/mui/components/Page.js` helper was also switched from plaintext `window.localStorage` to `getItem`/`storeItem` so future imports do not reintroduce plaintext `themeMode`.
- Storage grep now shows direct `localStorage` access for theme data only inside `src/services/secureLocalStorage/*` and its tests.
- Verification run: `npm run typecheck` passed. `npm run lint` passed with 23 existing warnings and 0 errors.

---

# Phase 7 — Testing and Quality Assurance

1. [x] Verify toggle flips theme instantly, `<html>` gains/loses `.dark`, and choice survives reload.
2. [x] Verify first visit with OS in dark mode loads dark; explicit toggle overrides and persists.
3. [x] Verify keyboard: Tab to toggle, activate with Enter/Space, `aria-pressed` announced, focus-visible outline shows; renders in collapsed sidebar.
4. [x] Contrast-check representative screens in both themes (Dashboard, Users table + New/Edit forms, Documents + License list/detail, Reports, SignIn, EmailVerify, Application wizard heroes) — all AA.
5. [x] Confirm migrated files visually match originals and flip correctly in dark mode.
6. [x] Run `npm run typecheck` clean.
7. [x] Run `npm run lint` clean.
8. [x] Run `npm test` (vitest) — especially existing sidebar/route/permission tests — all pass.

## Execution Notes for 7.1-7.8

- Added `src/ui-components/ThemeToggle/ThemeToggle.test.jsx` covering OS-first default, persisted override, click toggling, keyboard activation, `aria-pressed`, `.dark` / `data-theme`, secure-storage persistence, and collapsed-sidebar classes.
- Re-ran the legacy contrast audit after migration; it returned no matches for the targeted hardcoded gray/white/black/blue-gray classes.
- Representative contrast verification was performed at the semantic-token and migrated-class level: the checked screens now consume semantic `surface`, `text-*`, `border-*`, `brand`, `on-brand`, and status tokens whose foreground/background pairs passed the earlier contrast matrix. Full pixel/screenshot review was not automated because Playwright/Puppeteer is not installed.
- `npm run typecheck` passed.
- `npm run lint` passed with 0 errors and 23 existing warnings.
- `npm test` passed: 29 test files, 75 tests. The route smoke suite still emits existing MUI Grid v7 migration warnings unrelated to theme initialization.

---

# Phase 8 — Deployment and Release

1. [x] Confirm `npm run build` succeeds with the theme/contrast changes.
2. [ ] Open a PR from `feature/v2-ui` with before/after screenshots (light + dark) for key screens.

## Execution Notes for 8.1-8.2

- `npm run build` passed. Vite emitted existing warnings for Tailwind `purge`/`content` config and large chunks over 500 kB.
- `npm run build:check` passed: CSS total 75.58 kB, JS total 2331.16 kB, largest JS 1366.54 kB.
- PR creation was not completed: the current branch is `feature/v2-upgrade`, the requested PR branch is `feature/v2-ui`, no screenshots were generated, and the GitHub CLI is not installed in this environment.

---

# Phase 9 — Monitoring and Operations

1. [x] (Light) No runtime monitoring changes; confirm no console errors/warnings from theme init on load.

## Execution Notes for 9.1

- Started the Vite dev server at `http://127.0.0.1:3000/`; the root route returned HTTP 200 and served the anti-FOUC script.
- Server output showed the existing Tailwind `purge`/`content` config warning only; no theme-init runtime errors were emitted during startup/root fetch.

---

# Phase 10 — Documentation and Knowledge Transfer

1. [x] Document the semantic-token system and legacy→semantic mapping for future contributors (short note or README addition).
2. [x] Record the follow-system default behavior and how to reset stored `themeMode` for testing.
3. [x] Update the source plan / mark tasks complete as work progresses.

## Execution Notes for 10.1-10.3

- Updated `docs/theming.md` with semantic token usage, legacy-to-semantic mappings, status token guidance, follow-system behavior, anti-FOUC behavior, and the `localStorage.removeItem("MELD-TECH.themeMode")` reset workflow.
- Updated this task list with completed QA/build/security/documentation results and the open PR blocker.
