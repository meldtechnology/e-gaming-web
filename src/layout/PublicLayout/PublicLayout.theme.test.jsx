import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { useTheme } from "@mui/material/styles";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "./index";
import { AppThemeProvider } from "../../theme/ThemeProvider";
import { removeItem, storeItem } from "../../services";

const setSystemDark = () => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn(() => ({
      matches: true,
      media: "(prefers-color-scheme: dark)",
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
};

const ThemeProbe = () => {
  const theme = useTheme();
  return <div data-testid="public-theme-probe" data-mode={theme.palette.mode} />;
};

beforeEach(() => {
  removeItem("themeMode");
  document.documentElement.className = "";
  delete document.documentElement.dataset.theme;
});

describe("PublicLayout", () => {
  it("locks public descendants to light MUI theme inside a global dark preference", async () => {
    setSystemDark();
    storeItem("themeMode", "dark");

    render(
      <AppThemeProvider>
        <MemoryRouter initialEntries={["/public"]}>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/public" element={<ThemeProbe />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </AppThemeProvider>,
    );

    const probe = await screen.findByTestId("public-theme-probe");
    expect(probe).toHaveAttribute("data-mode", "light");
    expect(probe.closest(".theme-light")).toHaveAttribute("data-theme", "light");

    await waitFor(() => expect(document.documentElement).toHaveClass("dark"));
    expect(document.documentElement.dataset.theme).toBe("dark");
  });
});
