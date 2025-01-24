import { Heading } from "../../../ui-components";
import { DocumentNavBar } from "../../../ui-components/NavBar";
import { FileGroup } from "../../../ui-components/FileGroup";
import { checkPermission } from "../../../services/autorization";

export const Files = () => {
  return checkPermission('CAN_VIEW_DOCUMENTS') === '' ? (
    <>
      <div>
        <header className="border-b border-solid border-blue_gray-400 bg-white-a700 gap-0 p-[18px] mb-1">
          <div className="flex items-center justify-between gap-5 sm:flex-col">
            <Heading size="headinglg" as="h3" className="mb-4 font-bold text-gray-600 md:text-[22px]">
              Revenue Heads
            </Heading>
          </div>
          <DocumentNavBar />
        </header>
        <FileGroup />
      </div>
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
  )
}