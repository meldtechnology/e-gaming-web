import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { License } from "./index";

const mocks = vi.hoisted(() => ({
  checkPermission: vi.fn(),
}));

vi.mock("../../../services/autorization", () => ({
  checkPermission: mocks.checkPermission,
}));

vi.mock("./LicenseList", () => ({
  LicenseList: ({ status }) => <div>License list status: {status}</div>,
}));

describe("License module", () => {
  beforeEach(() => {
    mocks.checkPermission.mockReturnValue(true);
  });

  it("renders issued licenses by default and switches to approved licenses", async () => {
    const user = userEvent.setup();

    render(<License />);

    expect(screen.getByText("Licenses")).toBeInTheDocument();
    expect(screen.getByText("License list status: ISSUED")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Approved" }));

    expect(screen.getByText("License list status: APPROVE")).toBeInTheDocument();
  });

  it("renders the denied state for unauthorized users", () => {
    mocks.checkPermission.mockReturnValue(false);

    render(<License />);

    expect(screen.getByText("Access denied")).toBeInTheDocument();
  });
});
