import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Dashboard } from "./index";

const mocks = vi.hoisted(() => ({
  checkPermission: vi.fn(),
  getDocumentService: vi.fn(),
  getPaymentService: vi.fn(),
  getUsersService: vi.fn(),
}));

vi.mock("../../services/autorization", () => ({
  checkPermission: mocks.checkPermission,
}));

vi.mock("../../services", () => ({
  GetDocumentService: mocks.getDocumentService,
  GetPaymentService: mocks.getPaymentService,
  GetUsersService: mocks.getUsersService,
}));

vi.mock("../../ui-components/DashBoardReport", () => ({
  Analytic: ({ license }) => <div>Analytics license {license}</div>,
  LatestReport: () => <div>Latest report</div>,
  StackBarReport: () => <div>Stack bar report</div>,
}));

describe("Dashboard module", () => {
  beforeEach(() => {
    mocks.checkPermission.mockReturnValue(true);
    mocks.getPaymentService.mockReturnValue({
      payments: {
        data: {
          totalVolume: 1250000,
          totalCount: 12,
          unpaidVolume: 200000,
          overDueVolume: 50000,
        },
      },
    });
    mocks.getDocumentService.mockReturnValue({
      documents: { data: { total: 8, totalMonthly: 3 } },
    });
    mocks.getUsersService.mockReturnValue({ users: { data: 5 } });
  });

  it("renders dashboard metrics, analytics, and latest report", () => {
    render(<Dashboard />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Total Revenue")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
    expect(screen.getByText("Analytics license 3.0")).toBeInTheDocument();
    expect(screen.getByText("Latest report")).toBeInTheDocument();
  });

  it("renders the restricted welcome state without dashboard metrics", () => {
    mocks.checkPermission.mockReturnValue(false);

    render(<Dashboard />);

    expect(
      screen.getByText("Welcome to the Enugu State Gaming Commission"),
    ).toBeInTheDocument();
    expect(screen.queryByText("Total Revenue")).not.toBeInTheDocument();
  });
});
