import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { getItem } from "../../services";
import { checkPermission } from "../../services/autorization";
import { PermissionRoute, SecuredRoute } from "./SecuredRoute";

vi.mock("../../services", () => ({
  getItem: vi.fn(),
}));

vi.mock("../../services/autorization", () => ({
  checkPermission: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  Navigate: ({ to }) => <span data-testid="navigate" data-to={to} />,
  Outlet: () => <span data-testid="outlet" />,
  useLocation: () => ({ pathname: "/app/users" }),
}));

describe("SecuredRoute", () => {
  it("redirects unauthenticated app routes to sign in", () => {
    getItem.mockReturnValue(undefined);

    const markup = renderToStaticMarkup(<SecuredRoute />);

    expect(markup).toContain('data-testid="navigate"');
    expect(markup).toContain('data-to="/sign-in"');
  });

  it("renders nested app routes when authenticated", () => {
    getItem.mockReturnValue("token");

    const markup = renderToStaticMarkup(<SecuredRoute />);

    expect(markup).toContain('data-testid="outlet"');
  });
});

describe("PermissionRoute", () => {
  it("redirects unauthorized deep links to the dashboard", () => {
    checkPermission.mockReturnValue(false);

    const markup = renderToStaticMarkup(
      <PermissionRoute permission="CAN_VIEW_USERS">
        <span>Users</span>
      </PermissionRoute>,
    );

    expect(markup).toContain('data-testid="navigate"');
    expect(markup).toContain('data-to="/app/dashboard"');
  });

  it("renders children when any required permission is granted", () => {
    checkPermission.mockImplementation((permission) => permission === "CAN_APPROVE_APPLICATION");

    const markup = renderToStaticMarkup(
      <PermissionRoute permission={["CAN_REVIEW_APPLICATION", "CAN_APPROVE_APPLICATION"]}>
        <span>Review</span>
      </PermissionRoute>,
    );

    expect(markup).toContain("Review");
  });
});
