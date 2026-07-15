import { type ReactNode } from "react";

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
  onPageChange?: (page: number) => void;
  onRefresh?: () => void;
  onPageSize?: (size: number) => void;
  pageSize?: number;
  pageSizeOptions?: number[];
  totalEntries?: number;
  currentPageCount?: number;
  refreshLabel?: ReactNode;
  className?: string;
};

const navButtonClass =
  "inline-flex items-center gap-1.5 select-none rounded-xl border border-border bg-surface py-2 px-4 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-raised hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-40";

const pageButtonClass =
  "inline-flex h-9 min-w-9 items-center justify-center rounded-xl border px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-40";

const getVisiblePages = (current: number, total: number) => {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);

  const pages = new Set([1, total, current, current - 1, current + 1]);
  return Array.from(pages)
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b);
};

export const Pagination = ({
  pageInfo,
  onNext,
  onPrevious,
  onPageChange,
  onRefresh,
  onPageSize,
  pageSize,
  pageSizeOptions = [10, 15, 25, 50],
  totalEntries,
  currentPageCount,
  refreshLabel = "Refresh",
  className = "",
}: PaginationProps) => {
  const currentPage = pageInfo?.page ?? 1;
  const totalPages = pageInfo?.totalPages ?? 1;
  const previousDisabled = pageInfo?.previous === undefined || pageInfo.previous <= 0 || currentPage <= 1;
  const nextDisabled = pageInfo?.next === undefined || pageInfo.next <= 0 || currentPage >= totalPages;
  const visiblePages = getVisiblePages(currentPage, totalPages);
  const pageCount = currentPageCount ?? pageSize ?? 0;
  const startEntry = pageSize && pageCount ? (currentPage - 1) * pageSize + 1 : undefined;
  const endEntry = pageSize && pageCount ? (currentPage - 1) * pageSize + pageCount : undefined;
  const summary =
    startEntry && endEntry && totalEntries
      ? `Showing ${startEntry}-${Math.min(endEntry, totalEntries)} of ${totalEntries} entries`
      : pageInfo?.page === undefined
        ? ""
        : `Page ${currentPage} of ${totalPages}`;

  return (
    <nav
      className={`flex flex-wrap items-center justify-between gap-3 px-1 py-4 ${className}`.trim()}
      aria-label="Pagination"
    >
      <div className="flex flex-wrap items-center gap-3">
        {onPageSize && pageSize ? (
          <label className="flex items-center gap-2 text-sm text-text-secondary">
            <span>Show</span>
            <select
              className="h-9 rounded-xl border border-border bg-surface px-3 text-sm font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
              value={pageSize}
              onChange={(event) => onPageSize(Number(event.target.value))}
              aria-label="Rows per page"
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        <p className="text-sm text-text-secondary">{summary}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {onRefresh ? (
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-raised hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            onClick={onRefresh}
          >
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M15.3 5.7A6.5 6.5 0 103.5 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M15.5 3v3h-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {refreshLabel}
          </button>
        ) : null}
        <button className={navButtonClass} type="button" disabled={previousDisabled} onClick={onPrevious}>
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Previous
        </button>
        {visiblePages.map((page, index) => {
          const previousPage = visiblePages[index - 1];
          const showGap = previousPage !== undefined && page - previousPage > 1;
          const active = page === currentPage;

          return (
            <span key={page} className="inline-flex items-center gap-2">
              {showGap ? <span className="text-sm text-text-muted">...</span> : null}
              <button
                type="button"
                className={`${pageButtonClass} ${
                  active
                    ? "border-brand bg-brand text-on-brand"
                    : "border-border bg-surface text-text-primary hover:bg-surface-raised"
                }`}
                aria-current={active ? "page" : undefined}
                aria-label={`Go to page ${page}`}
                onClick={() => (page === currentPage ? undefined : onPageChange?.(page))}
                disabled={!onPageChange || page === currentPage}
              >
                {page}
              </button>
            </span>
          );
        })}
        <button className={navButtonClass} type="button" disabled={nextDisabled} onClick={onNext}>
          Next
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </nav>
  );
};
