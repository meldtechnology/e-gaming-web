import { describe, expect, it } from "vitest";
import { extractDay, extractFullDate, extractMonth, extractYear } from "./index";

describe("datePartExtraxt", () => {
  it("formats day suffixes", () => {
    expect(extractDay("2026-07-01T12:00:00.000Z")).toBe("1st");
    expect(extractDay("2026-07-02T12:00:00.000Z")).toBe("2nd");
    expect(extractDay("2026-07-03T12:00:00.000Z")).toBe("3rd");
    expect(extractDay("2026-07-11T12:00:00.000Z")).toBe("11th");
  });

  it("extracts month, year, and full date", () => {
    const date = "2026-07-21T12:00:00.000Z";

    expect(extractMonth(date)).toBe("July");
    expect(extractYear(date)).toBe(2026);
    expect(extractFullDate(date)).toBe("21st Of July 2026");
  });
});
