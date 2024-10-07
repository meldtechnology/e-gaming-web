import { Header, Text, Heading, Img } from "../../ui-components";
import { Suspense } from "react";
import AgentProfile from "../../ui-components/AgentProfile";


const data = [
  { userName: "Bet365", userEmail: "info@bet365.com", userPrice: "NGN 200 K" },
  { userName: "Bet365", userEmail: "info@bet365.com", userPrice: "NGN 100 K" },
  { userName: "Bet365", userEmail: "info@bet365.com", userPrice: "NGN 200 K" },
  { userName: "Bet365", userEmail: "info@bet365.com", userPrice: "NGN 200 K" },
  { userName: "Bet365", userEmail: "info@bet365.com", userPrice: "NGN 200 K" },
];

export const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="mr-11 mt-[26px] flex items-center justify-between gap-5 md:mr-0 md:flex-col">
        <div className="flex w-[42%] flex-col items-start rounded-[5px] bg-white-a700 px-3 md:w-full md:px-5">
          <Text as="p" className="mt-3.5 text-[24px] font-light text-gray-600 md:text-[22px]">
            Analytics
          </Text>
          <div className="mx-5 flex flex-col items-center gap-9 self-stretch md:mx-0">
            <div className="relative h-[188px] w-[46%] content-center md:h-auto">
              <div className="mx-auto flex flex-1 items-start">
                <div className="flex flex-1 items-center">
                  <div className="flex flex-1 items-start justify-center">
                    <Img
                      src="/images/donut_blue.svg"
                      alt="Donut"
                      className="h-[188px] w-[99px] flex-1 self-center rounded-[46px]"
                    />
                    <Heading
                      size="headinglg"
                      as="h1"
                      className="relative ml-[-49px] mt-[72px] text-[24px] font-bold text-gray-600 md:text-[22px]"
                    >
                      5.2
                    </Heading>
                  </div>
                  <Img
                    src="/images/img_mobile.svg"
                    alt="Mobile"
                    className="relative ml-[-46px] h-[75px] w-[85px] self-end object-contain"
                  />
                </div>
                <Img
                  src="/images/img_subtract_black.svg"
                  alt="Subtractblack"
                  className="relative ml-[-85px] h-[115px] w-[92px] object-contain"
                />
              </div>
              <Heading
                as="h2"
                className="absolute bottom-[39%] left-0 right-0 m-auto w-max text-[16px] font-bold text-gray-600"
              >
                Licenses
              </Heading>
            </div>
            <div className="flex items-center self-stretch">
              <div className="flex w-[24%] justify-center">
                <div className="flex w-full flex-col items-start">
                  <Text size="textmd" as="p" className="text-[16px] font-normal text-gray-600">
                    Total Paid
                  </Text>
                  <div className="mx-2 flex items-center self-stretch md:mx-0">
                    <div className="h-[8px] w-[8px] rounded bg-blue-a400" />
                    <Heading size="headingxs" as="h3" className="text-[14px] font-bold text-black-900_01">
                      490
                    </Heading>
                  </div>
                </div>
              </div>
              <div className="flex w-[34%] justify-center px-[26px] sm:px-5">
                <div className="flex w-full flex-col items-center">
                  <Text size="textmd" as="p" className="text-[16px] font-normal text-gray-600">
                    Total Unpaid
                  </Text>
                  <div className="flex w-[48%] items-center justify-center md:w-full">
                    <div className="h-[8px] w-[8px] rounded bg-black-900_01" />
                    <Heading size="headingxs" as="h4" className="text-[14px] font-bold text-black-900_01">
                      294
                    </Heading>
                  </div>
                </div>
              </div>
              <div className="flex-1 px-[26px] sm:px-5">
                <div className="flex flex-col items-start">
                  <Text size="textmd" as="p" className="text-[16px] font-normal text-gray-600">
                    Total Overdue
                  </Text>
                  <div className="flex w-[46%] items-center justify-center md:w-full">
                    <div className="h-[8px] w-[8px] rounded bg-indigo-a100_01" />
                    <Heading size="headingxs" as="h5" className="text-[14px] font-bold text-black-900_01">
                      196
                    </Heading>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
      <div className="mr-[50px] mt-3 flex items-center gap-2 md:mr-0 md:flex-col">
        <div className="flex-1 md:self-stretch md:px-5">
          <div className="rounded-[5px] bg-white-a700 p-3">
            <div className="mb-[22px] flex flex-col gap-6">
              <div className="mr-[18px] flex flex-wrap items-center justify-between gap-5 md:mr-0">
                <Text as="p" className="text-[24px] font-light text-gray-600 md:text-[22px]">
                  Recent Applications
                </Text>
                <Text size="textmd" as="p" className="text-[16px] font-normal text-black-900_01">
                  ...
                </Text>
              </div>
              {/*ReactTable*/}
            </div>
          </div>
        </div>
        <div className="w-[26%] md:w-full md:px-5">
          <div className="flex flex-col items-start justify-center gap-8 rounded-[5px] bg-white-a700 px-1.5 py-2">
            <Text as="p" className="ml-1.5 mt-1 text-[24px] font-light text-gray-600 md:ml-0 md:text-[22px]">
              Latest Licenses
            </Text>
            <div className="mr-1.5 flex flex-col gap-3 self-stretch md:mr-0">
              <Suspense fallback={<div>Loading feed...</div>}>
                {data.map((d, index) => (
                  <AgentProfile {...d} key={"listing200K" + index} className="ml-1.5 md:ml-0" />
                ))}
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}