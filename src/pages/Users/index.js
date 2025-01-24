import { useState } from "react";
import { Heading } from "../../ui-components";
import { UserMetricsInfo } from "../../ui-components/UserMetricsInfo";
import { UsersList } from "../../ui-components/UsersList";
import { InputText } from "../../ui-components/InputText";
import { SearchIcon } from "../../ui-components/Icons";
import { GetUsersService as getMetricsService } from "../../services";
import { checkPermission } from "../../services/autorization";

const PROFILE_SEARCH_URL = process.env.REACT_APP_ADMIN_USER_PROFILE_URL;
export const Users = () => {
  const [searchBarValue, setSearchBarValue] = useState("");
  const { users, isLoading }
    = getMetricsService((Object.keys(searchBarValue).length === 0) ?
    null : `${PROFILE_SEARCH_URL}?search=${searchBarValue}&page=1&size=5`, 0);

  const useKeyPressed = async (event) => {
    setSearchBarValue(event.target.value);
  }

  return checkPermission('CAN_VIEW_USERS') === '' ? (
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
) : (
    <>
      <div className="mr-11 mt-[26px] block justify-items-center gap-5 md:mr-0 md:flex-col">
        <div className={'mt-8 p-4 text-center text-[2.1rem] text-red-600 font-bold'}>
          Access Denied! - You do not have sufficient access to view the screen
        </div>
        <div className={'w-[70%] h-[]70%'}>
          <img src={'/images/enugu_logo2.png'} alt={'Enugu_logo'} className={'w-full h-full'} />
        </div>
      </div>
    </>
  );
}