# Vite Public Environment Variables

All variables prefixed with `VITE_` are bundled into the client application by Vite. Treat every value below as public build-time configuration, not as a secret.

## Reviewed Source

- `.env`
- `src/config/env.ts`
- Source usage scan for `import.meta.env`, `VITE_*`, and legacy `REACT_APP_*`

## Public Values

- Storage/client config: `VITE_SECURE_LOCAL_STORAGE_HASH_KEY`, `VITE_SECURE_LOCAL_STORAGE_PREFIX`
- App/session config: `VITE_APPLICATION_ID`, `VITE_SESSION_TIME_OUT`
- Public base URLs and validation URLs: `VITE_BASE_URL`, `VITE_VALIDATE_URL`
- Auth endpoint paths: `VITE_AUTHORIZE_URL`, `VITE_LOGOUT_URL`, `VITE_TOKEN_URL`
- User/admin endpoint paths: `VITE_USERS_BASE_URL`, `VITE_USER_METRICS_URL`, `VITE_ADMIN_USER_PROFILE_URL`, `VITE_USER_SIGN_UP_URL`, `VITE_ADMIN_CHANGE_PASSWORD_URL`, `VITE_ADMIN_CHANGE_URL`, `VITE_ADMIN_ENABLE_URL`, `VITE_ADMIN_DISABLE_URL`, `VITE_USER_PROFILE_URL`, `VITE_USER_PERMISSION_URL`, `VITE_ENTITY_METRICS_URL`
- Verification and role endpoint paths: `VITE_VERIFY_OTP_URL`, `VITE_VERIFY_IDENTITY_URL`, `VITE_ROLES_URL`
- Document endpoint paths: `VITE_DOCUMENTS_BASE_URL`, `VITE_DOCUMENT_UPLOAD_URL`, `VITE_DOCUMENT_METRIC_URL`, `VITE_DOCUMENT_TYPE_URL`, `VITE_DOCUMENT_FILE_URL`, `VITE_CREATE_DOCUMENT_URL`, `VITE_GENERATE_DOCUMENT_REFERENCE_URL`, `VITE_DOCUMENT_FILE_PUBLIC_URL`, `VITE_DOCUMENT_FILTER_FILE_PUBLIC_URL`, `VITE_DOCUMENT_CYCLE_URL`, `VITE_FEE_TYPE_URL`, `VITE_FORM_TEMPLATE_URL`, `VITE_FORM_COMPONENTS_URL`, `VITE_DOCUMENTS_LICENSE_METRICS_URL`, `VITE_DOCUMENTS_LICENSE_NUMBER_URL`, `VITE_DOCUMENTS_REPORT_METRICS_URL`
- Payment/report endpoint paths: `VITE_PAYMENTS_BASE_URL`, `VITE_CREATE_PAYMENTS_BASE_URL`, `VITE_PAYMENTS_METRIC_URL`, `VITE_REPORTS_BASE_URL`, `VITE_REPORTS_V2_BASE_URL`, `VITE_APPLICATION_REPORT_URL`, `VITE_V2_APPLICATION_REPORT_URL`, `VITE_PAYMENT_REPORT_URL`

## Findings

- No `VITE_*` client secret, private key, password value, or server-only token was found.
- `VITE_TOKEN_URL` and `VITE_ADMIN_CHANGE_PASSWORD_URL` are endpoint URLs, not token/password values.
- `VITE_SECURE_LOCAL_STORAGE_HASH_KEY` is exposed to the browser and must not be treated as a server secret. It can only provide client-side obfuscation/integrity for persisted browser data.
- Runtime auth tokens are stored after OAuth login and are not sourced from build-time env variables.
