import { Heading } from "../../Heading";
import { Button } from "@headlessui/react";
import { Img } from "../../Img";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import {
  CreateUserService as createUser,
  passwordGenerator,
  UploadDocumentService as uploadDocument,
  GetRolesService as getRoles } from "../../../services";
import { AlertType } from "../../Alerts/AlertType";
import { MeldAlert } from "../../Alerts";
import { DEFAULT_IMAGE } from "../../../constant";
import { Loader } from "../../Loader";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First Name is not valid! minimum is 2')
    .max(30, 'First name is not valid! maximum is 30')
    .required('First Name is Required'),
  lastName: Yup.string()
    .min(2, 'Last Name is not valid! minimum is 2!')
    .max(50, 'Last name is not valid! maximum is 30')
    .required('Last Name is Required'),
  phone: Yup.string()
    .min(10, 'Invalid Phone/Mobile number not complete')
    .max(14, 'Invalid Phone/Mobile number more than required')
    .required('Phone/Mobile is Required'),
  profilePicture: Yup.string(),
  email: Yup.string().email('Invalid email').required('Email is Required'),
  role: Yup.string().required('User Role is Required')
});

const initialValues={
  firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profilePicture: DEFAULT_IMAGE,
    role:''
}

const UPLOAD_DOCUMENT_URL = process.env.REACT_APP_DOCUMENT_UPLOAD_URL;
const ADD_USER_URL = process.env.REACT_APP_USER_SIGN_UP_URL;
const APP_ROLE_URL = process.env.REACT_APP_ROLES_URL;
export const AddUserForm = () => {
  const [saving, setSaving] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profilePic, setProfilePics] = useState(initialValues.profilePicture);
  const { addNewUser, posts, error } = createUser(ADD_USER_URL);
  const { uploadDoc,  } = uploadDocument(UPLOAD_DOCUMENT_URL);
  const { roles, isLoading } = getRoles(`${APP_ROLE_URL}?page=1&size=15`);


  const inviteUser = async (values) => {
      const passwd = passwordGenerator(7);
      setSaving(true);
      values.profilePicture = profilePic;
      const result = await addNewUser({ ...values, username: values.email, password: passwd });
      setSaving(false);
      if(result?.error !== undefined){
        setIsError(true);
        setErrorMsg(result?.error?.data?.userMessage);
      }
       else {
        setIsSuccess(true);
        resetForm(values);
      }
    closeAlert(10000);
  }

  const onUpload = (e) => {
    if(e.currentTarget.files[0].size > (1024 * 100)) {
      setIsError(true);
      setErrorMsg('Image size is bigger than 100 kb')
      closeAlert(10000);
      return;
    }
    setUploading(true);
    const uploadData = new FileReader();
    uploadData.readAsDataURL(e.currentTarget.files[0]);
    uploadData.addEventListener('load', () => {
      uploadFile(uploadData.result);
    });
  }

  const uploadFile = async ( base64File ) => {
    const result = await uploadDoc({ base64Image: base64File, resourceType: 'image' });
    if(result?.error !== undefined){
      setIsError(true);
      setErrorMsg('Your Upload could not be completed. Please contact support');
    }
    else setProfilePics(result?.data?.data?.resourceUrl);
    setUploading(false);
  }

  const closeAlert = (duration) => {
    setTimeout(()=> {
      setIsError(false);
      setIsSuccess(false);
    }, duration);
  }

  const resetForm = (values) => {
    values.email = '';
    values.firstName = '';
    values.lastName = '';
    values.role = '';
    values.profilePicture = DEFAULT_IMAGE;
    values.phone = '';
  }

  return (
    <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={values => {
          inviteUser(values);
        }}
      >
        {({ errors, touched, dirty, isValid }) => (
          <Form>
            <div className="flex items-start justify-center bg-indigo-50_a0 p-6 md:flex-col sm:p-5">
              <div className="mb-1 flex flex-1 flex-col items-start gap-0.5 self-center md:self-stretch">
                      <Heading size="headingmd" as="h2" className="text-[20px] font-bold text-black-900_01">
                        Personal Information
                      </Heading>
                      <Heading as="h3" className="text-[16px] font-bold text-gray-600">
                        Create new or update your profile picture and personal details here
                      </Heading>
              </div>
              <div className="flex">
                <Button
                  shape="round"
                  className="min-w-[104px] min-h-[43px] rounded-[14px] border border-solid border-black-900_01 bg-white-a700 px-[19px] mr-2"
                  type="reset"
                >
                  Cancel
                </Button>
                <Button
                  shape="round"
                  disabled={!(dirty && isValid)}
                  className={`min-w-[100px] min-h-[43px] ${!saving? '' : 'hidden'} text-white-a700 ${!(dirty && isValid) ? "bg-[#707073]" : "bg-black-900_01"} border border-solid border-black-900_01 rounded-[14px] px-[26px] sm:px-5`}
                  type="submit"
                >
                  Save
                </Button>
                <button disabled type="button"
                        className={`py-2.5 px-5 me-2 ${saving? '' : 'hidden'} text-sm font-medium text-white-a700 bg-[#707073] rounded-lg border border-gray-200 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"`}>
                  <svg aria-hidden="true" role="status"
                       className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                       viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor" />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#1C64F2" />
                  </svg>
                  Saving...
                </button>
              </div>
            </div>
            {/* Form data entry */}
            <div className="mb-[134px] bg-white-a700">
              <div>
                <div
                  className="flex items-end justify-center border-b border-solid border-blue_gray-400 p-3 md:flex-col">
                  <Heading size="headingmd" as="h4" className="mb-4 text-[20px] font-bold text-black-900_01">
                    Name:
                  </Heading>
                  <div className="mt-3.5 flex w-[86%] justify-end gap-[29px] md:w-full md:flex-col">
                    <div className="w-[34%] h-[48px]">
                      <Field name="firstName"
                             placeholder={`First Name`}
                             className="h-full rounded-[10px] border border-gray-500 px-3 md:w-full"
                      />
                      <p className="mt-1 text-1xl text-red-600 dark:text-red-500 bg-red-300">
                        {errors.firstName && touched.firstName ? (errors.firstName) : null}
                      </p>
                    </div>
                    <div className="w-[34%] h-[48px]">
                      <Field name="lastName"
                             placeholder={`Last Name`}
                             className="h-full rounded-[10px] border border-gray-500 px-3 md:w-full"
                      />
                      <p className="mt-1 text-1xl text-red-600 dark:text-red-500 bg-red-300">
                        {errors.lastName && touched.lastName ? (errors.lastName) : null}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="flex items-center justify-between gap-5 border-b border-solid border-blue_gray-400 pr-10 py-[18px] md:flex-col sm:px-5">
                  <Heading
                    size="headingmd"
                    as="h5"
                    className="mb-3 ml-10 self-end text-[20px] font-bold text-black-900_01 md:ml-0 md:self-auto"
                  >
                    Email Address:
                  </Heading>
                  <div className="w-[64%] h-[48px]">
                    <Field name="email"
                           type="email"
                           placeholder={`sample@example.com`}
                           className="h-full rounded-[10px] border border-gray-500 md:w-full"
                    />
                    <p className="mt-1 text-1xl text-red-600 dark:text-red-500 bg-red-300">
                      {errors.email && touched.email ? (errors.email) : null}
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center justify-between gap-3 border-b border-solid border-blue_gray-400 pr-10 py-[18px] md:flex-col sm:px-5">
                  <Heading
                    size="headingmd"
                    as="h6"
                    className="mb-63 ml-[42px] self-end text-[20px] font-bold text-black-900_01 md:ml-0 md:self-auto"
                  >
                    Phone/Mobile
                  </Heading>
                  <div className="w-[64%] h-[48px]">
                    <Field name="phone"
                           placeholder={`00000000000`}
                           className="w-[64%] h-[48px] gap-2 rounded-[10px] border border-gray-500 px-2.5 md:w-full"
                    />
                    <p className="mt-1 text-1xl text-red-600 dark:text-red-500 bg-red-300">
                      {errors.phone && touched.phone ? (errors.phone) : null}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="flex items-start justify-center border-b border-solid border-blue_gray-400 p-4 md:flex-col">
                <Heading size="headingmd" as="h5" className="mt-[42px] text-[20px] font-bold text-black-900_01">
                  Profile Picture:
                </Heading>
                <div
                  className="flex w-[80%] items-start justify-end gap-28 self-center pl-[76px] py-1 md:w-full md:flex-col md:gap-5 sm:px-5">
                  <Img
                    src={profilePic}
                    alt="Image"
                    className="h-[92px] w-[92px] rounded-[46px] object-cover md:w-full"
                  />
                  <Field name="profilePicture"  value={profilePic} hidden />
                  <div
                    className={`my-1 flex w-[60%] ${!uploading? '' : 'hidden'} flex-col items-start self-center rounded-[10px] bg-gray-50_01 py-2.5 pl-[76px] pr-14 md:my-0 md:w-full md:px-5`}>
                    <button type='button'
                            className="relative z-[1] ml-[30%] h-[72px] w-[72px] md:ml-0"
                            onClick={(e) => {
                              document.getElementById('upload-file').click();
                            }} >
                        <Img src="/images/img_upload_duotone_line.svg" alt="Uploadduotone"
                          className="relative z-[1] ml-[40%] h-[72px] w-[72px] md:ml-0" />
                      <input  id='upload-file'
                              type='file'
                             name='profilePicture'
                             hidden
                             onChange={onUpload} />
                    </button>
                    <Heading as="h6"
                      className="relative mb-2 mt-[-4px] w-[92%] text-[16px] text-center font-bold leading-[18px] text-blue-700 md:w-full" >
                      <span>Click or upload&nbsp;</span>
                      <span className="font-normal">
                      <>
                        or drag n drop
                        <br />
                        SVG, PNG, JPEG or GIF. Maximum Size is 100 kb
                      </>
                    </span>
                    </Heading>
                  </div>
                  <div className={`my-1 flex w-[60%]  ${uploading? '' : 'hidden'}  flex-col items-start self-center rounded-[10px] bg-gray-50_01 py-2.5 pl-[76px] pr-14 md:my-0 md:w-full md:px-5`}>
                    <span className="ml-[40%]"><Loader /></span>
                  </div>
                </div>
              </div>
              <div
                className="flex items-end justify-between gap-5 border-b border-solid border-blue_gray-400 pl-[76px] py-2.5 md:px-5 sm:flex-col">
                <Heading size="headingmd" as="h5" className="mb-[30px] text-[20px] font-bold text-black-900_01">
                  Role:
                </Heading>
                <div
                  className="mr-[212px] mt-2 flex w-[52%] items-center justify-center gap-2.5 bg-white-a700 px-5 py-[22px] md:mr-0 md:flex-col sm:w-full sm:py-5">
                  <div className="flex-grow">
                    <div className={` ${isLoading? '':'hidden'}`}>
                      <Loader />
                    </div>
                    <Field name="role"
                           placeholder={`STANDARD USER`}
                           as="select"
                           className={`flex-grow w-full ${!isLoading? '':'hidden'} rounded-[5px] border border-gray-900_01 px-3 !text-black-900_01 md:px-5"`}
                    >
                      <option value=''>---</option>
                      {(roles?.results.map((role, index) => (
                        <option value={role.name} key={`role-${index}`}>{role.name}</option>
                      )))}
                    </Field>
                    <p className="mt-1 text-1xl text-red-600 dark:text-red-500 bg-red-300">
                      {errors.role && touched.role ? (errors.role) : null}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: (error || isError)? '' : 'none'}}>
              <MeldAlert alertType={AlertType.ERROR} message={errorMsg} show={isError} />
            </div>
            <div style={{ display: posts? '' : 'none'}}>
              <MeldAlert alertType={AlertType.SUCCESS} message={'User invited successfully'} show={isSuccess} />
            </div>
          </Form>
        )}
      </Formik>
  );
}