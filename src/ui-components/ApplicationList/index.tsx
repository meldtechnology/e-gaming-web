import { env } from "../../config/env";
import { useState } from "react";
import { GetDocumentService as getDocService } from "../../services";
import { ApplicationDataTable } from "../Datatable";
import { Card, EmptyState } from "../primitives";

const columnHeading = [
  "Reference #", "Submitted By", "Submitted On", "Amount Paid", "Fee", "Status", "Action"
]

const APPLICATION_URL = env.DOCUMENTS_BASE_URL;
export const ApplicationList= ({status = ''}: { status?: string }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { documents, isLoading }
    = getDocService(`${APPLICATION_URL}${status}?page=${page}&size=${pageSize}&sortIn=DESC`) as {
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
      {documents?.data?.results?.length || isLoading ? (
        <ApplicationDataTable
          columnHeader={columnHeading}
          data={documents?.data?.results ?? []}
          pageInfo={{
            page: documents?.data?.page ?? page,
            previous: documents?.data?.previousPage,
            next: documents?.data?.nextPage,
            totalPages: documents?.data?.totalPages,
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
      ) : (
        <Card padded>
          <EmptyState
            title="No applications available"
            description="Submitted applications will appear here."
          />
        </Card>
      )}
    </div>
  );
}
