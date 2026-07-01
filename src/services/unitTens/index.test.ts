import { describe, expect, it } from "vitest";
import { thousandMillion, unitTens } from "./index";

describe("unitTens", () => {
  it("formats thousands and millions", () => {
    expect(unitTens(10000)).toBe("10K");
    expect(unitTens(2500000)).toBe("2.5M");
  });

  it("leaves smaller values unchanged", () => {
    expect(unitTens(9999)).toBe(9999);
  });
});

describe("thousandMillion", () => {
  it("formats million and billion values", () => {
    expect(thousandMillion(5500000)).toBe("5.5M");
    expect(thousandMillion(1200000000)).toBe("1.2B");
  });
});
