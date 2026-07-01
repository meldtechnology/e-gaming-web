import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { LicenseForm } from "./index";

const mocks = vi.hoisted(() => ({
  checkPermission: vi.fn(),
  getItem: vi.fn(),
  html2pdf: vi.fn(),
  modifyDocument: vi.fn(),
  storeItem: vi.fn(),
}));

vi.mock("../../services/autorization", () => ({
  checkPermission: mocks.checkPermission,
}));

vi.mock("../../services", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getItem: mocks.getItem,
    storeItem: mocks.storeItem,
    UpdateDocumentService: () => ({ modifyDocument: mocks.modifyDocument }),
  };
});

vi.mock("react-qr-code", () => ({
  default: ({ size, value }) => <div data-testid="license-form-qr" data-size={size} data-value={value} />,
}));

vi.mock("html2pdf.js", () => ({
  default: mocks.html2pdf,
}));

const issuedLicense = {
  invoiceNumber: "ESGC-INV-003",
  reference: "ESGC-REF-003",
  fileName: "Sports Betting License",
  issuedOn: "2026-01-15T00:00:00.000Z",
  expiresOn: "2027-01-15T00:00:00.000Z",
  validity: 365,
  applicant: {
    name: "PDF Gaming Ltd",
    address: "3 Example Road, Enugu",
  },
};

describe("LicenseForm PDF export", () => {
  beforeEach(() => {
    mocks.checkPermission.mockReturnValue(true);
    mocks.getItem.mockImplementation((key) => {
      if (key === "ld") return JSON.stringify(issuedLicense);
      if (key === "profile") return JSON.stringify({ username: "issuer", publicId: "user-1" });
      return undefined;
    });

    const chain = {
      set: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      save: vi.fn().mockReturnThis(),
    };
    mocks.html2pdf.mockReturnValue(chain);
  });

  it("keeps the html2pdf filename and exports the license template element", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <LicenseForm />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: "Download License (PDF)" }));

    await waitFor(() => {
      expect(mocks.html2pdf).toHaveBeenCalledTimes(1);
    });

    const chain = mocks.html2pdf.mock.results[0].value;
    expect(chain.set).toHaveBeenCalledWith({ filename: "license.pdf" });
    expect(chain.from).toHaveBeenCalledWith(document.getElementById("license-id"));
    expect(chain.save).toHaveBeenCalledTimes(1);
  });
});
