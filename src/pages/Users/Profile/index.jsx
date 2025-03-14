import { UserProfile } from "../../../ui-components/UserProfile";
import { checkPermission } from "../../../services/autorization";

export const Profile = () => {
  return checkPermission('CAN_VIEW_PROFILE') === '' ? (
    <div className="flex-1">
      <UserProfile />
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