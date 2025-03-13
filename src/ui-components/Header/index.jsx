import { Text, Heading, Img } from "./..";
import React, { Suspense } from "react";

const data = [
  { n21000000One: "/images/img_user_gray_200.svg", nCounter: "N 0", totalRevenue: "Total Revenue", bkgColor: 'bg-blue-400' },
  { n21000000One: "/images/img_thumbs_up.svg", nCounter: "1,254", totalRevenue: "Total Payments", bkgColor: 'bg-pink-300' },
  { n21000000One: "/images/img_contrast.svg", nCounter: "25", totalRevenue: "Total Operators", bkgColor: 'bg-green-800_01' },
  { n21000000One: "/images/img_bag.svg", nCounter: "17", totalRevenue: "Total Licenses", bkgColor: 'bg-yellow-800' },
];

export default function Header({ metrics, ...props }) {
  return (
    <header {...props} className={`${props.className} flex flex-col mr-[50px] gap-9 md:mr-0 mt-5`}>
      <Heading size="headinglg" as="h4" className="text-[24px] font-bold text-gray-600 md:text-[22px]">
        Dashboard
      </Heading>
      <div className="flex gap-[50px] self-stretch md:flex-col">
        <Suspense fallback={<div>Loading feed...</div>}>
          {data.map((d, index) => (
            <div key={"listLine" + index} className="flex w-[24%] rounded-[5px] bg-gray-200_01 px-3 md:w-full">
              <div className="mb-[22px] flex w-full flex-col items-end gap-3">
                <div className={`h-[5px] w-[90%] ${d.bkgColor}`} />
                <div className="mr-1.5 flex items-center justify-end gap-2 self-stretch md:mr-0">
                  <div className={`flex flex-col items-center rounded-[38px] ${d.bkgColor} p-[22px] sm:p-5`}>
                    <a href="/app/applications">
                      <Img src={d.n21000000One} alt="N 21000000" className="h-[32px] w-[32px]" />
                    </a>
                  </div>
                  <div className="mb-4 flex flex-1 flex-col items-start self-end">
                    <Heading as="h4" className="text-[24px] font-bold text-gray-600">
                      {metrics[index]}
                    </Heading>
                    <Text size="textxs" as="p" className="text-[18px] font-normal text-gray-600">
                      {d.totalRevenue}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Suspense>
      </div>
    </header>
  );
}
