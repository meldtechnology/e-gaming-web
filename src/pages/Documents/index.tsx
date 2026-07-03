import { env } from "../../config/env";
import { PageHeader, AccessDenied } from "../../ui-components";
import { DocumentNavBar } from "../../ui-components/NavBar";
import { Application, Document } from "../../ui-components/Metrics";
import { GetDocumentService as getMetricsService } from "../../services";
import { Loader } from "../../ui-components/Loader";
import { AlertType } from "../../ui-components/Alerts/AlertType";
import { MeldAlert } from "../../ui-components/Alerts";
import { ApplicationList } from "../../ui-components/ApplicationList";
import { checkPermission } from "../../services/autorization";
import { useState } from "react";

const DOCUMENT_METRICS_URL = env.DOCUMENT_METRIC_URL;
export const Documents = () => {
  const [status, setStatus] = useState('');
  const { documents, isLoading, isError }
    = getMetricsService(DOCUMENT_METRICS_URL) as {
      documents?: {
        data?: {
          types?: number;
          files?: number;
          applications?: number;
          pending?: number;
          review?: number;
          decline?: number;
          approve?: number;
          issued?: number;
        };
      };
      isLoading?: boolean;
      isError?: unknown;
    };

  if (!checkPermission('CAN_VIEW_APPLICATIONS')) return <AccessDenied />;

  return (
    <>
      <div >
        <PageHeader title="Applications" toolbar={<DocumentNavBar />} />
        <div className={`${(isLoading)? '' : 'hidden'}`}>
          <Loader w={'w-8'} h={'h-8'} />
        </div>
        <div className={`${(isLoading)? 'hidden' : ''}`}>
          <div className={`${isError? '' : 'hidden'}`}>
          <MeldAlert alertType={AlertType.ERROR}
                       message={"Documents metrics is currently not available retrieved. Please try again later"}
                       show={Boolean(isError)} />
          </div>
          <Document types={documents?.data?.types}
                           files={documents?.data?.files}
                           applications={documents?.data?.applications} />
          <Application pending={documents?.data?.pending}
                       review={documents?.data?.review}
                       decline={documents?.data?.decline}
                       approve={documents?.data?.approve}
                       issue={documents?.data?.issued}
                       setStatus={setStatus} />
          <ApplicationList status={status}/>
        </div>
      </div>
    </>
  );
}
