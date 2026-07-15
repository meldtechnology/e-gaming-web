import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Header from "./index";

describe("Dashboard Header", () => {
  it("renders the dashboard metric cards", () => {
    const markup = renderToStaticMarkup(
      <Header metrics={["1.2M", 42, 7, 3]} />,
    );

    expect(markup).toContain("Dashboard");
    expect(markup).toContain("Total Revenue");
    expect(markup).toContain("Total Payments");
    expect(markup).toContain("Total Operators");
    expect(markup).toContain("Total Licenses");
  });
});
