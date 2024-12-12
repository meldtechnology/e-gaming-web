import { useState } from "react";
import { GetDocumentService as getDocService } from "../../../../services";
import { LicenseDataTable } from "../../../../ui-components/Datatable";
import { Loader } from "../../../../ui-components/Loader";

const columnHeading = [
  "Reference #", "Approve By", "Approved On", "Fee", "Valid (Days)", "Status", "Action"
]

const APPLICATION_URL = process.env.REACT_APP_DOCUMENTS_BASE_URL;
export const LicenseList = ({status}) => {
  const [page, setPage] = useState(1);
  const { documents, isLoading }
    = getDocService(`${APPLICATION_URL}/status/${status}?page=${page}&size=10&sortIn=DESC`);

  const nextPage = () => {
    setPage(page + 1);
  }

  const previousPage = () => {
    setPage(page - 1);
  }

  return (
    <div className="flex flex-col h-[700px] items-end bg-white-a700 gap-2.5 px-2 ">
      <div className="mr-2 flex flex-col gap-[26px] self-stretch md:mr-0">
        <div className="mb-2.5 ml-2.5 flex items-center md:ml-0 md:flex-col">
          <div className={`flex w-[100%] ${isLoading ? 'hidden' : ''} items-center justify-center self-end md:w-full md:self-auto`}>
            <LicenseDataTable columnHeader={columnHeading}
                              data={documents?.data?.results}
                              pageInfo={{
                                page: documents?.data?.page,
                                previous: documents?.data?.previousPage,
                                next: documents?.data?.nextPage,
                                totalPages: documents?.data?.totalPages
                              }}
                              nextPage={nextPage}
                              previousPage={previousPage}

            />
          </div>
          <div className={`${isLoading ? '' : 'hidden'} items-center justify-center`}>
            <Loader w={'w-8'} h={'h-8'} />
          </div>
        </div>
      </div>
    </div>
  );
}