import { useState } from "react";
import { UploadDocumentService as uploadDocument } from "../../../services";
import { Loader } from "../../Loader";

const UPLOAD_DOCUMENT_URL = process.env.REACT_APP_DOCUMENT_UPLOAD_URL;
export const FileUploader = ({labelText, value, setFile, resourceCat, code, containerClass, fieldClass}) => {
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [uploading, setUploading] = useState(false);
  const { uploadDoc,  } = uploadDocument(UPLOAD_DOCUMENT_URL);

  const onUpload = (e) => {
    if(e.currentTarget?.files[0]?.size > (1024 * 500)) {
      setIsError(true);
      setErrorMsg('Image size is bigger than 500 kb')
      closeTimeOutAlert(10000);
      return;
    }
    if(e.currentTarget?.files[0] === undefined) return;
    setUploading(true);
    const uploadData = new FileReader();
    uploadData.readAsDataURL(e.currentTarget.files[0]);
    uploadData.addEventListener('load', () => {
      uploadFile(uploadData.result);
    });
  }

  const uploadFile = async ( base64File ) => {
    const result = await uploadDoc({ base64Image: base64File, resourceType: resourceCat });
    if(result?.error !== undefined){
      setIsError(true);
      setErrorMsg('Your Upload could not be completed. Please contact support');
    }
    else setFile(result?.data?.data?.resourceUrl, code);
    setUploading(false);
  }

  const closeTimeOutAlert = (duration) => {
    setTimeout(()=> {
      setIsError(false);
    }, duration);
  }

  return (
    <div className={containerClass}>
      <label className="mb-2 text-sm text-slate-600 mr-4">
        {labelText}
      </label>
      <div className="inline-flex items-center gap-2">
        <img src={value} alt={`Document`}
             className={fieldClass}
             style={{
               display: uploading ? 'none' : ''
             }}
             onClick={(e) => {
               document.getElementById(code).click();
             }} />
        <input id={code}
               type='file'
               name={code}
               hidden
               onChange={onUpload} />
        <div
          className={`my-1 flex w-[60%]  ${uploading ? '' : 'hidden'}  flex-col items-start self-center rounded-[10px] bg-gray-50_01 py-2.5 pl-[76px] pr-14 md:my-0 md:w-full md:px-5`}>
          <span className="ml-[40%]"><Loader /></span>
        </div>
      </div>
      <div className={`${containerClass} ${isError? '' : 'hidden'} text-red-800 bg-red-300 p-4 rounded-[10px]`}>
        {errorMsg}
      </div>
    </div>
  );
}