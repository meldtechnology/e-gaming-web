export type DateInput = string | number | Date | null | undefined;

export type LicenseStatus = "VALID" | "EXPIRED" | "UNKNOWN";

export type LicenseValidityInput = {
  issuedOn?: DateInput;
  expiresOn?: DateInput;
  validity?: number | string | null;
  status?: string | null;
  validityStatus?: string | null;
  licenseStatus?: string | null;
};

export type LicenseValidity = {
  status: LicenseStatus;
  isValid: boolean;
  daysRemaining: number | null;
  validityDays: number | null;
  issuedOn: Date | null;
  expiresOn: Date | null;
  source: "server" | "client" | "unknown";
};

const DAY_IN_MS = 1000 * 60 * 60 * 24;

const parseDate = (date: DateInput): Date | null => {
  if (date === undefined || date === null || date === "") return null;
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const parseNumber = (value: number | string | null | undefined) => {
  if (value === undefined || value === null || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const normalizeServerStatus = (status?: string | null): LicenseStatus | null => {
  const normalized = status?.trim().toUpperCase();
  if (!normalized) return null;
  if (["VALID", "ACTIVE", "APPROVED"].includes(normalized)) return "VALID";
  if (["EXPIRED", "INACTIVE", "REVOKED"].includes(normalized)) return "EXPIRED";
  return null;
};

export const getLicenseValidity = (
  license: LicenseValidityInput | null | undefined,
  now: Date = new Date(),
): LicenseValidity => {
  const issuedOn = parseDate(license?.issuedOn);
  const expiresOn = parseDate(license?.expiresOn);
  const validityDays = parseNumber(license?.validity);
  const serverStatus = normalizeServerStatus(
    license?.status ?? license?.validityStatus ?? license?.licenseStatus,
  );

  const daysRemaining = expiresOn
    ? Math.round((expiresOn.getTime() - now.getTime()) / DAY_IN_MS)
    : null;

  if (serverStatus) {
    return {
      status: serverStatus,
      isValid: serverStatus === "VALID",
      daysRemaining,
      validityDays,
      issuedOn,
      expiresOn,
      source: "server",
    };
  }

  if (daysRemaining !== null) {
    const isValid = daysRemaining > 0;
    return {
      status: isValid ? "VALID" : "EXPIRED",
      isValid,
      daysRemaining,
      validityDays,
      issuedOn,
      expiresOn,
      source: "client",
    };
  }

  return {
    status: "UNKNOWN",
    isValid: false,
    daysRemaining: null,
    validityDays,
    issuedOn,
    expiresOn,
    source: "unknown",
  };
};

export const formatLicenseDate = (date: DateInput) => {
  const parsed = parseDate(date);
  return parsed ? parsed.toDateString() : "";
};
