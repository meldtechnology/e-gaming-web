import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { InputText } from "../DynamicForm/components";
import { getItem, storeItem } from "../../../services";
import { v4 as uuid } from "uuid";

export const AddAttachment = () => {
  const [attachments, setAttachments] = useState([]);
  const [name, setName] = useState('');
  const [fileName, setFileName] = useState('');
  const navigate = useNavigate();

  const closeForm = () => {
    storeItem('attach', JSON.stringify(attachments));
    navigate('/app/documents/F_322f9837')
  }

  const addNewAttachment = () => {
    const uniqueId = uuid();
    setAttachments([...attachments, {
      name: name,
      code: uniqueId.replaceAll('-', ''),
      url: ''
    }]);
    setName('');
  }

  const removeNewAttachment = (code) => {
    const copy = attachments.filter(value => value.code !== code);
    setAttachments(copy);
  }

  useEffect(() => {
    const fileNameApp = getItem('aFileName');
    const fileAttachments = getItem('attach');
    if(fileNameApp) setFileName(fileNameApp);
    if(fileAttachments) {
      setAttachments(JSON.parse(fileAttachments));
    }
  }, []);

  return (
    <>
      <div className="flex mt-[1%] justify-center p-4 text-center sm:items-center sm:p-0 overflow-y-auto">
        <div
          className="relative bg-opacity-15 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ">
          <div className="bg-white-a700 px-4 pb-4 pt-5 sm:p-6 sm:pb-4 block w-full">
            <div className="align-middle items-center text-center">
              <span className="font-bold text-[36px] mt-1 text-[#939393]">File Attachments <br />({fileName})</span>
              <button type="button"
                      onClick={closeForm}
                      className="w-[10%] inline-flex rounded-xl px-3 py-2 text-sm font-semibold text-[#373737] hover:text-white-a700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-400 sm:mt-0 sm:w-auto float-right">
                <span className="min-w-full text-center">X</span>
              </button>
            </div>
          </div>
          <div className="bg-white-a700 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-1 text-left sm:ml-4 sm:mt-0 sm:text-left">
                <div className="w-[720px] items-center">
                  <InputText name={name}
                             value={name}
                             label={'File Name'}
                             placeHolderText={`The file will be PDF file. i.e ${name}${name?'.pdf':''}`}
                             required={true}
                             onChange={(e) => setName(e.target.value)}
                             className="w-full min-w-[200px] mt-6"
                  />
                  <button type={'button'}
                          disabled={name === undefined || name === ''}
                          className={`w-full p-4 bg-gray-950 text-white-a700 ${name?'':'bg-opacity-25'}`}
                          onClick={addNewAttachment}>
                    Add File Name
                  </button>
                  </div>
                  <div className={`mt-4 p-2 w-full items-center text-center text-orange-400 border-solid border-b-gray-50_01`}>
                    Attachments
                  </div>
                  <div className={`w-[720px] items-center ${attachments ? "" : "hidden"}`}>
                    <table border={0} className={'mt-4 p-4 w-full'}>
                      <tbody>
                      {attachments?.map((item, index) => (
                        <tr key={index} className={'h-8'}>
                          <td className={'w-1/2 text-blue-600'}>{item?.name}</td>
                          <td className={'w-1/8'}>PDF</td>
                          <td className={'w-1/4'}>500kb Max.</td>
                          <td className={'w-1/8'}>
                            <button type="button"
                                    onClick={() => removeNewAttachment(item.code)}>
                              <svg xmlns="http://www.w3.org/2000/svg"
                                   viewBox="0 0 448 512"
                                   fill="#FE0000"
                                   className="w-4 h-4">
                                <path
                                  d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}