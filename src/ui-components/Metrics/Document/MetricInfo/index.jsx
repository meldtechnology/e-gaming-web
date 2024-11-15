import { Heading } from "../../../Heading";


export const MetricInfo = ({ docInfoText = "", docCount = "0", ...props }) => {
  return (
    <div {...props} className={`${props.className} flex items-center w-[32%] md:w-full`}>
      <div className="flex w-full items-start justify-between gap-5 bg-white-a700 px-1 py-3 sm:py-5">
        <div className="flex w-[65%] flex-col items-start">
          <Heading size="headinglg" as="h1" className="font-bold text-gray-600">
            {docInfoText}
          </Heading>
          <Heading size="headinglg" as="h4" className="font-bold text-black-900_01">
            {docCount}
          </Heading>
        </div>
      </div>
    </div>
  );
}