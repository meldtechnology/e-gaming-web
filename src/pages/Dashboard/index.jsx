import { Header, Text } from "../../ui-components";
import { Analytic, LatestReport, StackBarReport } from "../../ui-components/DashBoardReport";
import {
  GetPaymentService as getPaymentMetrics,
  GetDocumentService as getLicenseMetrics,
  formatAmount,
  GetUsersService as getEntityMetrics, getItem
} from "../../services";

const PAYMENT_METRIC_URL = process.env.REACT_APP_PAYMENTS_METRIC_URL;
const LICENSE_METRIC_URL = process.env.REACT_APP_DOCUMENTS_LICENSE_METRICS_URL;
const ENTITY_METRIC_URL = process.env.REACT_APP_ENTITY_METRICS_URL;
export const Dashboard = () => {
  const { payments } = getPaymentMetrics(PAYMENT_METRIC_URL);
  const { documents } = getLicenseMetrics(LICENSE_METRIC_URL);
  const { users } = getEntityMetrics(ENTITY_METRIC_URL);
  console.log(getItem('at'));
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
        <StackBarReport />
      </div>
      <LatestReport />
    </>
  );
}