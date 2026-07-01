import { describe, expect, it, vi } from "vitest";
import { reportPerformanceMetric } from "./performance";

describe("reportPerformanceMetric", () => {
  it("forwards sanitized web vitals metrics to the runtime hook", () => {
    const sink = vi.fn();
    const consoleInfo = vi.spyOn(console, "info").mockImplementation(() => undefined);
    window.__ESGC_WEB_VITALS__ = sink;

    reportPerformanceMetric({
      name: "LCP",
      id: "metric-1",
      value: 1234,
      delta: 12,
      rating: "good",
      navigationType: "navigate",
    });

    expect(sink).toHaveBeenCalledWith({
      name: "LCP",
      id: "metric-1",
      value: 1234,
      delta: 12,
      rating: "good",
      navigationType: "navigate",
    });

    delete window.__ESGC_WEB_VITALS__;
    consoleInfo.mockRestore();
  });
});
