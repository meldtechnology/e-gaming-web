import { useState } from "react";
import { TypeDatatable } from "../Datatable/TypeDatatable";
import { GetDocumentService as getDocService } from "../../services";

const columnHeading = [
  "Name", "Description", "Action"
]


const TYPE_URL = process.env.REACT_APP_DOCUMENT_TYPE_URL;
export const TypeList = ({ updateType }) => {
  const [page, setPage] = useState(1);
  const { documents, isLoading }
    = getDocService(`${TYPE_URL}?page=${page}&size=10&sortIn=DESC`);

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
          <div className="flex w-[100%] items-center justify-center self-end md:w-full md:self-auto">
            <TypeDatatable columnHeader={columnHeading}
                                  data={documents?.data?.results}
                                  pageInfo={{page: documents?.data?.page,
                                    previous: documents?.data?.previousPage,
                                    next: documents?.data?.nextPage,
                                    totalPages: documents?.data?.totalPages }}
                                  nextPage={nextPage}
                                  previousPage={previousPage}
                           isLoading={isLoading}
                           updateType={updateType}

            />
          </div>
        </div>
      </div>
    </div>
  );

}