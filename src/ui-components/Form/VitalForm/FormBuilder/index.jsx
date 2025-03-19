import { useFormik } from "formik";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { ProgressButton } from "../../component/ProgressButton";
import { Selector } from "../component";
import { FileUploader } from "../../component/FileUploader";


export const FormBuilder = ({ formConfig, validationSchema, initialValues, attachment, onSubmit }) => {
  const [error, setError] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const setFileAttachment = (resourceUrl, code) => {
    setAttachments(attachments?.map(item => {
      if (item?.code === code)
        item.url = resourceUrl;
      return item;
    }));
  }

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

  useEffect(() => {
    setAttachments(attachment?.attachments);
  }, [attachment]);

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
      {(attachment?.hasAttachment)? (
          <div className={'w-full text-[18px]'}>
            <span className={'text-red-700 text-[18pt] mr-4'}>*</span>
            <span className={'text-blue-600 font-bold text-center'}>
              Upload the following PDF Attachments
            </span>
            <table border={0}>
              <tbody>
        {attachments?.map((file, index) => (
          <tr key={index} className={"w-full p-4 flex-col gap-3 overflow-hidden"}>
            <td className={'w-1/4'}>{file?.name}.pdf</td>
            <td className={"w-1/4 font-bold text-orange-400"}>
              {(file?.url) ? 'Upload Completed' : ''}
            </td>
            <td className={'w-1/4'}>
              <FileUploader
                labelText={`Attach`}
                value={'/images/paper-clip.png'}
                setFile={setFileAttachment}
                resourceCat={'document'}
                code={file?.code}
                containerClass="w-full max-w-sm min-w-[200px]"
                fieldClass={`relative z-[1] ml-[40%] h-[48px] w-[48px] md:ml-0 cursor-pointer`}
              />
            </td>
          </tr>
        ))}
              </tbody>
            </table>
          </div>
        ) :
        (
          <div>
            No Attachments
          </div>
        )}
      <button type="submit"
              className={`w-[100%] bg-gray-950 text-white-a700 p-4 rounded-lg ${formik.isSubmitting ? 'hidden' : ''}`}>
        Submit Application
      </button>
      <ProgressButton saving={formik.isSubmitting} width={'w-[100%]'} position={'justify-center'} />
    </form>
  );
}