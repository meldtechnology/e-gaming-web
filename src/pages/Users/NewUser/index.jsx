import { Heading } from "../../../ui-components";
import { AddUserForm } from "../../../ui-components/Form";

export const NewUser = () => {
  return (
    <div className="flex-1">
      <div className="flex border-b border-solid border-blue_gray-400 bg-white-a700 p-[30px] sm:p-5">
        <Heading size="headinglg" as="h1" className="text-[24px] font-bold text-gray-600 md:text-[22px]">
          Add New User
        </Heading>
      </div>
      <div className="flex flex-col gap-1">
        <AddUserForm />
      </div>
    </div>
  );
}