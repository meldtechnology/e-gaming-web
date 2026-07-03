import { env } from "../../../config/env";
import { MeldAlert } from "../../Alerts";
import { AlertType } from "../../Alerts/AlertType";
import { useState } from "react";
import { UpdateUserService as toggleEnabled } from "../../../services";
import { Loader } from "../../Loader";

const ENABLE_URL = env.ADMIN_ENABLE_URL;
const DISABLE_URL = env.ADMIN_DISABLE_URL;
export const EnableToggleModal = ({ onClick, userData }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const userDataSplit = "".concat(userData).split(",");
  let status = (userDataSplit[3] === 'true')
  const [isEnabled, setIsEnabled] = useState(status);
  const { modifyPost } = toggleEnabled(`${ENABLE_URL}/${userDataSplit[1]}`);
  const { modifyPost: disable } = toggleEnabled(`${DISABLE_URL}/${userDataSplit[1]}`);

  const toggle = async (e) => {
    const result = await updateUserStatus(isEnabled);
    if(result?.error !== undefined){
      setError(result?.error);
      setMessage(result?.error?.userMessage);
    }
    else {
      setSuccess(result?.data);
      setMessage(result?.data?.message);
      setIsEnabled(!isEnabled);
    }
    // setIsEnabled(!isEnabled);
    setIsSaving(false);
    closeAlert();
  }


  const updateUserStatus = async (values) => {
    setIsSaving(true);
    return (values) ? await modifyPost(null) : await disable(null);
  }

  const closeAlert = () => {
    setTimeout(()=> {
      setError(null);
      setSuccess(null);
    }, 5000);
  }

  return (
    <>
      <div className="fixed inset-0 bg-brand/30 transition-opacity" aria-hidden="false"></div>
      <div className="fixed  inset-0 z-10 w-screen h-screen ">
        <div className="flex mt-[2%] justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            className="relative bg-opacity-15 transform overflow-hidden rounded-lg bg-surface text-left shadow-xl transition-all ">
            <div className="bg-surface px-4 pb-4 pt-5 sm:p-6 sm:pb-4 block w-full">
              <button type="button"
                      onClick={onClick}
                      className="w-[10%] inline-flex rounded-xl px-3 py-2 text-sm font-semibold text-text-primary hover:text-text-inverse shadow-sm ring-1 ring-inset ring-border-strong hover:bg-danger sm:mt-0 sm:w-auto float-right">
                <span className="min-w-full text-center">X</span>
              </button>
              <div style={{ display: (error !== null) ? "" : "none" }}>
                <MeldAlert alertType={AlertType.ERROR} message={message} show={error !== null} />
              </div>
              <div style={{ display: success !== null ? "" : "none" }}>
                <MeldAlert alertType={AlertType.SUCCESS} message={message} show={success !== null} />
              </div>
            </div>
            <div className="bg-surface px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-1 text-left sm:ml-4 sm:mt-0 sm:text-left">
                  <div className="w-[407px] h-[400px] items-center ">
                    <img src="/images/permission.svg" alt="Roles" className="relative ml-[35%]"/>
                    <div className="align-middle items-center text-center">
                      <span className="font-bold text-[24px] block">Enable/Disable User</span>
                      <span className="text-[14px]">{(isEnabled)? 'Disable' : 'Enable'}
                        <span className="text-brand pl-1">{userDataSplit[0]}</span>
                      </span>
                      <span className={`block mt-2 text-[14px] ${(isEnabled)? 'hidden': ''}`}>
                        An activation OTP will be sent to the email
                        <br />associated with account
                        <span className="text-brand pl-1">{userDataSplit[0]}</span>
                      </span>
                    </div>
                    <div className="mt-[15%] ml-[14%] w-[303px] pl-6">
                      <div className={`${isSaving? '':'hidden'}`}>
                        <Loader />
                      </div>
                      <label className={`inline-flex items-center cursor-pointer ${!isSaving ? '' : 'hidden'}`}>
                        <input type="checkbox"
                               value=""
                               checked={isEnabled}
                               onChange={() => setIsEnabled(!isEnabled)}
                               className="sr-only peer"
                               onClick={toggle} />
                        <div
                          className="relative w-14 h-7 bg-border-strong peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand dark:peer-focus:ring-brand rounded-full peer dark:bg-surface-raised peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-amber-50 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-border peer-checked:bg-brand"></div>
                        <span className="ms-3 text-sm font-medium text-text-primary dark:text-text-primary">
                          {(isEnabled) ? "Disable" : "Enable"} <span
                          className="text-brand pl-1">{userDataSplit[0]}</span>
                        </span>
                      </label>

                    </div>
                    <div className={'w-[70%] mt-4 mx-auto text-[0.8rem] text-center font-bold'}>
                      Note: if the data is not updated immediately, please use the
                      <span className={'text-danger'}> refresh data </span> button
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}