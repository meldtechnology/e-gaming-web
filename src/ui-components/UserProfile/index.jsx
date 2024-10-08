import { Button } from "@headlessui/react";
import { Heading } from "../Heading";
import { Img } from "../Img";
import { Text } from "../Text";
import { useNavigate } from "react-router-dom";
import { GetUsersService as getMetricsService } from "../../services";
import { Loader } from "../Loader";
import { MeldAlert } from "../Alerts";
import { AlertType } from "../Alerts/AlertType";

const USER_PROFILES_URL = process.env.REACT_APP_USER_APP_PROFILE_URL;

export const UserProfile = () => {
  const navigate = useNavigate();

  const { users, isLoading, isError }
  = getMetricsService(`${USER_PROFILES_URL}`);

if (isLoading) return ( <Loader /> );

if (isError) return <MeldAlert alertType={AlertType.ERROR}
                               message={"Sorry User profile could not be retrieved. Please try again later"} />

  console.log("users data", users );

  return (
    <>
      <div>
        <div className="flex border-b border-solid border-blue_gray-400 bg-white-a700 px-[30px] py-5 sm:px-5">
          <Heading size="headinglg" as="h1" className="mt-2.5 text-[24px] font-bold text-gray-600 md:text-[22px]">
            User Profile
          </Heading>
        </div>
        <div>
          <div className="flex items-start justify-between gap-5 bg-indigo-50_a0 px-6 py-3.5 sm:px-5">
            <Heading
              size="headingmd"
              as="h2"
              className="ml-4 mt-2.5 text-[20px] font-bold text-black-900_01 md:ml-0"
            >
              My Profile
            </Heading>
            <Button
              shape="round"
              onClick={(e) => navigate('/app/users/_edit')}
              className="mt-1.5 min-w-[100px] min-h-[43px] text-white-a700 bg-black-900_01 self-end rounded-[14px] pl-7 pr-[34px] sm:px-5 hover:bg-gray-600"
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div
          className="flex items-start justify-left gap-7 bg-white-a700 border-b border-solid border-blue_gray-400 p-[22px] sm:flex-col sm:p-5">
          <Img
           src={users?.data?.profile?.profilePicture}
            alt="Image"
            className="mb-[18px] h-[128px] w-[128px] rounded-[64px] object-cover sm:w-full"
          />
          <div className="flex flex-col items-start gap-2">
            <Heading size="headinglg" as="h2" className="text-[24px] font-bold text-black-900_01 md:text-[22px]">
              {users?.data?.profile?.firstName} {users?.data?.profile?.lastName}
            </Heading>
            <Heading as="h3" className="text-[16px] font-bold text-black-900_01">
            {users?.data?.profile?.settings?.role}
            </Heading>
            <Heading size="headingmd" as="h4" className="text-[20px] font-bold text-light_blue-a700">
              {users?.data?.profile?.email}
            </Heading>
          </div>
        </div>
      </div>
      <div>
        <div
          className="flex flex-col items-start bg-white-a700 border-b border-solid border-blue_gray-400 py-2 pl-[66px] pr-14 md:px-5">
          <Heading size="headingmd" as="h2" className="text-[20px] font-bold text-black-900_01">
            Personal details
          </Heading>
          <div className="mt-7 flex flex-wrap justify-between gap-5 self-stretch">
            <Text size="textlg" as="p" className="text-[20px] font-normal text-gray-600">
              First Name
            </Text>
            <Text size="textlg" as="p" className="mr-[378px] text-[20px] font-normal text-gray-600">
              Last Name
            </Text>
          </div>
          <div className="mt-3 flex flex-wrap items-start justify-between gap-5 self-stretch">
            <Heading size="headingmd" as="h3" className="mb-1.5 text-[20px] font-bold text-gray-600">
              {users?.data?.profile?.firstName}
            </Heading>
            <Heading size="headingmd" as="h4" className="mr-[360px] self-end text-[20px] font-bold text-gray-600">
              {users?.data?.profile?.lastName}
            </Heading>
          </div>
          <div className="mt-[46px] flex flex-wrap items-center justify-between gap-5 self-stretch">
            <Text size="textlg" as="p" className="mt-1 self-end text-[20px] font-normal text-gray-600">
              Email
            </Text>
            <Text size="textlg" as="p" className="mr-[416px] self-start text-[20px] font-normal text-gray-600">
              Phone
            </Text>
          </div>
          <div className="mt-3 flex flex-wrap justify-between gap-5 self-stretch">
            <Heading size="headingmd" as="h5" className="text-[20px] font-bold text-gray-600">
              {users?.data?.profile?.email}
            </Heading>
            <Heading size="headingmd" as="h6" className="mr-[306px] text-[20px] font-bold text-gray-600">
              {users?.data?.profile?.phoneNumber}
            </Heading>
          </div>
          <Text size="textlg" as="p" className="mt-[62px] text-[20px] font-normal text-gray-600">
            Role
          </Text>
          <Heading size="headingmd" as="h5" className="mb-[42px] mt-3 text-[20px] font-bold text-gray-600">
            {users?.data?.profile?.settings?.role}
          </Heading>
        </div>
      </div>
    </>
  );
}