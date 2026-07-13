import { env } from "../../../config/env";
import { GetDocumentService } from "../../../services";
import { Loader } from "../../Loader";
import { ReportDataTable } from "../../Datatable";
import { LicenseReport } from "../LicenseReport";
import { Card, EmptyState } from "../../primitives";

const columnHeader = [
 "Operator", "KYC", "Amount", "Submitted On", "Status"
];

const DOCUMENT_HISTORY_URL = env.DOCUMENTS_BASE_URL;
export const LatestReport = () => {
  const { documents, isLoading }
    = GetDocumentService(`${DOCUMENT_HISTORY_URL}?page=1&size=5&sortBy=submittedOn&sortIn=DESC`) as {
      documents?: { data?: { results?: unknown[] } };
      isLoading?: boolean;
    };
  const applications = documents?.data?.results ?? [];
  return (
    <div className="mt-6 flex items-start gap-6 lg:flex-col">
      {isLoading ? (
        <div className="flex-1">
          <Loader w={'w-8'} h={'h-8'} />
        </div>
      ) : (
        <div className="min-w-0 flex-1">
          <h2 className="mb-3 text-lg font-semibold text-text-primary">Recent Applications</h2>
          {applications.length ? (
            <ReportDataTable data={applications} columnHeader={columnHeader} />
          ) : (
            <Card padded>
              <EmptyState title="No applications available" />
            </Card>
          )}
        </div>
      )}
      <LicenseReport />
    </div>
  );
}
