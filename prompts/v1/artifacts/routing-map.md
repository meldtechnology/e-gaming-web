# Routing Refactor Map

Generated for task 1.5 and used by Phase 2 design tasks.

## Encrypted ID Redirects

| Old path | Current screen | New readable path | URL builders to update |
| --- | --- | --- | --- |
| `/app/documents/T_46042b50` | `Types` | `/app/documents/types` | `src/ui-components/NavBar/Document/index.jsx` |
| `/app/documents/F_322f9837` | `Files` | `/app/documents/files` | `src/ui-components/NavBar/Document/index.jsx`, `src/ui-components/Form/AddAttachment/index.jsx`, `src/pages/Documents/DocumentFormBuilder/index.jsx` |
| `/app/documents/F_D5N2M19` | `DocumentFormBuilder` | `/app/documents/files/form-builder` | `src/ui-components/Datatable/FileDatatable/index.js` |
| `/app/documents/F_EAD5665` | `AddAttachment` | `/app/documents/files/attachments` | `src/ui-components/Form/FileForm/index.jsx` |
| `/app/documents/R_SHFB95GH` | `DocumentReviewer` | `/app/applications/review` | `src/ui-components/Datatable/ApplicationDataTable/index.jsx` |
| `/app/licenses/L_10O9I78` | `LicenseForm` | `/app/licenses/form` | `src/ui-components/Datatable/LicenseDataTable/index.jsx` |
| `/app/licenses/L_10O9I00` | `QRCodeMaker` | `/app/licenses/qr-code` | `src/ui-components/Datatable/LicenseDataTable/index.jsx` |
| `/app/reports/R_1786101` | `ReportPayment` | `/app/reports/payments` | `src/ui-components/ReportNavBar/index.jsx` |
| `/app/reports/R_1786100` | `ReportApplication` | `/app/reports/applications` | `src/ui-components/ReportNavBar/index.jsx` |

## Existing Plain Admin Paths

These paths stay unchanged:

- `/app/dashboard`
- `/app/users`
- `/app/users/profile`
- `/app/users/_new`
- `/app/users/_edit`
- `/app/documents`
- `/app/applications`
- `/app/licenses`
- `/app/reports`

## Router Ownership

- `src/routes/ProtectedRoutes.js` currently declares every admin URL as a clone rendering `<AppLayout />`.
- `src/layout/PagesRoute/index.jsx` maps path fragments to screen components.
- `src/layout/AppLayout/index.js` derives the page key with `location.pathname.substring(...)`.

Phase 2 should replace this with `/app` as a secured layout route, readable child routes, and `<Navigate replace>` entries from every old encrypted path.
