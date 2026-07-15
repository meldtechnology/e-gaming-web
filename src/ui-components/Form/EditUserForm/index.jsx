import { env } from "../../../config/env";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { Button as HeadlessButton } from "@headlessui/react";
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
import { Card } from "../../primitives";

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
});

const fieldClass =
  "w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-text-primary transition-colors placeholder:text-text-muted hover:border-border-strong focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40";
const labelClass = "mb-1.5 block text-sm font-medium text-text-secondary";
const errorClass = "mt-1.5 text-xs text-danger";

const UPLOAD_DOCUMENT_URL = env.DOCUMENT_UPLOAD_URL;
const USER_PROFILES_URL = env.USER_PROFILE_URL;
export const EditUserForm = () => {
  const canEditUser = checkPermission('CAN_EDIT_USER');
  const [user, setUser] = useState({});
  const [, setIsLoading] = useState(false);
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
        updateUser(values);
      }}
    >
      {({ errors, touched, dirty, isValid }) => (
        <Form className="mx-auto max-w-3xl">
          <Card padded className="gap-6">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
              <div>
                <h2 className="text-lg font-bold text-text-primary">Personal Information</h2>
                <p className="mt-0.5 text-sm text-text-secondary">
                  Update your profile picture and personal details.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <HeadlessButton
                  className="inline-flex h-11 items-center rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-raised"
                  type='reset'
                >
                  Cancel
                </HeadlessButton>
                {canEditUser && !saving ? (
                  <HeadlessButton
                    disabled={!(dirty && isValid)}
                    className={`inline-flex h-11 items-center rounded-xl px-6 text-sm font-semibold text-on-brand transition-colors ${!(dirty && isValid) ? 'cursor-not-allowed bg-border-strong' : 'bg-brand hover:bg-brand-strong'}`}
                    type='submit'
                  >
                    Save
                  </HeadlessButton>
                ) : null}
                <ProgressButton saving={saving} />
              </div>
            </div>

            {/* Profile picture */}
            <div className="flex items-center gap-5">
              <Img src={profilePic} alt="Profile" className="h-20 w-20 rounded-full object-cover ring-1 ring-border" />
              <div>
                <Field name="profilePicture" value={profilePic} hidden />
                {uploading ? (
                  <Loader w={'w-8'} h={'h-8'} />
                ) : (
                  <>
                    <button
                      type='button'
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand-soft"
                      onClick={() => document.getElementById('upload-file').click()}
                    >
                      <Img src="/images/img_upload_duotone_line.svg" alt="Upload" className="h-5 w-5" />
                      Upload picture
                    </button>
                    <input id="upload-file" type="file" name="profilePicture" hidden onChange={onUpload} />
                    <p className="mt-2 text-xs text-text-muted">SVG, PNG, JPEG or GIF (600px by 300px).</p>
                  </>
                )}
              </div>
            </div>

            {/* Fields */}
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-1">
              <div>
                <label className={labelClass} htmlFor="firstName">First name</label>
                <Field id="firstName" name="firstName" placeholder="First name" className={fieldClass} />
                {errors.firstName && touched.firstName ? <p className={errorClass}>{errors.firstName}</p> : null}
              </div>
              <div>
                <label className={labelClass} htmlFor="lastName">Last name</label>
                <Field id="lastName" name="lastName" placeholder="Last name" className={fieldClass} />
                {errors.lastName && touched.lastName ? <p className={errorClass}>{errors.lastName}</p> : null}
              </div>
              <div>
                <label className={labelClass} htmlFor="email">Email address</label>
                <Field id="email" name="email" type="email" placeholder="sample@example.com" className={fieldClass} />
                {errors.email && touched.email ? <p className={errorClass}>{errors.email}</p> : null}
              </div>
              <div>
                <label className={labelClass} htmlFor="phoneNumber">Phone / Mobile</label>
                <Field id="phoneNumber" name="phoneNumber" placeholder="00000000000" className={fieldClass} />
                {errors.phoneNumber && touched.phoneNumber ? <p className={errorClass}>{errors.phoneNumber}</p> : null}
              </div>
            </div>
          </Card>

          <div className="mt-4">
            <MeldAlert alertType={AlertType.ERROR} message={errorMsg} show={isError} />
            <MeldAlert alertType={AlertType.SUCCESS} message={'Profile Updated!'} show={isSuccess} />
          </div>
        </Form>
      )}
    </Formik>
  );
}
