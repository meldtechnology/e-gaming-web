import { Card, StatusBadge } from "../../../../ui-components/primitives";
import { formatLicenseDate, getLicenseValidity } from "../../../../services/license";

const Detail = ({ label, value }) => (
  <div className="rounded-xl border border-border bg-surface-muted p-4">
    <dt className="text-xs font-semibold uppercase tracking-wide text-text-secondary">{label}</dt>
    <dd className="mt-1 break-words text-base font-semibold text-text-primary">{value || "Not available"}</dd>
  </div>
);

export const LicenseResultCard = ({ license }) => {
  const validity = getLicenseValidity(license);

  return (
    <Card padded className="gap-5" role="status" aria-live="polite">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">License record</p>
          <h2 className="mt-1 text-2xl font-bold text-text-primary">{license?.fileName || "License details"}</h2>
          <p className="mt-1 text-sm text-text-secondary">Verified against Enugu State Gaming Commission records.</p>
        </div>
        <StatusBadge status={validity.status} variant="solid" />
      </div>

      <dl className="grid gap-4 md:grid-cols-2">
        <Detail label="License for" value={license?.applicant?.name} />
        <Detail label="Validity period" value={license?.validity ? `${license.validity} days` : ""} />
        <Detail label="Issued on" value={formatLicenseDate(license?.issuedOn)} />
        <Detail label="Expires on" value={formatLicenseDate(license?.expiresOn)} />
      </dl>

      <div
        className={`rounded-xl border p-4 ${
          validity.isValid
            ? "border-success/30 bg-success-soft text-success"
            : "border-danger/30 bg-danger-soft text-danger"
        }`}
      >
        <p className="text-sm font-semibold">
          Status: <span className="font-bold">{validity.status}</span>
        </p>
        {validity.daysRemaining !== null ? (
          <p className="mt-1 text-sm">
            {validity.isValid
              ? `${validity.daysRemaining} day${validity.daysRemaining === 1 ? "" : "s"} remaining.`
              : "This license is no longer valid."}
          </p>
        ) : null}
      </div>
    </Card>
  );
};
