import { env } from "../../config/env";
import { Suspense } from "react";
import { UserMetrics } from "../UserMetrics";
import { GetUsersService as getMetricsService } from "../../services";
import { MeldAlert } from "../Alerts";
import { AlertType } from "../Alerts/AlertType";
import { Loader } from "../Loader";

const data = [
  { totalUsersText: "Total Users", userCount: "24", bkgColor: "bg-warning" },
  { totalUsersText: "Total Verified", userCount: "24", bkgColor: "bg-success" },
  { totalUsersText: "Total Unverified", userCount: "2", bkgColor: "bg-info" },
];

const USER_METRICS_URL = env.USER_METRICS_URL;
export const UserMetricsInfo = () => {
  const { users, isLoading, isError }
    = getMetricsService(USER_METRICS_URL);

  if (isLoading) return ( <Loader /> );

  if (isError) return <MeldAlert alertType={AlertType.ERROR}
                      message={"Users profile could not be retrieved. Please try again later"} />

  data[0].userCount = users.data.total;
  data[1].userCount = users.data.totalEnabled;
  data[2].userCount = users.data.totalDisabled;

  return (
    <div>
      <div className="flex justify-center bg-surface-raised p-4">
        <div className="mr-[72px] flex w-[94%] gap-6 md:mr-0 md:flex-col">
          <Suspense fallback={<div>Loading feed...</div>}>
            {data.map((d, index) => (
              <UserMetrics {...d} key={"users_mgmt" + index}
                           totalUsersText={d.totalUsersText}
                           userCount={d.userCount}
                           bkgColor={d.bkgColor}
                           className="bg-surface-muted" />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
