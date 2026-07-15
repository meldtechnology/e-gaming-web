import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { env } from "../../config/env";
import { LicenseTemplate } from "./index";

vi.mock("react-qr-code", () => ({
  default: ({ size, value, className }) => (
    <div data-testid="license-template-qr" data-size={size} data-value={value} className={className} />
  ),
}));

const license = {
  invoiceNumber: "ESGC-INV-001",
  reference: "ESGC-REF-001",
  fileName: "Sports Betting License",
  issuedOn: "2026-01-15T00:00:00.000Z",
  expiresOn: "2027-01-15T00:00:00.000Z",
  validity: 365,
  applicant: {
    name: "Example Gaming Ltd",
    address: "1 Example Road, Enugu",
  },
};

describe("LicenseTemplate QR output", () => {
  it("renders the unchanged license content and QR validation payload", () => {
    render(<LicenseTemplate license={license} />);

    expect(screen.getByText("GAMING/LOTTERY LICENSE")).toBeInTheDocument();
    expect(screen.getByText("Example Gaming Ltd")).toBeInTheDocument();
    expect(screen.getByText(/Reference #: ESGC-REF-001/)).toBeInTheDocument();

    const qr = screen.getByTestId("license-template-qr");
    expect(qr).toHaveAttribute("data-size", "64");
    expect(qr).toHaveAttribute("data-value", `${env.VALIDATE_URL}ESGC-INV-001`);
  });
});
