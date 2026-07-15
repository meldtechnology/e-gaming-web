import { UserProfile } from "../../../ui-components/UserProfile";
import { AccessDenied } from "../../../ui-components";
import { checkPermission } from "../../../services/autorization";

export const Profile = () => {
  if (!checkPermission('CAN_VIEW_PROFILE')) return <AccessDenied />;

  return (
    <div className="flex-1">
      <UserProfile />
    </div>
  );
}
