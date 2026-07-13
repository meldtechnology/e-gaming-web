import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Report } from "./Report";
import { ReportApplication } from "../../ui-components/ReportApplication";
import { ReportPayment } from "../../ui-components/ReportPayment";

vi.mock("../../ui-components/ReportApplicationGroup", () => ({
  ReportApplicationGroup: () => <div>Application report form</div>,
}));

vi.mock("../../ui-components/ReportPayment/ReportPaymentGroup", () => ({
  ReportPaymentGroup: () => <div>Payment report form</div>,
}));

describe("Reports module", () => {
  it("renders the default application report route shell", () => {
    render(
      <MemoryRouter>
        <Report />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Report" })).toBeInTheDocument();
    expect(screen.getByText("Application Report")).toBeInTheDocument();
    expect(screen.getByText("Application report form")).toBeInTheDocument();
  });

  it("renders report navigation links and opens the compact menu", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ReportApplication />
      </MemoryRouter>,
    );

    const paymentLinks = screen.getAllByRole("link", { name: "Payments" });
    const applicationLinks = screen.getAllByRole("link", { name: "Applications" });
    const compactMenu = paymentLinks[1].closest("ul")?.parentElement;

    expect(paymentLinks[0]).toHaveAttribute(
      "href",
      "/app/reports/payments",
    );
    expect(applicationLinks[0]).toHaveAttribute(
      "href",
      "/app/reports/applications",
    );
    expect(compactMenu).toHaveClass("hidden");

    await user.click(screen.getByRole("button"));

    expect(compactMenu).not.toHaveClass("hidden");
  });

  it("renders the payment report route shell", () => {
    render(
      <MemoryRouter>
        <ReportPayment />
      </MemoryRouter>,
    );

    expect(screen.getByText("Payment Report")).toBeInTheDocument();
    expect(screen.getByText("Payment report form")).toBeInTheDocument();
  });
});
