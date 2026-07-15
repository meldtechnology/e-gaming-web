import { describe, expect, it } from "vitest";
import { formatAmount, formatCompactNumber } from "./index";

describe("formatAmount", () => {
  it("formats thousands with separators", () => {
    expect(formatAmount(123456)).toBe("123,456");
  });

  it("uses compact units above one million", () => {
    expect(formatAmount(1500000)).toBe("1.5M");
  });

  it("returns zero for missing values", () => {
    expect(formatAmount()).toBe(0);
  });
});

describe("formatCompactNumber", () => {
  it("truncates compact values without rounding", () => {
    expect(formatCompactNumber(1650000)).toBe("1.6M");
  });

  it("formats negative and small values", () => {
    expect(formatCompactNumber(-1250)).toBe("-1.2K");
    expect(formatCompactNumber(999)).toBe("999");
  });
});
