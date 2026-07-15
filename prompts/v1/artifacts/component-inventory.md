# Component Inventory

Generated for tasks 1.3 and 1.4.

## PaymentInvoice

| Component | Path | Lines | Owning phase/module |
| --- | --- | ---: | --- |
| `PaymentInvoice` | `src/pages/public/Application/Invoice/components/PaymentInvoice/index.jsx` | 336 | Phase 5 Public / Apply funnel |

The component is active and not obsolete. The plan's line count is accurate, but the component is not under `src/ui-components/`.

## Oversized Components

| Component | Path | Lines | Owning phase/module |
| --- | --- | ---: | --- |
| `FileForm` | `src/ui-components/Form/FileForm/index.jsx` | 375 | Module 4c Applications |
| `AddUserForm` | `src/ui-components/Form/AddUserForm/index.jsx` | 319 | Module 4b Users |
| `Selector` | `src/ui-components/Form/VitalForm/component/Selector/index.jsx` | 304 | Shared form layer / Module 4c Applications |
| `EditUserForm` | `src/ui-components/Form/EditUserForm/index.jsx` | 279 | Module 4b Users |
| `PaymentInvoice` | `src/pages/public/Application/Invoice/components/PaymentInvoice/index.jsx` | 336 | Phase 5 Public / Apply funnel |

## Hidden-Class Catalog

Broad scan: 74 files contain `hidden`; this includes conditional Tailwind visibility, static responsive visibility, native `hidden` attributes, `aria-hidden`, and ordinary `overflow-hidden`.

Visibility-control scan: 26 files directly combine `hidden`, `!hidden`, or `checkPermission()` with class/authorization logic. The full migration should still review the broad set because many form-field components use `hidden` for required marks, loaders, and error surfaces.

### Module 4a Dashboard

- `src/pages/Dashboard/index.jsx`

### Module 4b Users

- `src/pages/Users/index.js`
- `src/pages/Users/NewUser/index.jsx`
- `src/pages/Users/EditUser/index.jsx`
- `src/pages/Users/Profile/index.jsx`
- `src/ui-components/UsersList/index.jsx`
- `src/ui-components/UserProfile/index.jsx`
- `src/ui-components/Form/AddUserForm/index.jsx`
- `src/ui-components/Form/EditUserForm/index.jsx`
- `src/ui-components/Popup/index.jsx`
- `src/ui-components/Model/ChangePasswordModal/index.jsx`
- `src/ui-components/Model/ChangeRoleModal/index.jsx`
- `src/ui-components/Model/EnableToggleModal/index.jsx`

### Module 4c Applications / Documents

- `src/pages/Documents/index.jsx`
- `src/pages/Documents/Files/index.jsx`
- `src/pages/Documents/Types/index.jsx`
- `src/ui-components/ApplicationList/index.jsx`
- `src/ui-components/Datatable/ApplicationDataTable/index.jsx`
- `src/ui-components/Datatable/FileDatatable/index.js`
- `src/ui-components/Datatable/TypeDatatable/index.jsx`
- `src/ui-components/DocumentReviewForm/index.jsx`
- `src/ui-components/Form/AddAttachment/index.jsx`
- `src/ui-components/Form/FileForm/index.jsx`
- `src/ui-components/Form/TypeForm/index.jsx`
- `src/ui-components/FormBuilder/index.jsx`
- `src/ui-components/Model/FormBuilderModal/index.jsx`
- `src/ui-components/NavBar/Document/index.jsx`
- `src/ui-components/ReviewForm/index.jsx`

### Module 4d Licenses

- `src/pages/Documents/License/index.jsx`
- `src/pages/Documents/License/LicenseList/index.jsx`
- `src/pages/Documents/License/LicenseDetails/index.jsx`
- `src/ui-components/Datatable/LicenseDataTable/index.jsx`
- `src/ui-components/LicenseForm/index.jsx`
- `src/ui-components/LicenseTemplate/index.jsx`
- `src/ui-components/QRCodeMaker/index.jsx`

### Module 4e Reports

- `src/ui-components/Datatable/ReportDataTable/index.jsx`
- `src/ui-components/ReportApplicationGroup/DownloadSection/index.jsx`
- `src/ui-components/ReportApplicationGroup/FormSection/index.jsx`
- `src/ui-components/ReportNavBar/index.jsx`
- `src/ui-components/ReportPayment/ReportPaymentGroup/DownloadSection/index.jsx`
- `src/ui-components/ReportPayment/ReportPaymentGroup/FormSection/index.jsx`

### Phase 5 Public / Apply / OAuth

- `src/pages/public/Auth/LoadAuthorities/index.jsx`
- `src/pages/public/Auth/LoginRedirect/index.jsx`
- `src/pages/public/Auth/ProcessLogin/index.jsx`
- `src/pages/public/Auth/ProfileAccount/index.jsx`
- `src/pages/public/SignIn/components/Form/Form.js`
- `src/pages/public/SignOut/index.jsx`
- `src/pages/public/EmailVerify/components/Form/Form.js`
- `src/pages/public/Application/Form/components/Hero/Hero.js`
- `src/pages/public/Application/General/components/Products/Products.js`
- `src/pages/public/Application/Invoice/components/Hero/index.js`
- `src/pages/public/Application/Invoice/components/PaymentInvoice/index.jsx`
- `src/pages/public/Application/Operators/components/LatestProducts/LatestProducts.js`
- `src/pages/public/Application/Verification/components/Form/index.jsx`
- `src/pages/public/Application/Verification/index.jsx`
- `src/mui/layouts/Main/Main.js`

### Shared / Cross-Cutting

- `src/services/autorization/checkPermission/index.js`
- `src/ui-components/LeftSidebar/index.jsx`
- `src/ui-components/Alerts/MeldAlert/index.jsx`
- `src/ui-components/CustomerInvoiceInfo/index.jsx`
- `src/ui-components/Form/component/DropDown.jsx`
- `src/ui-components/Form/component/FileUploader.jsx`
- `src/ui-components/Form/component/ImageUploader.jsx`
- `src/ui-components/Form/component/ProgressButton.jsx`
- `src/ui-components/Form/component/TextField.jsx`
- `src/ui-components/Form/component/ToggleSwitch.jsx`
- `src/ui-components/Form/DynamicForm/ComponentSelector/index.jsx`
- `src/ui-components/Form/DynamicForm/TemplateGroupForm/index.jsx`
- `src/ui-components/Form/DynamicForm/components/EditFieldPopUp/index.jsx`
- `src/ui-components/Form/DynamicForm/components/EditGroupPopUp/index.jsx`
- `src/ui-components/Form/DynamicForm/components/FormFieldTypes/index.jsx`
- `src/ui-components/Form/DynamicForm/components/InputCalendar/index.jsx`
- `src/ui-components/Form/DynamicForm/components/InputCurrency/index.jsx`
- `src/ui-components/Form/DynamicForm/components/InputEmail/index.jsx`
- `src/ui-components/Form/DynamicForm/components/InputMobile/index.jsx`
- `src/ui-components/Form/DynamicForm/components/InputNumber/index.jsx`
- `src/ui-components/Form/DynamicForm/components/InputText/index.jsx`
- `src/ui-components/Form/DynamicForm/components/InputTextArea/index.jsx`
- `src/ui-components/Form/VitalForm/FormBuilder/index.jsx`
- `src/ui-components/Form/VitalForm/component/Selector/index.jsx`
- `src/ui-components/Loader/index.jsx`
- `src/ui-components/SearchResult/index.jsx`
- `src/assets/index.css`
