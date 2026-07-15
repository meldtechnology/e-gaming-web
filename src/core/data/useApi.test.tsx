import { describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import { http, HttpResponse } from "msw";
import type { ReactNode } from "react";
import { env } from "../../config/env";
import { server } from "../../test/msw/server";
import { useApi } from "./useApi";

const wrapper = ({ children }: { children: ReactNode }) => (
  <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
    <MemoryRouter>{children}</MemoryRouter>
  </SWRConfig>
);

describe("useApi", () => {
  it("returns data from a successful GET request", async () => {
    server.use(
      http.get(`${env.BASE_URL}/test/users`, () => {
        return HttpResponse.json({ results: [{ name: "Meld" }] });
      }),
    );

    const { result } = renderHook(() => useApi<{ results: Array<{ name: string }> }>("/test/users"), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isError).toBe(false);
    expect(result.current.data?.results[0].name).toBe("Meld");
  });

  it("normalizes API errors", async () => {
    const sink = vi.fn();
    const consoleWarn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    window.__ESGC_API_ERROR__ = sink;
    server.use(
      http.get(`${env.BASE_URL}/test/error`, () => {
        return HttpResponse.json({ userMessage: "Try again later" }, { status: 500 });
      }),
    );

    const { result } = renderHook(() => useApi("/test/error"), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error?.status).toBe(500);
    expect(result.current.error?.userMessage).toBe("Try again later");
    expect(sink).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: "/test/error",
        status: 500,
        userMessage: "Try again later",
      }),
    );

    delete window.__ESGC_API_ERROR__;
    consoleWarn.mockRestore();
  });
});
