# Architecture Design

Generated for Phase 2 tasks.

## 2.1 Vite Project Layout

- Move `public/index.html` to root `index.html`.
- Rewrite CRA tokens:
  - `%PUBLIC_URL%/favicon.ico` -> `/favicon.ico`
  - `%PUBLIC_URL%/manifest.json` -> `/manifest.json`
- Add the Vite entry script:

```html
<script type="module" src="/src/index.js"></script>
```

- Keep the module entry at `src/index.js` initially to avoid coupling Vite migration to TypeScript conversion.
- Add `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: 'build',
  },
});
```

- Keep `postcss.config.js` and `tailwind.config.js` in place; Vite will discover PostCSS automatically.
- Remove the invalid Tailwind CDN stylesheet reference after the safelist from `tailwind-cdn-audit.md` is added.
- Keep the `flatpickr` CDN stylesheet until the public/apply funnel modernization phase.
- Build output remains `build/` so the existing Dockerfile deployment shape remains valid.

## 2.2 Incremental TypeScript Strategy

- Replace `jsconfig.json` with `tsconfig.json`; do not rename app entry files during the Vite cutover.
- Initial compiler settings:

```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "allowJs": true,
    "checkJs": false,
    "strict": false,
    "jsx": "react-jsx",
    "noEmit": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "paths": {
      "*": ["*"]
    }
  },
  "include": ["src", "vite.config.ts"]
}
```

- Leaf-first conversion order:
  1. `src/services/formatAmount`
  2. `src/services/datePartExtraxt`
  3. `src/services/unitTens`
  4. `src/services/secureLocalStorage`
  5. `src/core/HttpClientConnector`
  6. `src/core/ApiAdapter/*`
  7. new primitives and new abstractions as `.tsx`
- Keep `prop-types` on unconverted `.jsx` components until their module migration.
- Tighten strictness per owned directory only after that directory is fully `.ts`/`.tsx`.
- Use `.tsx` for new primitives, theme provider, form abstraction, data hook, and route guard types from the start.

## 2.3 API Envelope And Error Shape

Current adapters return raw Axios responses on success and sometimes `{ error: e.response }` on failure. The typed layer should normalize that without breaking service signatures.

```ts
export type ApiError = {
  status?: number;
  code?: string;
  message: string;
  userMessage?: string;
  data?: unknown;
  raw?: unknown;
};

export type ApiResponse<T> = {
  data?: T;
  error?: ApiError;
  status?: number;
  headers?: Record<string, unknown>;
};
```

Normalization rules:

- Axios success -> `{ data: response.data, status: response.status, headers: response.headers }`
- Axios error with response -> `{ error: { status, message, userMessage, data, raw } }`
- Network/unknown error -> `{ error: { message: 'Network request failed', raw } }`
- Preserve backend `error.data.userMessage` because current forms read it directly.

Adapter contract:

```ts
type RequestConfig = AxiosRequestConfig | undefined;
type SwrKey = [endpoint: string, config?: RequestConfig];
```

- `GetCall<T>([endpoint, config])` returns `Promise<ApiResponse<T>>`.
- `PostCall<TPayload, TData>([endpoint, config], { arg })` returns `Promise<ApiResponse<TData>>`.
- `PutCall` and `DeleteCall` follow the same envelope.
- `PostFormCall` keeps `multipart/form-data` behavior but returns the same envelope.

Migration rule: first preserve current exported function names and call shapes, then progressively type service-level aliases (`users`, `documents`, `payments`) on top of `useApi`.

## 2.4 Semantic Token Layer

Keep every existing raw variable in `src/styles/tailwind.css` unchanged. Add semantic aliases after the raw palette inside the same `@layer base` block.

Light-mode aliases in `:root`:

```css
--color-surface: var(--white_a700);
--color-surface-muted: var(--gray_50_01);
--color-surface-raised: var(--gray_200_01);
--color-text-primary: var(--gray_900_01);
--color-text-secondary: var(--gray_600);
--color-text-inverse: var(--white_a700);
--color-brand: var(--indigo_a700);
--color-brand-strong: var(--blue_a700);
--color-border: var(--gray_300);
--color-border-strong: var(--blue_gray_400);
--color-success: var(--green_800_01);
--color-danger: var(--pink_700);
--color-warning: var(--yellow_800);
--color-info: var(--blue_400);
--color-sidebar: var(--blue_gray_900_01);
```

Dark-mode aliases in `.dark`:

```css
--color-surface: var(--gray_900_01);
--color-surface-muted: var(--gray_800);
--color-surface-raised: var(--blue_gray_900);
--color-text-primary: var(--white_a700);
--color-text-secondary: var(--gray_300);
--color-text-inverse: var(--black_900_01);
--color-brand: var(--indigo_a100);
--color-brand-strong: var(--blue_a400);
--color-border: var(--gray_600);
--color-border-strong: var(--blue_gray_400);
--color-success: var(--green_a700);
--color-danger: var(--pink_a100);
--color-warning: var(--amber_500);
--color-info: var(--light_blue_a200);
--color-sidebar: var(--black_900);
```

Tailwind extension names:

```js
colors: {
  surface: 'var(--color-surface)',
  'surface-muted': 'var(--color-surface-muted)',
  'surface-raised': 'var(--color-surface-raised)',
  'text-primary': 'var(--color-text-primary)',
  'text-secondary': 'var(--color-text-secondary)',
  'text-inverse': 'var(--color-text-inverse)',
  brand: 'var(--color-brand)',
  'brand-strong': 'var(--color-brand-strong)',
  border: 'var(--color-border)',
  'border-strong': 'var(--color-border-strong)',
  success: 'var(--color-success)',
  danger: 'var(--color-danger)',
  warning: 'var(--color-warning)',
  info: 'var(--color-info)',
  sidebar: 'var(--color-sidebar)',
}
```

Add these alongside the existing raw color names, not as replacements. Existing classes such as `bg-white-a700`, `text-gray-600`, and `bg-blue_gray-900_01` must keep working.

## 2.5 Unified Light/Dark Theme Mechanism

Create `src/theme/ThemeProvider.tsx` as the single theme owner.

Responsibilities:

- Read initial mode from `secureLocalStorage.getItem('themeMode')`.
- Fall back to `window.matchMedia('(prefers-color-scheme: dark)')`.
- Default to `light` if neither storage nor media query is available.
- Persist mode with `secureLocalStorage.storeItem('themeMode', mode)`.
- Toggle `document.documentElement.classList.toggle('dark', mode === 'dark')`.
- Feed the same `mode` to MUI using existing `getTheme(mode, toggleMode)`.
- Expose `mode`, `setMode`, and `toggleMode` through a small React context.

Provider shape:

```tsx
type ThemeMode = 'light' | 'dark';

type AppThemeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};
```

Composition:

```tsx
<AppThemeContext.Provider value={value}>
  <MuiThemeProvider theme={getTheme(mode, toggleMode)}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
</AppThemeContext.Provider>
```

Wrap `App` at the top level in `src/index.js` or inside `src/App.js`. Prefer `src/App.js` for a smaller Vite entry diff.

Do not reconcile Tailwind semantic tokens with MUI palette hexes. The provider synchronizes mode only; each system keeps its current palette values.

Existing MUI togglers should call the new context instead of storing `window.localStorage.themeMode` directly.

## 2.6 Primitives API

Directory: `src/ui-components/primitives/`

Ref convention: use `forwardRef` for all DOM-backed primitives. Reason: the app begins on React 18, the migration is incremental, and `forwardRef` remains compatible in React 19. Defer ref-as-prop until the whole app is on React 19 and strict typing is stable.

Shared primitive conventions:

- Type props in `.tsx`.
- Accept `className`, `children`, and native element props through `ComponentPropsWithoutRef`.
- Preserve existing class strings first; semantic-token classes are introduced without changing computed colors.
- Use `aria-*` props directly from native prop types.
- Add `focus-visible` rings consistently.
- Keep animations to CSS transitions.

Primitive set:

- `Button`: variants from current `src/ui-components/Button`; props: `variant`, `color`, `size`, `shape`, `leftIcon`, `rightIcon`, `isLoading`, `disabled`.
- `Input`: wraps text, password, number, email; props: `label`, `error`, `helperText`, `required`, `startIcon`, `endIcon`.
- `Card`: low-radius panel with semantic surface/border tokens; no nested-card pattern.
- `Table`: backs `Datatable/*`; props for columns, rows, loading, empty, pagination slot.
- `Modal`: dialog semantics, focus trap target, Escape/overlay close, labelled title.
- `Badge`/`Tag`: status color API with explicit variants instead of arbitrary status class strings.
- `Tabs`: keyboard arrows, active state, route-friendly.
- `Pagination`: `page`, `totalPages`, `onNext`, `onPrevious`, disabled at bounds; default `size=10`.
- `EmptyState`: icon/title/body/action slots.
- `Skeleton`: row/card/text shapes with fixed dimensions.
- `Loader`: wraps existing spinner and adds labelled status.

Export pattern:

```ts
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

Adoption rule: primitives replace ad hoc controls module-by-module; do not perform a repo-wide visual rewrite in the foundation phase.

## 2.7 Nested Router Tree

Target structure:

```jsx
const ProtectedRoutes = {
  path: '/app',
  element: <SecuredRoute />,
  children: [
    {
      element: <AppLayout />,
      children: [
        { index: true, element: <Navigate to="dashboard" replace /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'users', element: <Users /> },
        { path: 'users/profile', element: <Profile /> },
        { path: 'users/_new', element: <NewUser /> },
        { path: 'users/_edit', element: <EditUser /> },
        { path: 'documents', element: <Types /> },
        { path: 'documents/types', element: <Types /> },
        { path: 'documents/files', element: <Files /> },
        { path: 'documents/files/form-builder', element: <DocumentFormBuilder /> },
        { path: 'documents/files/attachments', element: <AddAttachment /> },
        { path: 'applications', element: <Documents /> },
        { path: 'applications/review', element: <DocumentReviewer /> },
        { path: 'licenses', element: <License /> },
        { path: 'licenses/form', element: <LicenseForm /> },
        { path: 'licenses/qr-code', element: <QRCodeMaker /> },
        { path: 'reports', element: <Report /> },
        { path: 'reports/payments', element: <ReportPayment /> },
        { path: 'reports/applications', element: <ReportApplication /> },
        { path: 'documents/T_46042b50', element: <Navigate to="../types" replace /> },
        { path: 'documents/F_322f9837', element: <Navigate to="../files" replace /> },
        { path: 'documents/F_D5N2M19', element: <Navigate to="../files/form-builder" replace /> },
        { path: 'documents/F_EAD5665', element: <Navigate to="../files/attachments" replace /> },
        { path: 'documents/R_SHFB95GH', element: <Navigate to="../applications/review" replace /> },
        { path: 'licenses/L_10O9I78', element: <Navigate to="../form" replace /> },
        { path: 'licenses/L_10O9I00', element: <Navigate to="../qr-code" replace /> },
        { path: 'reports/R_1786101', element: <Navigate to="../payments" replace /> },
        { path: 'reports/R_1786100', element: <Navigate to="../applications" replace /> },
      ],
    },
  ],
};
```

Implementation notes:

- `SecuredRoute` becomes an auth guard that renders `<Outlet />`.
- `AppLayout` renders `LeftSidebar` plus `<Outlet />`.
- Delete `src/layout/PagesRoute/index.jsx`.
- Delete `location.pathname.substring(...)` dispatch logic from `AppLayout`.
- Update route builders listed in `routing-map.md` to use readable paths.
- Keep `/app/documents` mapped to `Types` to preserve current behavior.

## 2.8 Boolean Authorization Contract

Current:

```js
checkPermission(name) // returns '' or 'hidden'
```

Target:

```ts
export const checkPermission = (name: PermissionName): boolean;
export const hasAnyPermission = (names: PermissionName[]): boolean;
```

Rules:

- `checkPermission` reads `perm` from `secureLocalStorage` and returns `true` when the permission exists.
- It never returns CSS class names.
- Components conditionally render authorized controls:

```jsx
{checkPermission('CAN_VIEW_USERS') ? <MenuItem ... /> : null}
```

- Route objects declare optional permission metadata:

```ts
type AppRoute = {
  path: string;
  element: ReactNode;
  permission?: PermissionName | PermissionName[];
};
```

- Route guard behavior:
  - unauthenticated -> `/logout` or `/auth/login` according to existing flow
  - authenticated but unauthorized -> `/app/dashboard` or a dedicated not-authorized screen if introduced later
- Sidebar visibility and route access must use the same permission metadata to avoid drift.

Migration order:

1. Add boolean helpers while temporarily keeping a compatibility helper for old className call sites.
2. Convert `LeftSidebar` first.
3. Convert route guards.
4. Convert module screens and menus.
5. Remove the compatibility helper once no call site expects `'hidden'`.

## 2.9 Cross-Cutting Hooks

### `src/core/data/useApi.ts`

Purpose: centralize the repeated SWR + `headerConfig` + `useAuthenticateCheck` pattern.

```ts
type UseApiOptions<T> = {
  refreshInterval?: number;
  revalidateOnFocus?: boolean;
  dedupingInterval?: number;
  isEmpty?: (data: T | undefined) => boolean;
};

type UseApiResult<T> = {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error: ApiError | undefined;
  isEmpty: boolean;
  mutate: KeyedMutator<ApiResponse<T>>;
};
```

Behavior:

- Builds authenticated config from `headerConfig()`.
- Uses `[endpoint, config]` as the SWR key.
- Calls `useAuthenticateCheck(error)` for 401 handling.
- Normalizes adapter errors into `ApiError`.
- Defaults:
  - `dedupingInterval: 2000`
  - `onErrorRetry`: do not retry 401/403/404; retry transient network/5xx up to a small cap.
- `isEmpty` defaults to:
  - arrays: `length === 0`
  - objects with `data` array: `data.length === 0`
  - null/undefined: true

Compatibility services:

```ts
export const GetUsersService = (endpoint, delay) => {
  const result = useApi<UserPayload>(endpoint, { refreshInterval: delay });
  return { users: result.data, isLoading: result.isLoading, isError: result.isError };
};
```

Repeat the same preserved signatures for `GetDocumentService` and `GetPaymentService`.

### `src/ui-components/form/useAppForm.ts`

Purpose: standardize Formik + Yup usage while preserving existing dynamic form helpers.

```ts
type UseAppFormOptions<TValues> = {
  initialValues?: TValues;
  formTemplate?: DynamicFormGroup[];
  validationSchema?: AnyObjectSchema;
  onSubmit: (values: TValues) => void | Promise<void>;
};
```

Rules:

- If `formTemplate` is supplied, derive initial values with `createInitialValues(formTemplate)`.
- If no explicit schema is supplied, derive schema with `createSchema(formTemplate)`.
- Expose Formik return plus a typed `fields` model.
- Use existing `updateFormValues.updateForm` for dynamic form display values.

### `<AppFormField>`

Props:

- `name`
- `label`
- `type`
- `required`
- `options`
- `formik`
- `component`
- `helperText`

It should render the new `Input`, select, checkbox, upload, and date field primitives over time, but initially can wrap existing field components to preserve visuals.

## 2.10 MUI v4 To v7 Migration And Ownership Boundary

Current legacy v4 usage:

- `src/ui-components/Tag/index.jsx`
  - `@material-ui/core/Chip`
  - `@material-ui/core/TextField`
  - `@material-ui/core/styles/makeStyles`

Target:

- Replace `Chip` and `TextField` with `@mui/material` equivalents.
- Replace `makeStyles` with `sx`, `styled`, or a small local CSS module/class depending on the least visual churn.
- Remove `@material-ui/core` from `package.json`.
- Remove `--legacy-peer-deps` once React 19 and `@material-tailwind/react` blockers are resolved.

Ownership boundary:

- Tailwind + primitives own authenticated `/app/*` admin screens.
- MUI v7 owns:
  - public marketing/application pages
  - OAuth/login pages
  - date picker surfaces
  - chips where already materially MUI-owned
- Do not mix MUI layout components and Tailwind primitives inside a single newly-built control.

MUI v5/v6/v7 checklist:

- Prefer current `Grid` API used by installed target; verify public pages where `Grid item xs={12}` appears.
- Check `@mui/lab` imports for moved/stabilized components.
- Verify date picker adapter versions with `dayjs`.
- Re-run public page visual diff because MUI default spacing, typography, and component internals can shift.
- Keep `src/mui/theme/palette.js` hex values unchanged.
- Continue using `getTheme(mode, themeToggler)`; only the provider owner changes.

React 19 peer blockers to handle in the same dependency plan:

- `@material-ui/core` must be removed.
- `@material-tailwind/react` must be removed or replaced before a clean install without legacy peer flags.

## 2.11 License Validity Utility Contract

Create `src/services/license/validity.ts`.

Types:

```ts
export type LicenseStatus = 'VALID' | 'EXPIRED' | 'UNKNOWN';

export type LicenseValidityInput = {
  issuedOn?: string | Date | null;
  expiresOn?: string | Date | null;
  validity?: number | string | null;
  status?: string | null;
  serverValidityStatus?: string | null;
  now?: Date;
};

export type LicenseValidityResult = {
  status: LicenseStatus;
  isValid: boolean;
  daysRemaining: number | null;
  issuedOnLabel: string;
  expiresOnLabel: string;
  source: 'server' | 'client-fallback' | 'unknown';
};
```

Rules:

- Prefer server-provided `status` or validity status when it clearly says valid/expired.
- If server status is absent, use `expiresOn` as display fallback.
- Normalize date comparisons to a consistent day boundary to avoid timezone edge bugs.
- Invalid/missing dates return `UNKNOWN`, `isValid: false`, and `daysRemaining: null`.
- Preserve current display labels:
  - `VALID`
  - `EXPIRED`
  - `new Date(date).toDateString()` equivalent, but produced from the utility.

Public API:

```ts
export function getLicenseValidity(input: LicenseValidityInput): LicenseValidityResult;
export function formatLicenseDate(date: string | Date | null | undefined): string;
```

Migration targets:

- `src/pages/Documents/License/LicenseDetails/index.jsx`
  - remove local `isValid(expiresDate, type)`
  - render status and classes from `getLicenseValidity(license?.data)`
- `src/ui-components/LicenseTemplate/index.jsx`
  - keep certificate date formatting stable
  - use shared date formatter only if visual output matches current `extractDay/extractMonth/extractYear`

Tests:

- expires tomorrow -> `VALID`
- expires today at local/UTC edge -> deterministic expected result
- expired yesterday -> `EXPIRED`
- missing `expiresOn` -> `UNKNOWN`
- server status valid overrides ambiguous client fallback
- invalid date string -> `UNKNOWN`
