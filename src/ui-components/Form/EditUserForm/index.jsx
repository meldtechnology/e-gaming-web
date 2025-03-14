import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { Heading } from "../../Heading";
import { Button } from "@headlessui/react";
import { Img } from "../../Img";
import {
  getItem,
  UpdateUserService as updateProfile,
  UploadDocumentService as uploadDocument
} from "../../../services";
import { Loader } from "../../Loader";
import { ProgressButton } from "../component/ProgressButton";
import { MeldAlert } from "../../Alerts";
import { AlertType } from "../../Alerts/AlertType";
import { checkPermission } from "../../../services/autorization";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First Name is not valid! minimum is 2')
    .max(30, 'First name is not valid! maximum is 30')
    .required('First Name is Required'),
  lastName: Yup.string()
    .min(2, 'Last Name is not valid! minimum is 2!')
    .max(50, 'Last name is not valid! maximum is 30')
    .required('Last Name is Required'),
  phoneNumber: Yup.string()
    .min(10, 'Invalid Phone/Mobile number not complete')
    .max(14, 'Invalid Phone/Mobile number more than required')
    .required('Phone/Mobile is Required'),
  profilePicture: Yup.string(),
  email: Yup.string().email('Invalid email').required('Email is Required'),
  // userRole: Yup.string().required('User Role is Required')
});

const UPLOAD_DOCUMENT_URL = process.env.REACT_APP_DOCUMENT_UPLOAD_URL;
const USER_PROFILES_URL = process.env.REACT_APP_USER_PROFILE_URL;
export const EditUserForm = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [profilePic, setProfilePics] = useState(user?.profile?.profilePicture);
  const [saving, setSaving] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { modifyPost } = updateProfile(USER_PROFILES_URL);
  const { uploadDoc,  } = uploadDocument(UPLOAD_DOCUMENT_URL);

  const initialValues = {
    firstName: user?.profile?.firstName,
    lastName: user?.profile?.lastName,
    email: user?.profile?.email,
    phoneNumber: user?.profile?.phoneNumber,
    profilePicture: '',
  }

  const updateUser = async (values) => {
    setSaving(true);
    values.profilePicture = profilePic;
    const result = await modifyPost({ profile: { ...values } });
    setSaving(false);
    if(result?.error !== undefined){
      setIsError(true);
      setErrorMsg(result?.error?.data?.userMessage);
    }
    else {
      setIsSuccess(true);
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

  useEffect(() => {
    const userProfile = getItem('profile');
    setIsLoading(true);
    if(userProfile !== undefined) {
      setUser(JSON.parse(userProfile));
    }
    setIsLoading(false);
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      enableReinitialize={true} 
      onSubmit={values => {
        // same shape as initial values
        updateUser(values);
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
                className={`min-w-[104px] min-h-[43px] rounded-[14px] border border-solid border-black-900_01 bg-white-a700 px-[19px] mr-2`}
                type='reset'
              >
                Cancel
              </Button>
              <Button
                shape="round"
                disabled={!(dirty && isValid)}
                className={`${checkPermission('CAN_EDIT_USER')} ${saving?'hidden':''} min-w-[100px] min-h-[43px] text-white-a700 ${!(dirty && isValid) ? 'bg-[#707073]' : 'bg-black-900_01'} border border-solid border-black-900_01 rounded-[14px] px-[26px] sm:px-5`}
                type='submit'
              >
                Save
              </Button>
              <ProgressButton saving={saving} />
            </div>
          </div>

          {/* Form data entry */}
          <div className="mb-[134px] bg-white-a700">
            <div>
              <div className="flex items-end justify-center border-b border-solid border-blue_gray-400 p-3 md:flex-col">
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
                  <Field name="phoneNumber"
                         placeholder={`00000000000`}
                         className="w-[64%] h-[48px] gap-2 rounded-[10px] border border-gray-500 px-2.5 md:w-full"
                  />
                  <p className="mt-1 text-1xl text-red-600 dark:text-red-500 bg-red-300">
                    {errors.phoneNumber && touched.phoneNumber ? (errors.phoneNumber) : null}
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
                          }}>
                    <Img
                      src="/images/img_upload_duotone_line.svg"
                      alt="Uploadduotone"
                      className="relative z-[1] ml-[40%] h-[72px] w-[72px] md:ml-0"
                    />
                    <input id="upload-file"
                           type="file"
                           name="profilePicture"
                           hidden
                           onChange={onUpload} />
                  </button>
                  <Heading
                    as="h6"
                    className="relative mb-2 mt-[-4px] w-[92%] text-[16px] text-center font-bold leading-[18px] text-blue-700 md:w-full"
                  >
                    <span>Click or upload&nbsp;</span>
                    <span className="font-normal">
                      <>
                        or drag n drop
                        <br />
                        SVG, PNG, JPEG or GIF (600px by 300px)
                      </>
                    </span>
                  </Heading>
                </div>
                <div className={`my-1 flex w-[60%] ${!uploading? 'hidden' : ''} flex-col items-start self-center`}>
                  <Loader />
                </div>
              </div>
            </div>
            <MeldAlert alertType={AlertType.ERROR} message={errorMsg} show={isError} />
            <MeldAlert alertType={AlertType.SUCCESS} message={'Profile Updated!'} show={isSuccess} />
          </div>
        </Form>
      )}
    </Formik>
  );
}