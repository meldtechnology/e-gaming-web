import { Popup } from "../../Popup";
import { ChangePasswordModal } from "../../Model/ChangePasswordModal";
import { Model } from "../../Model";
import { useEffect, useState } from "react";
import { ChangeRoleModal } from "../../Model/ChangeRoleModal";
import { EnableToggleModal } from "../../Model/EnableToggleModal";
import { Pagination } from "../../primitives";

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
      <Pagination
        pageInfo={pageInfo}
        onNext={nextPage}
        onPrevious={previousPage}
        onRefresh={refresh}
      />
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
