import { type ReactNode, type TableHTMLAttributes } from "react";

export type TableColumn<TRow> = {
  key: string;
  header: ReactNode;
  cell: (row: TRow, index: number) => ReactNode;
  className?: string;
};

export type TableProps<TRow> = TableHTMLAttributes<HTMLTableElement> & {
  columns: TableColumn<TRow>[];
  data: TRow[];
  rowKey?: (row: TRow, index: number) => string;
  emptyState?: ReactNode;
};

export const Table = <TRow,>({
  columns,
  data,
  rowKey,
  emptyState,
  className = "",
  ...props
}: TableProps<TRow>) => (
  <div className="px-0 overflow-scroll">
    <table className={`w-full mt-4 text-left table-auto min-w-max ${className}`.trim()} {...props}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} className="h-[69px] p-4 border-y border-blue-gray-100 bg-[#BCDAF8]">
              <p className="block font-sans text-xl antialiased font-normal leading-none text-[#707073] opacity-70">
                {column.header}
              </p>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={rowKey ? rowKey(row, index) : `table-row-${index}`} className="hover:bg-[#88a6e7] hover:bg-opacity-25">
            {columns.map((column) => (
              <td key={column.key} className={`p-4 border-b border-blue-gray-50 ${column.className ?? ""}`.trim()}>
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
