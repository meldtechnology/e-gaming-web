import { Text } from "../../Text";
import { Suspense } from "react";
import AgentProfile from "../../AgentProfile";
import { formatAmount, GetDocumentService } from "../../../services";
import { Loader } from "../../Loader";

const DOCUMENT_HISTORY_URL = process.env.REACT_APP_DOCUMENTS_BASE_URL;
export const LicenseReport = () => {
  const { documents, isLoading }
    = GetDocumentService(`${DOCUMENT_HISTORY_URL}/status/ISSUED?page=1&size=5&sortBy=issuedOn&sortIn=DESC`);
  return (isLoading) ?
    (
      <div className="w-[26%] md:w-full md:px-5">
        <Loader />
      </div>
    ) : (
    <div className="w-[26%] md:w-full md:px-5">
      <div className="flex flex-col items-start justify-center gap-8 rounded-[5px] bg-white-a700 px-1.5 py-2">
        <Text as="p" className="ml-1.5 mt-1 text-[24px] font-light text-gray-600 md:ml-0 md:text-[22px]">
          Latest Licenses
        </Text>
        <div className="mr-1.5 flex flex-col gap-3 self-stretch md:mr-0">
          <Suspense fallback={<div>Loading feed...</div>}>
            {documents?.data?.results.map((d, index) => (
              <AgentProfile userName={d?.applicant?.name}
                            userEmail={d?.applicant?.email}
                            userPrice={"N ".concat(formatAmount(d?.amountPaid))}
                            key={"listing200K" + index}
                            className="ml-1.5 md:ml-0" />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
}