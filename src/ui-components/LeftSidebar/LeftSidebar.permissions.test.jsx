import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { removeAll, storeItem } from "../../services";
import { LeftSidebar } from "./index";

beforeEach(() => {
  removeAll();
  storeItem("profile", JSON.stringify({
    profile: {
      firstName: "Jane",
      lastName: "Doe",
      profilePicture: "",
      settings: { role: "Administrator" },
    },
  }));
});

describe("LeftSidebar permissions", () => {
  it("does not render links for missing permissions", () => {
    storeItem("perm", JSON.stringify({ permissions: ["CAN_VIEW_DASHBOARD"] }));

    render(
      <MemoryRouter initialEntries={["/app/dashboard"]}>
        <LeftSidebar />
      </MemoryRouter>,
    );

    expect(screen.getAllByText(/Dashboard/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/Users/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Reports/i)).not.toBeInTheDocument();
  });
});
