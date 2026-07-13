import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { LicenseList } from "./LicenseList";

const mocks = vi.hoisted(() => ({
  getDocumentService: vi.fn(),
}));

vi.mock("../../../services", () => ({
  GetDocumentService: mocks.getDocumentService,
}));

vi.mock("../../../ui-components/Datatable", () => ({
  LicenseDataTable: ({ data, nextPage, previousPage }) => (
    <div>
      <div>{data?.[0]?.reference ?? "No license rows"}</div>
      <button type="button" onClick={previousPage}>
        Previous licenses
      </button>
      <button type="button" onClick={nextPage}>
        Next licenses
      </button>
    </div>
  ),
}));

describe("LicenseList module", () => {
  beforeEach(() => {
    mocks.getDocumentService.mockReturnValue({
      documents: {
        data: {
          results: [{ reference: "ESGC-LIC-001" }],
          page: 1,
          previousPage: 0,
          nextPage: 2,
          totalPages: 2,
        },
      },
      isLoading: false,
    });
  });

  it("queries issued licenses by issued date and paginates", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <LicenseList status="ISSUED" />
      </MemoryRouter>,
    );

    expect(screen.getByText("ESGC-LIC-001")).toBeInTheDocument();
    expect(mocks.getDocumentService).toHaveBeenCalledWith(expect.stringContaining("sortBy=issuedOn"));

    await user.click(screen.getByRole("button", { name: "Next licenses" }));

    expect(mocks.getDocumentService).toHaveBeenLastCalledWith(expect.stringContaining("page=2"));
  });

  it("queries approved licenses by approved date and renders loading state", () => {
    mocks.getDocumentService.mockReturnValueOnce({ isLoading: true });

    render(
      <MemoryRouter>
        <LicenseList status="APPROVE" />
      </MemoryRouter>,
    );

    expect(mocks.getDocumentService).toHaveBeenCalledWith(expect.stringContaining("sortBy=approvedOn"));
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
