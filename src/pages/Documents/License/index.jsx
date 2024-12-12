import { Heading } from "../../../ui-components";
import { LicenseList } from "./LicenseList";
import { useState } from "react";

export const License = () => {
  const [type, setType] = useState('ISSUED');

  return (
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
            <button ype={'button'}
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
  )
}