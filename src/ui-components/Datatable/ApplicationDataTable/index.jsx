import { storeItem } from "../../../services";
import { useNavigate } from "react-router-dom";

const statusColor = (status) => {
  if(status === 'PENDING') return 'bg-orange-600';
  if(status === 'REVIEW') return 'bg-purple-600';
  if(status === 'APPROVE') return 'bg-green-600';
  if(status === 'ISSUED') return 'bg-blue-600';
  if(status === 'PAID') return 'bg-green-600';
  return 'bg-red-600';
}

export const ApplicationDataTable = ({ columnHeader, data, pageInfo, nextPage, previousPage }) => {
  const navigate = useNavigate();

  const setSelectedApplication = (selectedFile) => {
    storeItem('revApp', JSON.stringify(selectedFile));
    navigate('/app/documents/R_SHFB95GH');
  }

  console.log(data);

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
                      className={`block  font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900`}>
                      {d?.amountPaid}
                      <span className={`${statusColor(d?.paymentStatus)} text-white-a700 text-center ml-1 p-1 rounded-full`}>
                        {d?.paymentStatus?d?.paymentStatus : 'PENDING'}
                      </span>
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
                    <span className={`${statusColor(d?.status)} rounded-full text-white-a700 p-2`}>{d?.status}</span>
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <button type="button"
                          onClick={() => setSelectedApplication(d)}
                          className={`${d?.status === 'ISSUED'? 'hidden' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className="w-[24px] h-[24px] inline-block"
                         viewBox="0 0 640 512">
                      <path
                        d="M88.2 309.1c9.8-18.3 6.8-40.8-7.5-55.8C59.4 230.9 48 204 48 176c0-63.5 63.8-128 160-128s160 64.5 160 128s-63.8 128-160 128c-13.1 0-25.8-1.3-37.8-3.6c-10.4-2-21.2-.6-30.7 4.2c-4.1 2.1-8.3 4.1-12.6 6c-16 7.2-32.9 13.5-49.9 18c2.8-4.6 5.4-9.1 7.9-13.6c1.1-1.9 2.2-3.9 3.2-5.9zM208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 41.8 17.2 80.1 45.9 110.3c-.9 1.7-1.9 3.5-2.8 5.1c-10.3 18.4-22.3 36.5-36.6 52.1c-6.6 7-8.3 17.2-4.6 25.9C5.8 378.3 14.4 384 24 384c43 0 86.5-13.3 122.7-29.7c4.8-2.2 9.6-4.5 14.2-6.8c15.1 3 30.9 4.5 47.1 4.5zM432 480c16.2 0 31.9-1.6 47.1-4.5c4.6 2.3 9.4 4.6 14.2 6.8C529.5 498.7 573 512 616 512c9.6 0 18.2-5.7 22-14.5c3.8-8.8 2-19-4.6-25.9c-14.2-15.6-26.2-33.7-36.6-52.1c-.9-1.7-1.9-3.4-2.8-5.1C622.8 384.1 640 345.8 640 304c0-94.4-87.9-171.5-198.2-175.8c4.1 15.2 6.2 31.2 6.2 47.8l0 .6c87.2 6.7 144 67.5 144 127.4c0 28-11.4 54.9-32.7 77.2c-14.3 15-17.3 37.6-7.5 55.8c1.1 2 2.2 4 3.2 5.9c2.5 4.5 5.2 9 7.9 13.6c-17-4.5-33.9-10.7-49.9-18c-4.3-1.9-8.5-3.9-12.6-6c-9.5-4.8-20.3-6.2-30.7-4.2c-12.1 2.4-24.8 3.6-37.8 3.6c-61.7 0-110-26.5-136.8-62.3c-16 5.4-32.8 9.4-50 11.8C279 439.8 350 480 432 480z" />
                    </svg>
                  </button>
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
      <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
          <span className={`${pageInfo?.page === undefined ? "hidden" : ""}`}>
            {`Page ${pageInfo?.page} of ${pageInfo?.totalPages}`}
          </span>
        </p>
        <div className="flex gap-2">
          <button
            className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button" disabled={pageInfo?.previous <= 0 || pageInfo?.previous === undefined}
            onClick={previousPage}>
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