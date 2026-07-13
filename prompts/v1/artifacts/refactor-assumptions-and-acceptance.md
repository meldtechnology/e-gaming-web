# Refactor Assumptions And Acceptance

Generated for task 1.8.

## Assumptions

- Existing URLs and user flows are production contracts and must remain stable.
- Existing hex values, fonts, and layout proportions are intentional unless explicitly logged as a polish delta.
- `src/styles/tailwind.css` raw CSS variables are the palette source of truth.
- The first migration target is Vite + incremental TypeScript with `allowJs`; strict typing is tightened per directory later.
- MUI v7 is the target for this plan even though npm latest now reports a newer MUI major.
- React Router can remain v6 during the nested route refactor to reduce blast radius.
- Dark mode currently is not unified; baseline screenshots include a forced/emulated dark pass plus `.dark` class injection for comparison.

## Constraints

- Do not edit existing hex literals in the raw palette.
- Do not change public apply funnel URLs, OAuth redirect URLs, license lookup URL, or `/app/*` admin URLs.
- Old encrypted admin URLs must continue to resolve via redirects after readable routes are introduced.
- Do not reintroduce Tailwind runtime CDN behavior under Vite.
- Keep `build/` as the production output directory.
- Remove `@material-ui/core` and `@material-tailwind/react` before expecting a clean React 19 peer graph.
- Replace CSS-based permission hiding with boolean authorization and conditional rendering, then route guards.

## Visual-Parity Procedure

1. Start from the CRA baseline.
2. Run `npm run build`; record warnings and bundle size.
3. Run the app locally and capture route screenshots at `1440x1000`.
4. Capture both light and dark passes for all public and protected routes.
5. For each implementation phase, capture the same route subset before and after the change.
6. Compare screenshots manually and log every intentional delta.
7. Treat unexpected color, font, spacing, layout, route, or flow deltas as blockers.
8. Repeat focused manual click-through for:
   - OAuth 5-step login redirect flow
   - Public apply funnel
   - License lookup `/documents/licenses/:number`
   - Admin route navigation and old encrypted URL redirects
   - Permission-gated nav and deep links
   - Pagination bounds
   - QR and PDF output

## Baseline Artifacts

- Screenshots: `prompts/v1/artifacts/baseline-screenshots/`
- Env map: `prompts/v1/artifacts/env-rename-map.md`
- Component and hidden-class inventory: `prompts/v1/artifacts/component-inventory.md`
- Routing map: `prompts/v1/artifacts/routing-map.md`
- React 19 compatibility: `prompts/v1/artifacts/react19-compatibility-matrix.md`
- Tailwind CDN audit: `prompts/v1/artifacts/tailwind-cdn-audit.md`
