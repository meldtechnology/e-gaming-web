import { Heading } from "../../ui-components";
import { ReportApplication } from "../../ui-components/ReportApplication";

export const Report = () => {
  return (
    <>
      <div>
        <header className="border-b border-solid border-border bg-white-a700 gap-0 p-[18px] mb-1">
          <div className="flex items-center justify-between gap-5 sm:flex-col">
            <Heading size="headinglg" as="h3" className="mb-4 font-bold text-text-secondary md:text-[22px]">
              Report
            </Heading>
          </div>
          {/*<ReportNavBar />*/}
        </header>
        <div>
          <ReportApplication />
        </div>
      </div>
    </>
  )
}