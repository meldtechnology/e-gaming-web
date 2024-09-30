import { Suspense } from "react";
import { UserMetrics } from "../UserMetrics";

const data = [
  { totalUsersText: "Total Users", userCount: "24", bkgColor: "bg-yellow-500" },
  { totalUsersText: "Total Verified", userCount: "24", bkgColor: "bg-green-a700" },
  { totalUsersText: "Total Unverified", userCount: "2", bkgColor: "bg-light_blue-a200" },
];

export const UserMetricsInfo = () => {
  return (
    <div>
      <div className="flex justify-center bg-gray-100 p-4">
        <div className="mr-[72px] flex w-[94%] gap-6 md:mr-0 md:flex-col">
          <Suspense fallback={<div>Loading feed...</div>}>
            {data.map((d, index) => (
              <UserMetrics {...d} key={"users_mgmt" + index}
                           totalUsersText = {d.totalUsersText}
                            userCount = {d.userCount}
                            bkgColor= {d.bkgColor}
                           className="bg-gray-50_01" />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
}