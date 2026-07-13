# Visual Parity Procedure

Visual parity is a release gate for every phase and module.

## Invariants

Do not unintentionally change:
- raw hex color values
- fonts
- layout proportions
- URLs
- user flows
- OAuth redirects
- public apply funnel steps
- license QR/PDF behavior

`src/styles/tailwind.css` raw `:root` variables are the color source of truth. New semantic aliases may reference them, but existing raw values should not be edited without explicit approval.

## Baseline Screenshots

Baseline screenshots are stored in:

```text
prompts/v1/artifacts/baseline-screenshots/
```

They include light and dark captures for admin, public, OAuth, apply, report, license, and legacy encrypted routes.

## Manual Check

For each touched module:

1. Run the validation commands:
   ```bash
   npm run typecheck
   npm run typecheck:strict
   npm run lint
   npm run test -- --run
   npm run build
   npm run build:check
   ```
2. Open the touched routes in light mode.
3. Compare against the light baseline screenshots.
4. Toggle dark mode.
5. Compare against the dark baseline screenshots.
6. Verify preserved URLs and legacy redirects.
7. Verify permission gates.
8. Verify loading, empty, error, and populated states.
9. Log any intentional polish delta in `prompts/v1/artifacts/`.

## Known Limitation

There is no Playwright, Cypress, Percy, Chromatic, or computed-style image-diff harness installed. Pixel-level parity remains a manual gate.

## Intentional Deltas

If a visual change is approved:
- record the route
- record light/dark impact
- record the reason
- include before/after screenshots where possible
- update the relevant release artifact
