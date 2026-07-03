import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ApplicationList } from "./index";

const mocks = vi.hoisted(() => ({
  getDocumentService: vi.fn(),
}));

vi.mock("../../services", () => ({
  GetDocumentService: mocks.getDocumentService,
}));

vi.mock("../Datatable", () => ({
  ApplicationDataTable: ({ data, nextPage, previousPage }) => (
    <div>
      <div>{data[0]?.reference}</div>
      <button type="button" onClick={previousPage}>
        Previous page
      </button>
      <button type="button" onClick={nextPage}>
        Next page
      </button>
    </div>
  ),
}));

describe("ApplicationList", () => {
  beforeEach(() => {
    mocks.getDocumentService.mockReturnValue({
      documents: {
        data: {
          results: [],
          page: 1,
          previousPage: 0,
          nextPage: 0,
          totalPages: 1,
        },
      },
    });
  });

  it("keeps the applications table shell available", () => {
    render(
      <MemoryRouter>
        <ApplicationList />
      </MemoryRouter>
    );

    expect(screen.getByText("No applications available")).toBeInTheDocument();
  });

  it("renders application rows and requests the next page", async () => {
    const user = userEvent.setup();
    mocks.getDocumentService.mockReturnValue({
      documents: {
        data: {
          results: [{ reference: "ESGC-APP-001" }],
          page: 1,
          previousPage: 0,
          nextPage: 2,
          totalPages: 2,
        },
      },
    });

    render(
      <MemoryRouter>
        <ApplicationList status="/status/PENDING" />
      </MemoryRouter>
    );

    expect(screen.getByText("ESGC-APP-001")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Next page" }));

    expect(mocks.getDocumentService).toHaveBeenLastCalledWith(
      expect.stringContaining("/status/PENDING?page=2&size=10&sortIn=DESC"),
    );
  });
});
