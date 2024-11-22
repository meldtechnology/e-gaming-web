import { GetFormTemplateService as getTemplateService, UpdateDocumentService as editDocument } from "../../../services";
import { TemplateForm } from "../../Form/DynamicForm";
import { Loader } from "../../Loader";
import { useEffect, useState } from "react";
import { MeldAlert } from "../../Alerts";
import { AlertType } from "../../Alerts/AlertType";
import { extractTemplate } from "../../../services/extractRow";

const FORM_TEMPLATE_URL = process.env.REACT_APP_FORM_TEMPLATE_URL;
const ADD_EDIT_FILE_URL = process.env.REACT_APP_DOCUMENT_FILE_URL;
export const FormBuilderModal = ({ onClick, fileData }) => {
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
      <div className="fixed inset-0 bg-blue-300 bg-opacity-45 transition-opacity" aria-hidden="false"></div>
      <div className="fixed  inset-0 z-10 w-screen h-screen ">
        <div className="flex mt-[1%] justify-center p-4 text-center sm:items-center sm:p-0 overflow-y-auto">
          <div
            className="relative bg-opacity-15 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ">
            <div className="bg-white-a700 px-4 pb-4 pt-5 sm:p-6 sm:pb-4 block w-full">
              <div className="align-middle items-center text-center">
                <span className="font-bold text-[36px] mt-1 text-[#939393]">Form Designer</span>
              <button type="button"
                      onClick={onClick}
                        className="w-[10%] inline-flex rounded-xl px-3 py-2 text-sm font-semibold text-[#373737] hover:text-white-a700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-400 sm:mt-0 sm:w-auto float-right">
                  <span className="min-w-full text-center">X</span>
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
              <div className="bg-white-a700 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-1 text-left sm:ml-4 sm:mt-0 sm:text-left">
                    <div className="w-[720px] h-[800px] items-center overflow-y-scroll">
                      <div className="align-middle items-center text-center mb-4">
                        <span className="font-bold text-[24px] block">{fileObject?.name}
                          <span className="text-blue-600"> ({fileObject?.code})</span>
                      </span>
                      </div>
                      <hr />
                      <div className="w-full">
                        <div className="border-b border-slate-200">
                          <div className={`${loadingTemplate ? '' : 'hidden'}`}>
                            <Loader />
                          </div>
                          <div className={`${loadingTemplate ? 'hidden' : ''} w-[95%]`}>
                            <TemplateForm className={`${loadingTemplate ? 'hidden' : ''}`}
                                          data={(!!(fileObject?.formTemplate)) ?
                                            fileObject?.formTemplate : extractTemplate(template)}
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
        </div>
      </>
      );
}