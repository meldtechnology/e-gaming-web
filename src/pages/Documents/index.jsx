import { Heading } from "../../ui-components";
import { DocumentNavBar } from "../../ui-components/NavBar";
import { Application, Document } from "../../ui-components/Metrics";
import { GetDocumentService as getMetricsService } from "../../services";
import { Loader } from "../../ui-components/Loader";
import { AlertType } from "../../ui-components/Alerts/AlertType";
import { MeldAlert } from "../../ui-components/Alerts";
import { ApplicationList } from "../../ui-components/ApplicationList";

const DOCUMENT_METRICS_URL = process.env.REACT_APP_DOCUMENT_METRIC_URL;
export const Documents = () => {
  const { documents, isLoading, isError }
    = getMetricsService(DOCUMENT_METRICS_URL);

  return (
    <>
      <div>
        <header className="border-b border-solid border-blue_gray-400 bg-white-a700 gap-0 p-[18px] mb-1">
          <div className="flex items-center justify-between gap-5 sm:flex-col">
            <Heading size="headinglg" as="h3" className="mb-4 font-bold text-gray-600 md:text-[22px]">
              Applications
            </Heading>
          </div>
          <DocumentNavBar />
        </header>
        <div className={`${(isLoading)? '' : 'hidden'}`}>
          <Loader />
        </div>
        <div className={`${(isLoading)? 'hidden' : ''}`}>
          <div className={`${isError? '' : 'hidden'}`}>
            <MeldAlert alertType={AlertType.ERROR}
                       message={"Documents metrics is currently not available retrieved. Please try again later"} />
          </div>
          <Document types={documents?.data?.types}
                           files={documents?.data?.files}
                           applications={documents?.data?.applications} />
          <Application pending={documents?.data?.pending}
                       review={documents?.data?.review}
                       decline={documents?.data?.decline}
                       approve={documents?.data?.approve}
                       issue={documents?.data?.issued} />
          <ApplicationList />
        </div>
      </div>
    </>
  )
}