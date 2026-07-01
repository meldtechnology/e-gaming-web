import { type ReactNode } from "react";
import { Button } from "./Button";

export type PageInfo = {
  page?: number;
  totalPages?: number;
  previous?: number;
  next?: number;
};

export type PaginationProps = {
  pageInfo?: PageInfo;
  onNext?: () => void;
  onPrevious?: () => void;
  onRefresh?: () => void;
  refreshLabel?: ReactNode;
  className?: string;
};

const paginationButtonClass =
  "select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none";

export const Pagination = ({
  pageInfo,
  onNext,
  onPrevious,
  onRefresh,
  refreshLabel = "Refresh Data",
  className = "",
}: PaginationProps) => {
  const previousDisabled = pageInfo?.previous === undefined || pageInfo.previous <= 0;
  const nextDisabled = pageInfo?.next === undefined || pageInfo.next <= 0;

  return (
    <div className={`flex items-center justify-between p-4 border-t border-blue-gray-50 ${className}`.trim()}>
      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
        {pageInfo?.page === undefined ? null : `Page ${pageInfo.page} of ${pageInfo.totalPages}`}
      </p>
      {onRefresh ? (
        <Button unstyled
          type="button"
          className="flex gap-2 bg-white-a700 border-solid border-gray-50_01 p-2 items-center"
          onClick={onRefresh}
        >
          {refreshLabel}
        </Button>
      ) : null}
      <div className="flex gap-2">
        <Button unstyled className={paginationButtonClass} type="button" disabled={previousDisabled} onClick={onPrevious}>
          Previous
        </Button>
        <Button unstyled className={paginationButtonClass} type="button" disabled={nextDisabled} onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  );
};
