import { env } from "../../../config/env";
import { useState } from "react";
import { UploadDocumentService as uploadDocument } from "../../../services";
import { Loader } from "../../Loader";

const UPLOAD_DOCUMENT_URL = env.DOCUMENT_UPLOAD_URL;
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

  const openFilePicker = () => {
    document.getElementById(code)?.click();
  }

  const onPickerKeyDown = (event) => {
    if(event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openFilePicker();
    }
  }

  return (
    <div className={containerClass}>
      <label className="mb-2 mr-4 text-sm font-medium text-text-secondary">
        {labelText}
      </label>
      <div className="inline-flex items-center gap-2">
        <button
          type="button"
          className="p-0 bg-transparent border-0"
          style={{
            display: uploading ? 'none' : ''
          }}
          onClick={openFilePicker}
          onKeyDown={onPickerKeyDown}
        >
          <img src={value} alt={`Document`} className={fieldClass} />
        </button>
        <input id={code}
               type='file'
               name={code}
               hidden
               onChange={onUpload} />
        <div
          className={`my-1 flex w-[60%]  ${uploading ? '' : 'hidden'}  flex-col items-center self-center rounded-xl bg-surface-muted py-2.5 md:my-0 md:w-full`}>
          <Loader />
        </div>
      </div>
      <div className={`${containerClass} ${isError? '' : 'hidden'} mt-2 rounded-xl bg-danger-soft p-4 text-danger`}>
        {errorMsg}
      </div>
    </div>
  );
}
