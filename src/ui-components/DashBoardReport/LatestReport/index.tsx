import { env } from "../../../config/env";
import { Text } from "../../Text";
import { GetDocumentService } from "../../../services";
import { Loader } from "../../Loader";
import { ReportDataTable } from "../../Datatable";
import { LicenseReport } from "../LicenseReport";
import { EmptyState } from "../../primitives";

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
    <div className="mr-[50px] mt-3 flex items-center gap-2 md:mr-0 md:flex-col">
      {
        (isLoading) ?
          (
            <div className="flex-1 md:self-stretch md:px-5">
              <Loader w={'w-8'} h={'h-8'} />
            </div>
          ) :
          (
              <div className="flex-1 md:self-stretch md:px-5">
                <div className="rounded-[5px] bg-white-a700 p-3">
                  <div className="mb-[22px] flex flex-col gap-6">
                    <div className="mr-[18px] flex flex-wrap items-center justify-between gap-5 md:mr-0">
                      <Text as="p" className="text-[24px] font-light text-gray-600 md:text-[22px]">
                        Recent Applications
                      </Text>
                      <Text size="textmd" as="p" className="text-[16px] font-normal text-black-900_01">
                        ...
                      </Text>
                    </div>
                    {applications.length ? (
                      <ReportDataTable data={applications} columnHeader={columnHeader} />
                    ) : (
                      <EmptyState title="No Application data is available" />
                    )}
                  </div>
                </div>
              </div>
              )
      }
      <LicenseReport />
    </div>
  );
}
