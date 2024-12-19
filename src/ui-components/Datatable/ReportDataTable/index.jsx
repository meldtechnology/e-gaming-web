import { extractFullDate, formatAmount } from "../../../services";

const statusColor = (status) => {
  if(status === 'PENDING') return 'bg-orange-600';
  if(status === 'REVIEW') return 'bg-purple-600';
  if(status === 'APPROVE') return 'bg-green-600';
  if(status === 'ISSUED') return 'bg-blue-600';
  if(status === 'PAID') return 'bg-green-600';
  return 'bg-red-600';
}

export const ReportDataTable = ({ columnHeader, data}) => {
  return (
    <div
      className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
      <div className="px-0 overflow-scroll">
        <table className="w-full mt-4 text-left table-auto min-w-max">
          <thead>
          <tr>
            {columnHeader.map((col, index) => (
              <th key={`userColHead-${index}`} className="h-[49px] p-4 border-y border-blue-gray-100 bg-[#BCDAF8]">
                <p
                  className="block font-sans text-xl antialiased font-bold leading-none text-[#707073] opacity-70">
                  {col}
                </p>
              </th>
            ))
            }
          </tr>
          </thead>
          <tbody>
          {data?.map((d, index) => (
              <tr key={`dt-${index}`} className="hover:bg-[#88a6e7] hover:bg-opacity-25">
                <td className="p-2 border-b border-blue-gray-50">
                  <div className="flex items-center gap-1">
                    <div className="flex flex-col">
                      <p
                        className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
                        {d?.applicant?.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-2 border-b border-blue-gray-50">
                  <div className="flex flex-col">
                    <p
                      className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {d?.applicant?.type}
                    </p>
                  </div>
                </td>
                <td className="p-2 border-b border-blue-gray-50">
                  <div className="flex flex-col">
                    <p
                      className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {formatAmount(d?.amountPayable)}
                    </p>
                  </div>
                </td>
                <td className="p-2 border-b border-blue-gray-50">
                  <div className="flex flex-col">
                    <p
                      className={`block  font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900`}>
                      {extractFullDate(d?.submittedOn)}
                    </p>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    <span className={`${statusColor(d?.status)} rounded-full text-white-a700 p-2`}>{d?.status}</span>
                  </p>
                </td>
              </tr>
            )
          )}
          </tbody>
        </table>
        <div className={`${data ? "hidden" : ""} text-center py-6`}>
          No Application data is available
        </div>
      </div>
    </div>
  );
}