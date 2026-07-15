# React 19 Compatibility Matrix

Generated for task 1.6 from npm metadata on 2026-07-01.

## Target Baseline

- React target: `react@19.2.7`, `react-dom@19.2.7`
- MUI target per task list: MUI v7, not npm latest v9
- Latest MUI v7 patches observed:
  - `@mui/material@7.3.11`
  - `@mui/lab@7.0.0`
  - `@mui/utils@7.3.11`
  - `@mui/x-date-pickers@7.29.4`

## Matrix

| Package | Current | Target / action | React 19 status | Risk |
| --- | ---: | --- | --- | --- |
| `react` | `^18.3.1` | `19.2.7` | Native target | Medium: React 19 behavior/codemods |
| `react-dom` | `^18.3.1` | `19.2.7` | Native target | Medium: verify `createRoot` and effects |
| `@mui/material` | `^5.10.5` | `^7.3.11` | v7 peers include React 19 | Medium: v5->v7 API/default changes |
| `@mui/lab` | `^6.0.0-beta.18` | `^7.0.0` | peers include React 19 | Medium: lab APIs may differ |
| `@mui/utils` | `^6.3.1` | `^7.3.11` | peers include React 19 | Low |
| `@mui/x-date-pickers` | `^7.22.3` | `^7.29.4` | peers include React 19 | Low-medium: date adapter checks |
| `@material-ui/core` | `^4.12.4` | remove / replace with `@mui/material` | v4 peers only React 16/17 | High blocker |
| `@material-tailwind/react` | `^2.1.10` | replace/remove or defer React 19 | peers only React 16/17/18 | High blocker |
| `@headlessui/react` | `^2.1.8` | `^2.2.10` | peers include React 19 | Low |
| `react-helmet` | `^6.1.0` | keep or consider maintained alternative later | peer `react >=16.3` | Low-medium: older package but peer-compatible |
| `react-slick` | `^0.29.0` | `^0.31.0` | peers include React 19 | Medium: visual carousel diff risk |
| `slick-carousel` | `^1.8.1` | keep with `react-slick` | CSS asset package | Low |
| `aos` | `^2.3.4` | keep or remove if unused | no React peer | Low |
| `jarallax` | `^2.0.4` | `^3.0.1` | peers `react >=18` if React wrapper path used | Medium: check public pages |
| `react-visibility-sensor` | `^5.1.1` | keep only if verified, otherwise replace | broad React peer | Medium: old lifecycle behavior possible |
| `react-countup` | `^6.5.3` | keep | peer `react >=16.3` | Low |
| `react-datepicker` | `^4.5.0` | `^9.1.0` | peers include React 19 | Medium: date-fns/date-fns-tz changes |
| `react-router-dom` | `^6.26.2` | `^7.18.1` or stay v6 during routing phase | peers `react >=18` | Medium-high if upgraded to v7 during route refactor |
| `swr` | `^2.2.5` | `^2.4.2` | peers include React 19 | Low |
| `formik` | `^2.4.6` | `^2.4.9` | peer `react >=16.8` | Low |
| `@testing-library/react` | `^13.4.0` | `^16.3.2` | peers include React 19 | Required for React 19 |
| `@testing-library/user-event` | `^13.5.0` | `^14.6.1` | no React peer blocker | Low |
| `uuidv4` | `^6.2.13` | replace with `uuid` during cleanup | no React peer | Low-medium: obsolete package surface |
| `n-krypta` | `^1.0.6` | keep, verify Vite/browser bundle | no React peer | Low-medium |

## Required Actions

1. Remove `@material-ui/core` after migrating its imports to `@mui/material`.
2. Remove or replace `@material-tailwind/react`; it blocks a clean React 19 peer graph.
3. Upgrade Testing Library before React 19 test work.
4. Keep React Router on v6 for the first nested-route refactor unless a separate v7 migration is explicitly scheduled.
5. Treat npm latest MUI v9 as out of scope for this plan; target the latest v7 patch line to limit visual and API churn.
