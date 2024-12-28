import { Popup } from "../../Popup";
import { ChangePasswordModal } from "../../Model/ChangePasswordModal";
import { Model } from "../../Model";
import { useEffect, useState } from "react";
import { ChangeRoleModal } from "../../Model/ChangeRoleModal";
import { EnableToggleModal } from "../../Model/EnableToggleModal";

export const UserDatatable = ({ columnHeader, data, pageInfo, nextPage, previousPage, refresh }) => {
  const [open, setOpen] = useState('invisible');
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [userData, setUserData] = useState([]);

  const openModal = () => {
    setIsOpen(!isOpen);
    // if(!isOpen) setUserData([]);
  }

  const selectedUser = (value) => {
    setUserData(value);
  }

  const selectedModal = (value) => {
    setModalType(value);
  }


  useEffect(() => {
    setOpen(isOpen ? 'visible' : 'invisible');
  }, [isOpen, open]);

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
                  <Popup openModal={openModal}
                         value={[ d?.username, d?.publicId, d?.profile?.settings?.role, d?.profile?.settings?.isEmailVerified]}
                         selectedUser={selectedUser}
                         selectedModal={selectedModal}
                         isActive={d?.profile?.settings?.isEmailVerified}
                  />
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
        <div className={'flex gap-2'}>
          <button type="button"
                  className="flex gap-2 bg-white-a700 border-solid border-gray-50_01 p-2 items-center"
                  onClick={refresh}>
            <svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 512 512"
                 fill="#909090"
                 className="w-4 h-4">
              <path
                d="M125.7 160l50.3 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L48 224c-17.7 0-32-14.3-32-32L16 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z" />
            </svg>
            Refresh Data
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button" disabled={pageInfo?.previous <= 0}
            onClick={previousPage}>
            Previous
          </button>
          <button
            className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button" disabled={pageInfo?.next <= 0}
            onClick={nextPage}>
            Next
          </button>
        </div>
      </div>
      <Model isOpen={modalType === 'pwd' ? open : 'invisible'}
             modal={<ChangePasswordModal
               onClick={openModal}
               userData={userData} />} />
      <Model isOpen={modalType === 'rle' ? open : 'invisible'}
             modal={<ChangeRoleModal
               onClick={openModal}
               userData={userData} />} />
      <Model isOpen={modalType === 'act' ? open : 'invisible'}
             modal={<EnableToggleModal
               onClick={openModal}
               userData={userData} />} />
    </div>
  );
}