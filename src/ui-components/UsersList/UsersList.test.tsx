import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { UsersList } from "./index";

const mocks = vi.hoisted(() => ({
  checkPermission: vi.fn(),
  getUsersService: vi.fn(),
}));

vi.mock("../../services/autorization", () => ({
  checkPermission: mocks.checkPermission,
}));

vi.mock("../../services", () => ({
  GetUsersService: mocks.getUsersService,
}));

vi.mock("../Datatable", () => ({
  UserDatatable: ({ data, nextPage, previousPage, refresh }) => (
    <div>
      <div>{data[0]?.profile?.firstName}</div>
      <button type="button" onClick={previousPage}>
        Previous users
      </button>
      <button type="button" onClick={nextPage}>
        Next users
      </button>
      <button type="button" onClick={refresh}>
        Refresh users
      </button>
    </div>
  ),
}));

const renderUsersList = () =>
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/app/users/_new" element={<div>New user route</div>} />
      </Routes>
    </MemoryRouter>,
  );

describe("UsersList module", () => {
  beforeEach(() => {
    mocks.checkPermission.mockReturnValue(true);
    mocks.getUsersService.mockReturnValue({
      users: {
        data: {
          results: [
            {
              username: "admin",
              publicId: "user-1",
              profile: {
                firstName: "Ada",
                lastName: "Okafor",
                email: "ada@example.com",
                phoneNumber: "08030000000",
                settings: { role: "ADMIN", isEmailVerified: true },
              },
            },
          ],
          page: 1,
          previousPage: 0,
          nextPage: 2,
          totalPages: 2,
        },
      },
      isLoading: false,
      isError: false,
    });
  });

  it("renders user rows and navigates to the create-user route", async () => {
    const user = userEvent.setup();

    renderUsersList();

    expect(screen.getByText("Ada")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add user/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /add user/i }));

    expect(screen.getByText("New user route")).toBeInTheDocument();
  });

  it("requests the next page through the table interaction", async () => {
    const user = userEvent.setup();

    renderUsersList();
    await user.click(screen.getByRole("button", { name: "Next users" }));

    expect(mocks.getUsersService).toHaveBeenLastCalledWith(
      expect.stringContaining("?page=2&size=10"),
    );
  });

  it("renders loading, error, and empty states", () => {
    mocks.getUsersService.mockReturnValueOnce({ isLoading: true });
    const { rerender } = renderUsersList();
    expect(screen.getByRole("status")).toBeInTheDocument();

    mocks.getUsersService.mockReturnValueOnce({ isError: true });
    rerender(
      <MemoryRouter>
        <UsersList />
      </MemoryRouter>,
    );
    expect(
      screen.getByText("Sorry Users profile could not be retrieved. Please try again later"),
    ).toBeInTheDocument();

    mocks.getUsersService.mockReturnValueOnce({
      users: { data: { results: [] } },
      isLoading: false,
      isError: false,
    });
    rerender(
      <MemoryRouter>
        <UsersList />
      </MemoryRouter>,
    );
    expect(screen.getByText("No users available")).toBeInTheDocument();
  });
});
