import { PageHeader, AccessDenied } from "../../../ui-components";
import { EditUserForm } from "../../../ui-components/Form";
import { checkPermission } from "../../../services/autorization";

export const EditUser = () => {
  if (!checkPermission('CAN_EDIT_USER')) return <AccessDenied />;

  return (
    <div className="flex-1">
      <PageHeader title="Edit User" description="Update your profile picture and personal details." />
      <EditUserForm />
    </div>
  );
}
