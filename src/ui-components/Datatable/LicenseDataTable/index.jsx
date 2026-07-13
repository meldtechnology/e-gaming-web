import { useNavigate } from "react-router-dom";
import { storeItem } from "../../../services";
import { StatusBadge } from "../../primitives";
import { IconAction, Row, TableShell, Td } from "../TableShell";

export const LicenseDataTable = ({
  columnHeader,
  data,
  pageInfo,
  nextPage,
  previousPage,
  isLoading,
  pageSize,
  onPageSize,
  onPageChange,
  totalEntries,
  currentPageCount,
}) => {
  const navigate = useNavigate();
  const openLicense = (selectedApp) => {
    storeItem('ld', JSON.stringify(selectedApp))
    navigate('/app/licenses/form');
  }
  const openQRLicense = (selectedApp) => {
    storeItem('ld', JSON.stringify(selectedApp))
    navigate('/app/licenses/qr-code');
  }
  return (
    <TableShell
      columnHeader={columnHeader}
      isEmpty={!data || data.length === 0}
      emptyText="No licenses available"
      pageInfo={pageInfo}
      nextPage={nextPage}
      previousPage={previousPage}
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
          <Td className="font-medium">{d?.reference}</Td>
          <Td>{d?.approvedBy}</Td>
          <Td className="text-text-secondary">{new Date(d?.approvedOn).toDateString()}</Td>
          <Td>{d?.applicant?.name}</Td>
          <Td>{d?.amountPayable}</Td>
          <Td className="text-text-secondary">{d?.validity}</Td>
          <Td><StatusBadge status={d?.status} /></Td>
          <Td>
            <div className="flex items-center gap-1">
              <IconAction onClick={() => openLicense(d)} label="Open license PDF">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 512 512">
                  <path d="M64 464l48 0 0 48-48 0c-35.3 0-64-28.7-64-64L0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 304l-48 0 0-144-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z" />
                </svg>
              </IconAction>
              {d?.status === 'ISSUED' ? (
                <IconAction onClick={() => openQRLicense(d)} label="View QR code">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M24 32C10.7 32 0 42.7 0 56L0 456c0 13.3 10.7 24 24 24l16 0c13.3 0 24-10.7 24-24L64 56c0-13.3-10.7-24-24-24L24 32zm88 0c-8.8 0-16 7.2-16 16l0 416c0 8.8 7.2 16 16 16s16-7.2 16-16l0-416c0-8.8-7.2-16-16-16zm72 0c-13.3 0-24 10.7-24 24l0 400c0 13.3 10.7 24 24 24l16 0c13.3 0 24-10.7 24-24l0-400c0-13.3-10.7-24-24-24l-16 0zm96 0c-13.3 0-24 10.7-24 24l0 400c0 13.3 10.7 24 24 24l16 0c13.3 0 24-10.7 24-24l0-400c0-13.3-10.7-24-24-24l-16 0zM448 56l0 400c0 13.3 10.7 24 24 24l16 0c13.3 0 24-10.7 24-24l0-400c0-13.3-10.7-24-24-24l-16 0c-13.3 0-24 10.7-24 24zm-64-8l0 416c0 8.8 7.2 16 16 16s16-7.2 16-16l0-416c0-8.8-7.2-16-16-16s-16 7.2-16 16z" />
                  </svg>
                </IconAction>
              ) : null}
            </div>
          </Td>
        </Row>
      ))}
    </TableShell>
  );
}
