import { FormSection } from "./FormSection";
import { DownloadSection } from "./DownloadSection";
import { useState } from "react";

export const ReportApplicationGroup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [downLoadLink, setDownloadLink] = useState('');
  const [reportType, setReportType] = useState('PDF');
  return (
    <div className="w-full bg-surface flex gap-1">
      <div className="flex-auto w-[65%]">
        <FormSection isLoading={setIsLoading}
                     setDownloadLink={setDownloadLink}
                     setReportType={setReportType} />
      </div>
      <div className="flex-auto w-[35%] border-solid border-l-border">
        <DownloadSection isLoading={isLoading}
                         downLoadLink={downLoadLink}
                         reportType={reportType} />
      </div>
    </div>
  );
}