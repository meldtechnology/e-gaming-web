import { Heading } from "../Heading";
import { ReportApplicationGroup } from "../ReportApplicationGroup";
import { ReportNavBar } from "../ReportNavBar";

export const ReportApplication = () => {
  return (
      <>
        <div>
          <header className="border-b border-solid border-border bg-surface gap-0 p-[18px] mb-1">
            <div className="flex items-center justify-between gap-5 sm:flex-col">
              <Heading size="headinglg" as="h3" className="mb-4 font-bold text-text-secondary md:text-[22px]">
                Application Report
              </Heading>
            </div>
            <ReportNavBar />
          </header>
          <ReportApplicationGroup />
        </div>
      </>
  );
}