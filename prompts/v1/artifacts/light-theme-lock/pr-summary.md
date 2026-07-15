# Public Routes Light-Theme Lock

## Summary

- Locks the public route subtree to light mode in `src/layout/PublicLayout/index.js` with a nested light MUI provider and `.theme-light` scope.
- Extends the light semantic token selector in `src/styles/tailwind.css` to include `.theme-light`, and sets inherited foreground/background/color-scheme values for public descendants.
- Removes remaining public `dark:` Tailwind variants from the email OTP form so global `<html>.dark` no longer changes public OTP styling.
- Adds a focused `PublicLayout` test proving public descendants receive MUI light mode while the global app preference remains dark.

## Verification

- `npm run typecheck`
- `npm run lint` exits 0 with existing warnings.
- `npm test`
- `npm run build`
- `NODE_PATH=/Users/josleke/.npm/_npx/a4d0c66fe73b166b/node_modules node prompts/v1/artifacts/light-theme-lock/public-light-check.runner.cjs`

## Screenshots

- `prompts/v1/artifacts/light-theme-lock/sign-in-global-dark-forced-light.png`
- `prompts/v1/artifacts/light-theme-lock/apply-global-dark-forced-light.png`
- `prompts/v1/artifacts/light-theme-lock/verify-email-otp-global-dark-forced-light.png`

## Notes

- Browser route probe passed for all 16 public routes with OS dark emulation and encrypted stored `themeMode=dark`.
- PR creation is pending because this workspace lacks `gh`, and the branch has unrelated uncommitted changes that should not be swept into a PR commit.
