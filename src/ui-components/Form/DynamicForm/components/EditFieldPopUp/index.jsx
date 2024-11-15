import { useEffect, useState } from "react";
import { FormFieldTypes } from "../FormFieldTypes";

export const EditFieldPopUp = ({ openEdit, field, update, close }) => {
  const [fieldType, setFieldType] = useState('');
  const [label, setLabel] = useState('');
  const [hint, setHint] = useState('');
  const [required, setRequired] = useState(false);

  const updateFiled = () => {
    field.fieldType = fieldType;
    field.label = label;
    field.hints = hint;
    field.required = required;
    return field;
  }

  const isRequired = (checked) => {
    if(required === undefined) return false;
    return checked;
  }

  const fieldValue = (value) => {
    if(value === undefined) return '';
    return value;
  }

  useEffect(() => {
    setFieldType(field?.fieldType);
    setLabel(field?.label);
    setHint(field?.hints);
    setRequired(field?.required);
  }, [field?.fieldType, field?.label, field?.hints, field?.required]);

  return (
    <div className={`${openEdit ? '' : 'hidden'} w-[65%] relative bg-gray-200_01 border-solid border-amber-50 rounded-t-3xl`}>
      <div className="w-[100%] p-2 font-bold bg-amber-400 text-amber-800 text-center rounded-t-full">
        <span>Update Form Field</span>
        <span className="float-right pr-4">
          <button type="button"
                  className="text-white-a700 bg-red-600 rounded-full px-1 py-0"
                  onClick={close}>
            x
          </button>
        </span>
      </div>
      <div className={`w-[100%] flex p-4`}>
        <div className="flex flex-row w-full gap-8">
          <div className="font-bold">Field Type:</div>
          <FormFieldTypes currentField={fieldType} setFieldType={setFieldType} />
        </div>
      </div>
      <div className={`w-[100%] flex p-4`}>
        <div className="flex flex-row w-full gap-8">
          <div className="w-20 font-bold">Label:</div>
          <div>
            <input type='text'
                    value={fieldValue(label)}
                    className="rounded-2xl"
                    onChange={(e)=> setLabel(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={`w-[100%] flex p-4`}>
        <div className="flex flex-row w-full gap-8">
          <div className="w-20 font-bold">Hint:</div>
          <div>
            <input type="text"
                   value={fieldValue(hint)}
                   className="rounded-2xl"
                   onChange={(e) => setHint(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={`w-[100%] flex p-4`}>
        <div className="flex flex-row w-full gap-8">
          <div className="w-20 font-bold">Required:</div>
          <div>
            <div className="relative inline-block w-11 h-5">
              <input id="switch-component-on"
                     type="checkbox"
                     onChange={() => setRequired(!required)}
                     checked={isRequired(required)}
                     className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300" />
              <label htmlFor="switch-component-on"
                     className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer">
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className={`w-full flex p-4`}>
          <button type="button"
                  className={`w-full p-2 bg-black-900 text-white-a700 rounded-lg shadow-lg`}
                  onClick={() => update(updateFiled())} >
            Update
          </button>
      </div>
    </div>
  );
}