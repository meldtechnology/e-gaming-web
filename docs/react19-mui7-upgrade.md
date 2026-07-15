# React 19 and MUI v7 Upgrade Notes

The app now targets:
- `react@19.x`
- `react-dom@19.x`
- `@mui/material@7.x`
- `@mui/lab@7.x`
- `@mui/utils@7.x`
- `@mui/x-date-pickers@7.x`

The compatibility audit is recorded in `prompts/v1/artifacts/react19-compatibility-matrix.md`.

## React 19 Changes

Handled:
- Root rendering uses `ReactDOM.createRoot`.
- Testing Library is upgraded for React 19.
- StrictMode validation was run during the migration.
- Legacy `react-dom/test-utils` usage was avoided in new tests.
- Function component `defaultProps` and ref conventions were reviewed during the migration.

Remaining debt:
- `react-helmet` still brings a `react-side-effect` peer warning that does not include React 19 in its peer range.
- Some older public-page dependencies remain candidates for replacement during a future cleanup pass.

## MUI v7 Changes

Handled:
- Legacy `@material-ui/core` v4 imports were replaced with MUI v7 equivalents.
- MUI is now mode-synced through `AppThemeProvider`.
- Public/OAuth/date-picker surfaces remain MUI-owned.

Known warnings:
- Sign-in route tests still emit MUI Grid v7 warnings for removed `item`, `xs`, and `md` props.
- These warnings do not fail the build or tests, but the affected public sign-in layout should be manually inspected before release.

## Validation Commands

Run:

```bash
npm run typecheck
npm run typecheck:strict
npm run lint
npm run test -- --run
npm run build
```

Expected current state:
- Typecheck passes.
- Strict typecheck passes for the configured typed subset.
- Lint has zero errors and known warnings.
- Tests pass.
- Build passes with known Vite/Browserslist/Tailwind/chunk warnings.
