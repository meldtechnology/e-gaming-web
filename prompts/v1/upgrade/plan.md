# ESGC UX/UI Upgrade — Theme Switching + WCAG AA Contrast

## Context

`prompts/v1/upgrade/requirements.md` asks for two things:
1. **Theme switching** — support dark/light modes and add a theme switcher button to the side menu.
2. **Contrast** — production-grade, accessible foreground/background contrast that meets **WCAG AA**.

Exploration shows the theming *foundation is already ~70% built*, so this is a **finish-and-polish** effort, not a from-scratch build:

- `src/theme/ThemeProvider.tsx` — provides `useThemeMode()` → `{ mode, setMode, toggleMode }`, persists to secure storage key `themeMode`, toggles `.dark` + `data-theme` on `<html>`, and feeds the MUI theme. **Nothing in the UI consumes it yet.**
- `src/styles/tailwind.css` — a complete semantic-token system with **both** `:root` (light) and `.dark` (dark) values for every surface/text/border/brand/sidebar/shadow token.
- `tailwind.config.js` — `darkMode: "class"` + semantic color mappings already wired.
- `src/mui/theme/*` — MUI light/dark palettes already switch off `mode`.

**Gaps to close:**
- No theme toggle button exists anywhere (requirement #1).
- App defaults to `light` regardless of OS preference → **change to follow system on first visit**.
- `--color-text-muted` (`#94a3b8`) is ~2.8:1 on white — **fails AA** for text. Used app-wide via primitives.
- ~36 files use hardcoded legacy classes (`text-gray-400`, `text-gray-900`, `bg-white`, `border-gray-600`, `text-black-900`) that neither flip in dark mode nor reliably pass AA.
- Stale duplicate CSS under `src/assets/css/` lacks the theme variables (flag/verify, don't let it mask issues).

**Chosen scope:** *Pragmatic* contrast pass (fix failing tokens + migrate the concentrated legacy files + spot-verify) and *follow-system* default theme.

**Intended outcome:** A working dark/light toggle in the side menu, sensible system-based default, and AA-compliant contrast across the app's real screens.

---

## Feature 1 — Theme Switcher in the Side Menu

### Objective
Let users switch between light and dark themes from the side menu, with the choice remembered and the OS preference honored on first visit.

### Technical Design
Reuse the existing `ThemeProvider` — no new state system.

1. **Follow-system default** — `src/theme/ThemeProvider.tsx`, `readStoredMode()`:
   - If a valid stored mode exists, use it (unchanged).
   - Otherwise return the OS preference: `window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"` (guard for SSR/no-`matchMedia`).
   - Optional polish: subscribe to `matchMedia` changes and follow them *only while the user has no explicit stored choice*.

2. **Anti-FOUC (recommended)** — add a tiny inline script in `index.html` `<head>` that reads the stored `themeMode` (or `prefers-color-scheme`) and sets `document.documentElement.classList.toggle("dark", ...)` before React mounts, preventing a light-flash on dark loads. Must mirror the storage key/decoding used by `secureLocalStorage`.

3. **Toggle component** — new `src/ui-components/ThemeToggle/index.jsx`:
   - `const { mode, toggleMode } = useThemeMode()` from `src/theme/ThemeProvider`.
   - Render a `<button type="button">` with `aria-label` ("Switch to dark/light theme"), `aria-pressed={mode === "dark"}`, and `title`.
   - Icons: `SunIcon` / `MoonIcon` from `@heroicons/react/24/outline` (already the sidebar's icon set).
   - Style to match sidebar footer link markup: same rounded/hover classes, `text-sidebar-text hover:bg-sidebar-muted hover:text-white`, and works collapsed (`md:justify-center`, label hidden with `md:hidden`).

4. **Mount in the side menu** — `src/ui-components/LeftSidebar/index.jsx`, footer block: render `<ThemeToggle />` above the "Sign out" link.

### Notes
- The sidebar uses `bg-sidebar`/`text-sidebar-text`, which resolve to dark values in *both* themes by design — the sidebar stays dark. No sidebar recoloring needed; the toggle just needs to be legible there.
- `AppThemeProvider` already wraps the tree (`src/App.js`), so the hook has context.

### Files
- `src/theme/ThemeProvider.tsx` (default logic)
- `src/ui-components/ThemeToggle/index.jsx` (new)
- `src/ui-components/LeftSidebar/index.jsx` (mount)
- `index.html` (anti-FOUC script, optional but recommended)

### Test Scenarios
- Toggle flips theme instantly; `<html>` gains/loses `.dark`; choice survives reload.
- First visit with OS in dark mode loads dark; explicit toggle then overrides and persists.
- Toggle is keyboard-focusable, announces state (`aria-pressed`), and renders in collapsed sidebar.

### Acceptance Criteria
- A visible, accessible switcher in the side menu toggles dark/light.
- Preference persists; OS preference is the first-visit default.
- No light/dark flash on load (with FOUC script).

---

## Feature 2 — WCAG AA Contrast (Pragmatic Pass)

### Objective
Ensure foreground/background pairs meet WCAG AA (≥4.5:1 normal text, ≥3:1 large text/UI) in both themes, focusing on the token values and the concentrated legacy offenders.

### Step 2a — Fix failing semantic tokens (`src/styles/tailwind.css`)
Highest leverage: primitives and forms consume these app-wide.

| Token | Theme | Current | Problem | Proposed |
|---|---|---|---|---|
| `--color-text-muted` | light (`:root`) | `#94a3b8` | ~2.8:1 on white — **fails** | `#64748b` (slate-500 ≈ 4.8:1) |
| `--color-text-muted` | dark (`.dark`) | `#64748b` | ~3.3:1 on `#0f1729` — borderline | `#94a3b8` (slate-400) |
| `--color-text-secondary` | dark | `#94a3b8` | verify ≥4.5:1 on dark surfaces | keep if it passes, else `#a8b3c4` |

- Verify every semantic fg token against its intended bg (`surface`, `surface-muted`, `surface-raised`, `brand`) in **both** themes with a contrast checker; adjust only failures.
- Verify `--color-brand` as text/`on-brand` combos, `success/danger/warning/info` used as text, and the `:focus-visible` outline (`--color-brand`) meets 3:1 against adjacent surfaces.
- Keep changes minimal and within the existing slate/brand ramp to preserve the visual design.

### Step 2b — Migrate concentrated legacy files to semantic tokens
Target the ~36 files that use hardcoded palette classes. Standard mapping:

| Legacy | Replace with |
|---|---|
| `text-gray-900`, `text-black-900` | `text-text-primary` |
| `text-gray-600/700` | `text-text-secondary` |
| `text-gray-400/500`, `text-gray-300` | `text-text-muted` (now AA) or `-secondary` where it's body text |
| `bg-white`, `bg-white-a700` | `bg-surface` |
| `bg-gray-50/100` | `bg-surface-muted` / `bg-surface-raised` |
| `border-gray-*` | `border-border` / `border-border-strong` |
| `text-white/80` on `bg-brand` | `text-on-brand` (verify ≥4.5:1; use `/90` at most) |

Priority offenders (from audit):
- `src/pages/public/EmailVerify/components/Form/Form.js` (worst — ~33 legacy classes)
- `src/ui-components/Model/ChangeRoleModal/index.jsx`, `ChangePasswordModal/index.jsx`, `EnableToggleModal/index.jsx` (`text-gray-300/400` on white — fail AA)
- `src/ui-components/Form/*`, `src/ui-components/Popup|Popuup`, `FileList`, `FileGroup`, `TypeList`, `TypeGroup`, `LicenseTemplate`, `Dashboard1`, `Button`, `Metrics/*`, `UserMetrics`
- `src/pages/public/Auth/*` redirect screens, `src/pages/report/Report.tsx`

Full list: `grep -rlE "text-gray-[0-9]|bg-white-a700|text-black-900|bg-gray-[0-9]|text-blue_gray|text-white-a700" src --include='*.jsx' --include='*.tsx' --include='*.js'`

### Step 2c — MUI screens & stale CSS
- Spot-check `src/pages/public/SignIn` and other `@mui`-based screens: they theme via the MUI palette (already light/dark aware), so ensure they use theme palette (`text.primary`, `background.paper`) not hardcoded hex. Fix any hardcoded colors to palette refs.
- Verify nothing imports the stale `src/assets/css/*` copies (which lack theme vars). `index.js` imports from `src/styles/*` — confirm no page overrides with the assets copies; if unused, note for cleanup (don't delete as part of this scope unless confirmed dead).

### Test Scenarios
- Contrast-check representative screens in **both** themes: Dashboard, Users table + New/Edit forms, Documents + License list/detail, Reports, public SignIn, EmailVerify, Application wizard heroes (`text-on-brand`).
- Confirm migrated files visually match and now flip correctly in dark mode.

### Acceptance Criteria
- All checked text/UI pairs meet AA in light and dark.
- No remaining hardcoded gray/white/black text classes in the priority files.
- `text-muted` is legible (≥4.5:1) everywhere it's used as text.

---

## Risks & Mitigations
- **Visual regression from token/class changes** → keep replacements within the existing ramp; verify each migrated screen in both themes before moving on.
- **Sidebar-token confusion** — sidebar is intentionally dark in both themes; don't "fix" it to a light sidebar.
- **MUI vs Tailwind** — two theming systems coexist; MUI screens must use MUI palette, Tailwind screens the CSS vars. Don't cross-wire.
- **FOUC script drift** — the inline script must decode the storage key exactly as `secureLocalStorage` does, or skip it and accept a brief flash.
- **Stale `src/assets/css`** — investigate before assuming dead; avoid deleting in this pass.

## Verification (end-to-end)
1. `npm run dev`, open the app, toggle theme from the side menu; confirm instant flip, `.dark` on `<html>`, and persistence across reload.
2. Set OS to dark, clear stored `themeMode`, reload → app opens dark (follow-system).
3. Walk the screen list above in both themes; run each fg/bg pair through a WCAG contrast checker (DevTools/axe or online) — all AA.
4. Keyboard-only: Tab to the toggle, activate with Enter/Space, confirm `aria-pressed` and focus-visible outline.
5. `npm run typecheck` and `npm run lint` clean; `npm test` (vitest) passes — especially existing sidebar/route tests.

## Implementation Order
1. Write this doc to `prompts/v1/upgrade/plan.md`.
2. Feature 1: follow-system default → `ThemeToggle` component → mount in sidebar → (optional) FOUC script. Verify toggle works.
3. Feature 2a: fix failing tokens in `tailwind.css`; re-verify contrast.
4. Feature 2b: migrate legacy files (start with EmailVerify Form + the three modals), screen by screen.
5. Feature 2c: MUI spot-check + stale-CSS check.
6. Run full verification; typecheck/lint/test.

---

## Implementation Status — 2026-07-03

- Theme switching is implemented through `AppThemeProvider`, `ThemeToggle`, the sidebar footer mount, and the OS-preference pre-paint script.
- The first visit follows `prefers-color-scheme`; an explicit stored `themeMode` wins afterward and is persisted through `secureLocalStorage`.
- Semantic contrast tokens were tightened for muted text, brand/on-brand combinations, and status colors.
- Priority legacy classes from the audit were migrated to semantic surface/text/border/brand/status tokens; the final legacy grep returned no matches.
- `src/pages/public/SignIn` and MUI-backed document detail panels were spot-checked for palette-backed colors.
- No imports of stale `src/assets/css/*` copies were found.
- `docs/theming.md` now records the semantic token system, legacy mapping, follow-system behavior, and reset workflow.

### Verification Results

- `npm run typecheck` passed.
- `npm run lint` passed with 0 errors and 23 existing warnings.
- `npm test` passed: 29 test files, 75 tests.
- `npm run build` passed.
- `npm run build:check` passed.
- Vite dev server started at `http://127.0.0.1:3000/`; the root route returned HTTP 200 and served the anti-FOUC script.

### Open Release Item

- PR creation with before/after screenshots is still open. The current branch is `feature/v2-upgrade`, the requested PR branch in the task list is `feature/v2-ui`, no screenshots were generated, and the GitHub CLI is not installed in this environment.
