
const statusColor = (status) => {
  if(status === 'PENDING') return 'bg-orange-600';
  if(status === 'REVIEW') return 'bg-purple-600';
  if(status === 'APPROVE') return 'bg-green-600';
  if(status === 'ISSUED') return 'bg-blue-600';
  return 'bg-red-600';
}

export const ApplicationDataTable = ({ columnHeader, data, pageInfo, nextPage, previousPage }) => {
  return (
    <div
      className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
      <div className="px-0 overflow-scroll">
        <table className="w-full mt-4 text-left table-auto min-w-max">
          <thead>
          <tr>
            {columnHeader.map((col, index) => (
              <th key={`userColHead-${index}`} className="h-[69px] p-4 border-y border-blue-gray-100 bg-[#BCDAF8]">
                <p
                  className="block font-sans text-xl antialiased font-normal leading-none text-[#707073] opacity-70">
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
                        {d?.reference}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-2 border-b border-blue-gray-50">
                  <div className="flex flex-col">
                    <p
                      className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {d?.createdBy}
                    </p>
                  </div>
                </td>
                <td className="p-2 border-b border-blue-gray-50">
                  <div className="flex flex-col">
                    <p
                      className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {d?.submittedOn}
                    </p>
                  </div>
                </td>
                <td className="p-2 border-b border-blue-gray-50">
                  <div className="flex flex-col">
                    <p
                      className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {d?.amountPaid}
                    </p>
                  </div>
                </td>
                <td className="p-2 border-b border-blue-gray-50">
                  <div className="flex flex-col">
                    <p
                      className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {d?.amountPayable}
                    </p>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    <span className={`${statusColor(d?.status)} text-white-a700 p-2`}>{d?.status}</span>
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                 action
                </td>
              </tr>
            )
          )}
          </tbody>
        </table>
        <div className={`${data? 'hidden' : ''} text-center py-6`}>
          No Application data is available
        </div>
      </div>
      <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
          <span className={`${pageInfo?.page === undefined? 'hidden':''}`}>
            {`Page ${pageInfo?.page} of ${pageInfo?.totalPages}`}
          </span>
        </p>
        <div className="flex gap-2">
          <button
            className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button" disabled={pageInfo?.previous <= 0 || pageInfo?.previous === undefined}
            onClick={previousPage} >
            Previous
          </button>
          <button
            className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button" disabled={pageInfo?.next <= 0 || pageInfo?.previous === undefined}
            onClick={nextPage} >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}