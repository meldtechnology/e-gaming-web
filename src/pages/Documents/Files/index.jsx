import { PageHeader, AccessDenied } from "../../../ui-components";
import { DocumentNavBar } from "../../../ui-components/NavBar";
import { FileGroup } from "../../../ui-components/FileGroup";
import { checkPermission } from "../../../services/autorization";

export const Files = () => {
  if (!checkPermission('CAN_VIEW_DOCUMENTS')) return <AccessDenied />;

  return (
    <>
      <PageHeader title="Revenue Heads" toolbar={<DocumentNavBar />} />
      <FileGroup />
    </>
  );
}
