import { type ReactNode, type TableHTMLAttributes } from "react";

export type TableColumn<TRow> = {
  key: string;
  header: ReactNode;
  cell: (row: TRow, index: number) => ReactNode;
  className?: string;
  headerClassName?: string;
};

export type TableProps<TRow> = TableHTMLAttributes<HTMLTableElement> & {
  columns: TableColumn<TRow>[];
  data: TRow[];
  rowKey?: (row: TRow, index: number) => string;
  emptyState?: ReactNode;
  onRowClick?: (row: TRow, index: number) => void;
};

export const Table = <TRow,>({
  columns,
  data,
  rowKey,
  emptyState,
  onRowClick,
  className = "",
  ...props
}: TableProps<TRow>) => (
  <div className="w-full overflow-x-auto rounded-2xl border border-border bg-surface">
    <table className={`w-full text-left border-collapse ${className}`.trim()} {...props}>
      <thead>
        <tr className="bg-surface-muted">
          {columns.map((column) => (
            <th
              key={column.key}
              className={`px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-text-secondary border-b border-border ${column.headerClassName ?? ""}`.trim()}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            key={rowKey ? rowKey(row, index) : `table-row-${index}`}
            className={`border-b border-border last:border-0 transition-colors hover:bg-brand-soft/60 ${
              onRowClick ? "cursor-pointer" : ""
            }`}
            onClick={onRowClick ? () => onRowClick(row, index) : undefined}
          >
            {columns.map((column) => (
              <td
                key={column.key}
                className={`px-4 py-3.5 text-sm text-text-primary align-middle ${column.className ?? ""}`.trim()}
              >
                {column.cell(row, index)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    {!data.length && emptyState ? emptyState : null}
  </div>
);
