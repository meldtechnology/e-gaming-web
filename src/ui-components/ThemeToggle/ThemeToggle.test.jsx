import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppThemeProvider } from "../../theme/ThemeProvider";
import { getItem, removeItem, storeItem } from "../../services";
import { ThemeToggle } from "./index";

const setSystemDark = (matches) => {
  const listeners = new Set();
  const query = {
    matches,
    media: "(prefers-color-scheme: dark)",
    addEventListener: vi.fn((_event, listener) => listeners.add(listener)),
    removeEventListener: vi.fn((_event, listener) => listeners.delete(listener)),
    dispatch(nextMatches) {
      query.matches = nextMatches;
      listeners.forEach((listener) => listener({ matches: nextMatches }));
    },
  };

  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn(() => query),
  });

  return query;
};

const renderToggle = () => {
  return render(
    <AppThemeProvider>
      <ThemeToggle />
    </AppThemeProvider>,
  );
};

beforeEach(() => {
  removeItem("themeMode");
  document.documentElement.className = "";
  delete document.documentElement.dataset.theme;
});

describe("ThemeToggle", () => {
  it("uses the OS preference on first visit and persists an explicit click choice", async () => {
    setSystemDark(true);

    renderToggle();

    const button = await screen.findByRole("button", { name: /switch to light theme/i });
    await waitFor(() => expect(document.documentElement).toHaveClass("dark"));
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(button).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(button);

    await waitFor(() => expect(document.documentElement).not.toHaveClass("dark"));
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(getItem("themeMode")).toBe("light");
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("lets a stored preference override the OS preference", async () => {
    setSystemDark(true);
    storeItem("themeMode", "light");

    renderToggle();

    const button = await screen.findByRole("button", { name: /switch to dark theme/i });
    await waitFor(() => expect(document.documentElement).not.toHaveClass("dark"));
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("responds to keyboard activation and exposes collapsed-sidebar classes", async () => {
    setSystemDark(false);

    renderToggle();

    const button = await screen.findByRole("button", { name: /switch to dark theme/i });
    expect(button).toHaveClass("md:justify-center");
    expect(screen.getByText("Dark mode")).toHaveClass("md:hidden");

    button.focus();
    await userEvent.keyboard("{Enter}");

    await waitFor(() => expect(document.documentElement).toHaveClass("dark"));
    expect(getItem("themeMode")).toBe("dark");
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("follows OS changes only before the user stores a preference", async () => {
    const query = setSystemDark(false);

    renderToggle();

    await screen.findByRole("button", { name: /switch to dark theme/i });
    act(() => query.dispatch(true));
    await waitFor(() => expect(document.documentElement).toHaveClass("dark"));

    await userEvent.click(screen.getByRole("button", { name: /switch to light theme/i }));
    await waitFor(() => expect(getItem("themeMode")).toBe("light"));

    act(() => query.dispatch(true));
    await waitFor(() => expect(document.documentElement).not.toHaveClass("dark"));
    expect(document.documentElement.dataset.theme).toBe("light");
  });
});
