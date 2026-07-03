import { Loader } from "../../Loader";
import { checkPermission } from "../../../services/autorization";

export const DownloadSection = ({isLoading, downLoadLink, reportType}) => {
  return (
    <div className={'block rounded-xl bg-transparent mt-4 mb-10 ml-4'}>
      <div className={'text-center text-text-secondary font-bold'}>
        Your generated file will appear here
      </div>
      {
        isLoading ? (
          <div className={'mt-4 mx-auto'}>
            <Loader w={'1%'} h={'1%'} />
          </div>
        ) : downLoadLink ? (
          <div className="justify-items-center mt-12">
            {checkPermission('CAN_DOWNLOAD_REPORT') ? (
              <a href={downLoadLink}
                 download={reportType}
                 className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-center font-semibold text-on-brand transition-colors hover:bg-brand-strong"
                 target={'_blank'} rel="noreferrer"
              >Download Report</a>
            ) : null}
          </div>
        ) : null
      }
    </div>
  );
}
