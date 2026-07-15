import { extractFullDate, formatAmount } from "../../../services";
import { StatusBadge } from "../../primitives";
import { Row, TableShell, Td } from "../TableShell";

export const ReportDataTable = ({ columnHeader, data }) => {
  return (
    <TableShell
      columnHeader={columnHeader}
      isEmpty={!data || data.length === 0}
      emptyText="No records available"
    >
      {data?.map((d, index) => (
        <Row key={`dt-${index}`}>
          <Td className="font-medium">{d?.applicant?.name}</Td>
          <Td className="text-text-secondary">{d?.applicant?.type}</Td>
          <Td>{formatAmount(d?.amountPayable)}</Td>
          <Td className="text-text-secondary">{extractFullDate(d?.submittedOn)}</Td>
          <Td><StatusBadge status={d?.status} /></Td>
        </Row>
      ))}
    </TableShell>
  );
}
