import { useState } from "react";
import { FormSection } from "./FormSection";
import { DownloadSection } from "./DownloadSection";

export const ReportPaymentGroup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [downLoadLink, setDownloadLink] = useState('');
  return (
    <div className="w-full bg-surface flex gap-1">
      <div className="flex-auto w-[65%]">
        <FormSection isLoading={setIsLoading} setDownloadLink={setDownloadLink} />
      </div>
      <div className="flex-auto w-[35%] border-solid border-l-border">
        <DownloadSection isLoading={isLoading} downLoadLink={downLoadLink} />
      </div>
    </div>
  );
}