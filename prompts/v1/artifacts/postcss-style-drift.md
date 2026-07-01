# PostCSS / Autoprefixer Style Drift Check

Date: 2026-07-01

Pinned versions:
- `postcss`: `8.4.47`
- `autoprefixer`: `10.4.20`

Build verification:
- Command: `npm run build`
- Result: passed
- CSS asset: `build/assets/index-CgaOHOB9.css`
- CSS SHA-256: `247eecf9373a1f9ca023d8e8f25d64181b9f7b4f0224c077a61fb0aa6dd8760d`

Computed-style diff status:
- No browser computed-style diff harness is installed in the repository.
- The available guard is the pinned PostCSS/autoprefixer versions plus the Vite CSS asset hash above.
- Manual browser inspection remains required before release for pixel/computed-style parity against the baseline screenshots.

Known warnings:
- Browserslist reports `caniuse-lite` is outdated.
- Tailwind warns that both `content` and legacy `purge` are configured.
