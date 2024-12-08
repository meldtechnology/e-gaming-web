import { Loader } from "../../Loader";
import { storeItem, unitTens } from "../../../services";
import { useNavigate } from "react-router-dom";

export const FileDatatable = ({ columnHeader, data, pageInfo, nextPage, previousPage, isLoading, updateFile }) => {
  const navigate = useNavigate();


  const setSelectedFile = (selectedFile) => {
    storeItem('rhData', JSON.stringify(selectedFile));
    navigate('/app/documents/F_D5N2M19');
  }

  const refreshPage = () => {
    window.location.reload();
  }

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
                        <img src={d?.logo} alt="Img" className={"w-[36px] h-[36px]"} />
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-2 border-b border-blue-gray-50">
                    <div className="flex flex-col">
                      <p
                        className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
                        {d?.name}
                      </p>
                  </div>
                </td>
                <td className="p-2 border-b border-blue-gray-50">
                  <div className="flex flex-col">
                    <p
                      className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {(d?.publicVisibility)? 'Yes' : 'No'}
                    </p>
                  </div>
                </td>
                <td className="p-2 border-b border-blue-gray-50">
                  <div className="flex flex-col">
                    <p
                      className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {d?.renewalName}
                    </p>
                  </div>
                </td>
                <td className="p-2 border-b border-blue-gray-50">
                  <div className="flex flex-col">
                    <p
                      className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {(d?.feeType) === 'FLAT FEE'? '#':''} {unitTens(d?.value)} {(d?.feeType) === 'FLAT FEE'? '':'%'}
                    </p>
                  </div>
                </td>
                <td className="p-2 border-b border-blue-gray-50">
                  <div className="flex flex-col items-center">
                    <p
                      className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      <button type="button"
                              onClick={() => updateFile(data, d?.name)}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="w-[14px] h-[14px] inline-block mr-2"
                             viewBox="0 0 576 512">
                          <path
                            fill="#90A4AE"
                            d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" />
                        </svg>
                      </button>
                      <button type="button"
                              onClick={() => setSelectedFile(d)}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="w-[14px] h-[14px] inline-block"
                             viewBox="0 0 640 512">
                          <path
                            d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z" />
                        </svg>
                      </button>
                    </p>
                  </div>
                </td>
              </tr>
            )
          )}
          </tbody>
        </table>
        <div className={`${isLoading ? "" : "hidden"}`}>
          <Loader />
        </div>
        <div className={`${(data || isLoading) ? "hidden" : ""} text-center py-6`}>
          No revenue heads record is available
        </div>
      </div>
      <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
          <span className={`${pageInfo?.page === undefined ? "hidden" : ""}`}>
            {`Page ${pageInfo?.page} of ${pageInfo?.totalPages}`}
          </span>
        </p>
        <button type='button'
                className="bg-white-a700 border-solid border-gray-50_01 p-2"
                onClick={() => refreshPage()} >
          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 512 512"
               fill="#CECECE"
               className="w-4 h-4">
            <path d="M125.7 160l50.3 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L48 224c-17.7 0-32-14.3-32-32L16 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z"/>
          </svg>
        </button>
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