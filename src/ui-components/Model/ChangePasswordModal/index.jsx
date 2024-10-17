import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { Button } from "@headlessui/react";
import { useState } from "react";
import { UpdateUserService as updatePassword } from "../../../services";
import { MeldAlert } from "../../Alerts";
import { AlertType } from "../../Alerts/AlertType";

const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password length not valid! minimum is 8')
    .required('Password is Required'),
  confirm: Yup.string()
    .min(2, 'Confirm password length not valid! minimum is 2!')
    .required('Confirm password is Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const initialValues = { password: '', confirm: ''}

const CHANGE_PASSWORD_URL = process.env.REACT_APP_ADMIN_CHANGE_PASSWORD_URL;
export const ChangePasswordModal = ({ onClick, userData, type}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const userDataSplit = "".concat(userData).split(",");
  const { modifyPost } = updatePassword(`${CHANGE_PASSWORD_URL}/${userDataSplit[1]}`);

  const updateUserPassword = async (values) => {
    const newPasswordUpdate
      = { newPassword: values.password, currentPassword: "" }
    setIsSaving(true);
    const result = await modifyPost(newPasswordUpdate);
    if(result?.error !== undefined){
      setError(result?.error);
      setMessage(result?.error?.userMessage);
    }
    else {
      setSuccess(result?.data);
      setMessage(result?.data?.data);
    }
    setIsSaving(false);
    resetFields(values);
    closeAlert();
  }

  const closeAlert = () => {
    setTimeout(()=> {
      setError(null);
      setSuccess(null);
    }, 5000);
  }

  const resetFields = (values) => {
    values.password = '';
    values.confirm = '';
  }

  return (
    <>
      <div className="fixed inset-0 bg-blue-300 bg-opacity-45 transition-opacity" aria-hidden="false"></div>
      <div className="fixed  inset-0 z-10 w-screen h-screen ">
        <div className="flex mt-[15%] justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            className="relative bg-opacity-15 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ">
            <div className="bg-white-a700 px-4 pb-4 pt-5 sm:p-6 sm:pb-4 block w-full">
              <button type="button"
                      onClick={onClick}
                      className="w-[10%] inline-flex rounded-xl px-3 py-2 text-sm font-semibold text-[#373737] hover:text-white-a700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-400 sm:mt-0 sm:w-auto float-right">
                <span className="min-w-full text-center">X</span>
              </button>
              <div style={{ display: (error !== null) ? "" : "none" }}>
                <MeldAlert alertType={AlertType.ERROR} message={message} show={error !== null} />
              </div>
              <div style={{ display: success !== null ? "" : "none" }}>
                <MeldAlert alertType={AlertType.SUCCESS} message={message} show={success !== null} />
              </div>
            </div>
            <div className="bg-white-a700 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-1 text-left sm:ml-4 sm:mt-0 sm:text-left">
                  <div className="w-[407px] h-[400px] items-center ">
                    <img src="/images/permission.svg" alt="Roles" className="relative ml-[35%]"/>
                    <div className="align-middle items-center text-center">
                      <span className="font-bold text-[24px] block">Change User password</span>
                      <span className="text-[12px]">Update the password for
                      <span className="text-blue-600 pl-1">{userDataSplit[0]}</span></span>
                    </div>
                    <div className="mt-[7%] ml-[14%] w-[303px]">
                      <Formik
                        initialValues={initialValues}
                        validationSchema={passwordSchema}
                        onSubmit={values => {
                          // same shape as initial values
                          updateUserPassword(values);
                        }}
                      >
                        {({ errors, touched, dirty, isValid }) => (
                          <Form>
                            <div className="w-full h-[40px]">
                              <Field name="password"
                                     placeholder={`New Password`}
                                     className="h-full rounded-[10px] border border-gray-500 px-3 md:w-full"
                              />
                              <p className="mt-1 text-1xl text-red-600 dark:text-red-500 bg-red-300">
                                {errors.password && touched.password ? (errors.password) : null}
                              </p>
                            </div>
                            <div className="w-full h-[40px] mt-5">
                              <Field name="confirm"
                                     placeholder={`Confirm Password`}
                                     className="h-full rounded-[10px] border border-gray-500 px-3 md:w-full"
                              />
                              <p className="mt-1 text-1xl text-red-600 dark:text-red-500 bg-red-300">
                                {errors.confirm && touched.confirm ? (errors.confirm) : null}
                              </p>
                            </div>
                            <div className="w-full h-[40px] mt-6">
                              <Button
                                shape="round"
                                disabled={!(dirty && isValid)}
                                className={`min-w-full min-h-[43px] text-white-a700 ${!isSaving? '' : 'hidden'} ${!(dirty && isValid) ? 'bg-[#707073]' : 'bg-black-900_01'} border border-solid border-black-900_01 rounded-[14px] hover:bg-[#626262] px-[26px] sm:px-5`}
                                type='submit'
                              >
                                Save
                              </Button>
                              <button disabled type="button"
                                      className={`min-w-full py-2.5 px-5 me-2 ${isSaving ? '' : 'hidden'} text-sm font-medium text-white-a700 bg-[#707073] rounded-xl border border-gray-200 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"`}>
                                <svg aria-hidden="true" role="status"
                                     className="inline w-4 h-4 me-3 text-gray-200 place-items-center animate-spin dark:text-gray-600"
                                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor" />
                                  <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="#1C64F2" />
                                </svg>
                                <span className="w-full text-center">Saving...</span>
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
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