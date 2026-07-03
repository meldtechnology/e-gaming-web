import { Popup } from "../../Popup";
import { ChangePasswordModal } from "../../Model/ChangePasswordModal";
import { Model } from "../../Model";
import { useEffect, useState } from "react";
import { ChangeRoleModal } from "../../Model/ChangeRoleModal";
import { EnableToggleModal } from "../../Model/EnableToggleModal";
import { Badge, StatusBadge } from "../../primitives";
import { AvatarCell, Row, TableShell, Td } from "../TableShell";

export const UserDatatable = ({
  columnHeader,
  data,
  pageInfo,
  nextPage,
  previousPage,
  refresh,
  isLoading,
  pageSize,
  onPageSize,
  onPageChange,
  totalEntries,
  currentPageCount,
}) => {
  const [open, setOpen] = useState('invisible');
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [userData, setUserData] = useState([]);

  const openModal = () => {
    setIsOpen(!isOpen);
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
    <>
      <TableShell
        columnHeader={columnHeader}
        isEmpty={!data || data.length === 0}
        emptyText="No users available"
        pageInfo={pageInfo}
        nextPage={nextPage}
        previousPage={previousPage}
        refresh={refresh}
        showPagination
        loading={isLoading}
        pageSize={pageSize}
        onPageSize={onPageSize}
        onPageChange={onPageChange}
        totalEntries={totalEntries}
        currentPageCount={currentPageCount}
      >
        {data?.map((d, index) => (
          <Row key={`dt-${index}`}>
            <Td>
              <AvatarCell
                src={d?.profile?.profilePicture}
                alt={`${d?.profile?.firstName || ""} ${d?.profile?.lastName || ""}`.trim()}
                fallback={d?.profile?.firstName?.charAt(0) || "U"}
              >
                <div className="flex flex-col">
                  <p className="font-medium text-text-primary">
                    {`${d?.profile?.firstName} ${d?.profile?.lastName}`}
                  </p>
                  <p className="text-xs text-text-secondary">{d?.profile?.email}</p>
                </div>
              </AvatarCell>
            </Td>
            <Td>{d?.profile?.phoneNumber}</Td>
            <Td>
              <Badge tone="brand">{d?.profile?.settings?.role}</Badge>
            </Td>
            <Td>
              <StatusBadge status={d?.profile?.settings?.isEmailVerified ? 'ACTIVE' : 'INACTIVE'} />
            </Td>
            <Td>
              <Popup
                openModal={openModal}
                value={[d?.username, d?.publicId, d?.profile?.settings?.role, d?.profile?.settings?.isEmailVerified]}
                selectedUser={selectedUser}
                selectedModal={selectedModal}
                isActive={d?.profile?.settings?.isEmailVerified}
              />
            </Td>
          </Row>
        ))}
      </TableShell>

      <Model isOpen={modalType === 'pwd' ? open : 'invisible'}
             modal={<ChangePasswordModal onClick={openModal} userData={userData} />} />
      <Model isOpen={modalType === 'rle' ? open : 'invisible'}
             modal={<ChangeRoleModal onClick={openModal} userData={userData} />} />
      <Model isOpen={modalType === 'act' ? open : 'invisible'}
             modal={<EnableToggleModal onClick={openModal} userData={userData} />} />
    </>
  );
}
