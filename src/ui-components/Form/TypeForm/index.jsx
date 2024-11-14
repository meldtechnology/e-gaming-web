import { useFormik } from "formik";
import * as yup from 'yup';
import { TextField } from "../component/TextField";
import { useEffect, useState } from "react";
import { ProgressButton } from "../component/ProgressButton";
import { CreateDocumentService as createDocument,
  UpdateDocumentService as editDocument
} from "../../../services";
import { MeldAlert } from "../../Alerts";
import { AlertType } from "../../Alerts/AlertType";

const validationSchema = yup.object({
  name: yup
    .string()
    .min(4, "Category Name is too short")
    .required('Please provide category name.'),
  description: yup
    .string()
    .required('Please provide category description.'),
});

const ADD_EDIT_TYPE_URL= process.env.REACT_APP_DOCUMENT_TYPE_URL
export const TypeForm = ({selectedType, isNew}) => {
  const [saving, setSaving] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [name, setName] = useState('');
  const [isEdit, setIsEdit ] = useState(false);
  const [initialValues, setInitialValues]
    = useState({ name: '', description: '' });
  const { addNewDocument, documents, error } = createDocument(ADD_EDIT_TYPE_URL);
  const { modifyDocument, update, } =
    editDocument(`${ADD_EDIT_TYPE_URL}/${name}`);

  const onSubmit =  async (values) => {
    setSaving(true);
    const result = !isEdit?
      await addNewDocument(values) :
      await modifyDocument(values);
    if(result?.error !== undefined){
      setIsError(true);
      setErrorMsg(result?.error?.data?.userMessage);
    }
    else {
      setIsSuccess(true);
      reset(values);
    }
    setSaving(false);
    closeAlert(10000);
  }

  const reset = (values) => {
    values.name = '';
    values.description = '';
    setInitialValues({ name: '', description: '' });
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
      setInitialValues(selectedType);
      setName(selectedType.name);
      setIsEdit(!isNew);
    }else {
      setInitialValues({name: '', description: '' });
    }
  }, [selectedType, isNew]);

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
          Add/Edit Category
        </h4>
        <p className="text-slate-500 font-light">
          Please Add or Edit category.
        </p>
        <form onSubmit={formik.handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
              <TextField formik={formik}
                         labelText={`Name`}
                         placeHolderText={`i.e Weekly Tax`}
                         value={formik.values.name}
                         required={true}
                         fieldName='name'
                         error={formik.touched.name && Boolean(formik.errors.name)}
                         errorText={formik.touched.name && formik.errors.name} />
              <TextField formik={formik}
                         labelText={`Description`}
                         placeHolderText={`i.e Rate collected on Friday every week`}
                         value={formik.values.description}
                         fieldName='description'
                         error={formik.touched.description && Boolean(formik.errors.description)}
                         errorText={formik.touched.description && formik.errors.description} />
            <button
              disabled={!(formik.dirty && formik.isValid)}
              className={`${saving ? 'hidden' : ''} mt-4 w-full rounded-md text-white-a700 bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
              type="submit">
              {!isEdit? 'Add' : 'Edit' } Category
            </button>
            <ProgressButton saving={saving} />`
          </div>
        </form>
      </div>
    </>
  );
}