import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useNavigate, useRoutes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import { removeAll, storeItem } from "../services";

vi.mock("../layout/AppLayout", async () => {
  const { Outlet } = await vi.importActual("react-router-dom");
  return { default: () => <Outlet /> };
});

vi.mock("../pages/Dashboard", () => ({ Dashboard: () => <div>Dashboard Screen</div> }));
vi.mock("../pages/Users", () => ({ Users: () => <div>Users Screen</div> }));
vi.mock("../pages/Users/Profile", () => ({ Profile: () => <div>Profile Screen</div> }));
vi.mock("../pages/Users/NewUser", () => ({ NewUser: () => <div>New User Screen</div> }));
vi.mock("../pages/Users/EditUser", () => ({ EditUser: () => <div>Edit User Screen</div> }));
vi.mock("../pages/Documents/Types", () => ({ Types: () => <div>Types Screen</div> }));
vi.mock("../pages/Documents/Files", () => ({ Files: () => <div>Files Screen</div> }));
vi.mock("../pages/Documents/DocumentFormBuilder", () => ({ DocumentFormBuilder: () => <div>Builder Screen</div> }));
vi.mock("../ui-components/Form/AddAttachment", () => ({ AddAttachment: () => <div>Attachment Screen</div> }));
vi.mock("../pages/Documents", () => ({ Documents: () => <div>Applications Screen</div> }));
vi.mock("../pages/Documents/DocumentReviewer", () => ({ DocumentReviewer: () => <div>Reviewer Screen</div> }));
vi.mock("../pages/Documents/License", () => ({ License: () => <div>License Screen</div> }));
vi.mock("../ui-components/LicenseForm", () => ({ LicenseForm: () => <div>License Form Screen</div> }));
vi.mock("../ui-components/QRCodeMaker", () => ({ QRCodeMaker: () => <div>QR Screen</div> }));
vi.mock("../pages/report/Report", () => ({ Report: () => <div>Report Screen</div> }));
vi.mock("../ui-components/ReportPayment", () => ({ ReportPayment: () => <div>Payment Report Screen</div> }));
vi.mock("../ui-components/ReportApplication", () => ({ ReportApplication: () => <div>Application Report Screen</div> }));
vi.mock("../pages/PrimitiveGallery", () => ({ PrimitiveGallery: () => <div>Primitive Gallery Screen</div> }));

const allPermissions = [
  "CAN_VIEW_USERS",
  "CAN_VIEW_PROFILE",
  "CAN_CREATE_USER",
  "CAN_EDIT_USER",
  "CAN_VIEW_CATEGORIES",
  "CAN_VIEW_DOCUMENTS",
  "CAN_VIEW_APPLICATIONS",
  "CAN_REVIEW_APPLICATION",
  "CAN_APPROVE_APPLICATION",
  "CAN_VIEW_LICENSES",
  "CAN_ISSUE_LICENSE",
  "CAN_VIEW_REPORTS",
  "CAN_GENERATE_REPORT",
];

const ProtectedRouteHarness = () => useRoutes([ProtectedRoutes]);

const ProtectedRouteHarnessWithBack = () => {
  const navigate = useNavigate();

  return (
    <>
      <button type="button" onClick={() => navigate(-1)}>
        Back
      </button>
      <ProtectedRouteHarness />
    </>
  );
};

const authenticate = (permissions = allPermissions) => {
  storeItem("at", "token");
  storeItem("perm", JSON.stringify({ permissions }));
};

const renderProtectedPath = (path) => {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ProtectedRouteHarness />
    </MemoryRouter>,
  );
};

beforeEach(() => {
  removeAll();
  authenticate();
});

describe("protected route redirects", () => {
  it.each([
    ["/app/documents/T_46042b50", "Types Screen"],
    ["/app/documents/F_322f9837", "Files Screen"],
    ["/app/documents/F_D5N2M19", "Builder Screen"],
    ["/app/documents/F_EAD5665", "Attachment Screen"],
    ["/app/documents/R_SHFB95GH", "Reviewer Screen"],
    ["/app/licenses/L_10O9I78", "License Form Screen"],
    ["/app/licenses/L_10O9I00", "QR Screen"],
    ["/app/reports/R_1786101", "Payment Report Screen"],
    ["/app/reports/R_1786100", "Application Report Screen"],
  ])("redirects %s to the readable route", async (oldPath, expectedText) => {
    renderProtectedPath(oldPath);

    expect(await screen.findByText(expectedText)).toBeInTheDocument();
  });

  it("redirects unauthorized deep links to the dashboard", async () => {
    authenticate([]);

    renderProtectedPath("/app/users");

    expect(await screen.findByText("Dashboard Screen")).toBeInTheDocument();
  });

  it("supports memory back navigation between protected routes", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/app/dashboard", "/app/users"]} initialIndex={1}>
        <ProtectedRouteHarnessWithBack />
      </MemoryRouter>,
    );

    expect(await screen.findByText("Users Screen")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Back" }));

    expect(await screen.findByText("Dashboard Screen")).toBeInTheDocument();
  });
});
