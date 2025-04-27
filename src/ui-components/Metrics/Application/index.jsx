import { Suspense } from "react";
import { MetricInfo } from "./MetricInfo";

const data = [
  { docInfoText: "Pending", docCount: "0", color: "bg-yellow-600" },
  { docInfoText: "Review", docCount: "0", color: "bg-purple-600" },
  { docInfoText: "Decline", docCount: "0", color: "bg-red-600" },
  { docInfoText: "Approve", docCount: "0", color: "bg-green-600" },
  { docInfoText: "Issued", docCount: "0", color: "bg-blue-600"},
];

export const Application = ({pending, review, decline, approve, issue, setStatus}) => {
  data[0].docCount = pending;
  data[1].docCount = review;
  data[2].docCount = decline;
  data[3].docCount = approve;
  data[4].docCount = issue;
  return (
    <div className="flex justify-center bg-gray-100 p-4">
      <div className="mr-[72px] flex w-[94%] gap-6 md:mr-0 md:flex-col">
        <Suspense fallback={<div>Loading feed...</div>}>
          {data.map((d, index) => (
            <MetricInfo {...d} key={"document" + index}
                        docInfoText={d.docInfoText}
                        docCount={d.docCount}
                        color={d.color}
                        setStatus={setStatus}
                        className="bg-gray-50_01" />
          ))}
        </Suspense>
      </div>
    </div>
  );
}