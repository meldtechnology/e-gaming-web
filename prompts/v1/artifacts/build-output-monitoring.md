# Build Output Monitoring

Date: 2026-07-01

Current Vite build output:
- Output directory: `build/`
- CSS asset: `build/assets/index-CgaOHOB9.css` at `75.75 kB`
- Main JS asset: `build/assets/index-Cg8S0lDS.js` at `1,460.20 kB`
- Lazy PDF JS asset: `build/assets/html2pdf-BJbb2vGY.js` at `982.47 kB`
- Lazy web-vitals JS asset: `build/assets/web-vitals-CFX8QzIp.js` at `4.31 kB`
- Inter font asset: `build/assets/InterBold-zdiomvYZ.ttf` at `316.58 kB`

Monitoring command:
- `npm run build`
- `npm run build:check`

Budgets in `scripts/check-build-output.mjs`:
- CSS total: `100 kB`
- JS total: `2.75 MB`
- Largest JS asset: `1.6 MB`

Known warnings:
- Vite reports chunks larger than `500 kB`; the current main app chunk and lazy `html2pdf` chunk are known large assets.
- Future regressions should either reduce the chunk, justify the increase in this artifact, or update the budget with release approval.

CRA comparison status:
- A byte-level CRA build artifact is not present in the repository.
- The current Vite output is now the monitored baseline for future deploys.
