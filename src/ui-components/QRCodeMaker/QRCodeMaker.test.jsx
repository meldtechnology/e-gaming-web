import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { env } from "../../config/env";
import { QRCodeMaker } from "./index";

const mocks = vi.hoisted(() => ({
  getItem: vi.fn(),
}));

vi.mock("../../services", () => ({
  getItem: mocks.getItem,
}));

vi.mock("react-qr-code", () => ({
  default: ({ size, value }) => (
    <div data-testid="license-qr-maker-code" data-size={size} data-value={value} />
  ),
}));

describe("QRCodeMaker", () => {
  beforeEach(() => {
    mocks.getItem.mockReturnValue(JSON.stringify({ invoiceNumber: "ESGC-INV-002" }));
  });

  it("uses the stored license invoice number for the validation QR payload", async () => {
    render(
      <MemoryRouter>
        <QRCodeMaker />
      </MemoryRouter>,
    );

    const qr = await screen.findByTestId("license-qr-maker-code");
    expect(qr).toHaveAttribute("data-size", "512");
    expect(qr).toHaveAttribute("data-value", `${env.VALIDATE_URL}ESGC-INV-002`);
  });
});
