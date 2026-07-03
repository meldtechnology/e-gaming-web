import { env } from "../../config/env";
import { Header } from "../../ui-components";
import { Card } from "../../ui-components/primitives";
import { Analytic, LatestReport, StackBarReport } from "../../ui-components/DashBoardReport";
import {
  GetPaymentService as getPaymentMetrics,
  GetDocumentService as getLicenseMetrics,
  GetUsersService as getEntityMetrics
} from "../../services";
import { checkPermission } from "../../services/autorization";
import { formatCompactNumber } from "../../services/formatAmount";

const PAYMENT_METRIC_URL = env.PAYMENTS_METRIC_URL;
const LICENSE_METRIC_URL = env.DOCUMENTS_LICENSE_METRICS_URL;
const ENTITY_METRIC_URL = env.ENTITY_METRICS_URL;

type PaymentMetrics = {
  data?: {
    totalVolume?: number;
    totalCount?: number;
    unpaidVolume?: number;
    overDueVolume?: number;
  };
};

type LicenseMetrics = {
  data?: {
    total?: number;
    totalMonthly?: number;
  };
};

export const Dashboard = () => {
  const { payments } = getPaymentMetrics(PAYMENT_METRIC_URL) as { payments?: PaymentMetrics };
  const { documents } = getLicenseMetrics(LICENSE_METRIC_URL) as { documents?: LicenseMetrics };
  const { users } = getEntityMetrics(ENTITY_METRIC_URL) as { users?: { data?: number } };

  return checkPermission('CAN_VIEW_DASHBOARD') ? (
    <div className="flex flex-col gap-6">
      <Header metrics={[
        formatCompactNumber(payments?.data?.totalVolume),
        payments?.data?.totalCount,
        users?.data,
        documents?.data?.total]}/>
      <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-start gap-6 lg:grid-cols-1">
        <Card padded className="gap-4">
          <h2 className="text-lg font-semibold text-text-primary">Analytics</h2>
          <Analytic license={documents?.data?.totalMonthly?.toFixed(1)}
                    metric={[payments?.data?.totalVolume,
                      payments?.data?.unpaidVolume,
                      payments?.data?.overDueVolume]} />
        </Card>
        <StackBarReport />
      </div>
      <LatestReport />
    </div>
  ) : (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <img src={'/images/enugu_logo2.png'} alt={'Enugu State Gaming Commission'} className={'h-28 w-28 object-contain'} />
      <div>
        <h2 className="text-2xl font-bold text-brand">Welcome to the Enugu State Gaming Commission</h2>
        <p className="mt-2 max-w-md text-text-secondary">Your regulatory and licensing platform.</p>
      </div>
    </div>
  );
}
