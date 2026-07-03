import { storeItem, unitTens } from "../../../services";
import { useNavigate } from "react-router-dom";
import { Badge } from "../../primitives";
import { AvatarCell, IconAction, Row, TableShell, Td } from "../TableShell";

export const FileDatatable = ({
  columnHeader,
  data,
  pageInfo,
  nextPage,
  previousPage,
  isLoading,
  updateFile,
  pageSize,
  onPageSize,
  onPageChange,
  totalEntries,
  currentPageCount,
}) => {
  const navigate = useNavigate();


  const setSelectedFile = (selectedFile) => {
    storeItem('rhData', JSON.stringify(selectedFile));
    navigate('/app/documents/files/form-builder');
  }

  const refreshPage = () => {
    window.location.reload();
  }

  return (
    <TableShell
      columnHeader={columnHeader}
      isEmpty={!data || data.length === 0}
      emptyText="No revenue heads available"
      pageInfo={pageInfo}
      nextPage={nextPage}
      previousPage={previousPage}
      refresh={refreshPage}
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
            <AvatarCell src={d?.logo} alt={d?.name} fallback={d?.name?.charAt(0) || "R"}>
              <span className="sr-only">{d?.name}</span>
            </AvatarCell>
          </Td>
          <Td className="font-medium">{d?.name}</Td>
          <Td>
            <Badge tone={d?.publicVisibility ? "success" : "neutral"}>
              {d?.publicVisibility ? "Yes" : "No"}
            </Badge>
          </Td>
          <Td className="text-text-secondary">{d?.renewalName}</Td>
          <Td>
            {(d?.feeType) === 'FLAT FEE' ? 'NGN' : ''} {unitTens(d?.value)} {(d?.feeType) === 'FLAT FEE' ? '' : '%'}
          </Td>
          <Td>
            <div className="flex items-center gap-1">
              <IconAction onClick={() => updateFile(data, d?.name)} label={`Edit ${d?.name}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 576 512" fill="currentColor" aria-hidden="true">
                  <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" />
                </svg>
              </IconAction>
              <IconAction onClick={() => setSelectedFile(d)} label={`Open form builder for ${d?.name}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 640 512" fill="currentColor" aria-hidden="true">
                  <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z" />
                </svg>
              </IconAction>
            </div>
          </Td>
        </Row>
      ))}
    </TableShell>
  );
}
