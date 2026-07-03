import { PageHeader, AccessDenied } from "../../../ui-components";
import { AddUserForm } from "../../../ui-components/Form";
import { checkPermission } from "../../../services/autorization";

export const NewUser = () => {
  if (!checkPermission('CAN_CREATE_USER')) return <AccessDenied />;

  return (
    <div className="flex-1">
      <PageHeader title="Add New User" description="Invite a team member and assign their role." />
      <AddUserForm />
    </div>
  );
}
