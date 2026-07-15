# Incremental Ship Plan

Date: 2026-07-01

Foundation release:
- Scope: Vite, React 19, incremental TypeScript, semantic theme wiring, primitives, nested routes, `useApi`, `useAppForm`, and CI.
- Required gates: `npm run typecheck`, `npm run typecheck:strict`, `npm run lint`, `npm run test -- --run`, `npm run build`.
- Release only after manual light/dark click-through of preserved URLs and OAuth/apply entry points.

Module release order:
1. Dashboard
2. Users
3. Applications
4. Licenses
5. Reports
6. Public/apply funnel

Per-module ship gate:
- Confirm old and readable URLs still resolve or redirect correctly.
- Confirm permissions hide navigation by non-render and unauthorized deep links redirect.
- Confirm loading, empty, error, and populated states.
- Confirm pagination bounds disable correctly and table requests use `size=10` for module tables.
- Confirm light and dark visual parity against baseline screenshots.
- Confirm no intentional color/font/layout/flow delta is introduced without being logged.

Special gates:
- Licenses: verify QR payloads and `html2pdf.js` export behavior before release.
- Public/apply funnel: verify the full five-step application flow and OAuth redirects.
- Reports: verify generated download links and report permissions.

Release sequencing:
- Keep each module deploy independently revertible.
- Release one module at a time after the foundation is stable.
- Do not merge the next module into production until the current module has passed post-deploy smoke checks.
