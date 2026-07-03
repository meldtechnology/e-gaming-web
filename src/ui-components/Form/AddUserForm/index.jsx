import { env } from "../../../config/env";
import { Button as HeadlessButton } from "@headlessui/react";
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
import { Card } from "../../primitives";
import { ProgressButton } from "../component/ProgressButton";

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

const fieldClass =
  "w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-text-primary transition-colors placeholder:text-text-muted hover:border-border-strong focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40";
const labelClass = "mb-1.5 block text-sm font-medium text-text-secondary";
const errorClass = "mt-1.5 text-xs text-danger";

const UPLOAD_DOCUMENT_URL = env.DOCUMENT_UPLOAD_URL;
const ADD_USER_URL = env.USER_SIGN_UP_URL;
const APP_ROLE_URL = env.ROLES_URL;
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
          <Form className="mx-auto max-w-3xl">
            <Card padded className="gap-6">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
                <div>
                  <h2 className="text-lg font-bold text-text-primary">Personal Information</h2>
                  <p className="mt-0.5 text-sm text-text-secondary">
                    Create a new user and set their profile picture and personal details.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <HeadlessButton
                    className="inline-flex h-11 items-center rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-raised"
                    type="reset"
                  >
                    Cancel
                  </HeadlessButton>
                  <HeadlessButton
                    disabled={!(dirty && isValid)}
                    className={`inline-flex h-11 items-center rounded-xl px-6 text-sm font-semibold text-on-brand transition-colors ${!saving ? '' : 'hidden'} ${!(dirty && isValid) ? "cursor-not-allowed bg-border-strong" : "bg-brand hover:bg-brand-strong"}`}
                    type="submit"
                  >
                    Save
                  </HeadlessButton>
                  <ProgressButton saving={saving} />
                </div>
              </div>

              {/* Profile picture */}
              <div className="flex items-center gap-5">
                <Img
                  src={profilePic}
                  alt="Profile"
                  className="h-20 w-20 rounded-full object-cover ring-1 ring-border"
                />
                <div>
                  {uploading ? (
                    <Loader w={'w-8'} h={'h-8'} />
                  ) : (
                    <>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand-soft"
                        onClick={() => document.getElementById('upload-file').click()}
                      >
                        <Img src="/images/img_upload_duotone_line.svg" alt="Upload" className="h-5 w-5" />
                        Upload picture
                      </button>
                      <input id='upload-file' type='file' name='profilePicture' hidden onChange={onUpload} />
                      <p className="mt-2 text-xs text-text-muted">SVG, PNG, JPEG or GIF. Maximum size 100 kb.</p>
                    </>
                  )}
                  <Field name="profilePicture" value={profilePic} hidden />
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
                  <label className={labelClass} htmlFor="phone">Phone / Mobile</label>
                  <Field id="phone" name="phone" placeholder="00000000000" className={fieldClass} />
                  {errors.phone && touched.phone ? <p className={errorClass}>{errors.phone}</p> : null}
                </div>
                <div className="sm:col-span-1">
                  <label className={labelClass} htmlFor="role">Role</label>
                  {isLoading ? (
                    <Loader w={'w-6'} h={'h-6'} />
                  ) : (
                    <Field id="role" name="role" as="select" className={fieldClass}>
                      <option value=''>---</option>
                      {(roles?.results.map((role, index) => (
                        <option value={role.name} key={`role-${index}`}>{role.name}</option>
                      )))}
                    </Field>
                  )}
                  {errors.role && touched.role ? <p className={errorClass}>{errors.role}</p> : null}
                </div>
              </div>
            </Card>

            <div className="mt-4" style={{ display: (error || isError) ? '' : 'none' }}>
              <MeldAlert alertType={AlertType.ERROR} message={errorMsg} show={isError} />
            </div>
            <div className="mt-4" style={{ display: posts ? '' : 'none' }}>
              <MeldAlert alertType={AlertType.SUCCESS} message={'User invited successfully'} show={isSuccess} />
            </div>
          </Form>
        )}
      </Formik>
  );
}
