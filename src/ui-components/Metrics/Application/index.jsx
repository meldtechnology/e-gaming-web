import { Suspense } from "react";
import { MetricInfo } from "./MetricInfo";

const data = [
  { docInfoText: "Pending", docCount: "0", color: "bg-warning text-text-inverse" },
  { docInfoText: "Review", docCount: "0", color: "bg-brand text-on-brand" },
  { docInfoText: "Decline", docCount: "0", color: "bg-danger text-text-inverse" },
  { docInfoText: "Approve", docCount: "0", color: "bg-success text-text-inverse" },
  { docInfoText: "Issued", docCount: "0", color: "bg-info text-text-inverse"},
];

export const Application = ({pending, review, decline, approve, issue, setStatus}) => {
  data[0].docCount = pending;
  data[1].docCount = review;
  data[2].docCount = decline;
  data[3].docCount = approve;
  data[4].docCount = issue;
  return (
    <div className="flex justify-center bg-surface-raised p-4">
      <div className="mr-[72px] flex w-[94%] gap-6 md:mr-0 md:flex-col">
        <Suspense fallback={<div>Loading feed...</div>}>
          {data.map((d, index) => (
            <MetricInfo {...d} key={"document" + index}
                        docInfoText={d.docInfoText}
                        docCount={d.docCount}
                        color={d.color}
                        setStatus={setStatus}
                        className="bg-surface-muted" />
          ))}
        </Suspense>
      </div>
    </div>
  );
}
