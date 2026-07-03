import { PageHeader, AccessDenied } from "../../../ui-components";
import { LicenseList } from "./LicenseList";
import { useState } from "react";
import { checkPermission } from "../../../services/autorization";
export { LicenseVerification } from "./LicenseVerification";
export { LicenseResultCard } from "./LicenseResultCard";

const TABS = [
  { id: "ISSUED", label: "Issued" },
  { id: "APPROVE", label: "Approved" },
];

export const License = () => {
  const [type, setType] = useState("ISSUED");

  if (!checkPermission("CAN_VIEW_LICENSES")) return <AccessDenied />;

  return (
    <>
      <PageHeader
        title="Licenses"
        description="Issued and approved gaming and lottery licenses."
        toolbar={
          <div className="inline-flex rounded-xl border border-border bg-surface p-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setType(tab.id)}
                aria-pressed={type === tab.id}
                className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors ${
                  type === tab.id
                    ? "bg-brand text-white shadow-e1"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        }
      />
      <LicenseList status={type} />
    </>
  );
};
