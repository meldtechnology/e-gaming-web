import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Button, Card } from "../primitives";
import { PageHeader } from "../PageHeader";
import { Img } from "../Img";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getItem } from "../../services";
import { checkPermission } from "../../services/autorization";

type UserProfileData = {
  username?: string;
  profile?: {
    profilePicture?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    settings?: {
      role?: string;
    };
  };
};

const DetailItem = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <p className="text-xs font-medium uppercase tracking-wide text-text-muted">{label}</p>
    <p className="mt-1 text-base font-semibold text-text-primary">{value || "—"}</p>
  </div>
);

export const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfileData>({});

  useEffect(() => {
    const userProfile = getItem('profile');
    if(userProfile !== undefined) {
      setUser(JSON.parse(userProfile));
    }
  }, []);

  const profile = user?.profile;

  return (
    <>
      <PageHeader
        title="User Profile"
        description="Your account details and contact information."
        actions={
          checkPermission('CAN_EDIT_USER') ? (
            <Button leftIcon={<PencilSquareIcon className="h-5 w-5" />} onClick={() => navigate('/app/users/_edit')}>
              Edit
            </Button>
          ) : undefined
        }
      />

      <Card padded className="mx-auto max-w-3xl gap-8">
        <div className="flex items-center gap-6 border-b border-border pb-6 sm:flex-col sm:items-start">
          <Img
            src={profile?.profilePicture}
            alt="Profile"
            className="h-28 w-28 rounded-full object-cover ring-1 ring-border"
          />
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-text-primary">
              {profile?.firstName} {profile?.lastName}
            </h2>
            <p className="text-sm font-medium text-text-secondary">{profile?.settings?.role} User</p>
            <p className="text-sm font-semibold text-brand">{user?.username}</p>
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-semibold text-text-primary">Personal details</h3>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-1">
            <DetailItem label="First Name" value={profile?.firstName} />
            <DetailItem label="Last Name" value={profile?.lastName} />
            <DetailItem label="Email" value={profile?.email} />
            <DetailItem label="Phone" value={profile?.phoneNumber} />
            <DetailItem label="Role" value={profile?.settings?.role} />
          </div>
        </div>
      </Card>
    </>
  );
}
