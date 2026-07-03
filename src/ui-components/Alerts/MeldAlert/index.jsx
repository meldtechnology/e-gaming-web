import { Img } from "../../Img";
import { AlertType } from "../AlertType";

export const MeldAlert = ({ alertType, message, show }) => {

  if(alertType === AlertType.ERROR) {
    return (
      <div
        className={`w-full ${show ? '' : 'hidden'} animate-pulse text-justify text-danger bg-danger-soft rounded-2xl border border-danger/30 p-4`}>
      <span>
        <Img src="/images/eroor.svg" className="w-[28px] h-[28px] inline mr-2" alt={"Error Info"} />
      </span>
        <span>{message}</span>
      </div>
    )
  } else if (alertType === AlertType.SUCCESS) {
    return (
      <div
        className={`w-full ${show ? '' : 'hidden'} animate-pulse text-justify text-success bg-success-soft rounded-2xl border border-success/30 p-4`}>
      <span>
        <Img src="/images/success.svg" className="w-[28px] h-[28px] inline mr-2" alt={"Success Info"} />
      </span>
        <span>{message}</span>

      </div>
    )
  } else {
    return (
      <div
        className={`w-full ${show ? '' : 'hidden'} animate-pulse text-justify text-info bg-info-soft rounded-2xl border border-info/30 p-4`}>
      <span>
        <Img src="/images/Info.svg" className="w-[28px] h-[28px] inline mr-2" alt={"Error Info"} />
      </span>
        <span>{message}</span>

      </div>
    )
  }


}
