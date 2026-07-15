import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppRoutes from "./index";
import { AppThemeProvider } from "../theme/ThemeProvider";

const renderRoute = (path: string) => {
  return render(
    <AppThemeProvider>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </AppThemeProvider>,
  );
};

describe("top-level route smoke tests", () => {
  it("renders a public route", async () => {
    renderRoute("/sign-in");

    expect(await screen.findByText(/welcome back/i)).toBeInTheDocument();
  });

  it("guards protected app routes", async () => {
    renderRoute("/app");

    expect(await screen.findByText(/welcome back/i)).toBeInTheDocument();
  });

  it("renders the unavailable route", async () => {
    renderRoute("/missing-route");

    expect(await screen.findByText("404")).toBeInTheDocument();
  });
});
