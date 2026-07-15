# Routing Map

Routes are declared through `src/routes/index.js`, which combines public routes, protected admin routes, and the unavailable route.

Authenticated admin routes live under `/app` in `src/routes/ProtectedRoutes.js`. `/app` renders `SecuredRoute`, then `AppLayout`, then the matching child screen through `<Outlet />`.

## Admin Routes

| Path | Screen | Permission |
| --- | --- | --- |
| `/app` | redirects to `/app/dashboard` | authenticated |
| `/app/dashboard` | Dashboard | authenticated |
| `/app/_primitives` | Primitive gallery | authenticated |
| `/app/users` | Users | `CAN_VIEW_USERS` |
| `/app/users/profile` | Profile | `CAN_VIEW_PROFILE` |
| `/app/users/_new` | New user | `CAN_CREATE_USER` |
| `/app/users/_edit` | Edit user | `CAN_EDIT_USER` |
| `/app/documents` | Document types | `CAN_VIEW_CATEGORIES` |
| `/app/documents/types` | Document types | `CAN_VIEW_CATEGORIES` |
| `/app/documents/files` | Files | `CAN_VIEW_DOCUMENTS` |
| `/app/documents/files/form-builder` | Document form builder | `CAN_VIEW_DOCUMENTS` |
| `/app/documents/files/attachments` | Add attachment | `CAN_VIEW_DOCUMENTS` |
| `/app/applications` | Applications | `CAN_VIEW_APPLICATIONS` |
| `/app/applications/review` | Application review | `CAN_REVIEW_APPLICATION` or `CAN_APPROVE_APPLICATION` |
| `/app/licenses` | Licenses | `CAN_VIEW_LICENSES` |
| `/app/licenses/form` | License form | `CAN_ISSUE_LICENSE` |
| `/app/licenses/qr-code` | License QR code | `CAN_VIEW_LICENSES` |
| `/app/reports` | Report landing | `CAN_VIEW_REPORTS` |
| `/app/reports/payments` | Payment report | `CAN_GENERATE_REPORT` |
| `/app/reports/applications` | Application report | `CAN_GENERATE_REPORT` |

## Legacy Encrypted Redirects

These paths must remain supported for bookmarks and old links:

| Old path | Redirect target |
| --- | --- |
| `/app/documents/T_46042b50` | `/app/documents/types` |
| `/app/documents/F_322f9837` | `/app/documents/files` |
| `/app/documents/F_D5N2M19` | `/app/documents/files/form-builder` |
| `/app/documents/F_EAD5665` | `/app/documents/files/attachments` |
| `/app/documents/R_SHFB95GH` | `/app/applications/review` |
| `/app/licenses/L_10O9I78` | `/app/licenses/form` |
| `/app/licenses/L_10O9I00` | `/app/licenses/qr-code` |
| `/app/reports/R_1786101` | `/app/reports/payments` |
| `/app/reports/R_1786100` | `/app/reports/applications` |

## Guarding Rules

`SecuredRoute` handles authentication for `/app/*`. `PermissionRoute` handles per-screen authorization. Sidebar visibility should use conditional rendering, not CSS-only hiding. Unauthorized deep links should redirect instead of rendering hidden content.

## Tests

Route behavior is covered by:
- `src/routes/routes.smoke.test.tsx`
- `src/routes/ProtectedRoutes.test.jsx`
- `src/layout/AppLayout/SecuredRoute.test.jsx`
