import { Heading } from "../../../ui-components";
import { LicenseList } from "./LicenseList";
import { useState } from "react";
import { checkPermission } from "../../../services/autorization";

export const License = () => {
  const [type, setType] = useState('ISSUED');

  return checkPermission('CAN_VIEW_LICENSES') === '' ? (
    <>
      <div>
        <header className="border-b border-solid border-blue_gray-400 bg-white-a700 gap-0 p-[18px] mb-1">
          <div className="flex items-center justify-between gap-5 sm:flex-col">
            <Heading size="headinglg" as="h3" className="mb-4 font-bold text-gray-600 md:text-[22px]">
              Licenses
            </Heading>
          </div>
          <div>
            <button type={'button'}
                    onClick={()=> setType('ISSUED')}
                    className={'p-2 mt-2 mr-2 bg-blue-600 text-white-a700 rounded-[10px]'}>
              ISSUED
            </button>
            <button type={'button'}
                    onClick={()=> setType('APPROVE')}
                    className={'p-2 mt-2 bg-green-600 text-white-a700 rounded-[10px]'} >
              APPROVE
            </button>
          </div>
        </header>
        <div>
          <LicenseList status={type} />
        </div>
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