import { env } from "../../../config/env";
import { Suspense } from "react";
import AgentProfile from "../../AgentProfile";
import { formatAmount, GetDocumentService } from "../../../services";
import { Loader } from "../../Loader";
import { EmptyState } from "../../primitives";

const DOCUMENT_HISTORY_URL = env.DOCUMENTS_BASE_URL;
export const LicenseReport = () => {
  const { documents, isLoading }
    = GetDocumentService(`${DOCUMENT_HISTORY_URL}/status/ISSUED?page=1&size=5&sortBy=issuedOn&sortIn=DESC`) as {
      documents?: { data?: { results?: Array<{ applicant?: { name?: string; email?: string }; amountPaid?: number | string }> } };
      isLoading?: boolean;
    };
  const licenses = documents?.data?.results ?? [];
  return (isLoading) ?
    (
      <div className="w-[320px] shrink-0 lg:w-full">
        <Loader w={'w-8'} h={'h-8'} />
      </div>
    ) : (
    <div className="w-[320px] shrink-0 lg:w-full">
      <div className="flex flex-col items-start gap-5 rounded-2xl border border-border bg-surface p-5 shadow-e1">
        <h2 className="text-lg font-semibold text-text-primary">
          Latest Licenses
        </h2>
        <div className="flex w-full flex-col gap-3">
          <Suspense fallback={<div>Loading feed...</div>}>
            {licenses.length ? licenses.map((d, index) => (
              <AgentProfile userName={d?.applicant?.name}
                            userEmail={d?.applicant?.email}
                            userPrice={"N ".concat(String(formatAmount(d?.amountPaid)))}
                            key={"listing200K" + index}
                            className="ml-1.5 md:ml-0" />
            )) : <EmptyState title="No license data is available" />}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
