# Task List — Fix "Maximum update depth exceeded" in DynamicForm Tag editor

## Overview

- Source Plan: prompts/v1/fix/error.md (runtime error report)
- Generated On: 2026-07-02
- Methodology: Root-cause analysis of React infinite-render loop; effect-based state-lifting anti-pattern
- Granularity: Single-objective, independently verifiable tasks
- Scope: Loop fix + regression tests + lint enforcement (no field-editor functional changes)

---

# Phase 1 – Discovery and Analysis

1. [x] Confirm the error signature in `prompts/v1/fix/error.md` maps to `Tag` → `EditFieldPopUp` render chain.
2. [x] Verify loop #1: `useEffect(..., [selectedItem, selectedTags])` in `Tag` combined with inline `handleSelectedTags` in `EditFieldPopUp`.
3. [x] Verify loop #2: `useEffect(() => setSelectedItem(tags), [tags])` with `tags = []` default param.
4. [x] Confirm no other consumers of `Tag` exist that rely on the current effect-based contract (grep `from ".*Tag"`).
5. [x] Document assumptions: parent notification should occur only on user-driven tag changes.

---

# Phase 2 – Architecture and Design

1. [x] Design `Tag` to notify parent via a `commit(next)` handler instead of a `useEffect` keyed on `selectedTags`.
2. [x] Design a `selectedTagsRef` to hold the latest callback without adding it as an effect dependency.
3. [x] Design content-keyed sync for incoming `tags` (`tagsKey`) to avoid reference-identity re-runs.
4. [x] Decide `EditFieldPopUp.handleSelectedTags` becomes `useCallback`-memoized (defense in depth).
5. [x] Confirm the public prop contract of `Tag` (`selectedTags`, `tags`, `placeholder`) is preserved.

---

# Phase 3 – Data and Infrastructure

1. [x] Confirm vitest + @testing-library/react + jest-dom are configured (already in devDependencies).
2. [x] Confirm the test runner picks up `*.test.jsx` under `src/ui-components` (check vitest config/globs).

---

# Phase 4 – Backend Implementation

1. [ ] N/A — this is a frontend-only rendering-loop defect (record explicitly as out of scope).

---

# Phase 5 – Frontend Implementation

1. [x] In `src/ui-components/Tag/index.jsx`, add `useRef` import and create `selectedTagsRef` synced to `selectedTags`.
2. [x] Initialize `selectedItem` state from `tags` (`Array.isArray(tags) ? tags : []`); remove reliance on the `tags = []` default param for effects.
3. [x] Replace the `tags` sync effect with a content-keyed effect (`tagsKey`) and an inline `exhaustive-deps` disable with rationale.
4. [x] Add a `commit(next)` helper that calls `setSelectedItem(next)` and `selectedTagsRef.current?.(next)`.
5. [x] Route `handleKeyDown` (Enter add + Backspace remove), `handleChange`, and `handleDelete` through `commit`.
6. [x] Delete the `useEffect(() => selectedTags(selectedItem), [selectedItem, selectedTags])` block.
7. [x] In `EditFieldPopUp/index.jsx`, import `useCallback` and wrap `handleSelectedTags` in `useCallback(items => setOptions(items), [])`.
8. [ ] Manually run the Form Designer (`npm run dev`) and open a field editor to confirm the crash is gone.
   - Terminal verification completed: Vite served successfully on `http://127.0.0.1:3001/` and returned `HTTP/1.1 200 OK`; authenticated document data/session was not available for the manual field-editor path.

---

# Phase 6 – Security and Hardening

1. [x] Confirm no user input from the tag field is rendered unescaped (Chip label is text-only — verify).
2. [x] Confirm `commit` guards against `undefined` callback (`?.`) so `Tag` is safe when used without a handler.

---

# Phase 7 – Testing and Quality Assurance

1. [x] Add `src/ui-components/Tag/Tag.test.jsx`: render `Tag` with an inline (non-memoized) `selectedTags` spy and assert it mounts without throwing "Maximum update depth exceeded".
2. [x] Add a test: typing a value + pressing Enter calls the `selectedTags` spy with the new array.
3. [x] Add a test: providing `tags={["a","b"]}` renders two Chips and does not loop.
4. [x] Add a test that `handleDelete` removes a chip and notifies the parent.
5. [ ] (Optional) Add an `EditFieldPopUp` smoke test asserting it renders with a field and the Tag options input mounts.
6. [x] Run `npm run test` and confirm all pass.
7. [x] Run `npm run lint` on changed files; resolve `react-hooks/exhaustive-deps` findings or justify with inline disables.
8. [x] Run `npm run typecheck` to confirm no type regressions.

---

# Phase 8 – Deployment and Release

1. [x] Run `npm run build` and `npm run build:check` to confirm a clean production build.
2. [x] Commit on the current `feature/v2-ui` branch with a descriptive message referencing the loop fix.
3. [ ] Open a PR summarizing root cause, fix, and test coverage.
   - PR cannot be opened from this local execution. Suggested summary is recorded in Execution Notes below.

---

# Phase 9 – Monitoring and Operations

1. [x] Verify `AppErrorBoundary` still catches unrelated errors after the change (no behavioral regression).
2. [x] Confirm the `web-vitals` CLS reporting is unaffected (it was a false positive in the report).

---

# Phase 10 – Documentation and Knowledge Transfer

1. [x] Add a short code comment in `Tag` explaining why parent notification is handler-driven (prevents effect loops).
2. [x] Note the anti-pattern (effect-based state lifting on unstable deps) in the team's frontend guidelines / PR description for future reuse.

## Execution Notes

- Replaced effect-based parent notification in `Tag` with a handler-driven `commit(next)` flow.
- Stored the latest `selectedTags` callback in a ref so inline parent callbacks do not retrigger notification effects.
- Synced incoming `tags` by content key instead of array reference and removed the `tags = []` default-param loop source.
- Memoized `EditFieldPopUp.handleSelectedTags` with `useCallback`.
- Added `src/ui-components/Tag/Tag.test.jsx` coverage for inline callbacks, Enter-to-add, provided tags, and chip deletion.
- Verification run:
  - `npm test`: passed, 28 files / 71 tests.
  - `npm run lint`: passed with 23 existing warnings and 0 errors.
  - `npm run typecheck`: passed.
  - `npm run build`: passed with existing Tailwind and chunk-size warnings.
  - `npm run build:check`: passed.
  - `npm run dev -- --port 3001 --host 127.0.0.1`: app served on `http://127.0.0.1:3001/` and returned `HTTP/1.1 200 OK`.
- PR summary draft: Fix the DynamicForm Tag editor maximum-update-depth crash by moving parent notification out of effects and into user-action handlers; add regression tests for inline callbacks and tag mutations; confirm full tests, lint, typecheck, build, build output check, AppErrorBoundary, and web-vitals reporting remain green.
