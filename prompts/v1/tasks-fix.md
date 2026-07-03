# Task List — Fix `Cannot convert undefined or null to object` in FormBuilder

## Overview

- Source Plan: prompts/v1/fix.md
- Generated On: 2026-07-02
- Methodology: Phased, dependency-ordered, traceable to source plan
- Granularity: Single-objective, independently verifiable tasks
- Note: The core code fix is present at
  `src/ui-components/FormBuilder/index.jsx:89` and was committed as
  `361be52 Fix FormBuilder missing template crash`. Tasks below focus on
  confirming, testing, hardening, and shipping that change.

---

# Phase 1 – Discovery and Analysis

1. [x] Confirm the crash root cause in `src/ui-components/FormBuilder/index.jsx:89`: `Object.keys(fileObject?.formTemplate)` throws when `fileObject` exists but `formTemplate` is undefined.
2. [x] Trace the reproduction path: `DocumentFormBuilder` reads `rhData` from storage and passes it as `fileData`; documents never saved with a template carry no `formTemplate` key.
3. [x] Review the null-safe reference pattern in the sibling `src/ui-components/Model/FormBuilderModal/index.jsx:90` (`!!(fileObject?.formTemplate)`) to confirm the intended guard style.
4. [x] Confirm current state of the fix in the working tree vs. the plan's target diff (already applied and committed).

---

# Phase 2 – Frontend Implementation

1. [x] Verify `src/ui-components/FormBuilder/index.jsx:89` uses the short-circuit guard: `(fileObject?.formTemplate && Object.keys(fileObject.formTemplate).length > 0) ? fileObject.formTemplate : extractTemplate(template)`.
2. [x] Confirm the original intent is preserved: non-empty saved template used as-is; missing or empty `{}` template falls back to `extractTemplate(template)`.
3. [x] Ensure no other call site invokes `Object.keys()` on an unguarded `fileObject?.formTemplate` (grep `Object.keys(fileObject` across `src/ui-components`).

---

# Phase 3 – Testing and Quality Assurance

1. [x] Add a regression unit/component test for `FormBuilder` (none exists today) covering: document with no `formTemplate` renders the blank template from `extractTemplate` without throwing.
2. [x] Add a test case: document with a non-empty saved `formTemplate` renders that saved template.
3. [x] Add a test case: document with an empty `formTemplate` (`{}`) falls back to `extractTemplate(template)`.
4. [ ] Run the app (`npm run dev`) and open the Form Designer for a document with no saved `formTemplate` (Documents → Files → open designer); confirm it renders instead of crashing into `AppErrorBoundary`.
   - Terminal verification completed: Vite served successfully on `http://127.0.0.1:3001/` and returned `HTTP/1.1 200 OK`. Authenticated document data/session was not available for this manual path.
5. [ ] Open a document that has a saved `formTemplate` and confirm the saved template still loads.
   - Covered by `src/ui-components/FormBuilder/FormBuilder.test.jsx`; authenticated manual browser confirmation remains pending.
6. [ ] Confirm the browser console shows no `Cannot convert undefined or null to object` error.
   - Covered by the no-throw regression test for the missing `formTemplate` branch; authenticated browser-console confirmation remains pending.
7. [x] Run the existing test suite (`npm test`) and lint to confirm no regressions.

---

# Phase 4 – Deployment and Release

1. [x] Stage and commit the fix to `src/ui-components/FormBuilder/index.jsx` (and the new test) on the current branch with a descriptive message referencing the crash.
2. [ ] Verify the change is included in the next build/deploy of the app.
   - `npm run build` passes locally; deployment verification remains pending until the next deployment runs.

---

# Phase 5 – Documentation and Knowledge Transfer

1. [x] Update `prompts/v1/fix.md` (or mark it resolved) once the fix is committed and verified.
2. [x] Note the null-safe guard convention for `Object.keys` on optional objects so future FormBuilder-style components follow the same pattern.

## Execution Notes

- Added regression coverage in `src/ui-components/FormBuilder/FormBuilder.test.jsx`.
- Committed the scoped fix with message `Fix FormBuilder missing template crash`.
- Verification run:
  - `npm test -- FormBuilder.test.jsx`: passed, 3 tests.
  - `npm test`: passed, 28 files / 71 tests.
  - `npm run lint`: passed with 23 existing warnings and 0 errors.
  - `npm run build`: passed with existing Tailwind and chunk-size warnings.
  - `npm run build:check`: passed.
  - `npm run dev -- --port 3001 --host 127.0.0.1`: app served on `http://127.0.0.1:3001/` and returned `HTTP/1.1 200 OK`.
