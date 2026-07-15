import { env } from "../../config/env";
import { GetFormTemplateService as getTemplateService, UpdateDocumentService as editDocument } from "../../services";
import { TemplateForm } from "../Form/DynamicForm";
import { Loader } from "../Loader";
import { useEffect, useState } from "react";
import { MeldAlert } from "../Alerts";
import { AlertType } from "../Alerts/AlertType";
import { extractTemplate } from "../../services/extractRow";

const FORM_TEMPLATE_URL = env.FORM_TEMPLATE_URL;
const ADD_EDIT_FILE_URL = env.DOCUMENT_FILE_URL;
export const FormBuilder = ({ onClick, fileData }) => {
  const fileObject = fileData[0];
  const [name, setName] = useState(fileObject?.name);
  const [saving, setSaving] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { template, loadingTemplate } = getTemplateService(`${FORM_TEMPLATE_URL}`);
  const { modifyDocument, } = editDocument(`${ADD_EDIT_FILE_URL}/${name}`);

  const saveTemplate = async (template) => {
    if(fileObject?.formTemplate) fileObject.formTemplate = template;
    setSaving(true);
    const result = (!!(fileObject?.formTemplate)) ?
      await modifyDocument(fileObject) :
      await modifyDocument({...fileObject, formTemplate: template}) ;
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

  const closeAlert = (duration) => {
    setTimeout(()=> {
      setIsError(false);
      setIsSuccess(false);
    }, duration);
  }

  useEffect(() => {
    setName(fileObject?.name);
  }, [fileObject?.name]);
  return (
    <>
        <div className="flex mt-[1%] justify-center p-4 text-center sm:items-center sm:p-0 overflow-y-auto">
          <div
            className="relative transform overflow-hidden rounded-2xl border border-border bg-surface text-left shadow-e3 transition-all ">
            <div className="block w-full px-6 pb-4 pt-5">
              <div className="flex items-center justify-between">
                <span className="text-[28px] font-bold text-text-primary">Form Designer</span>
                <button type="button"
                      onClick={onClick}
                      aria-label="Close form designer"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface-raised hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                </button>
              </div>
                <div style={{ display: (isError) ? "" : "none" }}>
                  <MeldAlert alertType={AlertType.ERROR} message={errorMsg} show={isError} />
                </div>
                <div style={{ display: isSuccess ? "" : "none" }}>
                  <MeldAlert alertType={AlertType.SUCCESS} message={`Form Template update for ${name}`}
                             show={isSuccess} />
                </div>
              </div>
              <div className="px-6 pb-4 pt-5">
                <div className="sm:flex sm:items-start">
                  <div className="mt-1 text-left sm:ml-4 sm:mt-0 sm:text-left">
                    <div className="w-[720px] items-center">
                      <div className="mb-4 text-center">
                        <span className="block text-[22px] font-bold text-text-primary">{fileObject?.name}
                          <span className="text-brand"> ({fileObject?.code})</span>
                      </span>
                      </div>
                      <hr className="border-border" />
                      <div className="w-full">
                        <div className="border-b border-border">
                          <div className={`${loadingTemplate ? '' : 'hidden'}`}>
                            <Loader />
                          </div>
                          <div className={`${loadingTemplate ? 'hidden' : ''} w-[95%]`}>
                            <TemplateForm className={`${loadingTemplate ? 'hidden' : ''}`}
                                          data={(fileObject?.formTemplate && Object.keys(fileObject.formTemplate).length > 0) ?
                                            fileObject.formTemplate : extractTemplate(template)}
                                          saveTemplate={saveTemplate}
                                          saving={saving} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </>
      );
}