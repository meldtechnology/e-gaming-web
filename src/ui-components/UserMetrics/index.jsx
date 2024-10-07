import { Img } from "../Img";
import { Heading } from "../Heading";

export const UserMetrics = ({ totalUsersText = "Total Users", userCount = "24", bkgColor, ...props }) => {
  return (
    <div {...props} className={`${props.className} flex items-center w-[32%] md:w-full`}>
      <div className="flex w-full items-start justify-between gap-5 bg-white-a700 px-3 py-9 sm:py-5">
        <div className={`w-[21%] h-[18%] self-center rounded-[50%] ${bkgColor} p-1`}>
          <Img src="/images/img_lock.svg" alt="Total Users" className="h-[70px] w-[70px]" />
        </div>
        <div className="flex w-[65%] flex-col items-start">
          <Heading size="headinglg" as="h4" className="text-[24px] font-bold text-gray-600">
            {totalUsersText}
          </Heading>
          <Heading size="headingxl" as="h1" className="text-[36px] font-bold text-black-900_01">
            {userCount}
          </Heading>
        </div>
      </div>
    </div>
  );
}