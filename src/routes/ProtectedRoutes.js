import React from "react";
import { Navigate } from "react-router-dom";
import { PermissionRoute, SecuredRoute } from "../layout/AppLayout/SecuredRoute";
import AppLayout from "../layout/AppLayout";
import { Dashboard } from "../pages/Dashboard";
import { Users } from "../pages/Users";
import { Profile } from "../pages/Users/Profile";
import { NewUser } from "../pages/Users/NewUser";
import { EditUser } from "../pages/Users/EditUser";
import { Types } from "../pages/Documents/Types";
import { Files } from "../pages/Documents/Files";
import { DocumentFormBuilder } from "../pages/Documents/DocumentFormBuilder";
import { AddAttachment } from "../ui-components/Form/AddAttachment";
import { Documents } from "../pages/Documents";
import { DocumentReviewer } from "../pages/Documents/DocumentReviewer";
import { License } from "../pages/Documents/License";
import { LicenseForm } from "../ui-components/LicenseForm";
import { QRCodeMaker } from "../ui-components/QRCodeMaker";
import { Report } from "../pages/report/Report";
import { ReportPayment } from "../ui-components/ReportPayment";
import { ReportApplication } from "../ui-components/ReportApplication";
import { PrimitiveGallery } from "../pages/PrimitiveGallery";

const protect = (permission, element) => (
  <PermissionRoute permission={permission}>{element}</PermissionRoute>
);

const ProtectedRoutes = {
  path: "/app",
  element: <SecuredRoute />,
  children: [
    {
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="dashboard" replace />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "_primitives",
          element: <PrimitiveGallery />,
        },
        {
          path: "users",
          element: protect("CAN_VIEW_USERS", <Users />),
        },
        {
          path: "users/profile",
          element: protect("CAN_VIEW_PROFILE", <Profile />),
        },
        {
          path: "users/_new",
          element: protect("CAN_CREATE_USER", <NewUser />),
        },
        {
          path: "users/_edit",
          element: protect("CAN_EDIT_USER", <EditUser />),
        },
        {
          path: "documents",
          element: protect("CAN_VIEW_CATEGORIES", <Types />),
        },
        {
          path: "documents/types",
          element: protect("CAN_VIEW_CATEGORIES", <Types />),
        },
        {
          path: "documents/T_46042b50",
          element: <Navigate to="/app/documents/types" replace />,
        },
        {
          path: "documents/files",
          element: protect("CAN_VIEW_DOCUMENTS", <Files />),
        },
        {
          path: "documents/F_322f9837",
          element: <Navigate to="/app/documents/files" replace />,
        },
        {
          path: "documents/files/form-builder",
          element: protect("CAN_VIEW_DOCUMENTS", <DocumentFormBuilder />),
        },
        {
          path: "documents/F_D5N2M19",
          element: <Navigate to="/app/documents/files/form-builder" replace />,
        },
        {
          path: "documents/files/attachments",
          element: protect("CAN_VIEW_DOCUMENTS", <AddAttachment />),
        },
        {
          path: "documents/F_EAD5665",
          element: <Navigate to="/app/documents/files/attachments" replace />,
        },
        {
          path: "applications",
          element: protect("CAN_VIEW_APPLICATIONS", <Documents />),
        },
        {
          path: "applications/review",
          element: protect(["CAN_REVIEW_APPLICATION", "CAN_APPROVE_APPLICATION"], <DocumentReviewer />),
        },
        {
          path: "documents/R_SHFB95GH",
          element: <Navigate to="/app/applications/review" replace />,
        },
        {
          path: "licenses",
          element: protect("CAN_VIEW_LICENSES", <License />),
        },
        {
          path: "licenses/form",
          element: protect("CAN_ISSUE_LICENSE", <LicenseForm />),
        },
        {
          path: "licenses/L_10O9I78",
          element: <Navigate to="/app/licenses/form" replace />,
        },
        {
          path: "licenses/qr-code",
          element: protect("CAN_VIEW_LICENSES", <QRCodeMaker />),
        },
        {
          path: "licenses/L_10O9I00",
          element: <Navigate to="/app/licenses/qr-code" replace />,
        },
        {
          path: "reports",
          element: protect("CAN_VIEW_REPORTS", <Report />),
        },
        {
          path: "reports/payments",
          element: protect("CAN_GENERATE_REPORT", <ReportPayment />),
        },
        {
          path: "reports/R_1786101",
          element: <Navigate to="/app/reports/payments" replace />,
        },
        {
          path: "reports/applications",
          element: protect("CAN_GENERATE_REPORT", <ReportApplication />),
        },
        {
          path: "reports/R_1786100",
          element: <Navigate to="/app/reports/applications" replace />,
        },
      ],
    },
  ],
};

export default ProtectedRoutes;
