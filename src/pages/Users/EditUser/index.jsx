import { Heading } from "../../../ui-components";
import { EditUserForm } from "../../../ui-components/Form";
import { checkPermission } from "../../../services/autorization";

export const EditUser = () => {
  return checkPermission('CAN_EDIT_USER') === '' ? (
    <div className="flex-1">
      <div className="flex border-b border-solid border-blue_gray-400 bg-white-a700 p-[30px] sm:p-5">
        <Heading size="headinglg" as="h1" className="text-[24px] font-bold text-gray-600 md:text-[22px]">
          Edit User
        </Heading>
      </div>
      <div className="flex flex-col gap-1">
        <EditUserForm />
      </div>
    </div>
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