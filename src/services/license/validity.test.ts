import { describe, expect, it } from "vitest";
import { getLicenseValidity } from "./validity";

const now = new Date("2026-07-01T00:00:00.000Z");

describe("getLicenseValidity", () => {
  it("prefers server status over client expiry math", () => {
    const result = getLicenseValidity(
      { status: "VALID", expiresOn: "2026-06-01T00:00:00.000Z" },
      now,
    );

    expect(result.status).toBe("VALID");
    expect(result.isValid).toBe(true);
    expect(result.source).toBe("server");
  });

  it("marks a future expiry date as valid when server status is absent", () => {
    const result = getLicenseValidity(
      { expiresOn: "2026-07-11T00:00:00.000Z", validity: "365" },
      now,
    );

    expect(result.status).toBe("VALID");
    expect(result.isValid).toBe(true);
    expect(result.daysRemaining).toBe(10);
    expect(result.validityDays).toBe(365);
    expect(result.source).toBe("client");
  });

  it("marks a past expiry date as expired when server status is absent", () => {
    const result = getLicenseValidity(
      { expiresOn: "2026-06-30T00:00:00.000Z" },
      now,
    );

    expect(result.status).toBe("EXPIRED");
    expect(result.isValid).toBe(false);
  });

  it("handles timezone-offset expiry dates consistently", () => {
    const result = getLicenseValidity(
      { expiresOn: "2026-07-02T01:00:00.000+01:00" },
      new Date("2026-07-01T00:00:00.000Z"),
    );

    expect(result.daysRemaining).toBe(1);
    expect(result.status).toBe("VALID");
  });

  it("returns unknown when expiry data is missing or invalid", () => {
    const result = getLicenseValidity({ expiresOn: "not-a-date" }, now);

    expect(result.status).toBe("UNKNOWN");
    expect(result.daysRemaining).toBeNull();
    expect(result.source).toBe("unknown");
  });
});
