import { env } from "../../../../config/env";
import { useState } from "react";
import { GetDocumentService as getDocService } from "../../../../services";
import { LicenseDataTable } from "../../../../ui-components/Datatable";

const columnHeading = [
  "Reference #", "Approve By", "Approved On", "Licensee", "Fee", "Valid (Days)", "Status", "Action"
]

const APPLICATION_URL = env.DOCUMENTS_BASE_URL;
export const LicenseList = ({status}: { status: string }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { documents, isLoading }
    = getDocService(`${APPLICATION_URL}/status/${status}?page=${page}&size=${pageSize}&sortIn=DESC&sortBy=${status === 'ISSUED'? 'issuedOn' : 'approvedOn'}`) as {
      documents?: {
        data?: {
          results?: unknown[];
          page?: number;
          previousPage?: number;
          nextPage?: number;
          totalPages?: number;
          total?: number;
          totalElements?: number;
        };
      };
      isLoading?: boolean;
    };

  const nextPage = () => {
    setPage(page + 1);
  }

  const previousPage = () => {
    setPage(page - 1);
  }

  const changePageSize = (size: number) => {
    setPageSize(size);
    setPage(1);
  }

  return (
    <div className="w-full">
      <div role={isLoading ? "status" : undefined} aria-live={isLoading ? "polite" : undefined}>
        {isLoading ? <span className="sr-only">Loading licenses...</span> : null}
        <LicenseDataTable columnHeader={columnHeading}
                          data={documents?.data?.results ?? []}
                          pageInfo={{
                            page: documents?.data?.page ?? page,
                            previous: documents?.data?.previousPage,
                            next: documents?.data?.nextPage,
                            totalPages: documents?.data?.totalPages
                          }}
                          nextPage={nextPage}
                          previousPage={previousPage}
                          isLoading={isLoading}
                          pageSize={pageSize}
                          onPageSize={changePageSize}
                          onPageChange={setPage}
                          totalEntries={documents?.data?.totalElements ?? documents?.data?.total ?? (documents?.data?.totalPages ? documents.data.totalPages * pageSize : undefined)}
                          currentPageCount={documents?.data?.results?.length}
        />
      </div>
    </div>
  );
}
