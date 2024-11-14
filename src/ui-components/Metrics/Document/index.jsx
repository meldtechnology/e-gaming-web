import { Suspense } from "react";
import { MetricInfo } from "./MetricInfo";

const data = [
  { docInfoText: "Categories", docCount: "0" },
  { docInfoText: "Forms", docCount: "0" },
  { docInfoText: "Applications", docCount: "0" },
];

export const Document = ({types, files, applications}) => {
  data[0].docCount = types;
  data[1].docCount = files;
  data[2].docCount = applications;
  return (
      <div className="flex justify-center bg-gray-100 p-4">
        <div className="mr-[72px] flex w-[94%] gap-6 md:mr-0 md:flex-col">
          <Suspense fallback={<div>Loading feed...</div>}>
            {data.map((d, index) => (
              <MetricInfo {...d} key={"document" + index}
                            docInfoText={d.docInfoText}
                            docCount={d.docCount}
                           className="bg-gray-50_01" />
            ))}
          </Suspense>
        </div>
      </div>
  );
}