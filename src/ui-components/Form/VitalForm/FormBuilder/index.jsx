import { useFormik } from "formik";
import Box from "@mui/material/Box";
import { useState } from "react";
import { ProgressButton } from "../../component/ProgressButton";
import { Selector } from "../component";


export const FormBuilder = ({ formConfig, validationSchema, initialValues, onSubmit }) => {
  const [error, setError] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  const inValidField = (e, message) => {
    e.target.setCustomValidity(message);
    setError(true);
  }

  const clearError = (e) => {
    e.target.setCustomValidity('');
    setError(false);
  }

  return (
    <form onSubmit={formik.handleSubmit} >
      {formConfig?.map((group) => (
        <div key={group?.groupId}>
          <h2 className='font-bold text-[24px] text-blue-600 pb-4'>
            {group.headerTitle}</h2>
          <hr className="bg-gray-950 h-[2px] mb-3" />
          { group?.formControls?.map((field) => (
            <Box key={field?.name}
                 padding={'1rem'} >
              <Selector formik={formik}
                        fieldType={field?.fieldType}
                        required={field?.required}
                        name={field?.name}
                        label={field?.label}
                        options={field?.options}
                        isError={error}
                        errMsg={`Please provide the ${field?.label}`}
                        inValid={inValidField}
                        valid={clearError} />
            </Box>
          ))}
        </div>
      ))}
      <button type="submit"
              className={`w-[100%] bg-gray-950 text-white-a700 p-4 rounded-lg ${formik.isSubmitting? 'hidden':''}`}>
        Submit Application
      </button>
      <ProgressButton saving={formik.isSubmitting} width={'w-[100%]'} position={'justify-center'} />
    </form>
  );
}