import { PageHeader, AccessDenied } from "../../../ui-components";
import { DocumentNavBar } from "../../../ui-components/NavBar";
import { TypeGroup } from "../../../ui-components/TypeGroup";
import { checkPermission } from "../../../services/autorization";

export const Types = () => {
  if (!checkPermission('CAN_VIEW_CATEGORIES')) return <AccessDenied />;

  return (
    <>
      <PageHeader title="Categories" toolbar={<DocumentNavBar />} />
      <TypeGroup />
    </>
  );
}
