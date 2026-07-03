# Fix: `Cannot convert undefined or null to object` in FormBuilder

Status: resolved in the working tree and covered by regression tests on
2026-07-02.

## Symptom

Opening a document in the **Form Designer** crashes the React tree and trips the
`AppErrorBoundary`:

```
Cannot convert undefined or null to object
    at Object.keys (<anonymous>)
    at FormBuilder (index.jsx:89:57)

The above error occurred in the <FormBuilder> component.
React will try to recreate this component tree from scratch using the error
boundary you provided, AppErrorBoundary.
```

## Root cause

`src/ui-components/FormBuilder/index.jsx:89` (original):

```jsx
data={(Object.keys(fileObject?.formTemplate).length > 0) ?
  fileObject?.formTemplate : extractTemplate(template)}
```

The optional chaining `fileObject?.formTemplate` only guards against `fileObject`
itself being null. When `fileObject` exists but has **no** `formTemplate`
(a brand-new document that was never saved with a template), the expression
evaluates to `undefined`. `Object.keys(undefined)` then throws
`Cannot convert undefined or null to object`, crashing the component before it
can render.

Reproduction path: `DocumentFormBuilder` reads `rhData` from storage and passes
it as `fileData`. Documents that have never had a template saved carry no
`formTemplate` key, so the designer could not be opened for them.

The sibling component `src/ui-components/Model/FormBuilderModal/index.jsx:90`
already uses a null-safe guard (`!!(fileObject?.formTemplate)`), confirming the
expected pattern.

## Production fix

**File:** `src/ui-components/FormBuilder/index.jsx` (line 89)

```diff
- data={(Object.keys(fileObject?.formTemplate).length > 0) ?
-   fileObject?.formTemplate : extractTemplate(template)}
+ data={(fileObject?.formTemplate && Object.keys(fileObject.formTemplate).length > 0) ?
+   fileObject.formTemplate : extractTemplate(template)}
```

The `fileObject?.formTemplate &&` short-circuit ensures `Object.keys` is never
called on a null/undefined value, eliminating the crash. The original intent is
preserved: a non-empty saved template is used as-is, while a missing (or empty
`{}`) template falls back to the blank template derived from the server template
via `extractTemplate(template)`.

## Verification

1. Run the app (`npm run dev`).
2. Open the Form Designer for a document with **no** saved `formTemplate`
   (Documents → Files → open designer). Previously crashed into
   `AppErrorBoundary`; now renders the blank template from `extractTemplate`.
3. Open a document that **does** have a saved `formTemplate` and confirm the
   saved template still loads.
4. Confirm no `Cannot convert undefined or null to object` error in the console.

Automated verification completed on 2026-07-02:

- `npm test -- FormBuilder.test.jsx`: passed, including missing, non-empty, and
  empty `formTemplate` cases.
- `npm test`: passed, 28 test files / 71 tests.
- `npm run lint`: passed with 23 existing warnings and 0 errors.
- `npm run build`: passed with existing Tailwind config and chunk-size warnings.
- `npm run build:check`: passed.
- `npm run dev -- --port 3001 --host 127.0.0.1`: served the app and returned
  `HTTP/1.1 200 OK`.

Guard convention: do not call `Object.keys` on an optional object unless the
object has first been guarded, for example
`value && Object.keys(value).length > 0`.
