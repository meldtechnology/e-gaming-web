import { useState } from "react";
import { Heading } from "../../ui-components";
import { UserMetricsInfo } from "../../ui-components/UserMetricsInfo";
import { UsersList } from "../../ui-components/UsersList";
import { InputText } from "../../ui-components/InputText";
import { SearchIcon } from "../../ui-components/Icons";


export const Users = () => {
  // const [searchParams] = useSearchParams();
  // const reference = searchParams.get('reference');
  // const { userId } = useParams();
  const [searchBarValue, setSearchBarValue] = useState("");

  console.log(searchBarValue);

  return (
    <>
          <div>
            <header className="border-b border-solid border-blue_gray-400 bg-white-a700 gap-9 p-[18px] mb-4">
              <div className="flex items-center justify-between gap-5 sm:flex-col">
                <Heading size="headinglg" as="h4" className="text-[24px] font-bold text-gray-600 md:text-[22px]">
                  Users
                </Heading>
                <InputText size={`w-[30%]`}
                           value={searchBarValue}
                           placeHolderText="Find Users..."
                           icon={<SearchIcon iconColor='gray' />}
                           onChange={(e) => setSearchBarValue(e.target.value)}
                />
              </div>
            </header>
            <UserMetricsInfo />
          </div>
      <UsersList />
    </>
  );
}