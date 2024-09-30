import { Img, Text, Heading } from "./..";
import React from "react";

export default function Dashboard1({
  adminText = "MELD ADMIN",
  revenueText = "Revenue Dashboard",
  dashboardText = "Dashboard",
  documentText = "Document",
  applicationsText = "Applications",
  licenseText = "License",
  reportText = "Report",
  userText = "User",
  settingsText = "Settings",
  userName = "Francis Oruno",
  userAccountType = "Free Account",
  ...props
}) {
  return (
    <div {...props} className={`${props.className} flex flex-col items-center w-[20%] md:w-full py-2.5`}>
      <div className="mt-6 self-stretch">
        <div className="mx-3">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center justify-center gap-2.5 self-stretch">
              <Img src="/images/img_subtract.png" alt="Meld Admin" className="h-[42px] w-[42px] object-cover" />
              <Text as="p" className="text-[24px] font-light text-white-a700">
                {adminText}
              </Text>
            </div>
            <Heading as="h6" className="font-inter text-[16px] font-bold text-gray-500">
              {revenueText}
            </Heading>
          </div>
        </div>
        <div className="mt-9 flex items-center gap-[9px] px-[18px] py-3.5">
          <Img src="/images/menu/img_grid.svg" alt="Dashboard" className="h-[42px] w-[42px]" />
          <Text as="p" className="mb-1.5 self-end text-[24px] font-normal text-gray-600">
            {dashboardText}
          </Text>
        </div>
        <div className="mt-2.5">
          <div className="flex items-center gap-[15px] px-[18px] py-3.5">
            <Img src="/images/menu/img_checkmark.svg" alt="Document" className="h-[40px] w-[40px]" />
            <Text as="p" className="mb-1.5 self-end text-[24px] font-normal text-gray-600">
              {documentText}
            </Text>
          </div>
          <div className="relative mt-[-6px] flex items-start justify-center gap-[30px] px-3 py-4">
            <Img src="/images/menu/img_application.svg" alt="Applications" className="mb-1.5 h-[34px] w-[34px]" />
            <Text as="p" className="self-center text-[24px] font-normal text-gray-600">
              {applicationsText}
            </Text>
          </div>
        </div>
        <div className="mt-1.5 flex items-center gap-[21px] p-3.5">
          <Img src="/images/menu/img_file.svg" alt="License" className="h-[44px] w-[44px]" />
          <Text as="p" className="text-[24px] font-normal text-gray-600">
            {licenseText}
          </Text>
        </div>
        <div className="relative mt-[-2px] flex items-start gap-4 px-[18px] py-4">
          <Img src="/images/menu/img_report.svg" alt="Report" className="h-[40px] w-[40px] self-center" />
          <Text as="p" className="mt-1 text-[24px] font-normal text-gray-600">
            {reportText}
          </Text>
        </div>
        <div className="mt-1.5 flex items-center bg-gradient1">
          <div className="h-[72px] w-[4px] bg-blue-a700" />
          <Img src="/images/menu/active/img_user.svg" alt="User" className="ml-3 h-[44px] w-[44px]" />
          <Text as="p" className="ml-[18px] text-[24px] font-normal text-blue-a700">
            {userText}
          </Text>
        </div>
        <div className="flex items-center gap-[11px] px-5 py-4">
          <Img src="/images/menu/img_settings.svg" alt="Settings" className="h-[40px] w-[40px]" />
          <Text as="p" className="text-[24px] font-normal text-gray-600">
            {settingsText}
          </Text>
        </div>
        <div className="mx-2.5 mt-[264px] flex items-center justify-center gap-2 rounded-[10px] bg-gray-800 px-1 py-1.5">
          <Img
            src="/images/img_rectangle_4163.png"
            alt="Francis Oruno"
            className="h-[66px] w-[30%] rounded-[10px] object-contain"
          />
          <div className="flex flex-1 flex-col items-start">
            <Text size="textmd" as="p" className="text-[16px] font-light text-white-a700">
              {userName}
            </Text>
            <Text size="texts" as="p" className="text-[14px] font-light text-blue_gray-400">
              {userAccountType}
            </Text>
          </div>
          <Img src="/images/img_arrow_down.svg" alt="Francis Oruno" className="mt-[18px] h-[24px] w-[24px] self-start" />
        </div>
      </div>
    </div>
  );
}
