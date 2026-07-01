import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppErrorBoundary } from "./AppErrorBoundary";

const BrokenScreen = () => {
  throw new Error("Broken screen");
};

describe("AppErrorBoundary", () => {
  it("surfaces a fallback and reports runtime errors", () => {
    const sink = vi.fn();
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
    window.__ESGC_RUNTIME_ERROR__ = sink;

    render(
      <AppErrorBoundary>
        <BrokenScreen />
      </AppErrorBoundary>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong");
    expect(sink).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Broken screen",
      }),
    );

    delete window.__ESGC_RUNTIME_ERROR__;
    consoleError.mockRestore();
  });
});
