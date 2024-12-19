import { Header, Text, Img } from "../../ui-components";
import { Suspense } from "react";
import AgentProfile from "../../ui-components/AgentProfile";
import { Analytic, LatestReport } from "../../ui-components/DashBoardReport";
import {
  GetPaymentService as getPaymentMetrics,
  GetDocumentService as getLicenseMetrics,
  formatAmount,
  GetUsersService as getEntityMetrics
} from "../../services";

const PAYMENT_METRIC_URL = process.env.REACT_APP_PAYMENTS_METRIC_URL;
const LICENSE_METRIC_URL = process.env.REACT_APP_DOCUMENTS_LICENSE_METRICS_URL;
const ENTITY_METRIC_URL = process.env.REACT_APP_ENTITY_METRICS_URL;
export const Dashboard = () => {
  const { payments } = getPaymentMetrics(PAYMENT_METRIC_URL);
  const { documents } = getLicenseMetrics(LICENSE_METRIC_URL);
  const { users } = getEntityMetrics(ENTITY_METRIC_URL);
  return (
    <>
      <Header metrics={[
        formatAmount(payments?.data?.totalVolume),
        payments?.data?.totalCount,
        users?.data,
        documents?.data?.total]}/>
      <div className="mr-11 mt-[26px] flex items-center justify-between gap-5 md:mr-0 md:flex-col">
        <div className="flex w-[42%] flex-col items-start rounded-[5px] bg-white-a700 px-3 md:w-full md:px-5">
          <Text as="p" className="mt-3.5 text-[24px] font-light text-gray-600 md:text-[22px]">
            Analytics
          </Text>
          <Analytic license={documents?.data?.totalMonthly?.toFixed(1)}
                    metric={[payments?.data?.totalVolume,
                      payments?.data?.unpaidVolume,
                      payments?.data?.overDueVolume]} />
        </div>
        <div className="flex w-[60%] justify-center rounded-[5px] bg-white-a700 p-2.5 md:w-full md:px-5">
          <div className="mb-4 flex w-full flex-col gap-3.5">
            <div className="flex items-center justify-center sm:flex-col">
              <Text as="p" className="text-[24px] font-light text-gray-600 md:text-[22px]">
                Reports
              </Text>
              <div className="flex flex-1 items-center justify-center gap-1 sm:self-stretch">
                <div className="flex flex-1 items-start justify-end px-1.5">
                  <div className="h-[12px] w-[12px] rounded-md bg-amber-500" />
                  <Text size="texts" as="p" className="ml-1 self-center text-[14px] font-normal text-gray-600">
                    Licenses
                  </Text>
                </div>
                <div className="h-[12px] w-[12px] self-start rounded-md bg-indigo-a200" />
                <Text size="texts" as="p" className="text-[14px] font-normal text-gray-600">
                  Applications
                </Text>
              </div>
            </div>
            <div>
              <div className="flex flex-col items-end ">
                <div className="flex items-center justify-center gap-3 self-stretch sm:flex-col">
                  <Text
                    size="texts"
                    as="p"
                    className="w-[4%] text-[14px] font-light leading-4 text-gray-600 sm:w-full"
                  >
                    <>
                      180
                      <br />
                      <br />
                      150
                      <br />
                      <br />
                      120
                      <br />
                      <br />
                      90
                      <br />
                      <br />
                      60
                      <br />
                      <br />
                      30
                      <br />
                      <br />0
                    </>
                  </Text>
                  <div
                    className="flex w-[88%] items-end justify-center gap-[34px] bg-gray-200_01 p-2 sm:w-full sm:flex-col">
                    <Img
                      src="/images/img_jan.svg"
                      alt="Jan"
                      className="mt-10 h-[160px] w-[10%] object-contain sm:w-full"
                    />
                    <Img
                      src="/images/img_jan.svg"
                      alt="Feb"
                      className="h-[160px] w-[10%] object-contain sm:w-full"
                    />
                    <Img
                      src="/images/img_jan.svg"
                      alt="Mar"
                      className="h-[160px] w-[10%] object-contain sm:w-full"
                    />
                    <Img
                      src="/images/img_jan.svg"
                      alt="Apr"
                      className="h-[160px] w-[10%] object-contain sm:w-full"
                    />
                    <Img
                      src="/images/img_jan.svg"
                      alt="May"
                      className="h-[160px] w-[10%] object-contain sm:w-full"
                    />
                    <Img
                      src="/images/img_jan.svg"
                      alt="Jun"
                      className="h-[160px] w-[10%] object-contain sm:w-full"
                    />
                    <Img
                      src="/images/img_jan.svg"
                      alt="Jul"
                      className="h-[160px] w-[10%] object-contain sm:w-full"
                    />
                    <Img
                      src="/images/img_jan.svg"
                      alt="Aug"
                      className="h-[160px] w-[10%] object-contain sm:w-full"
                    />
                    <Img
                      src="/images/img_jan.svg"
                      alt="Sep"
                      className="h-[160px] w-[10%] object-contain sm:w-full"
                    />
                    <div className="h-[160px] w-[8px] flex-1 rounded bg-indigo-a200 sm:self-stretch sm:px-5" />
                    <Img
                      src="/images/img_jan.svg"
                      alt="Nov"
                      className="h-[160px] w-[10%] object-contain sm:w-full"
                    />
                    <Img
                      src="/images/img_jan.svg"
                      alt="Dec"
                      className="h-[160px] w-[10%] object-contain sm:w-full"
                    />
                  </div>
                </div>
                <Text size="texts" as="p" className="mr-3 text-[14px] font-light text-gray-600 md:mr-0">
                  Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec{" "}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LatestReport />
    </>
  );
}