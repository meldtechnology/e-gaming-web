import { Loader } from "../../Loader";
import { checkPermission } from "../../../services/autorization";

export const DownloadSection = ({isLoading, downLoadLink}) => {
  return (
    <div className={'block rounded-xl bg-transparent mt-4 mb-10 ml-4'}>
      <div className={'text-center text-green-900 font-bold'}>
        Your generated file will appear here
      </div>
      {
        isLoading ? (
          <div className={'mt-4 mx-auto'}>
            <Loader w={'1%'} h={'1%'} />
          </div>
        ) : (
          <div className={`${downLoadLink ? '' : 'hidden'} justify-items-center mt-12`}>
            <a href={downLoadLink}
               download={'Report.pdf'}
               className={`${checkPermission('CAN_DOWNLOAD_REPORT')} w-[50%] text-center text-blue-600 font-bold px-2 py-4 rounded-[10px] border-2 border-gray-700`}
               target={'_blank'} rel="noreferrer"
            >Download Report</a>
          </div>
        )
      }
    </div>
  );
}