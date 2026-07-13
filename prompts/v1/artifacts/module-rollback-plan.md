# Module Rollback Plan

Date: 2026-07-01

Rollback unit:
- Roll back one module release at a time: dashboard, users, applications, licenses, reports, public/apply.
- Keep the previous Docker image tag and build artifact available for every module release.

Immediate rollback path:
1. Identify the last known-good Docker image tag for the affected module release.
2. Set the deployment host `LATEST` value to that tag.
3. Re-run `docker-compose -f /app/gaming-app.yml up -d`.
4. Verify the affected routes, permission gates, pagination, and any module-specific outputs.

Code revert path:
1. Revert the module release commit or PR.
2. Run `npm run typecheck`, `npm run typecheck:strict`, `npm run lint`, `npm run test -- --run`, and `npm run build`.
3. Build and publish a rollback image tag.
4. Deploy the rollback tag through the same workflow path.

Module-specific checks:
- Dashboard: metrics cards, charts, latest report.
- Users: user table, create/edit/profile routes, permission redirects.
- Applications: application list, review flow, document type/file/builder routes.
- Licenses: issue/download flow, QR payload, PDF export.
- Reports: application/payment report generation and download permissions.
- Public/apply: OAuth redirects and five-step application flow.

Rollback decision rule:
- Roll back immediately for broken login/OAuth, broken public apply flow, inaccessible admin module routes, permission bypass, failed license QR/PDF output, or obvious visual parity regressions.
- For isolated non-blocking visual polish deltas, log the issue and patch forward only if the preserved flow remains functional.
