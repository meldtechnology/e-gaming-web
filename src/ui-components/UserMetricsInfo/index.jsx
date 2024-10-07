import { Suspense } from "react";
import { UserMetrics } from "../UserMetrics";
import { GetUsersService as getMetricsService } from "../../services";
import { MeldAlert } from "../Alerts";
import { AlertType } from "../Alerts/AlertType";
import { Loader } from "../Loader";

const data = [
  { totalUsersText: "Total Users", userCount: "24", bkgColor: "bg-yellow-500" },
  { totalUsersText: "Total Verified", userCount: "24", bkgColor: "bg-green-a700" },
  { totalUsersText: "Total Unverified", userCount: "2", bkgColor: "bg-light_blue-a200" },
];

const USER_METRICS_URL = process.env.REACT_APP_USER_METRICS_URL;
export const UserMetricsInfo = () => {
  const { users, isLoading, isError }
    = getMetricsService(USER_METRICS_URL);

  if (isLoading) return ( <Loader /> );

  if (isError) return <MeldAlert alertType={AlertType.ERROR}
                      message={"Sorry Users profile could not be retrieved. Please try again later"} />

  data[0].userCount = users.data.total;
  data[1].userCount = users.data.totalEnabled;
  data[2].userCount = users.data.totalDisabled;

  return (
    <div>
      <div className="flex justify-center bg-gray-100 p-4">
        <div className="mr-[72px] flex w-[94%] gap-6 md:mr-0 md:flex-col">
          <Suspense fallback={<div>Loading feed...</div>}>
            {data.map((d, index) => (
              <UserMetrics {...d} key={"users_mgmt" + index}
                           totalUsersText={d.totalUsersText}
                           userCount={d.userCount}
                           bkgColor={d.bkgColor}
                           className="bg-gray-50_01" />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
}