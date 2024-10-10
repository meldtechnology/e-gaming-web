import { useState } from "react";
import { Heading } from "../../ui-components";
import { UserMetricsInfo } from "../../ui-components/UserMetricsInfo";
import { UsersList } from "../../ui-components/UsersList";
import { InputText } from "../../ui-components/InputText";
import { SearchIcon } from "../../ui-components/Icons";
import { GetUsersService as getMetricsService } from "../../services";

const PROFILE_SEARCH_URL = process.env.REACT_APP_ADMIN_USER_PROFILE_URL;
export const Users = () => {
  const [searchBarValue, setSearchBarValue] = useState("");
  const { users, isLoading }
    = getMetricsService((Object.keys(searchBarValue).length === 0) ?
    null : `${PROFILE_SEARCH_URL}?search=${searchBarValue}&page=1&size=5`, 0);

  const useKeyPressed = async (event) => {
    setSearchBarValue(event.target.value);
  }

  return (
    <>
          <div>
            <header className="border-b border-solid border-blue_gray-400 bg-white-a700 gap-9 p-[18px] mb-4">
              <div className="flex items-center justify-between gap-5 sm:flex-col">
                <Heading size="headinglg" as="h4" className="text-[24px] font-bold text-gray-600 md:text-[22px]">
                  Users
                </Heading>
                  <InputText id="search-input"
                             size={`w-[30%]`}
                             value={searchBarValue}
                             placeHolderText="Search for Users..."
                             icon={<SearchIcon iconColor='gray' />}
                             autocomplete="off"
                             onChange={useKeyPressed}
                             loading={isLoading}
                             users={users}
                  />
                </div>
            </header>
            <UserMetricsInfo />
          </div>
      <UsersList />
    </>
);
}