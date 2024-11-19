import { InputText } from "../InputText";
import { useEffect, useState } from "react";

export const EditGroupPopUp = ({openGroup, groupName, updateGroupName, editControl}) => {
  const [editName, setEditName] = useState(groupName);

  const editGroupName = (value) => {
    if(value === undefined) return '';
    return value;
  }

  useEffect(() => {
    setEditName(groupName);
  }, [groupName]);

  return (
    <div
      className={`${openGroup ? '' : 'hidden'} flex absolute z-10 p-4 left-0 font-sans text-sm font-normal break-words whitespace-normal bg-white-a700 border rounded-lg shadow-lg w-[60%] border-blue-gray-50 text-blue-gray-500 shadow-blue-gray-500/10 focus:outline-none data-[enter]:ease-out data-[leave]:ease-in`}>
      <InputText name={groupName}
                 value={editGroupName(editName)}
                 label={`Group Title`}
                 required={true}
                 onChange={(e) => updateGroupName(e.target.value)} />
      <button type="button"
              className="ml-4 bg-blue_gray-900 text-white-a700 px-1 rounded-lg h-[3rem]"
              onClick={editControl}>
        Update
      </button>
    </div>
  );
}