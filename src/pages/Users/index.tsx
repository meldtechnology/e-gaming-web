import { env } from "../../config/env";
import { useState } from "react";
import { PageHeader, AccessDenied } from "../../ui-components";
import { UserMetricsInfo } from "../../ui-components/UserMetricsInfo";
import { UsersList } from "../../ui-components/UsersList";
import { InputText } from "../../ui-components/InputText";
import { SearchIcon } from "../../ui-components/Icons";
import { GetUsersService as getMetricsService } from "../../services";
import { checkPermission } from "../../services/autorization";

const PROFILE_SEARCH_URL = env.ADMIN_USER_PROFILE_URL;
export const Users = () => {
  const [searchBarValue, setSearchBarValue] = useState("");
  const { users, isLoading }
    = getMetricsService((Object.keys(searchBarValue).length === 0) ?
    null : `${PROFILE_SEARCH_URL}?search=${searchBarValue}&page=1&size=5`, 0);

  const useKeyPressed = async (event: { target: { value: string } }) => {
    setSearchBarValue(event.target.value);
  }

  if (!checkPermission('CAN_VIEW_USERS')) return <AccessDenied />;

  return (
    <>
      <PageHeader
        title="Users"
        description="Manage team members, roles and access."
        actions={
          <InputText size={`w-72`}
                     value={searchBarValue}
                     placeHolderText="Search for Users..."
                     icon={<SearchIcon iconColor='gray' />}
                     onChange={useKeyPressed}
                     loading={isLoading}
                     users={users}
          />
        }
      />
      <div className="mb-6">
        <UserMetricsInfo />
      </div>
      <UsersList />
    </>
  );
}
