import { useEffect, useState } from "react";
import * as yup from "yup";
import {
  CreateDocumentService as createDocument,
  GetTypeService as getDocService,
  GetCyclesService as getCycleService,
  GetFeeTypeService as getFeeService,
  UpdateDocumentService as editDocument, extractRowWithName, storeItem, getItem, removeItem
} from "../../../services";
import { useFormik } from "formik";
import { MeldAlert } from "../../Alerts";
import { AlertType } from "../../Alerts/AlertType";
import { TextField } from "../component/TextField";
import { ProgressButton } from "../component/ProgressButton";
import { DropDown } from "../component/DropDown";
import { ToggleSwitch } from "../component/ToggleSwitch";
import { Loader } from "../../Loader";
import { ImageUploader } from "../component/ImageUploader";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  code: yup
    .string()
    .min(5, "RH Code is too short. Must be 10 Alphanumeric or more")
    .required('Please provide revenue head code.'),
  serviceTypeCode: yup
    .string()
    .min(5, "Service Type Code is too short. Must be 10 Alphanumeric or more")
    .required('Please provide service type code.'),
  name: yup
    .string()
    .min(4, "Category Name is too short")
    .required('Please provide category name.'),
  description: yup
    .string()
    .required('Please provide category description.'),
  renewalName: yup
    .string()
    .required('Please Select a valid renewal period.'),
  typeName: yup
    .string()
    .required('Please Select one Category.'),
  feeType: yup
    .string()
    .required('Please Select one Fee Type.'),
  value: yup
    .number()
    .required('Please provide the value. The minimum is 0.')
  ,flatFee: yup
    .number()
    .required('Please provide the flat fee. The minimum is 0.'),

});

const DOCUMENT_CYCLE_URL= process.env.REACT_APP_DOCUMENT_CYCLE_URL;
const DOCUMENT_TYPE_URL= process.env.REACT_APP_DOCUMENT_TYPE_URL;
const FEE_TYPE_URL= process.env.REACT_APP_FEE_TYPE_URL;
const ADD_EDIT_FILE_URL = process.env.REACT_APP_DOCUMENT_FILE_URL;
export const FileForm = ({selectedFile, isNew}) => {
  const [saving, setSaving] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [attachment, setAttachment] = useState([]);
  const [name, setName] = useState('');
  const [isEdit, setIsEdit ] = useState(false);
  const [permitLogo, setPermitLogo ] = useState('/images/building.jpg');
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(
    {
      code: '',
      serviceTypeCode: '',
      name: '',
      description: '',
      logo: '',
      publicVisibility: false,
      renewalName: '',
      renewalDuration: 0,
      typeName: '',
      feeType: '',
      value: 0,
      flatFee: 0,
      hasAttachment: false,
      attachments: []
  });
  const { types, loadingTypes }
    = getDocService(`${DOCUMENT_TYPE_URL}?page=1&size=100&sortBy=name&sortIn=ASC`);
  const { cycles, loadingCycle }
    = getCycleService(`${DOCUMENT_CYCLE_URL}`);
  const { fees, loadingFee }
    = getFeeService(`${FEE_TYPE_URL}`);
  const { addNewDocument, documents, error } = createDocument(ADD_EDIT_FILE_URL);
  const { modifyDocument, update, } =
    editDocument(`${ADD_EDIT_FILE_URL}/${name}`);
  // const { uploadDoc,  } = uploadDocument(UPLOAD_DOCUMENT_URL);

  const onSubmit =  async (values) => {
    values.logo = permitLogo;
    values.hasAttachment = attachment.length > 0;
    values.attachments = attachment;
    setSaving(true);
    const result = !isEdit?
      await addNewDocument(values) :
      await modifyDocument(values);
    setSaving(false);
    if(result?.error !== undefined){
      setIsError(true);
      setErrorMsg(result?.error?.data?.userMessage);
    }
    else {
      setIsSuccess(true);
      reset();
    }
    closeAlert(10000);
  }

  const reset = () => {
    formik.setFieldValue("code", '');
    formik.setFieldValue("serviceTypeCode", '');
    formik.setFieldValue("name", '');
    formik.setFieldValue("description", '');
    formik.setFieldValue("publicVisibility", false);
    formik.setFieldValue("renewalName", "");
    formik.setFieldValue("renewalDuration", 0);
    formik.setFieldValue("typeName", "");
    formik.setFieldValue("feeType", "");
    formik.setFieldValue("value", 0);
    setPermitLogo('/images/building.jpg');
    setInitialValues({
      code: '',
      serviceTypeCode: '',
      name: '',
      description: '',
      logo: '/images/building.jpg',
      publicVisibility: false,
      renewalName: '',
      renewalDuration: 0,
      typeName: '',
      feeType: '',
      value: 0,
      flatFee: 0,
      hasAttachment: false,
      attachments: []
    });
  }

  const addAttachmentConfig = () => {
      if(formik.values.name) {
        storeItem('attach', JSON.stringify(attachment));
        storeItem('aFileName', formik.values.name)
        storeItem('cFValues', JSON.stringify(formik.values));
        if(isEdit) storeItem('editedForm', isEdit);
        navigate('/app/documents/F_EAD5665');
      }else {
        setIsError(true);
        setErrorMsg("The File does not have a name");
      }
  }

  const closeAlert = (duration) => {
    setTimeout(()=> {
      setIsError(false);
      setIsSuccess(false);
      setIsEdit(false);
    }, duration);
  }

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  useEffect(() => {
    if (!isNew) {
      setInitialValues(selectedFile);
      setName(selectedFile?.name);
      setPermitLogo(selectedFile?.logo);
      setAttachment(selectedFile?.attachments);
      setIsEdit(!isNew);
    }
  }, [selectedFile, isNew]);

  useEffect(() => {
    const currentForm = getItem('cFValues');
    const modified = getItem("editedForm");
    if(currentForm) {
      const cachedFile = JSON.parse(currentForm);
      setInitialValues(cachedFile);
      setName(cachedFile?.name);
      setPermitLogo(cachedFile?.logo === ''? '/images/building.jpg': cachedFile?.logo)
      removeItem('cFValues')
    }if(modified) {
      setIsEdit(modified);
      removeItem('editedForm');
    }
  }, [formik]);

  useEffect(() => {
    const isAttachedFile = getItem('attach');
    if(isAttachedFile) {
      setAttachment(JSON.parse(isAttachedFile));
      removeItem('attach');
    }
  }, [formik]);


  return (
    <>
      <div style={{ display: (error || isError) ? '' : 'none' }}>
        <MeldAlert alertType={AlertType.ERROR} message={errorMsg} show={isError} />
      </div>
      <div style={{ display: (documents || update) ? '' : 'none' }}>
        <MeldAlert alertType={AlertType.SUCCESS} message={`${!isEdit? 'New' : '' } Category ${!isEdit? 'Added' : 'Updated' } successfully`}
                   show={isSuccess} />
      </div>
      <div className="relative flex flex-col rounded-xl bg-transparent mt-2">
        <h4 className="block text-xl font-medium text-slate-800">
          Add/Edit Revenue Head
        </h4>
        <p className="text-slate-500 font-light">
          Please add/update a revenue head.
        </p>
        <form onSubmit={formik.handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <TextField formik={formik}
                       labelText={`Revenue Head Code`}
                       placeHolderText={`i.e 20212024/XXXXXXX`}
                       required={true}
                       value={formik.values.code}
                       onChange={formik.handleChange}
                       fieldName='code'
                       error={formik.touched.code && formik.errors.code}
                       errorText={formik.touched.code && formik.errors.code}
                       fieldClass="w-full max-w-sm min-w-[200px]"
            />
            <TextField formik={formik}
                       labelText={`Service Type ID`}
                       placeHolderText={`i.e 14996410000`}
                       required={true}
                       value={formik.values.serviceTypeCode}
                       onChange={formik.handleChange}
                       fieldName='serviceTypeCode'
                       error={formik.touched.serviceTypeCode && formik.errors.serviceTypeCode}
                       errorText={formik.touched.serviceTypeCode && formik.errors.serviceTypeCode}
                       fieldClass="w-full max-w-sm min-w-[200px]"
            />
            <TextField formik={formik}
                       labelText={`Name`}
                       placeHolderText={`i.e Weekly Tax`}
                       required={true}
                       value={formik.values.name}
                       onChange={formik.handleChange}
                       fieldName='name'
                       error={formik.touched.name && formik.errors.name}
                       errorText={formik.touched.name && formik.errors.name}
                       fieldClass="w-full max-w-sm min-w-[200px]"
            />
            <TextField formik={formik}
                       labelText={`Description`}
                       value={formik.values.description}
                       fieldName='description'
                       onChange={formik.handleChange}
                       error={formik.touched.description && formik.errors.description}
                       errorText={formik.touched.description && formik.errors.description}
                       fieldClass="w-full max-w-sm min-w-[200px]"
            />
            <button type={'button'}
                    onClick={addAttachmentConfig}
                    className="w-full max-w-sm min-w-[200px] p-2 bg-gray-950 text-white-a700">
              Add Attachments
            </button>
            <div className={`${loadingTypes ? "" : "hidden"}`}>
              <Loader />
            </div>
            <DropDown formik={formik}
                      labelText={`Category`}
                      fieldName='typeName'
                      required={true}
                      placeholderText={`The Revenue Head Category`}
                      value={formik.values.typeName}
                      error={formik.touched.typeName && formik.errors.typeName}
                      errorText={formik.touched.typeName && formik.errors.typeName}
                      selOptions={types?.data?.results}
                      onChange={formik.handleChange}
                      fieldClass="w-full rounded-[10px] max-w-sm min-w-[200px]"
                      isDisabled={false}
                      className={`${loadingTypes ? "hidden" : ""}`}
            />
            <div className={`${loadingCycle ? "" : "hidden"}`}>
              <Loader />
            </div>
            <DropDown formik={formik}
                      labelText={`Renewal`}
                      fieldName='renewalName'
                      required={true}
                      value={formik.values.renewalName}
                      placeholderText={`The document life cycle or validity duration`}
                      error={formik.touched.renewalName && formik.errors.renewalName}
                      errorText={formik.touched.renewalName && formik.errors.renewalName}
                      selOptions={cycles?.data}
                      onChange={(e) => {
                        formik.setFieldValue("renewalName", e.target.value);
                        formik.setFieldValue("renewalDuration", extractRowWithName(
                          cycles?.data, e.target.value)?.durationInDays);
                      }}
                      fieldClass="w-full rounded-[10px] max-w-sm min-w-[200px]"
                      isDisabled={false}
                      className={`${loadingCycle ? "hidden" : ""}`}
            />
            <TextField formik={formik}
                       labelText={`Renewal Duration`}
                       value={formik.values.renewalDuration}
                       fieldName='renewalDuration'
                       onChange={formik.handleChange}
                       fieldClass="w-full max-w-sm min-w-[200px]"
                       isDisabled={true} />
            <div className={`${loadingFee ? "" : "hidden"}`}>
              <Loader />
            </div>
            <DropDown formik={formik}
                      labelText={`Fee Type`}
                      fieldName='feeType'
                      required={true}
                      value={formik.values.feeType}
                      placeholderText={`The Fee Type for this document`}
                      error={formik.touched.feeType && formik.errors.feeType}
                      errorText={formik.touched.feeType && formik.errors.feeType}
                      selOptions={fees?.data}
                      onChange={formik.handleChange}
                      fieldClass="w-full rounded-[10px] max-w-sm min-w-[200px]"
                      isDisabled={false}
                      className={`${loadingFee ? "hidden" : ""}`}
            />
            <TextField formik={formik}
                       labelText={`Fee Value`}
                       value={formik.values.value}
                       fieldName='value'
                       onChange={formik.handleChange}
                       error={formik.touched.value && formik.errors.value}
                       errorText={formik.touched.value && formik.errors.value}
                       fieldClass="w-full max-w-sm min-w-[200px]" />
            <TextField formik={formik}
                       labelText={`Default Flat Fee`}
                       value={formik.values.flatFee}
                       fieldName='flatFee'
                       onChange={formik.handleChange}
                       error={formik.touched.flatFee && formik.errors.flatFee}
                       errorText={formik.touched.flatFee && formik.errors.flatFee}
                       fieldClass="w-full max-w-sm min-w-[200px]" />
            <ToggleSwitch formik={formik}
                          labelText={`Public Access`}
                          value={formik.values.publicVisibility}
                          onChange={formik.handleChange}
                          fieldName='publicVisibility'
                          fieldClass="w-full max-w-sm min-w-[200px]" />
            <ImageUploader labelText={`Permit Logo`}
                           value={permitLogo}
                           setImage={setPermitLogo}
                           containerClass="w-full max-w-sm min-w-[200px]"
                           fieldClass={`relative z-[1] ml-[40%] h-[72px] w-[72px] md:ml-0 cursor-pointer`} />

            <button
              disabled={!(formik.dirty && formik.isValid)}
              className={`${saving ? 'hidden' : ''} mt-4 w-full rounded-md text-white-a700 bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
              type="submit">
              {!isEdit ? 'Add' : 'Edit'} Category
            </button>
            <ProgressButton saving={saving} />`
          </div>
        </form>
      </div>
    </>
  );
}