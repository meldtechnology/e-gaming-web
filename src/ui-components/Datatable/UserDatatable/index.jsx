import { Popuup } from "../../Popuup";


export const UserDatatable = ({ columnHeader, data, pageInfo, nextPage, previousPage }) => {
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
          {data.map((d, index) => (
              <tr key={`dt-${index}`} className="hover:bg-[#88a6e7] hover:bg-opacity-25">
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex items-center gap-3">
                    <img src={d?.profile?.profilePicture}
                         alt={d?.profile?.firstName}
                         className="relative inline-block h-9 w-9 !rounded-full object-cover object-center" />
                    <div className="flex flex-col">
                      <p
                        className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {`${d?.profile?.firstName} ${d?.profile?.lastName}`}
                      </p>
                      <p
                        className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
                        {d?.profile?.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex flex-col">
                    <p
                      className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {d?.profile?.phoneNumber}
                    </p>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="w-max">
                    <div
                      className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
                      <span className="">{d?.profile?.settings?.role}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {(d?.profile?.settings?.isEmailVerified) ? 'ACTIVE' : 'DISABLED'}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Popuup />
                </td>
              </tr>
            )
          )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
          {`Page ${pageInfo.page} of ${pageInfo.totalPages}`}
        </p>
        <div className="flex gap-2">
          <button
            className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button" disabled={pageInfo?.previous <= 0}
            onClick={previousPage} >
            Previous
          </button>
          <button
            className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"disabled={pageInfo?.next <= 0}
            onClick={nextPage} >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}