import { Img } from "../../Img";
import { AlertType } from "../AlertType";

export const MeldAlert = ({ alertType, message, show }) => {
  // console.log(show);
  // const hide = false;
  // const reRun = useCallback(() => {
  //     setTimeout(() => { show = hide}, 10000);
  // }, []);

  // reRun();

  if(alertType === AlertType.ERROR) {
    return (
      <div className={`w-full ${show? '' : 'hidden'} animate-bounce text-justify text-[#FF0000] bg-[#DB1402] bg-opacity-[30%] rounded-2xl border border-[#AB0E00] p-4`}>
      <span>
        <Img src="/images/eroor.svg" className="w-[28px] h-[28px] inline mr-2" alt={"Error Info"} />
      </span>
        <span>{message}</span>

      </div>
    )
  }else if(alertType === AlertType.SUCCESS) {
    return (
      <div className={`w-full animate-bounce text-justify text-[#006600] bg-[#00AB03] bg-opacity-[30%] rounded-2xl border border-[#005001] p-4`}>
      <span>
        <Img src="/images/success.svg" className="w-[28px] h-[28px] inline mr-2" alt={"Success Info"} />
      </span>
        <span>{message}</span>

      </div>
    )
  } else {
    return (
      <div
        className={`w-full animate-bounce text-justify text-[#000066] bg-[#0049E5] bg-opacity-[30%] rounded-2xl border border-[#0A44C2] p-4`}>
      <span>
        <Img src="/images/Info.svg" className="w-[28px] h-[28px] inline mr-2" alt={"Error Info"} />
      </span>
        <span>{message}</span>

      </div>
    )
  }


}