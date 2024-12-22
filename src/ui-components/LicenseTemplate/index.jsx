import { extractDay, extractMonth, extractYear } from "../../services";

export const LicenseTemplate = ({license}) => {
  return (
    <div id="license-id">
      <div className={`bg-amber-50 p-4`}>
        <div className={'p-4 border-4 border-solid border-green-700'}>
          <div className={'p-4 border-4 border-solid border-green-700'}>
            <div className={'w-full flex gap-3'}>
              <div className={'w-1/5 pl-3.5 overflow-hidden'}>
                <div
                  className={"w-[98px] h-[98px] rounded-full bg-white-a700 items-center justify-items-center border-2 border-solid border-black-900 float-right"}>
                  <img src={"/images/enugu_logo2.png"}
                       alt={"RevenueLogo"} className={"w-[72px] h-[102px]"} />
                </div>
              </div>
              <div className={"w-4/5 text-center"}>
                <h1 className={"text-[28px]"}>THE ENUGU STATE GOVERNMENT</h1>
                <h1 className={"text-[32px] font-bold"}>Enugu State Gaming Commission</h1>
                <div className={"w-full flex pl-[150px] mt-2"}>
                  <div className={"w-[103px] h-[103px] rounded-full bg-white-a700 items-center justify-items-center"}>
                    <img src={"/images/enugu_gov_logo.jpeg"}
                         alt={"GovLogo"}
                         className={"w-[102px] h-[102px] rounded-full border-2 border-solid border-green-600"} />
                  </div>
                  <div className={"m-0 pt-2 p-4 text-[24px] text-left"}>
                    <div><strong>No.:</strong> {license?.reference}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={"w-full text-center"}>
              <h1 className={"text-[32px] font-bold"}>GAMING/LOTTERY LICENSE</h1>
              <p className={'text-[18px]'}>
                Pursuant to the Enugu State Gaming Law 2004 and Enugu Gaming Commission Regulations 2017
              </p>
            </div>
            <div className={'py-[30px] text-center text-[24px] font-bold'}>
              Enugu State Gaming Commission hereby licensed
            </div>
            <div className={"text-center text-[24px] font-bold px-8"}>
              <div className={"pb-[20px]  border-solid border-b-4 border-b-black-900"}>
                {license?.applicant?.name}
              </div>
            </div>
            <div className={"py-[30px] text-center text-[24px]"}>
              with Registered Office at
            </div>
            <div className={'text-center text-[24px] font-bold px-8'}>
              <div className={'pb-[20px] border-solid border-b-4 border-b-black-900'}>
                {license?.applicant?.address}
              </div>
            </div>
            <div className={'text-center text-[24px] px-2 pt-8'}>
              to operate a
              <span className={'font-bold px-2'}>
              {license?.fileName}
              </span> with effective from
              <span className={'font-bold px-2'}>
                {extractDay(license?.issuedOn)}
              </span> Day of
              <span className={'font-bold px-2'}>
                {extractMonth(license?.issuedOn)} {' '} {extractYear(license?.issuedOn)}
              </span> to
              <span className={'font-bold px-2'}>
                {extractDay(license?.expiresOn)}
              </span> Day of
              <span className={'font-bold px-2'}>
                {extractMonth(license?.expiresOn)} {' '} {extractYear(license?.expiresOn)}
              </span> in Enugu State.
            </div>
            <div className={'py-[30px] text-center text-[22px] px-8'}>
              This License is subject to the provisions of Part III, Appendix A
              First Schedule of Enugu State Gaming Commission Regulation 2017, Cap
              86 Enugu State Gaming Commission Law with the Force and Effect as it fully
              set forth herein.
            </div>
            <div className={'py-[10px] text-center text-[22px] px-8'}>
              This license is given under my hand by the authority of the
              Governor of Enugu and it is valid for {'One year'}
            </div>
            <div className={'py-[10px] font-bold text-center text-[22px] px-8'}>
              Dated {extractDay(new Date().toDateString())} Day of {' '}
              {extractMonth(new Date().toDateString())} {' '}
              {extractYear(new Date().toDateString())}
            </div>
            <div className={'pt-[40px] text-left text-[22px] px-8'}>
              <strong>Signed</strong><br />
              Executive Secretary
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}