import { EmptyState, Pagination, Skeleton } from "../../primitives";

/** Standard body cell for the module datatables. */
export const Td = ({ children, className = "" }) => (
  <td className={`px-4 py-3.5 align-middle text-sm text-text-primary ${className}`.trim()}>{children}</td>
);

/** Avatar/icon cell pattern for tables with a visual lead column. */
export const AvatarCell = ({ src, alt = "", fallback, children }) => (
  <div className="flex items-center gap-3">
    {src ? (
      <img
        src={src}
        alt={alt}
        className="inline-flex h-10 w-10 shrink-0 rounded-xl object-cover object-center ring-1 ring-border"
      />
    ) : (
      <span
        aria-hidden="true"
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-sm font-bold text-brand ring-1 ring-border"
      >
        {fallback}
      </span>
    )}
    <div className="min-w-0">{children}</div>
  </div>
);

/** Standard hover row. Pass onClick to make the whole row interactive. */
export const Row = ({ children, onClick }) => (
  <tr
    onClick={onClick}
    className={`border-b border-border last:border-0 transition-colors hover:bg-brand-soft/60 ${
      onClick ? "cursor-pointer" : ""
    }`.trim()}
  >
    {children}
  </tr>
);

/** Icon action button used in the trailing "actions" column. */
export const IconAction = ({ onClick, label, children, className = "" }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    title={label}
    className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface-raised hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${className}`.trim()}
  >
    {children}
  </button>
);

/**
 * Shared shell for module datatables: card surface, sticky-styled header,
 * empty state and optional pagination. Rows are provided as children.
 */
export const TableShell = ({
  columnHeader = [],
  children,
  isEmpty = false,
  emptyText = "No data is available",
  emptyDescription,
  pageInfo,
  nextPage,
  previousPage,
  refresh,
  showPagination = false,
  loading = false,
  skeletonRows = 5,
  pageSize,
  pageSizeOptions,
  onPageSize,
  onPageChange,
  totalEntries,
  currentPageCount,
}) => (
  <div className="w-full">
    <div className="w-full overflow-x-auto rounded-2xl border border-border bg-surface shadow-e1">
      <table className="w-full min-w-max border-collapse text-left">
        <thead className="sticky top-0 z-10">
          <tr className="bg-surface-muted">
            {columnHeader.map((col, index) => (
              <th
                key={`col-${index}`}
                scope="col"
                className="whitespace-nowrap border-b border-border px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-text-secondary"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: skeletonRows }).map((_, rowIndex) => (
                <Row key={`skeleton-row-${rowIndex}`}>
                  {columnHeader.map((_, colIndex) => (
                    <Td key={`skeleton-cell-${rowIndex}-${colIndex}`}>
                      <Skeleton className="w-28 max-w-full" />
                    </Td>
                  ))}
                </Row>
              ))
            : children}
        </tbody>
      </table>
      {!loading && isEmpty ? (
        <div className="border-t border-border bg-surface px-6 py-8">
          <EmptyState title={emptyText} description={emptyDescription} />
        </div>
      ) : null}
    </div>
    {showPagination ? (
      <Pagination
        pageInfo={pageInfo}
        onNext={nextPage}
        onPrevious={previousPage}
        onRefresh={refresh}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        onPageSize={onPageSize}
        onPageChange={onPageChange}
        totalEntries={totalEntries}
        currentPageCount={currentPageCount}
      />
    ) : null}
  </div>
);
